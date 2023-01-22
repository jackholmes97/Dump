import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { CardActionArea, Divider } from '@mui/material';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

export default function PostCard({item, handleDeleteState, expanded}) {
    function handleDelete(e) {
        e.preventDefault();   
        fetch(`/projects/${item.id}`, {
            method: "DELETE"
        })
            .then(handleDeleteState(item.id))
    }

    return (
        <Card sx={{ width: 275, mr: 5, mb: 5 }}>
            <CardActionArea>
                <Link key={item.id} underline='none' component={NavLink} to={`/projects/${item.id}`}>
                    {item.image_urls.length === 0 ? (
                        <CardMedia
                            sx={{ backgroundColor: "#1976d2" }}
                            component="img"
                            height="190"
                            image="https://media3.giphy.com/media/fyIhLbPrt8H8e1jU1O/200w.webp?cid=ecf05e476vs73wcitn811d8rb5z0uloyztc3sip9ownrigku&rid=200w.webp&ct=s"
                            alt={item.title}
                        />) : (
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
                </Link>
            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardActionArea>
                    <Divider />
                    <Button size='small' onClick={handleDelete} sx={{ width: 275, color: "red", letterSpacing: 4 }}>
                       <DeleteIcon sx={{height: 20, mb: .25, mr: .20}}/> Delete
                    </Button>
                </CardActionArea>
            </Collapse>
        </Card>
    );
}