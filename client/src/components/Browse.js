import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search"
export default function Browse({ currentUser, users }) {
    const [search, setSearch] = useState('');

    const otherUsers = users.filter((o) => {
        return o.id !== currentUser.id
    })

    console.log(otherUsers)

    const filteredUsers = otherUsers.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase())
    })
    console.log(filteredUsers)
    return (
        <Box component="main" sx={{ flexGrow: 2, mt: 5, ml: 30, height: "100%", p: 5 }}>
            <Typography fontFamily={"hanken Grotesk, san-serif"} variant="h3" gutterBottom>Explore</Typography>
            <TextField id="outlined-basic" sx={{ mb: 1, r: 30, height: 70, width: "100%" }} label={<SearchIcon />} variant="outlined" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Grid container spacing={6} columns={16} sx={{ml: 1, overflow: "scroll" }}>
                {filteredUsers.map((user) => {
                    return (
                        <Grid item key={user.id} md={3} sx={{ width: 400, display: "flex", flexDirection: "row", paddingLeft: 0, paddingTop: 0 }}>
                            <Link  underline="none" sx={{ display: "flex" }} component={NavLink} to={`/profile/${user.id}`}>
                                <Avatar key={user.id} alt="user_av" src={user.avatar_url} sx={{ mr: 1, height: 50, width: 50 }} />
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant="h5" sx={{ mb: 0 }} gutterBottom>
                                        {user.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        @{user.username}
                                    </Typography>
                                </Box>
                            </Link>
                        </Grid>

                    )
                })}
            </Grid>
        </Box>
    )
}