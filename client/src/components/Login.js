import { useState } from 'react';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';


function Login({onLogin, setFollowerCache, setFollowingCache, setActiveUserFollowers, setActiveUserFollowing, setUserProjects }) {
    const [showLogin, setShowLogin] = useState(true);
  
    return (

        <Grid container >
            <Grid item xs sx={{backgroundImage: "url('https://gifimage.net/wp-content/uploads/2018/04/rain-gif-transparent-13.gif')", height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className='background'>
                    <Typography variant='h1' gutterBottom sx={{fontFamily: "Bungee Shade, sans-serif", fontSize: 200, ml: "10px", mt: 30, mb: 5, color: "#1976d2", textAlign:"center"}}>Dump</Typography>
                    <Typography variant='h4' gutterBottom sx={{fontFamily: "Hanken Grotesk, sans-serif", textAlign: "center", position:"relative"}}>Cultivating the art of the Photo Dump</Typography>
                </div>
            </Grid>
            <Divider orientation='vertical' sx={{ height: "100vh" }} flexItem/>
            
            {showLogin ? (
            <Grid item xs sx={{boxShadow: 15, zIndex: 1}}>
            <Box sx={{ml: "205px", mt: "30%", zIndex: 1}}>
                <LoginForm 
                    onLogin={onLogin}
                    setFollowerCache={setFollowerCache}
                    setFollowingCache={setFollowingCache}
                    setActiveUserFollowers={setActiveUserFollowers}
                    setActiveUserFollowing={setActiveUserFollowing}
                    setUserProjects={setUserProjects} />
                <br/>
                <Typography variant='body1' color="text.secondary" sx={{ml: "40px"}}>
                Don't have an account?
                <button id='signUpBtn' onClick={() => setShowLogin(false)}>
                    Sign Up!
                </button>
                </Typography>
            </Box>
            </Grid>
            ) : (
            <Grid item xs sx={{boxShadow: 15}}>
            <Box sx={{ml: "45px", mt: "20%"}}>
                <SignUpForm onLogin={onLogin} />
                <br></br>
                <Typography variant='body1' color="text.secondary" sx={{ml: "195px"}}>
                Already have an account?
                <button id="loginBtn" onClick={() => setShowLogin(true)}>
                    Log In!
                </button>
                </Typography>
                <br></br>
            </Box>
            </Grid>
            )}
        </Grid>
    );

}

export default Login;
