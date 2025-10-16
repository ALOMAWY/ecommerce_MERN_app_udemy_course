import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import type { IUser } from "../types/user";
import { BASE_URL } from "../constants/baseurl";

const Register = () => {
  const initialData: IUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState<IUser>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const isFormValid = () => {
    const { firstName, lastName, email, password } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // matches anything@anything.anything

    return (
      firstName.trim().length >= 3 &&
      lastName.trim().length >= 3 &&
      emailRegex.test(email) &&
      !loading &&
      password.length >= 8
    );
  };

  // Handlers
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending...");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setError("Unable To Register User, Please Try Deffernt Credientials!");
        throw new Error("HTTP error! Status: " + response.status);
        return;
      }

      const result = await response.json();
      console.log("✅ User Registerd", result);
      alert(`Welcome 'MR ${data.firstName}' in Tech-Hub Store`);
      setData(initialData);
    } catch (error) {
      console.error(error);
      setError(`Somthing went Wrong, Try With Safe Info`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSend}
      sx={{
        "& .MuiTextField-root": {
          width: "100%",
          padding: "10px 0",
        },
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        border: "1px solid #00000050",
        borderRadius: "20px",
        padding: "20px",
        margin: "1rem auto",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        sx={{
          fontSize: "2rem",
          textAlign: "center",
          textTransform: "uppercase",
          margin: "20px",
          fontWeight: "900",
        }}
      >
        Register
      </Typography>

      <TextField
        required
        id="outlined-required"
        label="Firstname"
        name="firstName"
        value={data.firstName}
        onChange={onChange}
      />
      <TextField
        required
        id="outlined-required"
        label="Lastname"
        name="lastName"
        value={data.lastName}
        onChange={onChange}
      />
      <TextField
        required
        id="outlined-required"
        label="Email"
        name="email"
        value={data.email}
        onChange={onChange}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        name="password"
        value={data.password}
        onChange={onChange}
      />
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <Button
        type="submit"
        disabled={!isFormValid()}
        variant="contained"
        sx={{
          mt: "1rem",
          padding: "1rem",
          borderRadius: "5px 5px 20px 20px",
          fontSize: "1rem",
          letterSpacing: "4px",
        }}
      >
        Send
      </Button>
    </Box>
  );
};
export default Register;
