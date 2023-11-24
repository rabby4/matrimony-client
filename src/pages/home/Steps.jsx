import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import SectionTitle from '../../shared/SectionTitle';

const steps = [
    {
        label: 'Register',
        image: 'https://rn53themes.net/themes/matrimo/images/icon/rings.png',
        description: `For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Find your Match',
        image: 'https://rn53themes.net/themes/matrimo/images/icon/wedding-2.png',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Send Interest',
        image: 'https://rn53themes.net/themes/matrimo/images/icon/chat.png',

        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Get Profile Information',
        image: 'https://rn53themes.net/themes/matrimo/images/icon/network.png',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Start Meetups',
        image: 'https://rn53themes.net/themes/matrimo/images/icon/love-birds.png',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Getting Marriage',
        image: 'https://rn53themes.net/themes/matrimo/images/icon/wedding-couple.png',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },

];

const Steps = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <SectionTitle subHeading={'MOMENTS'} heading={'How it works'}></SectionTitle>
            <Box sx={{ maxWidth: 700, mx: 'auto', mt: '100px' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>
                                <Typography sx={{ fontSize: '25px', fontFamily: 'Playfair Display', fontWeight: 600, mb: '-5px' }}>{step.label}</Typography>
                            </StepLabel>
                            <StepContent>
                                <Typography variant="caption" color={'#eb0359'} sx={{ fontWeight: 600 }}>TIMING: 7:00 PM</Typography>
                                <Box sx={{ alignItems: 'center', justifyContent: 'space-between', mt: '20px' }}>
                                    <img width={'20%'} src={step.image} alt="" />
                                    <Typography>{step.description}</Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </>
    );
};

export default Steps;