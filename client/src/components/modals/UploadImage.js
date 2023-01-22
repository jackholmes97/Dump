import React, {useState} from "react";
import {useDropzone} from "react-dropzone";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function UploadImage({open, handleClose, project, setImages}) {
   // const [projectImages, setProjectImages] = useState(project.image_urls)
    const [files, setFiles] = useState(null);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles);
        }})
    const handleSubmit = async () => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });
        const res = await fetch(`/projects/${project.id}`, {
            method: "PATCH",
            body: formData
        })
            .then(res => res.json())
            .then((data) => {
                setImages(data.image_urls)
                handleClose();
            })
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{fontFamily: "Hanken Grotesk, sans-serif", fontSize: "30px", color: "#1976d2"}}>Upload Image</DialogTitle>
            <DialogContent sx={{borderWidth: 2, borderStyle: "dashed", backgroundColor: "#fafafa", borderColor: "#eeeeee", padding: "20px", ml: 2, mr: 2, color: "grey"}}>
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    {
                    isDragActive ?
                        <p>Drop the file here ...</p> :
                        <p>Drag your image here, or click to select image file</p>
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}