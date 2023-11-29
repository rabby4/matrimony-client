import { Box, Button, Stack, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useUser from '../../hooks/useUser';

const CheckOutForm = ({ singleUser }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [userInfo] = useUser()
    const totalPrice = 500;


    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error)
            setError(error.message)
        } else {
            console.log('payment', paymentMethod)
            setError('')
        }
        // payment confirm
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', confirmError)
        } else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log(paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // send payment to the database
                const payment = {
                    name: singleUser?.name,
                    bioDataId: singleUser?._id,
                    phone: singleUser?.phone,
                    email: singleUser.email,
                    price: totalPrice,
                    requesterName: userInfo?.name,
                    requesterEmail: userInfo?.email,
                    requesterBioId: userInfo?._id,
                    status: 'Pending'
                }
                const res = await axiosSecure.post('/payments', payment)
                console.log('payment saved', res.data)
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thanks for your payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }

    }



    return (
        <>
            <Stack flexDirection={'row'} gap={3} sx={{ justifyContent: 'space-between' }}>
                <Box width={'50%'}>
                    <Typography variant="h2">this is payment page</Typography>
                </Box>
                <Box width={'50%'}>
                    <form onSubmit={handleSubmit}>
                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Your interested Bio Data Id</label>
                                <input className='inputDesign' defaultValue={singleUser?._id} readOnly />
                            </div>
                            <div className='singleInput fiftyWith'>
                                <label className='inputLabel'>Your Bio Data Id</label>
                                <input className='inputDesign' defaultValue={userInfo?._id} readOnly />
                            </div>
                        </Box>
                        <Box display={'flex'} sx={{ gap: '20px' }}>
                            <div className='singleInput' style={{ width: '100%' }}>
                                <label className='inputLabel'>Your Email</label>
                                <input className='inputDesign' defaultValue={userInfo?.email} readOnly />
                            </div>
                        </Box>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />

                        <Button disabled={!stripe || !clientSecret} variant="contained" type="submit" sx={{ mt: '15px' }} >
                            Pay & Submit
                        </Button>
                    </form>
                </Box>
            </Stack>
        </>
    );
};

export default CheckOutForm;