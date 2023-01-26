import React, {useState} from "react";
import Zoom from 'react-medium-image-zoom'
//import 'react-medium-image-zoom/dist/styles.css'
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Masonry from "react-responsive-masonry";
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import UploadImage from "./modals/UploadImage";
import Tooltip from "@mui/material/Tooltip";
//import Modal from '@mui/material/Modal';
import ImageModal from "./modals/ImageModal";
export default function ProjectPage({user, project}) {
    console.log(project)
    console.log(user)
    const [images, setImages] = useState(project.image_urls)
    const [openUpload, setOpenUpload] = useState(false);
    
    function handleUploadClick() {
        setOpenUpload(true);
    }
    function handleUploadClose() {
        setOpenUpload(false);
    }
    const [openImageModal, setOpenImageModal] = useState(false);
    
    function handleImageClick() {
        setOpenImageModal(true);
    }
    function handleImageClose() {
        setOpenImageModal(false);
    }

    console.log(images)
    return (
        <>
        <Box component="main" sx={{ flexGrow: 2, mt: 5, ml: 30, height: "100vh", p: 5, overflow: "auto", zIndex:0 }}>
            <Typography sx={{ mb: 1}} variant='h2' gutterBottom>
                {project.title}
            </Typography>
            <Typography sx={{ ml: 1, mb: 2 }} variant='body2' color="text.secondary" gutterBottom>
                {project.description}
            </Typography>
            <Masonry className="masonry-grid" columnsCount={3} gutter={"15px"}>
                {images.map((image) => (
                    <Zoom key={image}>
                        <img key={image} src={image} alt={image}/>
                    </Zoom>
                ))}
            </Masonry>
            {user.id === project.user_id ? (
                <Tooltip title="Upload">
                    <Avatar onClick={handleUploadClick} sx={{backgroundColor: "#1976d2", position: "fixed", zIndex: 1, top: 100, right: 30, height: 60, width: 60, boxShadow: 10}}>
                        <AddIcon sx={{color: "white"}}/>
                    </Avatar>
                </Tooltip>
                ) : (
                <></>
            )}
        </Box>
        <UploadImage open={openUpload} handleClose={handleUploadClose} project={project} setImages={setImages}/>
        </>
    )
}