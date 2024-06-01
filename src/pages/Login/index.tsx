import { LockOutlined, LockOpen, Copyright } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginSchema } from "../../schemas/validationSchemas";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { Snackbar } from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = { email, password };

    try {
      if (email !== null && password !== null) {
        await loginSchema.validate(form, { abortEarly: false });
        setErrors([]);
        console.log("Logging in with email:", email);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            signIn();
            navigate("/tasks");
            setSnackbarMessage("Login successful!");
            setOpenSnackbar(true);
          })
          .catch((error) => {
            console.error("Error during login:", error.message);
            setErrors([error.message]);
          });
      }
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        setErrors(err.errors);
      }

      setSnackbarMessage(err);
      setOpenSnackbar(true);
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              errors.includes("Invalid email format") ||
              errors.includes("Email is required")
            }
            helperText={
              errors.includes("Invalid email format")
                ? "Invalid email format"
                : ""
            }
          />
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
            onChange={(e) => setPassword(e.target.value)}
            error={
              errors.includes("Password is required") ||
              errors.includes("Password must be at least 6 characters long")
            }
            helperText={
              errors.includes("Password must be at least 6 characters long")
                ? "Password must be at least 6 characters long"
                : ""
            }
          />
          {errors.length > 0 && (
            <Box sx={{ color: "red", mt: 2 }}>
              {errors.map((error, index) => (
                <Typography key={index}>{error}</Typography>
              ))}
            </Box>
          )}
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
            <LockOpen /> Login
          </Button>
        </Box>
      </Box>
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Login;
