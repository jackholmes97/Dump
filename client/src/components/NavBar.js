import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
//import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { NavLink, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { ListItemIcon, Typography } from '@mui/material';
import Followers from "./modals/Followers";
import Button from "@mui/material/Button";
import CreateProject from './modals/CreateProject';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UpdateProfile from './modals/UpdateProfile';


export default function NavBar({ socket,
                                 user, 
                                 setUser, 
                                 followerCache, 
                                 setFollowerCache, 
                                 followingCache, 
                                 setFollowingCache, 
                                 userProjects, 
                                 setUserProjects, 
                                 allProjects, 
                                 setAllProjects }) {
    const [notifications, setNotificatons] = useState([])
    useEffect(() => {
        socket.on("getNotification", data => {
            setNotificatons((prev) => [...prev, data])
        })
    },[socket])

    console.log(notifications);

    const showMyNotifs = notifications.filter((notif) => {
        return notif.receiverName === user.username
    })

    const navigate = useNavigate();

    const drawerWidth = 250;
    // State and handlers for the FOLLOWER modal.
    const [openFollower, setOpenFollower] = useState(false);

    function handleFollowerClick() {
        setOpenFollower(true);
    }
    function handleFollowerClose() {
        setOpenFollower(false);
    }
    // State and handlers for the UPDATE PROFILE modal.
    const [openUpdateProfile, setOpenUpdatProfile] = useState(false);

    function handleUpdateProfileClick() {
        setOpenUpdatProfile(true);
    }
    function handleUpdateProfileClose() {
        setOpenUpdatProfile(false);
    }
    // State and handlers for the FOLLOWING modal.
    const [openFollowing, setOpenFollowing] = useState(false);

    function handleFollowingClick() {
        setOpenFollowing(true)
    }

    function handleFollowingClose() {
        setOpenFollowing(false)
    }
    // State and handlers for the CREATE PROJECT modal.
    const [openNewProject, setOpenNewProject] = useState(false);

    function handleNewProjectClick() {
        setOpenNewProject(true)
    }

    function handleNewProjectClose() {
        setOpenNewProject(false)
    }
    // State and handlers for the AVATAR menu.
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl2, setAnchorEl2] = useState(null);
    const opens = Boolean(anchorEl2);
    const handleeClick = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleeClose = () => {
        setAnchorEl2(null);
    };
    // LOGOUT handler
    function handleLogOut() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
                setFollowerCache([]);
                setFollowingCache([]);
                // setNotificatons([]);
                navigate("/")
            }
        });
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "white" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box display={"flex"} sx={{ color: "rgb(82, 82, 82, 1)", alignItems: "center" }}>
                        <Avatar 
                            alt="logo" 
                            src="https://static.vecteezy.com/system/resources/previews/004/598/738/original/drawing-cloud-doodle-children-s-drawing-of-a-cloud-with-rain-black-and-white-contour-illustration-logo-design-sticker-element-icon-vector.jpg" 
                            sx={{ width: 60, height: 60 }} 
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="Notifications">
                        <IconButton
                                onClick={handleeClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={opens ? 'notif-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={opens ? 'true' : undefined}
                            >
                        <NotificationsNoneIcon fontSize='large' sx={{ color: "#1976d2" }} />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title={user.name}>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar alt={user.name} src={user.avatar_url} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl2}
                        id="notif-menu"
                        open={opens}
                        onClose={handleeClose}
                        onClick={handleeClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 44,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {notifications.length === 0 ? (
                            <MenuItem>
                                <Typography variant='body1' color="rgb(82, 82, 82, 1)">No Notifications</Typography>
                            </MenuItem>
                        ) : (
                            notifications.map((n) => {
                                if(user.username === n.receiverName) {
                                    return (
                                        <MenuItem>
                                            <PersonIcon size="small" sx={{color: "rgb(82, 82, 82, 1)"}}></PersonIcon>
                                            <Typography variant='body1' color="rgb(82, 82, 82, 1)">@{n.senderName} followed you!</Typography>
                                        </MenuItem>)
                                } 
                            })
                        )}
                    </Menu>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 44,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleUpdateProfileClick}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
                <UpdateProfile open={openUpdateProfile} onClose={handleUpdateProfileClose} user={user} setUser={setUser}/>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <span className='dump'>
                <Typography 
                    variant='h3' 
                    gutterBottom 
                    sx={{ fontFamily: "Bungee Shade, san serif" , 
                          textAlign: "center",
                          ml: 0.15, 
                          mt: 2, mb: 1, 
                          color: "#1976d2", 
                          letterSpacing: 13}}
                >
                    DUMP
                </Typography>
                </span>
                <Typography variant='h8' 
                            gutterBottom 
                            sx={{ fontSize: 13, textAlign: "center", mr: 0, color: "rgb(82, 82, 82, 1)"}}
                >
                    Welcome, {user.name}!
                </Typography>
                <Box sx={{ overflow: 'auto', display: "flex", height: "100vh" }}>
                    <List sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", width: drawerWidth}}>
                        <Box>
                        <ListItem disablePadding>
                                <ListItemButton component={NavLink} to={`/profile/${user.id}`}>
                                    <ListItemIcon>
                                        <PersonIcon sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary='My Profile' sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to="/">
                                    <ListItemIcon>
                                        <CameraAltIcon sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary='My Posts' sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to="/browse">
                                    <ListItemIcon>
                                        <TravelExploreIcon sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary='Explore' sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleFollowerClick}>
                                    <ListItemIcon>
                                        <PeopleIcon sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary='Followers' sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleFollowingClick}>
                                    <ListItemIcon>
                                        <PeopleIcon sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                    </ListItemIcon>
                                    <ListItemText primary='Following' sx={{ color: "rgb(82, 82, 82, 1)" }} />
                                </ListItemButton>
                            </ListItem>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <ListItem disablePadding >
                                <Button 
                                    onClick={handleNewProjectClick} 
                                    variant="outlined" 
                                    sx={{ display: "flex", ml: 1.5, mb: 1, width: "225px", backgroundColor: "transparent"}}
                                >
                                    <ListItemText primary='New Project' />
                                </Button>
                            </ListItem>
                        </Box>
                    </List>
                    <Followers open={openFollower} onClose={handleFollowerClose} follow={followerCache} head={"Followers"} />
                    <Followers open={openFollowing} onClose={handleFollowingClose} follow={followingCache} head={"Following"} />
                    <CreateProject 
                        open={openNewProject} 
                        onClose={handleNewProjectClose} 
                        user={user} 
                        userProjects={userProjects} 
                        setUserProjects={setUserProjects}
                        allProjects={allProjects}
                        setAllProjects={setAllProjects}/>
                </Box>
            </Drawer>
        </Box>
    );
}