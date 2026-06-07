import * as React from 'react';
// import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import { MdOutlineDashboard, MdOutlineContactPhone } from 'react-icons/md';
import { FaRegUser, FaUserEdit, FaRegHeart, FaCrown, FaUsersCog } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import useAdmin from '../hooks/useAdmin';
import useUser from '../hooks/useUser';
import Logo from './Logo';


const drawerWidth = 240;


const Navbar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user, logout } = useAuth()
    const [isAdmin] = useAdmin()
    const [userInfo] = useUser()
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // avatar: the photo the user set themselves (biodata/registration) wins,
    // otherwise fall back to the social-login photo, then to their initial
    const avatarSrc = userInfo?.photo || user?.photoURL || undefined

    // account menu — every entry maps to a real dashboard route
    const accountMenuItems = [
        { label: 'Dashboard', icon: <MdOutlineDashboard />, path: isAdmin ? '/dashboard/admin-dashboard' : '/dashboard/user-dashboard' },
        ...(isAdmin ? [
            { label: 'Manage Users', icon: <FaUsersCog />, path: '/dashboard/manage-users' },
            { label: 'Premium Requests', icon: <FaCrown />, path: '/dashboard/premium-request' },
            { label: 'Contact Requests', icon: <MdOutlineContactPhone />, path: '/dashboard/contact-request' },
        ] : [
            { label: 'View Bio Data', icon: <FaRegUser />, path: '/dashboard/view-bio-data' },
            { label: 'Edit Bio Data', icon: <FaUserEdit />, path: '/dashboard/edit-bio-data' },
            { label: 'My Favourites', icon: <FaRegHeart />, path: '/dashboard/favorites-bio-data' },
            { label: 'My Contact Requests', icon: <MdOutlineContactPhone />, path: '/dashboard/my-contact-request' },
        ]),
    ]

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
                <Logo />
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
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <>
            <Box sx={{ display: 'flex' }}>
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
                                <Logo />
                            </Typography>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                {navItems?.map((item) => (
                                    <Link key={item.id} sx={{ color: 'primary', fontWeight: 600, textDecoration: 'none', ml: '40px' }} href={item.path}>
                                        {item.label}
                                    </Link>
                                ))}
                            </Box>
                            {
                                user ? <Box sx={{ ml: '30px' }}>
                                    <Tooltip title={user?.displayName || 'Account'}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar
                                                alt={user?.displayName || 'User'}
                                                src={avatarSrc}
                                                imgProps={{ referrerPolicy: 'no-referrer' }}
                                                sx={{ bgcolor: '#eb0359', fontFamily: 'Poppins', fontWeight: 600 }}
                                            >
                                                {user?.displayName?.charAt(0)?.toUpperCase()}
                                            </Avatar>
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
                                        {/* account header */}
                                        <Box sx={{ px: '20px', py: '10px', display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px' }}>
                                            <Avatar
                                                src={avatarSrc}
                                                alt={user?.displayName || 'User'}
                                                imgProps={{ referrerPolicy: 'no-referrer' }}
                                                sx={{ bgcolor: '#eb0359', width: 42, height: 42, fontFamily: 'Poppins', fontWeight: 600 }}
                                            >
                                                {user?.displayName?.charAt(0)?.toUpperCase()}
                                            </Avatar>
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography noWrap sx={{ fontWeight: 600, fontSize: '14px', fontFamily: 'Poppins' }}>
                                                    {user?.displayName || 'Member'}
                                                    {isAdmin && <Typography component='span' sx={{ ml: '6px', fontSize: '10px', fontWeight: 700, color: '#ffb400', letterSpacing: '0.5px' }}>ADMIN</Typography>}
                                                </Typography>
                                                <Typography noWrap sx={{ fontSize: '12px', color: 'text.secondary' }}>
                                                    {user?.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Divider sx={{ my: '5px' }} />

                                        {accountMenuItems.map((item) => (
                                            <MenuItem
                                                key={item.label}
                                                component={NavLink}
                                                to={item.path}
                                                onClick={handleCloseUserMenu}
                                                sx={{ px: '20px', py: '10px', color: '#333' }}
                                            >
                                                <ListItemIcon sx={{ fontSize: '18px', color: '#66451c' }}>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primaryTypographyProps={{ fontSize: '14px', fontFamily: 'Poppins', fontWeight: 500 }}>
                                                    {item.label}
                                                </ListItemText>
                                            </MenuItem>
                                        ))}

                                        <Divider sx={{ my: '5px' }} />
                                        <MenuItem
                                            onClick={() => { handleCloseUserMenu(); handleLogout(); }}
                                            sx={{ px: '20px', py: '10px', color: '#d32f2f' }}
                                        >
                                            <ListItemIcon sx={{ fontSize: '18px', color: '#d32f2f' }}>
                                                <IoExitOutline />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ fontSize: '14px', fontFamily: 'Poppins', fontWeight: 500 }}>
                                                Logout
                                            </ListItemText>
                                        </MenuItem>

                                    </Menu>
                                </Box>
                                    :

                                    <Button href="/login" variant="contained" color="secondary" sx={{ px: '30px', ml: '40px' }}>Login</Button>
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