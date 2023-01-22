import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { NavLink } from "react-router-dom";
// import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

export default function Followers({ open, onClose, follow, head }) {
    console.log(follow)
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="scroll-dialog-title" scroll="paper">
            <DialogTitle>{head}</DialogTitle>
            <Divider sx={{mb: 0}}></Divider>
            <DialogContent sx={{ width: 500, p: 0, maxHeight:550}}>
                {follow.length === 0 ? (head === "Followers" ? (<Typography color="text.secondary" sx={{ml: 24, pt: 5, pb: 5}}>No followers yet!</Typography>) : (<Typography color="text.secondary" sx={{ml: 16, pt: 5, pb: 5}}>You are not following anyone yet!</Typography>)) : (
                    <List>
                        {follow.map((user) => {
                            return (
                            <ListItem disablePadding key={user.id}>
                                <ListItemButton component={NavLink} to={`/profile/${user.id}`}>
                                    <Avatar alt={user.username} src={user.avatar_url}></Avatar>
                                    <Box display={"flex"} sx={{flexDirection: "column-reverse", ml: 1}}>
                                        <Typography sx={{ml: 1, fontSize: 10, color: "text.secondary"}}>{user.name}</Typography>
                                        <Typography >@{user.username}</Typography>
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                            )
                        })}
                    </List>
                )}

            </DialogContent>
            <Divider></Divider>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
