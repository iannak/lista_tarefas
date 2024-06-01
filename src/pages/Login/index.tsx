import { LockOutlined, LockOpen, Copyright } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememderUser, setRememderUser] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (rememderUser) {
      localStorage.setItem("user", email);
    } else {
      localStorage.removeItem("user");
    }
  }, [rememderUser, email]);

  const changeRemember = (e: any) => {
    setRememderUser(!rememderUser);
  };

  const validateLogin = (e: any) => {
    e.preventDefault();
    if (email === "test@email.com" && password === "123password") {
      setError(false);
      setHelperText("Login OK! Wait...");
      navigate("/tasks");
    } else {
      setError(true);
      setHelperText("The username or password entered is invalid!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: "1rem",
            backgroundColor: "gray",
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form noValidate onSubmit={validateLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Address in Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            error={error}
          />{" "}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            error={error}
            helperText={helperText}
          />
          <FormControlLabel
            control={
              <Switch
                checked={rememderUser}
                onChange={changeRemember}
                name="Remember"
              />
            }
            label="Remember user"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
            sx={{
              margin: "3px 0 2px",
            }}
          >
            <LockOpen /> Access
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Not have an account yet?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box
        mt={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Copyright /> Copyright
      </Box>
    </Container>
  );
};

export default Login;
