import * as React from 'react';
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
import { Button, Container, Link } from '@mui/material';

const drawerWidth = 240;
const navItems = [
    { id: 1, label: 'Home', path: '/' },
    { id: 2, label: "Bio Data's", path: '/biodatas' },
    { id: 3, label: 'About', path: '/about' },
    { id: 4, label: 'Contact', path: '/contact' },
    { id: 5, label: 'Dashboard', path: '/dashboard' },

];


const Navbar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link href={'/'}><img width='200px' src="https://rn53themes.net/themes/matrimo/images/logo-b.png" alt="" /></Link>
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
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
                                {navItems.map((item) => (
                                    <Link key={item.id} sx={{ color: 'primary', fontWeight: 600, textDecoration: 'none', ml: '40px' }} href={item.path}>
                                        {item.label}
                                    </Link>
                                ))}
                                <Button href="/login" sx={{ background: '#66451c', color: '#fff', px: '30px', ml: '40px', ":hover": { bgcolor: '#c48c46' } }}>Login</Button>
                            </Box>
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