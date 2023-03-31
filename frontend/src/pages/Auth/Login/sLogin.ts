import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.secondary_light};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BackgroundLeft = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.primary};
  width: 30vw;
  height: 100vh;
  min-width: calc(15vw + 200px);
  max-width: calc(15vw + 250px);
`;

export const LoginCard = styled.div`
  z-index: 2;
  width: 30vw;
  min-width: 400px;
  max-width: 500px;
  height: 66vh;
  min-height: 600px;
  margin-left: 15vw;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 0px 24px 0px #0000000a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4em 3em;

  > svg {
    height: 56px;
  }
`;

export const CardTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray_0};
  margin-top: 2em;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 100%;
  }

  > button {
    width: 100%;
    margin-top: auto;
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.4em;
  }
`;

export const ForgotPassword = styled.div`
  cursor: pointer;
  border: none;
  background: none;
  margin-top: 0.8em;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  margin-left: auto;
`;

export const RegisterButton = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  margin-top: 1em;
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3em;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 48px;
`;

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_0};
  font-weight: 700;
  font-size: 36px;
`;

export const Illustration = styled.img`
  width: 80%;
  margin-top: 2em;
`;
