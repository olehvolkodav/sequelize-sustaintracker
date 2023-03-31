#!/bin/bash

YELL='\033[1;33m'
LG='\033[1;32m' # Light green
NC='\033[0m' # No color

echo -e "ip: $1\ninstance: $2\nenvironment: $3"

cd ../

set -e

echo -e "\n${LG}Building container images${NC}\n"
docker-compose build --force-rm api
docker-compose build --force-rm nginx

echo -e "\n${LG}Uploading images to remote instance${NC}"

echo -e "\n${LG}Uploading api${NC}"
docker save sustaintracker_api | pv | ssh -C $2 sudo docker load
echo -e "\n${LG}Uploading nginx${NC}"
docker save sustaintracker_nginx | pv | ssh -C $2 sudo docker load

echo -e "\n${LG}Finished uploading images, running and setting up networks${NC}"

set +e

echo -e "\n${LG}Creating networks${NC}"
ssh -l ubuntu $2 "sudo docker network create network_nginx"
ssh -l ubuntu $2 "sudo docker network create network_backend"

echo -e "\n${LG}Renaming and stopping previous containers${NC}"
ssh -l ubuntu $2 "sudo docker rename api old_api && sudo docker stop old_api"
ssh -l ubuntu $2 "sudo docker rename nginx old_nginx && sudo docker stop old_nginx"

echo -e "\n${LG}Running containers${NC}"
ssh -l ubuntu $2 "sudo docker run -d --restart always --name api sustaintracker_api"
ssh -l ubuntu $2 "sudo docker run -d --restart always -p 80:80 --name nginx sustaintracker_nginx"

echo -e "\n${LG}Connecting containers to networks${NC}"
ssh -l ubuntu $2 "sudo docker network connect network_backend api"
ssh -l ubuntu $2 "sudo docker network connect network_nginx nginx"
ssh -l ubuntu $2 "sudo docker network connect network_nginx api"

echo -e "\n${LG}Waiting to test api and frontend status${NC}"
sleep 30

status_code=`ssh -l ubuntu $2 "curl --write-out %{http_code} --silent --output /dev/null $1/api"`

if [[ "$status_code" -ne 200 ]] ; then
  echo "\n${LG}Got status code: $status_code.${NC}"
  exit 1
else
  echo -e "\n${LG}Removing old containers${NC}"
  ssh -l ubuntu $2 "sudo docker rm -f old_api && sudo docker rm -f old_nginx"
  exit 0
fi