import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const GotMarried = () => {
    const axiosPublic = useAxiosPublic()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const reviewData = {
            selfId: data.selfId,
            partnerId: data.partnerId,
            photo: data.photo,
            review: data.review
        };
        console.log(reviewData)
        // const res = await axiosPublic.put(`/success/}`, userData)
        // console.log(res.data)
        // if (res.data.modifiedCount > 0) {
        //     Swal.fire({
        //         position: "center",
        //         icon: "success",
        //         title: "Your Success Story has been uploaded",
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // }

    }
    return (
        <>
            <Box sx={{ mt: '50px', bgcolor: '#fff', p: '50px' }}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h3' sx={{ fontSize: '25px', fontFamily: 'Cinzel Decorative', fontWeight: 600, mb: '20px' }}>Basic Info</Typography>

                    <Box display={'flex'} sx={{ gap: '20px' }}>
                        <div className='singleInput fiftyWith'>
                            <label className='inputLabel'>Your Bio Data Id</label>
                            <input className='inputDesign' placeholder='Your Bio Data ID' {...register("selfId", { required: true })} />
                            {errors.phone && <Typography color={'#FF0000'}>Phone Number is required*</Typography>}
                        </div>
                        <div className='singleInput fiftyWith'>
                            <label className='inputLabel'>Phone</label>
                            <input placeholder='Your partner Bio ID' className='inputDesign' {...register("partnerId", { required: true })} />
                            {errors.phone && <Typography color={'#FF0000'}>Phone Number is required*</Typography>}
                        </div>
                    </Box>
                    <Box>
                        <div className='singleInput'>
                            <label className='inputLabel'>Your Photo URL</label>
                            <input type='text' className='inputDesign' placeholder='Your Photo URL' {...register("photo")} />
                        </div>
                    </Box>
                    <Box>
                        <div className='singleInput'>
                            <label className='inputLabel'>Your Photo URL</label>
                            <textarea type='text' className='inputDesign' rows={10} placeholder='Write your review here...' {...register("review")} />
                        </div>
                    </Box>

                    <Button type="submit" sx={{ width: '100%', background: '#66451c', color: '#fff', px: '30px', mt: '20px', ":hover": { bgcolor: '#c48c46' } }}>Submit</Button>
                </form>
            </Box>
        </>
    );
};

export default GotMarried;