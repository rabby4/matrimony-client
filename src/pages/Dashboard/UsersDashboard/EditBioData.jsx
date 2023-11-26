import { Box, Button, Checkbox, Divider, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useAuth from '../../../hooks/useAuth';


const EditBioData = () => {
    const { user } = useAuth()

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
    const userWight = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

    const userHeight = [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219];

    const divisions = ['Dhaka', 'Chittagong', 'Barisal', 'Khulna', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet']

    const occupations = [
        'Software Engineer',
        'Registered Nurse',
        'Marketing Manager',
        'Electrician',
        'Teacher',
        'Graphic Designer',
        'Financial Analyst',
        'Chef',
        'Mechanical Engineer',
        'Sales Representative',
        'Psychologist',
        'Data Scientist',
        'Civil Engineer',
        'Dental Hygienist',
        'Social Media Manager',
        'Pharmacist',
        'Human Resources Specialist',
        'Plumber',
        'Artist',
        'Astronaut',
        'Pilot',
        'Fitness Trainer',
        'Librarian',
        'Veterinarian',
    ];


    return (
        <>
            <Box sx={{}}>
                <Box>
                    <Typography variant='h2'>Edit Bio Data</Typography>
                </Box>
                <Box sx={{ my: '50px', bgcolor: '#fff', p: '50px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant='h3' sx={{ fontSize: '25px', fontFamily: 'Cinzel Decorative', fontWeight: 600, mb: '20px' }}>Basic Info</Typography>
                        <Box>
                            <div className='singleInput'>
                                <label className='inputLabel'>Name</label>
                                <input className='inputDesign' placeholder='Full Name' {...register("name")} />
                            </div>
                        </Box>
                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Email</label>
                                <input className='inputDesign' defaultValue={user?.email} {...register("email")} readOnly />
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Phone</label>
                                <input type='number' placeholder='Phone Number' className='inputDesign' {...register("phone")} />
                            </div>
                        </Box>
                        <Box>
                            <Typography variant='h3' sx={{ fontSize: '25px', fontFamily: 'Cinzel Decorative', fontWeight: 600, my: '20px' }}>Advanced bio</Typography>
                        </Box>

                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Gender</label>
                                <select className='selectField' {...register("gender")}>
                                    <option value="female">Male</option>
                                    <option value="male">Female</option>
                                    <option value="other">other</option>
                                </select>
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Race</label>
                                <select className='selectField' {...register("race")}>
                                    <option value="light Brown">Light Brown</option>
                                    <option value="male">Dark Brown</option>
                                    <option value="other">Dark</option>
                                </select>
                            </div>
                        </Box>

                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Date Of Birth</label>
                                <input type='date' className='inputDesign' {...register("dof")} />
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Age</label>
                                <input type='number' className='inputDesign' placeholder='Your Age' {...register("age")} />
                            </div>
                        </Box>

                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Weight (kg)</label>
                                <select className='selectField' {...register("weight")}>
                                    {userWight.map(num => <option key={num} value={num}>{num}</option>)}
                                </select>
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Height (cm)</label>
                                <select className='selectField' {...register("height")}>
                                    {userHeight.map(num => <option key={num} value={num}>{num}</option>)}
                                </select>
                            </div>
                        </Box>

                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Present Division</label>
                                <select className='selectField' {...register("presentDivision")}>
                                    {divisions.map(division => <option key={division} value={division}>{division}</option>)}
                                </select>
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Permanent Division</label>
                                <select className='selectField' {...register("permanentDivision")}>
                                    {divisions.map(division => <option key={division} value={division}>{division}</option>)}
                                </select>
                            </div>
                        </Box>
                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Fathers Name</label>
                                <input placeholder='Fathers Name' className='inputDesign' {...register("fatherName")} />
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Mothers Name</label>
                                <input placeholder='Mothers Name' className='inputDesign' {...register("motherName")} />
                            </div>
                        </Box>
                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Your Occupation</label>
                                <select className='selectField' {...register("occupation")}>
                                    {occupations.map(job => <option key={job} value={job}>{job}</option>)}
                                </select>
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Expected Partner Age</label>
                                <input type='number' className='inputDesign' placeholder='Expected Partner Age' {...register("partnerAge")} />
                            </div>
                        </Box>
                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Expected Partner Weight (kg)</label>
                                <select className='selectField' {...register("partnerWeight")}>
                                    {userWight.map(num => <option key={num} value={num}>{num}</option>)}
                                </select>
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Expected Partner Height (cm)</label>
                                <select className='selectField' {...register("partnerHeight")}>
                                    {userHeight.map(num => <option key={num} value={num}>{num}</option>)}
                                </select>
                            </div>
                        </Box>



                        {/* <Divider></Divider> */}




                        <Button component="label" variant="contained" sx={{ mt: '20px' }} startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" {...register("file")} />
                        </Button>

                        <Button type="submit" sx={{ width: '100%', background: '#66451c', color: '#fff', px: '30px', mt: '20px', ":hover": { bgcolor: '#c48c46' } }}>Save Bio Data</Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default EditBioData;