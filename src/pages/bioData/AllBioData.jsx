import React, { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import { Box, Button, Container, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { MdConnectWithoutContact, MdEditNote, MdFavoriteBorder, MdOutlineDashboard, MdOutlinePageview, MdOutlineWorkspacePremium } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { FaUsersGear } from 'react-icons/fa6';

const AllBioData = () => {
    const [, allUser] = useUser()
    const [maleData, setMaleData] = useState(false)
    const [femaleData, setFemaleData] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const users = allUser?.filter(user => user.role !== 'admin')
    console.log(users)

    useEffect(() => {
        const filtered = users.filter(item => {
            if (maleData && item.gender === 'male') return true;
            if (femaleData && item.gender === 'female') return true;
            return false
        })
        setFilteredData(filtered)
    }, [maleData, femaleData, users])


    return (
        <>
            <Container>
                <Box display={'flex'} sx={{ my: '120px', gap: '70px' }}>
                    <Box width={'30%'}>
                        <Paper sx={{ maxWidth: '100%', textAlign: 'center', p: '20px', overflow: 'hidden', position: 'sticky', top: '120px', borderRadius: '5px', boxShadow: '0px 5px 40px 0px #1111112b' }}>
                            <img alt="" width={'100%'} style={{ borderRadius: '15px' }} referrerPolicy="no-referrer" />
                            <MenuList sx={{ textAlign: 'left' }}>
                                {/* Admin routes start from here */}
                                {
                                    users ? <Box>
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

                                    </Box>
                                }





                            </MenuList>
                        </Paper>
                    </Box>
                    <Grid container justifyContent='space-between' spacing={3} width={'70%'}>
                        {
                            users?.map(user => <Grid item key={user._id} xs={12} sm={12} md={6}>
                                <Paper sx={{ maxWidth: '100%', p: '20px', overflow: 'hidden', position: 'sticky', top: '120px', borderRadius: '10px', boxShadow: '0px 5px 40px 0px #1111112b' }}>
                                    <img src={user?.photo} alt="" width={'100%'} height={'250px'} style={{ borderRadius: '5px' }} referrerPolicy="no-referrer" />
                                    <Box>
                                        <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Name :</span> {user.name}</Typography>
                                        <Typography><span style={{ fontWeight: '600' }}>Gender :</span> {user.gender}</Typography>
                                        <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Age :</span> {user.age} years</Typography>
                                        <Typography><span style={{ fontWeight: '600' }}>Occupation :</span> {user.occupation}</Typography>
                                        <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Permanent Division :</span> {user.permanentDivision}</Typography>
                                    </Box>
                                    <Box display={'flex'} justifyContent={'end'} sx={{ mt: '20px' }}>
                                        <Button href="/" sx={{ background: '#66451c', color: '#fff', px: '30px', ":hover": { bgcolor: '#c48c46' } }}>View Profile</Button>
                                    </Box>
                                </Paper>
                            </Grid>)
                        }
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default AllBioData;