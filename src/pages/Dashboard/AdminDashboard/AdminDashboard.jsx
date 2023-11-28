import React from 'react';
import useUser from '../../../hooks/useUser';
import { Box, Typography } from '@mui/material';
import { FaUsers, FaFemale, FaDollarSign } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { FaUserTie } from "react-icons/fa6";



const AdminDashboard = () => {
    const [, allUser] = useUser()
    const maleBio = allUser?.filter(bio => bio.gender === 'Male')
    const femaleBio = allUser?.filter(bio => bio.gender === 'Female')

    return (
        <>
            <Box>
                <Box display={'flex'} flexWrap={'wrap'} gap={2} sx={{ my: '50px', justifyContent: 'center' }}>
                    <Box width={'31%'} display={'flex'} gap={2} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', px: '10px', py: '20px', borderRadius: '8px', alignItems: 'center', background: '#fff', boxShadow: '0px 5px 40px 0px #1111111a' }}>
                        <FaUsers style={{ fontSize: '40px', color: '#111' }}></FaUsers>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography color='#66451c' variant='h2' sx={{ fontSize: '30px', fontWeight: 600, fontFamily: 'Playfair Display' }}><strong>{allUser?.length}</strong></Typography>
                            <Typography color='#66451c' variant='' sx={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Playfair Display' }}>Total Bio Data</Typography>
                        </Box>
                    </Box>
                    <Box width={'31%'} display={'flex'} gap={2} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', px: '10px', py: '20px', borderRadius: '8px', alignItems: 'center', background: '#fff', boxShadow: '0px 5px 40px 0px #1111111a' }}>
                        <FaUserTie style={{ fontSize: '40px', color: '#111' }}></FaUserTie>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography color='#66451c' variant='h2' sx={{ fontSize: '30px', fontWeight: 600, fontFamily: 'Playfair Display' }}><strong>{maleBio?.length}</strong></Typography>
                            <Typography color='#66451c' variant='' sx={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Playfair Display' }}>Male Bio Data</Typography>
                        </Box>
                    </Box>
                    <Box width={'31%'} display={'flex'} gap={2} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', px: '10px', py: '20px', borderRadius: '8px', alignItems: 'center', background: '#fff', boxShadow: '0px 5px 40px 0px #1111111a' }}>
                        <FaFemale style={{ fontSize: '40px', color: '#111' }}></FaFemale>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography color='#66451c' variant='h2' sx={{ fontSize: '30px', fontWeight: 600, fontFamily: 'Playfair Display' }}><strong>{femaleBio?.length}</strong></Typography>
                            <Typography color='#66451c' variant='' sx={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Playfair Display' }}>Male Bio Data</Typography>
                        </Box>
                    </Box>
                    <Box width={'35%'} display={'flex'} gap={2} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', px: '10px', py: '20px', borderRadius: '8px', alignItems: 'center', background: '#fff', boxShadow: '0px 5px 40px 0px #1111111a' }}>
                        <MdOutlineWorkspacePremium style={{ fontSize: '40px', color: '#111' }}></MdOutlineWorkspacePremium>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography color='#66451c' variant='h2' sx={{ fontSize: '30px', fontWeight: 600, fontFamily: 'Playfair Display' }}><strong>0</strong></Typography>
                            <Typography color='#66451c' variant='' sx={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Playfair Display' }}>Premium Member</Typography>
                        </Box>
                    </Box>
                    <Box width={'35%'} display={'flex'} gap={2} sx={{ textAlign: 'center', fontFamily: 'Poppins', border: '1px solid #d3d3d3', px: '10px', py: '20px', borderRadius: '8px', alignItems: 'center', background: '#fff', boxShadow: '0px 5px 40px 0px #1111111a' }}>
                        <FaDollarSign style={{ fontSize: '40px', color: '#111' }}></FaDollarSign>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography color='#66451c' variant='h2' sx={{ fontSize: '30px', fontWeight: 600, fontFamily: 'Playfair Display' }}><strong>0</strong></Typography>
                            <Typography color='#66451c' variant='' sx={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Playfair Display' }}>Total Revenue</Typography>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </>
    );
};

export default AdminDashboard;