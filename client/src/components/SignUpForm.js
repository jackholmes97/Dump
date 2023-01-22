import { useState } from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Input from '@mui/material/Input';
import { Typography } from "@mui/material";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState()
  const [bio, setBio] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  function handleSubmit(e) {
    e.preventDefault();
    console.log(avatar)
    setErrors([]);

    const formData = new FormData()
    formData.append('name', name)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('email', email)
    formData.append('avatar', avatar)
    formData.append('bio', bio)
    formData.append('password_confirmation', passwordConfirmation)
    console.log(formData.get('avatar'))
    fetch("/signup", {
      method: "POST",
    //   headers: {"Content-Type" : "multipart/form-data"},
      body: formData
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
        (console.log(errors))
      }
    });
  }
  return (
    <Box className="signUpScreen">
        <Typography variant="h1" sx={{fontFamily: "Hanken Grotesk, sans-serif"}}>Sign Up</Typography>
        <div className="signUpForm">
      <form onSubmit={handleSubmit}>
      <TextField
            sx={{ m: 1, width: "300px", background: "transparent" }}
            className="signup-input"
            id="margin-normal"
            label="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
      <TextField
            sx={{ m: 1, width: "300px"}}
            className="signup-input"
            id="margin-normal"
            label="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        <TextField
            sx={{ m: 1, width: "300px"}}
            className="signup-input"
            id="margin-normal"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        <TextField
            sx={{ m: 1, width: "300px"}}
            className="signup-input"
            id="margin-normal"
            label="Bio"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            />
        <OutlinedInput
                sx={{ m: 1, width: "300px"}}
            id="outlined-adornment-password-signup"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
            }
            label="Password"
            placeholder="Password"
            />
        <OutlinedInput
                sx={{ m: 1, width: "300px", background: "transparent" }}
            id="outlined-adornment-password-confirm-signup"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
            }
            label="Confirm Password"
            placeholder="Confirm Password"
            />
            <br></br>
            <Typography variant="body1" color={"text.secondary"} sx={{ml: 2.5, mt: 2}}>Profile Picture:</Typography>
            <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])}/>
            <br></br>
            <br></br>
        <Button type="submit" variant="outlined" sx={{ml: "170px", mb: 1, mt: 3, width: "300px"}}>Login</Button>
      </form>
      </div>
    </Box>
  );
}
export default SignUpForm;