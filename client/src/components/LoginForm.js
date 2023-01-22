import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LoginForm({ onLogin, setFollowerCache, setFollowingCache, setActiveUserFollowers, setActiveUserFollowing, setUserProjects }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false)
            if (r.ok) {
                r.json().then((user) => {
                    onLogin(user)
                    setFollowerCache(user.followers);
                    setFollowingCache(user.followees);
                    setActiveUserFollowers(user.followers.length);
                    setActiveUserFollowing(user.followees.length);
                    setUserProjects(user.projects);
                    navigate("/")
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <Box className="logScreen">
            <Typography variant="h1" sx={{fontFamily: "Hanken Grotesk, sans-serif"}}>Login</Typography>
            <Box className="loginForm" sx={{display: "flex", flexDirection: "column", width: 317}}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        sx={{ m: 1, width: "300px", background: "transparent" }}
                        className="login-input"
                        id="margin-normal"
                        label="Username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                    <OutlinedInput
                        label="Password"
                        placeholder="Password"
                        sx={{ m: 1, width: "300px", background: "transparent" }}
                        id="outlined-adornment-password"
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

                    />
                    <br></br>
                    <Button type="submit" variant="outlined" sx={{ml: 1, mb: 3, mt: 2, width: "300px" }}>{isLoading ? "Loading..." : "Login"}</Button>
                </form>
                <div className="Errors">
                    {errors.map((err) => (
                        <Typography key={err} variant="h6" gutterBottom>{err}</Typography>
                    ))}
                </div>
            </Box>
        </Box>
    );
}

export default LoginForm;