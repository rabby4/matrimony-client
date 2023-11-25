import { Box, Button, Checkbox, Container, Divider, Input, Stack, TextField, Typography, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Register = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(20%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 100,
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <Container maxWidth='md'>
                <Box display={'flex'} sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
                    <Box height={'665px'} sx={{ bgcolor: '#ffeeb2', width: '40%', p: '45px', backgroundImage: 'url(https://rn53themes.net/themes/matrimo/images/login-bg.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom', borderRadius: '8px 0px 0px 8px' }}>
                        <Typography variant="h5" color="#66451c" sx={{ fontFamily: 'Playfair Display', fontSize: '38px' }}>Now</Typography>
                        <Typography variant="h5" color="#66451c" sx={{ fontFamily: 'Playfair Display', fontSize: '62px', fontWeight: 700, lineHeight: '62px' }}>Find your life partner</Typography>
                        <Typography variant="h5" color="#66451c" sx={{ fontFamily: 'Playfair Display', fontSize: '38px', mt: '15px' }}>Easy and fast.</Typography>
                        <img src="https://rn53themes.net/themes/matrimo/images/login-couple.png" alt="" width={'100%'} />
                    </Box>
                    <Box height={'655px'} sx={{ bgcolor: '#fff', width: '60%', px: '80px', py: '50px', borderRadius: '0px 8px 8px 0px' }}>
                        <Box>
                            <Typography variant="p" color="initial" sx={{ fontFamily: 'poppins' }}>START FOR FREE</Typography>
                            <Typography variant="h3" color="initial" sx={{ fontFamily: 'Playfair Display', fontSize: '30px', fontWeight: 600, my: '10px' }}>Sign in to Matrimony</Typography>
                            <Typography variant="p" color="initial" sx={{ fontFamily: 'poppins', fontSize: '15px', fontWeight: 500, }}>Already a Member? <Link to='/' style={{ textDecoration: 'none', color: '#0b6dd7' }}>Login Now</Link></Typography>

                        </Box>
                        <Divider sx={{ my: '30px' }}></Divider>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="name"
                                label="Name"
                                size="small"
                                {...register("name")}
                                sx={{ width: '100%', }}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                size="small"
                                {...register("email")}
                                sx={{ width: '100%', my: '20px' }}
                            />
                            <TextField
                                id="pass"
                                label="Password"
                                size="small"
                                {...register("password")}
                                sx={{ width: '100%', }}
                            />
                            <Button component="label" variant="contained" sx={{ mt: '20px' }} startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput type="file" {...register("file")} />
                            </Button>

                            <Box display={'flex'} sx={{ alignItems: 'center', my: '20px', }}>
                                <Checkbox size="small" />
                                <Typography variant="p" color="initial" sx={{ fontFamily: 'poppins', fontSize: '15px', fontWeight: 500, }}>Accept Our <Link to='/' style={{ textDecoration: 'none', color: '#0b6dd7' }}>Terms and Conditions</Link></Typography>
                            </Box>

                            <Button type="submit" sx={{ width: '100%', background: '#66451c', color: '#fff', px: '30px', ":hover": { bgcolor: '#c48c46' } }}>Login</Button>
                        </form>
                        <Divider sx={{ my: '30px', fontFamily: 'poppins' }}>OR</Divider>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="p" color="initial" sx={{ fontFamily: 'poppins' }}>Continue With Social Media</Typography>
                            <Box display={'flex'} sx={{ fontSize: '30px', textAlign: 'center', justifyContent: 'center', gap: '20px', mt: '20px' }}>
                                <FcGoogle></FcGoogle>
                                <FaFacebook style={{ color: '#1778f2' }}></FaFacebook>
                                <FaInstagram style={{ color: '#d42649' }}></FaInstagram>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;