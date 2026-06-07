import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaQuestionCircle } from 'react-icons/fa';
import SectionTitle from '../../shared/SectionTitle';
import { brand } from '../../theme/theme';

const contactInfo = [
    {
        id: 1,
        icon: <FaMapMarkerAlt />,
        title: 'Our Office',
        lines: ['Mirpur, Dhaka', 'Bangladesh'],
    },
    {
        id: 2,
        icon: <FaPhoneAlt />,
        title: 'Call Us',
        lines: ['+880 1700 000 000', 'Sat – Thu, 10am – 7pm'],
    },
    {
        id: 3,
        icon: <FaEnvelope />,
        title: 'Email Us',
        lines: ['support@matrimony.com', 'We reply within 24 hours'],
    },
];

const faqs = [
    {
        question: 'How do I create my biodata?',
        answer: 'Register for a free account, then open your dashboard and go to "Edit Bio Data". Fill in your personal details, family information and partner expectations — your profile becomes visible to other members right away.',
    },
    {
        question: 'How does a contact request work?',
        answer: 'When you find someone you like, send a contact request from their profile with a one-time payment. Our admin team reviews and approves the request, after which the member\'s email address and phone number are shared with you.',
    },
    {
        question: 'What do I get with premium membership?',
        answer: 'Premium members can view contact information directly without sending individual requests, and their own biodata is featured in the "Premium Members" section on the home page for better visibility.',
    },
    {
        question: 'Is my personal information safe?',
        answer: 'Yes. Your email address and phone number are never displayed publicly. They are shared only with premium members or through contact requests that an admin has approved — you always stay in control of who can reach you.',
    },
];

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        // No message API yet — acknowledge and reset for now.
        console.info('contact message', data)
        Swal.fire({
            title: 'Message sent!',
            text: 'Thanks for reaching out — our team will get back to you within 24 hours.',
            icon: 'success',
            timer: 2500,
            showConfirmButton: false,
        })
        reset()
    }

    return (
        <Box sx={{ mt: '90px' }}>
            {/* banner */}
            <Box sx={{ bgcolor: brand.dark, py: { xs: '55px', md: '75px' }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', bgcolor: 'rgba(235,3,89,0.14)', filter: 'blur(110px)', top: '-180px', left: '-120px' }} />
                <Box sx={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', bgcolor: 'rgba(255,180,0,0.12)', filter: 'blur(110px)', bottom: '-180px', right: '-120px' }} />
                <Container sx={{ position: 'relative' }}>
                    <Typography variant='h4' sx={{ color: brand.gold }}>Contact</Typography>
                    <Typography variant='h2' sx={{ color: '#fff', mt: '8px' }}>We&apos;d Love to Hear From You</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: '14px', fontSize: '15px', maxWidth: '540px', mx: 'auto' }}>
                        Questions about your biodata, premium membership or a contact request? Send us a message — a real person will reply.
                    </Typography>
                </Container>
            </Box>

            {/* info cards */}
            <Container sx={{ mt: '-35px', position: 'relative', zIndex: 5 }}>
                <Grid container spacing={3} justifyContent='center'>
                    {contactInfo.map(info => (
                        <Grid item key={info.id} xs={12} sm={6} md={4}>
                            <Card sx={{
                                p: '28px 25px', height: '100%', borderRadius: '16px', textAlign: 'center',
                                boxShadow: '0px 15px 40px 0px rgba(17,17,17,0.1)',
                                transition: 'transform .3s ease',
                                ':hover': { transform: 'translateY(-6px)' },
                            }}>
                                <Box sx={{
                                    width: '58px', height: '58px', mx: 'auto', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    bgcolor: brand.cream, color: brand.secondary, fontSize: '23px',
                                }}>
                                    {info.icon}
                                </Box>
                                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '18px', color: brand.primary, mt: '14px' }}>
                                    {info.title}
                                </Typography>
                                {info.lines.map((line, index) => (
                                    <Typography key={index} variant='body2' color='text.secondary' sx={{ mt: index === 0 ? '8px' : '2px' }}>
                                        {line}
                                    </Typography>
                                ))}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* form + side info */}
            <Container sx={{ py: { xs: '60px', md: '90px' } }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={7}>
                        <Typography variant='h4'>Send a Message</Typography>
                        <Typography variant='h2' sx={{ mt: '8px', fontSize: { xs: '26px', md: '34px' } }}>
                            How can we help?
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: '30px' }}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label='Your Name'
                                        fullWidth
                                        {...register('name', { required: true })}
                                        error={!!errors.name}
                                        helperText={errors.name && 'Name is required'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label='Your Email'
                                        type='email'
                                        fullWidth
                                        {...register('email', { required: true })}
                                        error={!!errors.email}
                                        helperText={errors.email && 'Email is required'}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Subject'
                                        fullWidth
                                        {...register('subject', { required: true })}
                                        error={!!errors.subject}
                                        helperText={errors.subject && 'Subject is required'}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Message'
                                        multiline
                                        rows={5}
                                        fullWidth
                                        {...register('message', { required: true })}
                                        error={!!errors.message}
                                        helperText={errors.message && 'Message is required'}
                                    />
                                </Grid>
                            </Grid>
                            <Button type='submit' variant='contained' color='secondary' size='large' endIcon={<SendIcon />} sx={{ mt: '25px', px: '45px', py: '12px' }}>
                                Send Message
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Card sx={{ p: '30px', borderRadius: '16px', bgcolor: brand.cream, boxShadow: 'none', border: '1px solid #f0e8d5' }}>
                            <Stack direction='row' spacing={1.5} alignItems='center'>
                                <FaClock style={{ color: brand.secondary, fontSize: '18px' }} />
                                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '19px', color: brand.primary }}>
                                    Support Hours
                                </Typography>
                            </Stack>
                            <Typography variant='body2' color='text.secondary' sx={{ mt: '12px', lineHeight: 2 }}>
                                Saturday – Thursday: 10:00 AM – 7:00 PM<br />
                                Friday: Closed
                            </Typography>
                            <Typography variant='body2' color='text.secondary' sx={{ mt: '15px', lineHeight: 1.9 }}>
                                For urgent account issues (login problems, payment not reflecting), email us with
                                your registered email address and we&apos;ll prioritise your request.
                            </Typography>
                        </Card>

                        {/* map */}
                        <Box sx={{ mt: '25px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 10px 35px 0px rgba(17,17,17,0.1)', lineHeight: 0 }}>
                            <Box
                                component='iframe'
                                title='Office location'
                                src='https://maps.google.com/maps?q=Mirpur%2C%20Dhaka&t=&z=12&ie=UTF8&iwloc=&output=embed'
                                sx={{ width: '100%', height: '260px', border: 0 }}
                                loading='lazy'
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* FAQ */}
            <Box sx={{ bgcolor: brand.cream, py: { xs: '60px', md: '80px' } }}>
                <SectionTitle
                    subHeading={'FAQ'}
                    heading={'Common Questions'}
                    description={'Quick answers to the things members ask us most often.'}
                />
                <Container maxWidth='md' sx={{ mt: '40px' }}>
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            disableGutters
                            elevation={0}
                            sx={{
                                mb: '14px', borderRadius: '14px !important', overflow: 'hidden',
                                border: '1px solid #f0e8d5', '&:before': { display: 'none' },
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: brand.secondary }} />} sx={{ px: '25px', py: '6px' }}>
                                <Stack direction='row' spacing={1.5} alignItems='center'>
                                    <FaQuestionCircle style={{ color: brand.primaryLight, fontSize: '16px', flexShrink: 0 }} />
                                    <Typography sx={{ fontWeight: 600, fontSize: '15.5px', color: brand.primary }}>
                                        {faq.question}
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: '25px', pt: 0, pb: '22px' }}>
                                <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.9 }}>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            </Box>
        </Box>
    );
};

export default Contact;
