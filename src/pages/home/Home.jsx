import { Box, Container } from '@mui/material';
import Slider from './Slider';
import SearchMatch from './SearchMatch';
import ChooseUs from './ChooseUs';
import Steps from './Steps';
import SuccessCounter from './SuccessCounter';
import Premium from './Premium';
import SuccessStory from './SuccessStory';
import CTA from './CTA';

const Home = () => {
    return (
        <Box sx={{ mt: '90px' }}>
            {/* hero with overlapping search card */}
            <Slider />
            <SearchMatch />

            {/* live stats + premium members */}
            <Container>
                <Box sx={{ mt: '60px' }}>
                    <SuccessCounter />
                </Box>
                <Premium />
            </Container>

            {/* why choose us (dark band) */}
            <ChooseUs />

            {/* how it works */}
            <Container>
                <Steps />
            </Container>

            {/* testimonials */}
            <SuccessStory />

            {/* call to action */}
            <CTA />
        </Box>
    );
};

export default Home;
