import React, {useState} from "react";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
//import AddIcon from '@mui/icons-material/Add'
export default function ProfilePage({userProjects, socket, activeFollowers, activeFollowing, setActiveFollowing, followingCache, setFollowingCache, currentUser, user}) {
    console.log(currentUser)
    console.log(user)

    const isMe = currentUser.id === user.id ? true : false;

    const check = currentUser.followees.filter((f) => {
        return f.id === user.id
    })

    console.log(check)

    const followStatus = check.length > 0 ? true : false

    console.log(followStatus)

    const [following, setFollowing] = useState(user.followees.length)
    const [state, setState] = useState({follower: user.followers.length, isFollowing: followStatus})
    const [me, setMe] = useState(isMe)

    

    function handleFollow(e) {
        e.preventDefault()
        const newFollow = {
            follower_id: currentUser.id,
            followee_id: user.id
        }
        fetch(`/users/${user.id}/follow`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newFollow),
        })
            .then((res) => res.json())
            .then(() => {
                setFollowingCache([...followingCache, user])
                setState((prevState) => ({ ...prevState, follower: prevState.follower + 1, isFollowing: true}))
                setActiveFollowing(activeFollowing + 1)
            })
            socket.emit("sendNotification", {
                senderName: currentUser.username,
                receiverName: user.username,
            })    
        
    }

    function handleUnfollow(e) {
        e.preventDefault()
        fetch(`/users/${user.id}/unfollow`, {
            method: "DELETE",
        })
            .then(() => {
                const filtered = followingCache.filter((c) => {
                    return c.id !== user.id
                })
                setFollowingCache(filtered)
                setState((prevState) => ({ ...prevState, follower: prevState.follower - 1, isFollowing: false}))
                setActiveFollowing(activeFollowing - 1)
                console.log(state)
            })
    }

    return (
        <Box component="main" sx={{ flexGrow: 2, mt: 8, ml: 30, height: "100%", p: 5 }}>
            <Box display={"flex"}>
                <Avatar alt="prof-pic" src={user.avatar_url} sx={{width: 100, height: 100, mr: 1}}/>
                <Box>
                    <Typography variant="h2" sx={{mb: 0}} gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ml: 2}} gutterBottom>
                        @{user.username}
                    </Typography>
                </Box>
            </Box>
            <br></br>
            <Typography variant="body1" fontStyle={"italic"} sx={{ml: 3}} gutterBottom>{user.bio}</Typography>
            <Typography variant="body1" fontWeight={"700"} sx={{mt: 2, ml: 0}} gutterBottom>
                {me ? (`Followers: ${activeFollowers} // Following: ${activeFollowing}`) : (`Followers: ${state.follower} // Following: ${following}`)}
            </Typography>
            {me ? ( 
                <></>
            ) : (
            state.isFollowing ? (
                <Button onClick={handleUnfollow} sx={{fontSize: "16px", display: "flex", alignItems: "center"}}>
                    Unfollow
                </Button>
                ) : (
                <Button onClick={handleFollow} sx={{fontSize: "16px", display: "flex", alignItems: "center"}}>
                    Follow
                </Button>
                ))}
            <Divider sx={{mt: 2, mb: 2}}/>
            <Typography variant='h4' gutterBottom>
                    Posts
                </Typography>
                {user.projects.length === 0 ? (<Typography sx={{ml: 90, mt: 25, overflow: "auto"}} variant='h6' color="text.secondary" gutterBottom>
                    No Posts Yet!
                </Typography>) : (
                    <Grid container spacing={-1} direction="row" justify="flex-start" alignItems="flex-start">
                        {user.projects.map((item) => (
                            <Link key={item.id} underline='none' component={NavLink} to={`/projects/${item.id}`}>
                                <Card sx={{ width: 275, mr: 5, mb: 5 }}>
                                    <CardActionArea>
                                        { item.image_urls.length === 0 ? (
                                            <CardMedia
                                            sx={{backgroundColor: "#1976d2"}}
                                            component="img"
                                            height="190"
                                            image="https://media3.giphy.com/media/fyIhLbPrt8H8e1jU1O/200w.webp?cid=ecf05e476vs73wcitn811d8rb5z0uloyztc3sip9ownrigku&rid=200w.webp&ct=s"
                                            alt={item.title}
                                            /> ) : (
                                        <CardMedia
                                            component="img"
                                            height="190"
                                            image={item.image_urls[0]}
                                            alt={item.title}
                                        />)}
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        ))}
                    </Grid>)}
        </Box>
    )
}