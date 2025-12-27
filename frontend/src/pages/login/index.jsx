import { Button, Input } from "../../components/index.js";
import { LoginContainer, FormLogin } from "./styled.js";

const Login = () => {
  return (
    <LoginContainer>
      <div>
        <h2>Login</h2>
      </div>
      <FormLogin>
        <Input placeholder="Enter your username" type="text" />
        <Input placeholder="Enter your password" type="password" />
        <a href="">Forgot password ?</a>
        <Button type="submit">Login</Button>
      </FormLogin>
      <p>
        Not registered yet ? <a href="/register">Create an account</a>
      </p>
    </LoginContainer>
  );
};
export default Login;
