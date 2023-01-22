import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { NavLink } from "react-router-dom";
import PostCard from './PostCard';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function MyProjects({ projects, setUserProjects }) {
    //console.log(projects);

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function handleDeleteState(id) {
        const updateList = projects.filter((p) => p.id !== id)
        setUserProjects(updateList)
    }
    return (
        <>
            <Box component="main" sx={{ flexGrow: 2, mt: 5, ml: 30, height: "100vh", overflow: "scroll", p: 5 }}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography fontFamily={"Hanken Grotesk, sans-serif"} variant='h3' sx={{mb: 2}}>
                    My Posts
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ml:2, height: 35, width: 35, mb: 2}}
                >
                    <EditIcon/>
                </ExpandMore>
                </Box>
                {projects.length === 0 ? (<Typography variant='h6' gutterBottom>
                    No Projects Yet!
                </Typography>) : (
                    <Grid container spacing={-1} direction="row" justify="flex-start" alignItems="flex-start">
                        {projects.map((item) => (
                            <PostCard key={item.id} item={item} expanded={expanded} handleDeleteState={handleDeleteState}/>
                        ))}
                    </Grid>)}

            </Box>
        </>
    )
}