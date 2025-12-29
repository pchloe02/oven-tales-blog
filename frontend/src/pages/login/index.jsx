import { useState } from "react";
import { Button, Input } from "../../components/index.js";
import { LoginContainer, FormLogin } from "./styled.js";
import useLogin from "../../hooks/useLogin.jsx";
import { colors } from "../../utils/theme.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      window.location.href = "/";
    } catch (err) {
      // error is handled by the hook state
    }
  };

  return (
    <LoginContainer>
      <div>
        <h2>Login</h2>
      </div>
      <FormLogin onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="">Forgot password ?</a>
        <Button type="submit" disabled={loading}>
          Login
        </Button>
        {error && (
          <p style={{ color: `${colors.error}` }}>
            Password or email is incorrect
          </p>
        )}
      </FormLogin>
      <p>
        Not registered yet ? <a href="/register">Create an account</a>
      </p>
    </LoginContainer>
  );
};
export default Login;
