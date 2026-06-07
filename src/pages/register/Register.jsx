import { useState } from "react";
import { Box, Button, Checkbox, Container, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const { loginWithGoogle, createUser, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const handleGoogle = () => {
        loginWithGoogle()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                }
                // sync the Google account into the database (no-op if it exists)
                axiosPublic.post('/users', userInfo)
                    .finally(() => {
                        navigate('/dashboard', { replace: true })
                    })
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Logged in failed, try again later!",
                });
            })
    }

    const onSubmit = async (data) => {

        if (data.password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password should be at least 6 characters!",
            });
            return;
        }
        else if (!/(?=.*?[A-Z])/.test(data.password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password should be at least one Uppercase!",
            });
            return;
        }
        else if (!/(?=.*?[0-9])/.test(data.password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password should be at least one Number!",
            });
            return;
        }
        else if (!/(?=.*?[#?!@$%^&*-])/.test(data.password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password should be at least one special character!!",
            });
            return;
        }

        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photo,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                // success when newly inserted OR already synced
                                if (res.data.insertedId || res.data.message === 'user already exist') {
                                    reset()
                                    Swal.fire({
                                        title: "Good job!",
                                        text: "Registration successful",
                                        icon: "success",
                                        timer: 1500,
                                        showConfirmButton: false,
                                    });
                                    navigate('/dashboard', { replace: true })
                                }
                            })
                            .catch(() => {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Account created, but profile sync failed. Please try logging in.",
                                });
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                // surface Firebase errors (e.g. email already registered)
                const message = error?.code === 'auth/email-already-in-use'
                    ? 'This email is already registered. Please login instead.'
                    : 'Registration failed, please try again!'
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: message,
                });
            })
    }

    return (
        <>
            <Container maxWidth='md'>
                <Box display={'flex'} sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
                    <Box height={'665px'} sx={{ bgcolor: '#ffeeb2', width: '40%', p: '45px', backgroundImage: 'url(https://rn53themes.net/themes/matrimo/images/login-bg.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom', borderRadius: '8px 0px 0px 8px', display: { xs: 'none', md: 'block' } }}>
                        <Typography variant="h5" color="#66451c" sx={{ fontFamily: 'Playfair Display', fontSize: '38px' }}>Now</Typography>
                        <Typography variant="h5" color="#66451c" sx={{ fontFamily: 'Playfair Display', fontSize: '62px', fontWeight: 700, lineHeight: '62px' }}>Find your life partner</Typography>
                        <Typography variant="h5" color="#66451c" sx={{ fontFamily: 'Playfair Display', fontSize: '38px', mt: '15px' }}>Easy and fast.</Typography>
                        <img src="https://rn53themes.net/themes/matrimo/images/login-couple.png" alt="" width={'100%'} />
                    </Box>
                    <Box height={'655px'} sx={{ bgcolor: '#fff', width: { xs: '100%', md: '60%' }, px: { xs: '30px', md: '80px' }, py: '50px', borderRadius: { xs: '8px', md: '0px 8px 8px 0px' } }}>
                        <Box>
                            <Typography variant="p" color="initial" sx={{ fontFamily: 'poppins' }}>START FOR FREE</Typography>
                            <Typography variant="h3" color="initial" sx={{ fontFamily: 'Playfair Display', fontSize: '30px', fontWeight: 600, my: '10px' }}>Sign up to Matrimony</Typography>
                            <Typography variant="p" color="initial" sx={{ fontFamily: 'poppins', fontSize: '15px', fontWeight: 500, }}>Already a Member? <Link to='/login' style={{ textDecoration: 'none', color: '#0b6dd7' }}>Login Now</Link></Typography>

                        </Box>
                        <Divider sx={{ my: '30px' }}></Divider>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="name"
                                label="Name"
                                size="small"
                                {...register("name", { required: true })}
                                sx={{ width: '100%', }}
                            />
                            {errors.name && <Typography color={'#FF0000'} sx={{ fontSize: '13px', mt: '5px' }}>Name is required*</Typography>}
                            <TextField
                                id="email"
                                label="Email"
                                size="small"
                                type="email"
                                {...register("email", { required: true })}
                                sx={{ width: '100%', mt: '20px' }}
                            />
                            {errors.email && <Typography color={'#FF0000'} sx={{ fontSize: '13px', mt: '5px' }}>Email is required*</Typography>}
                            <TextField
                                id="pass"
                                label="Password"
                                size="small"
                                type={showPassword ? 'text' : 'password'}
                                {...register("password", { required: true })}
                                sx={{ width: '100%', mt: '20px' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword((show) => !show)}
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {errors.password && <Typography color={'#FF0000'} sx={{ fontSize: '13px', mt: '5px' }}>Password is required*</Typography>}
                            <TextField
                                id="photo"
                                label="Photo URL"
                                size="small"
                                {...register("photo",)}
                                sx={{ width: '100%', mt: '20px' }}
                            />

                            <Box display={'flex'} sx={{ alignItems: 'center', my: '20px', }}>
                                <Checkbox size="small" />
                                <Typography variant="p" color="initial" sx={{ fontFamily: 'poppins', fontSize: '15px', fontWeight: 500, }}>Accept Our <Link to='/' style={{ textDecoration: 'none', color: '#0b6dd7' }}>Terms and Conditions</Link></Typography>
                            </Box>

                            <Button type="submit" sx={{ width: '100%', background: '#66451c', color: '#fff', px: '30px', ":hover": { bgcolor: '#c48c46' } }}>Registration Now</Button>
                        </form>
                        <Divider sx={{ my: '30px', fontFamily: 'poppins' }}>OR</Divider>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="p" color="initial" sx={{ fontFamily: 'poppins' }}>Continue With Social Media</Typography>
                            <Box display={'flex'} sx={{ textAlign: 'center', justifyContent: 'center', gap: '5px', mt: '20px' }}>
                                <Button onClick={handleGoogle} sx={{ fontSize: '30px', p: '0px', ":hover": { bgcolor: 'transparent' } }}>
                                    <FcGoogle></FcGoogle>
                                </Button>
                                <Button sx={{ fontSize: '30px', p: '0px', ":hover": { bgcolor: 'transparent' } }}>
                                    <FaFacebook style={{ color: '#1778f2' }}></FaFacebook>
                                </Button>
                                <Button sx={{ fontSize: '30px', p: '0px', ":hover": { bgcolor: 'transparent' } }}>
                                    <FaInstagram style={{ color: '#d42649' }}></FaInstagram>
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;
