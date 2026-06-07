import { Alert, Avatar, Box, Button, Card, CircularProgress, Rating, Stack, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { GiRingBox } from 'react-icons/gi';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { brand } from '../../../theme/theme';

const fieldGrid = {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: '20px',
    mt: '20px',
}

// form mounts only after we know whether a story already exists,
// so existing answers pre-fill every field
const StoryForm = ({ existingStory, selfBiodataId }) => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            partnerBiodataId: existingStory?.partnerBiodataId || '',
            marriageDate: existingStory?.marriageDate || '',
            coupleImage: existingStory?.coupleImage || '',
            rating: existingStory?.rating || 5,
            story: existingStory?.story || '',
        },
    })

    const imagePreview = watch('coupleImage')

    const onSubmit = async (data) => {
        try {
            const payload = {
                selfBiodataId,
                partnerBiodataId: data.partnerBiodataId,
                marriageDate: data.marriageDate,
                coupleImage: data.coupleImage,
                rating: Number(data.rating) || 5,
                story: data.story,
            }
            const res = await axiosSecure.post('/success-stories', payload)
            if (res.data?.success) {
                Swal.fire({
                    position: 'center', icon: 'success',
                    title: existingStory ? 'Your story has been updated!' : 'Congratulations! 🎉',
                    text: existingStory ? '' : 'Your success story has been shared. Wishing you a lifetime of happiness!',
                    showConfirmButton: false, timer: 2200,
                });
                queryClient.invalidateQueries({ queryKey: ['successStories'] })
            }
        } catch {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not save your story, please try again!' })
        }
    }

    return (
        <Card component='form' onSubmit={handleSubmit(onSubmit)} sx={{ p: { xs: '22px', md: '35px' }, borderRadius: '16px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
            {existingStory && (
                <Alert severity='info' icon={<FavoriteIcon fontSize='small' />} sx={{ mb: '20px', borderRadius: '10px' }}>
                    You already shared your story{existingStory.marriageDate ? ` (married ${existingStory.marriageDate})` : ''} — saving again will update it.
                </Alert>
            )}

            <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '19px', color: brand.primary }}>
                The Happy Couple
            </Typography>
            <Box sx={fieldGrid}>
                <TextField
                    label='Your Biodata ID'
                    fullWidth size='small'
                    value={selfBiodataId || ''}
                    InputProps={{ readOnly: true }}
                    helperText='Filled in automatically'
                />
                <TextField
                    label="Partner's Biodata ID"
                    fullWidth size='small'
                    placeholder='e.g. 65649a5e8b8e9f...'
                    {...register('partnerBiodataId', { required: true })}
                    error={!!errors.partnerBiodataId}
                    helperText={errors.partnerBiodataId ? "Partner's biodata ID is required" : 'Found on your partner\'s profile page'}
                />
                <TextField
                    label='Marriage Date'
                    type='date'
                    fullWidth size='small'
                    InputLabelProps={{ shrink: true }}
                    {...register('marriageDate')}
                />
                <Box>
                    <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: '4px' }}>
                        How was your experience with us?
                    </Typography>
                    <Controller
                        name='rating'
                        control={control}
                        render={({ field }) => (
                            <Rating
                                {...field}
                                value={Number(field.value) || 0}
                                onChange={(e, value) => field.onChange(value)}
                                size='large'
                            />
                        )}
                    />
                </Box>
            </Box>

            {/* couple photo with live preview */}
            <Box sx={{ mt: '20px', display: 'flex', gap: '18px', alignItems: 'center' }}>
                <Avatar
                    src={imagePreview}
                    alt='Couple'
                    variant='rounded'
                    imgProps={{ referrerPolicy: 'no-referrer' }}
                    sx={{ width: 64, height: 64, borderRadius: '12px', bgcolor: brand.cream, color: brand.secondary }}
                >
                    <GiRingBox style={{ fontSize: '28px' }} />
                </Avatar>
                <TextField
                    label='Couple Photo URL'
                    fullWidth size='small'
                    placeholder='https://...'
                    helperText='A photo of you two together — shown with your story'
                    {...register('coupleImage')}
                />
            </Box>

            <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '19px', color: brand.primary, mt: '30px' }}>
                Your Story
            </Typography>
            <TextField
                multiline
                rows={6}
                fullWidth
                placeholder='How did you meet? How did the families connect? Share your journey to inspire others…'
                sx={{ mt: '15px' }}
                {...register('story', { required: true, minLength: 20 })}
                error={!!errors.story}
                helperText={errors.story && 'Please write at least 20 characters'}
            />

            <Stack direction='row' justifyContent='flex-end' sx={{ mt: '30px' }}>
                <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    size='large'
                    disabled={isSubmitting}
                    startIcon={existingStory ? <SaveIcon /> : <FavoriteIcon />}
                    sx={{ px: '45px', py: '11px' }}
                >
                    {isSubmitting ? 'Saving…' : existingStory ? 'Update My Story' : 'Share My Story'}
                </Button>
            </Stack>
        </Card>
    )
}

const GotMarried = () => {
    const { user } = useAuth()
    const [userInfo] = useUser()
    const axiosSecure = useAxiosSecure()

    // all stories are public; we just need to know if this member already has one
    const { data: stories, isLoading } = useQuery({
        queryKey: ['successStories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/success-stories')
            return res.data
        },
    })

    const existingStory = (stories || []).find(story => story.userEmail === user?.email)

    return (
        <Box>
            <Box sx={{ mb: '24px' }}>
                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '26px' }, color: brand.primary }}>
                    Got Married? 💍
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '2px' }}>
                    Congratulations! Share your success story and inspire thousands of members still searching.
                </Typography>
            </Box>

            {isLoading || !userInfo ? (
                <Card sx={{ p: '80px', borderRadius: '16px', textAlign: 'center', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                    <CircularProgress color='secondary' />
                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '15px' }}>Loading…</Typography>
                </Card>
            ) : (
                <StoryForm existingStory={existingStory} selfBiodataId={userInfo?._id} />
            )}
        </Box>
    );
};

export default GotMarried;
