import { Box, Button, Container, MenuList, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import useAuth from '../../../hooks/useAuth';
import { MdCelebration, MdOutlineLocationCity, MdPhoneInTalk, MdKeyboardArrowRight } from 'react-icons/md';
import { FaUsers, FaRegEnvelope } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const DetailsBioData = () => {
    const { user } = useAuth()
    const allUsers = useLoaderData()
    const { id } = useParams()
    const singleUser = allUsers.find(user => user._id === id)
    const axiosPublic = useAxiosPublic()
    console.log(singleUser)

    const handleFavorite = () => {
        const favData = { ...singleUser, userEmail: user?.email }
        axiosPublic.post('/favorites', favData)
            .then(res => {
                console.log(res.data)
                if (res.data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Bio data are added to your favorite list",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (
        <>

            <Container>
                <Box sx={{ mt: '150px', textAlign: 'center' }}>
                    <Typography variant='h2'>Details of {singleUser.name}</Typography>
                </Box>
                <Box display={'flex'} sx={{ my: '50px', gap: '100px' }}>
                    <Box width={'35%'}>
                        <Paper sx={{ maxWidth: '100%', textAlign: 'center', p: '20px', overflow: 'hidden', position: 'sticky', top: '120px', borderRadius: '5px', boxShadow: '0px 5px 40px 0px #1111112b' }}>
                            <img src={singleUser.photo} alt="" width={'200px'} height={'200px'} style={{ borderRadius: '100%' }} referrerPolicy="no-referrer" />
                            <Box>
                                <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Name :</span> {singleUser.name}</Typography>
                                <Typography><span style={{ fontWeight: '600' }}>Gender :</span> {singleUser.gender}</Typography>
                                <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Age :</span> {singleUser.age} years</Typography>
                                <Typography><span style={{ fontWeight: '600' }}>Occupation :</span> {singleUser.occupation}</Typography>
                                <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Permanent Division :</span> {singleUser.permanentDivision}</Typography>
                                <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Email :</span> {user?.role === 'premium' ? singleUser.email : ''}</Typography>
                                <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Phone :</span> {user?.role === 'premium' ? singleUser.phone : ''}</Typography>
                            </Box>
                            <Stack direction="column-reverse" spacing={2} sx={{ mt: '20px' }}>
                                <Button onClick={handleFavorite} width='50%' variant="outlined" startIcon={<FavoriteBorderIcon />}>
                                    Favorite
                                </Button>
                                <Button width='50%' variant="contained" endIcon={<SendIcon />} sx={{}}>
                                    Contact Request
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                    <Box width={'50%'}>
                        <Typography variant='h2'>{singleUser.name}</Typography>
                        <Box display={'flex'} gap={2} sx={{ my: '50px' }}>
                            <Box width={'33.33%'} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', p: '20px', borderRadius: '8px' }}>
                                <MdOutlineLocationCity style={{ fontSize: '30px', color: '#111' }}></MdOutlineLocationCity>
                                <Typography color='#66451c' sx={{}}>City</Typography>
                                <Typography color='#66451c' sx={{ fontSize: '18px' }}><strong>{singleUser.permanentDivision}</strong></Typography>
                            </Box>
                            <Box width={'33.33%'} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', p: '20px', borderRadius: '8px' }}>
                                <FaUsers style={{ fontSize: '30px', color: '#111' }}></FaUsers>
                                <Typography color='#66451c' sx={{}}>Gender</Typography>
                                <Typography color='#66451c' sx={{ fontSize: '18px' }}><strong>{singleUser.gender}</strong></Typography>
                            </Box>
                            <Box width={'33.33%'} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', p: '20px', borderRadius: '8px' }}>
                                <MdCelebration style={{ fontSize: '30px', color: '#111' }}></MdCelebration>
                                <Typography color='#66451c' sx={{}}>Date Of Birth
                                </Typography>
                                <Typography color='#66451c' sx={{ fontSize: '18px' }}><strong>{singleUser.dof
                                }</strong></Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography color={'#66451c'} sx={{ fontSize: '30px', fontWeight: 700, fontFamily: "Playfair Display" }}>Contact Information</Typography>
                            {user?.role === 'premium' ? <Box sx={{ my: '20px' }}>
                                <Stack direction={'row'} gap={2} sx={{ alignItems: 'center' }}>
                                    <FaRegEnvelope style={{ fontSize: '20px' }}></FaRegEnvelope>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Email :</span>  {singleUser.email} </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={2} sx={{ alignItems: 'center' }}>
                                    <MdPhoneInTalk style={{ fontSize: '20px' }}></MdPhoneInTalk>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Phone :</span> {singleUser.phone}</Typography>
                                </Stack>
                            </Box> : <Button variant="contained" endIcon={<SendIcon />} sx={{ my: '20px' }}>
                                Contact Request
                            </Button>}

                        </Box>
                        <Box sx={{ mt: '30px' }}>
                            <Typography color={'#66451c'} sx={{ fontSize: '30px', fontWeight: 700, fontFamily: "Playfair Display" }}>Additional Information</Typography>
                            <Box sx={{ mt: '20px' }}>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Height :</span>  {singleUser.height} (cm) </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Weight :</span>  {singleUser.weight} (kg) </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Race :</span>  {singleUser.race} </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Fathers Name :</span>  {singleUser.fatherName} </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Mothers Name :</span>  {singleUser.motherName} </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Permanent Division :</span>  {singleUser.permanentDivision} </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Present Division :</span>  {singleUser.presentDivision} </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Expected Partner Age :</span>  {singleUser.partnerAge} (years) </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Expected Partner Height :</span>  {singleUser.partnerHeight} (cm) </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1} sx={{ alignItems: 'center', }}>
                                    <MdKeyboardArrowRight style={{ fontSize: '25px' }}></MdKeyboardArrowRight>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Expected Partner Weight :</span>  {singleUser.partnerWeight} (kg) </Typography>
                                </Stack>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Container>

























            {/* <Container sx={{ mt: '100px' }}>
                <Box display={'flex'} gap={'50px'}>
                    <Box width={'50%'} sx={{ position: 'sticky', top: '120px', }}>
                        <img src={singleUser.photo} alt="" width={'100%'} />
                    </Box>
                    <Box sx={{ mt: '50px' }} width={'50%'}>
                        <Typography variant='h2'>{singleUser.name}</Typography>
                        <Box display={'flex'} gap={2} sx={{ my: '50px' }}>
                            <Box width={'33.33%'} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', p: '20px', borderRadius: '8px' }}>
                                <MdOutlineLocationCity style={{ fontSize: '30px', color: '#111' }}></MdOutlineLocationCity>
                                <Typography color='#66451c' sx={{}}>City</Typography>
                                <Typography color='#66451c' sx={{ fontSize: '18px' }}><strong>{singleUser.permanentDivision}</strong></Typography>
                            </Box>
                            <Box width={'33.33%'} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', p: '20px', borderRadius: '8px' }}>
                                <FaUsers style={{ fontSize: '30px', color: '#111' }}></FaUsers>
                                <Typography color='#66451c' sx={{}}>Gender</Typography>
                                <Typography color='#66451c' sx={{ fontSize: '18px' }}><strong>{singleUser.gender}</strong></Typography>
                            </Box>
                            <Box width={'33.33%'} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', p: '20px', borderRadius: '8px' }}>
                                <MdCelebration style={{ fontSize: '30px', color: '#111' }}></MdCelebration>
                                <Typography color='#66451c' sx={{}}>Date Of Birth
                                </Typography>
                                <Typography color='#66451c' sx={{ fontSize: '18px' }}><strong>{singleUser.dof
                                }</strong></Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography>Contact Information</Typography>
                        </Box>

                    </Box>
                </Box>
            </Container> */}
        </>
    );
};

export default DetailsBioData;