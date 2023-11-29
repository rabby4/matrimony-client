import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import useUser from '../../../hooks/useUser';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const ViewBioData = () => {
    const [userInfo] = useUser()
    const axiosPublic = useAxiosPublic()
    console.log(userInfo)

    const handleUpdatePremium = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to be a premium member?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make me premium!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.patch(`/users/${id}`, { premium: false })
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Confirm!",
                        text: "Please, wait for Admin approval!",
                        icon: "success"
                    });
                }
            }
        });




    }

    return (
        <>
            <Box>
                <Box>
                    <Typography variant='h2'>View Your Bio Data</Typography>
                </Box>
                <Box sx={{ mt: '50px', bgcolor: '#fff', p: '100px', borderRadius: '10px' }}>
                    <Box display={'flex'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '25px', fontFamily: 'Playfair Display', fontWeight: 600 }}>Profile</Typography>
                        <Button onClick={() => handleUpdatePremium(userInfo?._id)} sx={{ background: '#66451c', color: '#fff', px: '30px', ml: '40px', ":hover": { bgcolor: '#c48c46' } }}>Make Premium</Button>
                    </Box>
                    <Box>
                        <Box sx={{ my: '30px' }}>
                            <img src={userInfo?.photo} alt="" width={'300px'} style={{ borderRadius: '10px' }} />
                        </Box>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Name : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.name}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Email : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.email}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Number : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.phone}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Gender : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.gender}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Date Of Birth : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.dof}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Age : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.age} Years</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Height : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.height} (cm)</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Weight : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.weight} (kg)</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Race : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.race}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Occupation : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.occupation}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Fathers Name : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.fatherName}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Mothers Name : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.motherName}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Permanent Division : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.permanentDivision}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Present Division : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.presentDivision}</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Expected Partner Age : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.partnerAge} Years</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Expected Partner Height : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.partnerHeight} (cm)</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'space-between', }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>Expected Partner Weight : </Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Poppins' }}>{userInfo?.partnerWeight} (kg)</Typography>
                        </Box>
                        <Divider sx={{ my: '10px' }}></Divider>
                        <Box display={'flex'} sx={{ justifyContent: 'end', mt: '50px' }}>
                            <Button href='/dashboard/edit-bio-data' sx={{ background: '#66451c', px: '40px', color: '#fff', ml: '40px', ":hover": { bgcolor: '#c48c46' } }}>Edit Bio Data</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ViewBioData;