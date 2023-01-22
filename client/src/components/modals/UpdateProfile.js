import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function UpdateProfile({ user, setUser, open, onClose }) {
    const [newName, setNewName] = useState(user.name);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newBio, setNewBio] = useState(user.bio);
    const [newEmail, setNewEmail] = useState(user.email);
    const [newAvatar, setNewAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', newName)
        formData.append('username', newUsername)
        formData.append('email', newEmail)
        formData.append('bio', newBio)
        if (newAvatar) {
            formData.append('avatar', newAvatar)
        }

        fetch(`/users/${user.id}`, {
            method: "PATCH",
            body: formData,
        })
            .then(r => r.json())
            .then((res) => {
                setUser(res)
                onClose()
            })
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle fontFamily={"Hanken Grotesk, sans-serif"} color={"#1976d2"} sx={{ fontSize: 35, pb: 0 }}>Update Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        value={newName}
                        onChange={((e) => setNewName(e.target.value))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        value={newUsername}
                        onChange={((e) => setNewUsername(e.target.value))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        value={newEmail}
                        onChange={((e) => setNewEmail(e.target.value))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bio"
                        label="Bio"
                        value={newBio}
                        onChange={((e) => setNewBio(e.target.value))}
                        fullWidth
                        variant="standard"
                    />
                    <Typography variant="body1" sx={{fontSize: "12px", mt: 1, color: "text.secondary"}}>
                        New Profile Picture:
                    </Typography>
                    <input type="file" accept="image/*" onChange={(e) => setNewAvatar(e.target.files[0])}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}