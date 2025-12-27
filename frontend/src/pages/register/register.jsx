import { useState } from "react";
import { Input, Button } from "../../components";
import { FormRegister, RegisterContainer } from "./styled.js";
import useRegister from "../../hooks/useRegister.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, loading, error } = useRegister();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    try {
      await register({ name, email, password });
      navigate("/");
    } catch (err) {
      setLocalError(err?.message || "Error during registration");
    }
  };

  return (
    <RegisterContainer>
      <h2>Create an account</h2>
      <FormRegister onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your username"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          placeholder="Confirm your password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
        {(localError || error) && (
          <p style={{ color: "red" }}>{localError || error}</p>
        )}
      </FormRegister>
    </RegisterContainer>
  );
};
export default Register;
