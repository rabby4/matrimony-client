import { Box, Button, Container, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MdOutlineWorkspacePremium, MdConnectWithoutContact, MdOutlinePageview, MdEditNote, MdFavoriteBorder } from "react-icons/md";
import { GiRingBox } from "react-icons/gi";
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import useAdmin from '../hooks/useAdmin';


const Dashboard = () => {
    const { user, logout } = useAuth()
    const [isAdmin] = useAdmin()
    const [userInfo] = useUser()

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log('logged out successful')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <Container>
                <Box display={'flex'} sx={{ my: '120px', gap: '100px' }}>
                    <Box>
                        <Paper sx={{ width: 320, maxWidth: '100%', textAlign: 'center', p: '20px', overflow: 'hidden', position: 'sticky', top: '120px', borderRadius: '5px', boxShadow: '0px 5px 40px 0px #1111112b' }}>
                            <img src={userInfo?.photo ? userInfo?.photo : user?.photoURL} alt="" width={'100%'} style={{ borderRadius: '15px' }} referrerPolicy="no-referrer" />
                            <MenuList sx={{ textAlign: 'left' }}>
                                {/* Admin routes start from here */}
                                {
                                    isAdmin ? <Box>
                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/admin-dashboard' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >
                                                <ListItemIcon>
                                                    <MdOutlineDashboard style={{ fontSize: '20px', color: '#111' }}></MdOutlineDashboard>
                                                </ListItemIcon>
                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none', }}>Dashboard</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/manage-users' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >
                                                <ListItemIcon>
                                                    <FaUsersGear style={{ fontSize: '20px', color: '#111' }}></FaUsersGear>
                                                </ListItemIcon>
                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none', }}>Manage Users</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/premium-request' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >

                                                <ListItemIcon>
                                                    <MdOutlineWorkspacePremium style={{ fontSize: '20px', color: '#111' }}></MdOutlineWorkspacePremium>
                                                </ListItemIcon>

                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none' }}>Premium Request</ListItemText>

                                            </NavLink>
                                        </MenuItem>

                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/contact-request' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >

                                                <ListItemIcon>
                                                    <MdConnectWithoutContact style={{ fontSize: '20px', color: '#111' }}></MdConnectWithoutContact>
                                                </ListItemIcon>

                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none' }}>Contact Request</ListItemText>
                                            </NavLink>
                                        </MenuItem>
                                    </Box> : <Box>

                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/user-dashboard' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >
                                                <ListItemIcon>
                                                    <MdOutlineDashboard style={{ fontSize: '20px', color: '#111' }}></MdOutlineDashboard>
                                                </ListItemIcon>
                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none', }}>Dashboard</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/edit-bio-data' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >

                                                <ListItemIcon>
                                                    <MdEditNote style={{ fontSize: '20px', color: '#111' }}></MdEditNote>
                                                </ListItemIcon>

                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none' }}>Edit Bio Data</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/view-bio-data' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >

                                                <ListItemIcon>
                                                    <MdOutlinePageview style={{ fontSize: '20px', color: '#111' }}></MdOutlinePageview>
                                                </ListItemIcon>

                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none' }}>View Bio Data</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/my-contact-request' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >

                                                <ListItemIcon>
                                                    <MdConnectWithoutContact style={{ fontSize: '20px', color: '#111' }}></MdConnectWithoutContact>
                                                </ListItemIcon>

                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none' }}>My Contact Request</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/favorites-bio-data' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >

                                                <ListItemIcon>
                                                    <MdFavoriteBorder style={{ fontSize: '20px', color: '#111' }}></MdFavoriteBorder>
                                                </ListItemIcon>

                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none' }}>My Favorites Bio Data</ListItemText>
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem >
                                            <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "nonActive"} to='/dashboard/got-married' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >

                                                <ListItemIcon>
                                                    <GiRingBox style={{ fontSize: '20px', color: '#111' }}></GiRingBox>
                                                </ListItemIcon>

                                                <ListItemText style={{ fontFamily: 'poppins', fontWeight: 600, textDecoration: 'none' }}>Got Married</ListItemText>
                                            </NavLink>
                                        </MenuItem>

                                    </Box>
                                }

                                <Button onClick={handleLogout} variant="outlined" startIcon={<ExitToAppIcon />} sx={{ bgcolor: '#d32f2f', color: '#fff', border: 'none', ":hover": { border: 'none', bgcolor: '#f44336' }, mt: '20px', fontWeight: 600, fontSize: '14px' }}>
                                    Logout
                                </Button>


                            </MenuList>
                        </Paper>
                    </Box>
                    <Box width={'100%'}>
                        <Navbar></Navbar>
                        <Outlet></Outlet>

                    </Box>
                </Box>
            </Container>
            <Footer></Footer>
        </>
    );
};

export default Dashboard;