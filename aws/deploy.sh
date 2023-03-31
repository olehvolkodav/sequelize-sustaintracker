#!/bin/bash

YELL='\033[1;33m'
LG='\033[1;32m' # Light green
NC='\033[0m' # No color

if ! command -v jq &> /dev/null; then
  echo -e "${YELL}Missing \"jq\" command, please install${NC}"
  exit 1
fi


environment=$1

if ! [[ "$environment" =~ ^(dev|staging|prod)$ ]]; then
  echo -e "\n${YELL}Expecting argument to specify environment. Accepted values: dev/staging/prod.${NC}"
  exit 1
fi

stackname="sustaintracker-$environment"
instancename="sustaintracker-$environment-ubuntu"
principal_tags="companyId=custom:companyId,role=custom:role"
stackaction=""

aws cloudformation describe-stacks --stack-name $stackname &> /dev/null
stack_exists=$?

if [ $stack_exists -ne 0 ]; then
  echo -e "${LG}Creating stack $stackname${NC}"
  aws cloudformation create-stack --stack-name $stackname --template-body file://ec2.yaml --capabilities CAPABILITY_NAMED_IAM
  
  stackaction="create"
else
  echo -e "${LG}Updating stack${NC}"
  aws cloudformation update-stack --stack-name $stackname --template-body file://ec2.yaml --capabilities CAPABILITY_NAMED_IAM
  
  stackaction="update"
fi

set -e

echo -e "${LG}Waiting for stack${NC}"
aws cloudformation wait stack-$stackaction-complete --stack-name $stackname &> /dev/null

identity_pool_id=`aws cloudformation list-stack-resources --stack-name $stackname --output json | jq -r '.StackResourceSummaries[] | select(.LogicalResourceId=="IdentityPool").PhysicalResourceId'`
provider_name=`aws cognito-identity describe-identity-pool --identity-pool-id $identity_pool_id --output json | jq -r '.CognitoIdentityProviders[0].ProviderName'`

echo -e "${LG}Got identity pool id and provider name${NC}"

echo -e "${LG}Setting principal tag attribute map${NC}"
aws cognito-identity set-principal-tag-attribute-map --identity-pool-id $identity_pool_id --identity-provider-name=$provider_name --principal-tags=$principal_tags

echo -e "\n${LG}DONE${NC}"

echo -e "\n${LG}Deploy docker containers? (y/n)${NC}"
read deploycontainers

if [ $deploycontainers == "y" ]; then
  echo -e "\n${YELL}Expecting a configured ssh host named $instancename with user \"ubuntu\"${NC}"

  echo -e "\n${LG}Getting ip for instance named: $instancename${NC}"
  server_ip=`aws ec2 describe-instances --filters Name=tag:Name,Values=$instancename --output json | jq ".Reservations[0].Instances[0].NetworkInterfaces[0].Association.PublicIp"`

  if [ -z "$server_ip" ]; then
    echo -e "\n${YELL}Failed to get instance ip.${NC}"
    exit 1
  fi

  echo -e "\n${LG}Got ip: $server_ip${NC}"

  echo -e "${LG}Looking for docker installation on instance${NC}"

  set +e
  ssh -l ubuntu $instancename "command -v docker" &> /dev/null
  hasdocker=$?
  set -e

  if [ $hasdocker -ne 0 ]; then
    echo -e "\n${YELL}Docker not found on remote machine, install and try again.${NC}"
  else
    echo -e "\n${LG}Docker found, proceeding.${NC}"

    exec ../api/deploy-docker.sh $server_ip $instancename $environment
  fi
else
  echo -e "${LG}Bye${NC}"
fi