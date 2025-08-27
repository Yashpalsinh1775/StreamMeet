import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar, Tabs, Tab, Typography } from "@mui/material";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [formState, setFormState] = React.useState(0); // 0 = Login, 1 = Register
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  // Random Unsplash background
  const bgImage = `https://source.unsplash.com/random/1600x900/?technology,gradient,abstract`;

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
        setMessage("Login Successful!");
        setOpen(true);
        setError("");
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        setMessage(result || "Account created successfully!");
        setOpen(true);
        setError("");
        setFormState(0);
        setName("");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      let msg = err?.response?.data?.message || "Something went wrong!";
      setError(msg);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />

        {/* Centered Glassmorphism Card */}
        <Grid
          item
          xs={11}
          sm={8}
          md={5}
          component={Paper}
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(15px)",
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Logo / Icon */}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            {/* Tabs (SignIn / SignUp) */}
            <Tabs
              value={formState}
              onChange={(e, newVal) => setFormState(newVal)}
              centered
              sx={{
                mb: 2,
                "& .MuiTab-root": { fontSize: "1rem", fontWeight: "bold" },
              }}
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>

            {/* Form */}
            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ borderRadius: 2 }}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ borderRadius: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ borderRadius: 2 }}
              />

              {/* Error Message */}
              {error && (
                <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
                  {error}
                </Typography>
              )}

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  borderRadius: "30px",
                  background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #2575fc, #6a11cb)",
                  },
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
