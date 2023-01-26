import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";

export default function CreateProject({open, onClose, user, userProjects, setUserProjects, allProjects, setAllProjects}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        const newProject = {
            title: title,
            description: description,
            user_id: user.id,
            images: []
        }
        console.log(newProject)
        fetch('/projects', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newProject)
        })
            .then(r => r.json())
            .then((res) => {
                setUserProjects([...userProjects, res])
                setAllProjects([...allProjects, res])
                onClose()
            })
        console.log(userProjects)
    }
    
    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle fontFamily={"Hanken Grotesk, sans-serif"} color={"#1976d2"} sx={{fontSize: 35, pb: 0}}>New Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        value={title}
                        onChange={((e) => setTitle(e.target.value))}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        value={description}
                        onChange={((e) => setDescription(e.target.value))}
                        fullWidth
                        variant="standard"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}