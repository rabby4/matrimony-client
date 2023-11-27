import * as React from 'react';
// import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Container, Link, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard, MdVerifiedUser } from 'react-icons/md';
import { FaRegUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import useAdmin from '../hooks/useAdmin';


const drawerWidth = 240;

const settings = ['Profile', 'Account', 'Dashboard'];


const Navbar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user, logout } = useAuth()
    const [isAdmin] = useAdmin()
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navItems = [
        { id: 1, label: 'Home', path: '/' },
        { id: 2, label: "Bio Data's", path: '/biodatas' },
        { id: 3, label: 'About', path: '/about' },
        { id: 4, label: 'Contact', path: '/contact' },
        // user && { id: 5, label: 'Dashboard', path: isAdmin ? '/dashboard/admin-dashboard' : '/dashboard/user-dashboard' }
    ];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const handleLogout = () => {
        logout()
            .then(() => {
                console.log('logged out successful')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link href={'/'}><img width='200px' src="https://rn53themes.net/themes/matrimo/images/logo-b.png" alt="" /></Link>
            </Typography>
            <Divider />
            <List>
                {navItems?.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText>
                                <Link href={item.path} sx={{ textDecoration: 'none' }}>{item.label}</Link>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
                {user && <ListItem>
                    <ListItemButton>
                        <ListItemText>
                            <Link href={isAdmin ? '/dashboard/admin-dashboard' : '/dashboard/user-dashboard'} sx={{ textDecoration: 'none' }}>Dashboard</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" sx={{ bgcolor: '#fff', boxShadow: ' 0px 5px 35px 0px rgba(0,0,0,0.1)', height: '90px', alignItems: 'center', justifyContent: 'center' }}>
                    <Container maxWidth='lg' sx={{}}>
                        <Toolbar disableGutters>
                            <IconButton
                                color="#111"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, flexGrow: { sm: 1 }, display: { md: 'none' }, justifyContent: 'start' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: { md: 1 } }}
                            >
                                <Link href={'/'}><img width='250px' src="https://rn53themes.net/themes/matrimo/images/logo-b.png" alt="" /></Link>
                            </Typography>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                {navItems?.map((item) => (
                                    <Link key={item.id} sx={{ color: 'primary', fontWeight: 600, textDecoration: 'none', ml: '40px' }} href={item.path}>
                                        {item.label}
                                    </Link>
                                ))}
                                {
                                    user && <Link sx={{ color: 'primary', fontWeight: 600, textDecoration: 'none', ml: '40px' }} href={isAdmin ? '/dashboard/admin-dashboard' : '/dashboard/user-dashboard'}>
                                        Dashboard
                                    </Link>
                                }
                            </Box>
                            {
                                user ? <Box sx={{ ml: '30px' }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src={user?.photoURL} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px', }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {/* {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{ px: '40px' }}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))} */}
                                        {/* <MenuItem sx={{ px: '40px' }}>
                                            <Typography textAlign="center" ><Link href='/'>Home</Link></Typography>
                                        </MenuItem> */}

                                        <MenuItem sx={{ px: '40px' }}>
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/admin-dashboard' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >
                                                <ListItemIcon>
                                                    <FaRegUser style={{ fontSize: '20px', color: '#111' }}></FaRegUser>
                                                </ListItemIcon>
                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none', }}>{user?.displayName}</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                        <MenuItem sx={{ px: '40px' }}>
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/admin-dashboard' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >
                                                <ListItemIcon>
                                                    <MdOutlineDashboard style={{ fontSize: '20px', color: '#111' }}></MdOutlineDashboard>
                                                </ListItemIcon>
                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none', }}>Dashboard</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                        <Button onClick={handleLogout} display={'flex'} sx={{ px: '40px', fontWeight: 600, ":hover": { bgcolor: 'transparent' }, gap: '15px' }}><IoExitOutline style={{ fontSize: '20px', color: '#111' }}></IoExitOutline> Logout</Button>

                                    </Menu>
                                </Box>
                                    :

                                    <Button href="/login" sx={{ background: '#66451c', color: '#fff', px: '30px', ml: '40px', ":hover": { bgcolor: '#c48c46' } }}>Login</Button>
                            }
                        </Toolbar>
                    </Container>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>

            </Box >
        </>
    );
};

export default Navbar;