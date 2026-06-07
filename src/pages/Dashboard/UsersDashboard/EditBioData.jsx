import { Avatar, Box, Button, Card, CircularProgress, Divider, Stack, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useUser from '../../../hooks/useUser';
import { brand } from '../../../theme/theme';

const divisions = ['Dhaka', 'Chittagong', 'Barisal', 'Khulna', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet'];
const races = ['Light Brown', 'Dark Brown', 'Dark'];
const weights = Array.from({ length: 61 }, (_, i) => 40 + i);   // 40–100 kg
const heights = Array.from({ length: 100 }, (_, i) => 120 + i); // 120–219 cm
const occupations = [
    'Software Engineer', 'Registered Nurse', 'Marketing Manager', 'Electrician', 'Teacher',
    'Graphic Designer', 'Financial Analyst', 'Chef', 'Mechanical Engineer', 'Sales Representative',
    'Psychologist', 'Data Scientist', 'Civil Engineer', 'Dental Hygienist', 'Social Media Manager',
    'Pharmacist', 'Human Resources Specialist', 'Plumber', 'Artist', 'Pilot',
    'Fitness Trainer', 'Librarian', 'Veterinarian', 'Student', 'Business Owner',
];

const SectionHeading = ({ children }) => (
    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '19px', color: brand.primary, mb: '4px' }}>
        {children}
    </Typography>
)

const fieldGrid = {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: '20px',
    mt: '18px',
}

// the actual form — mounted only after userInfo is loaded so the
// existing biodata pre-fills every field
const BioForm = ({ userInfo, userEmail }) => {
    const axiosPublic = useAxiosPublic()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: userInfo?.name || '',
            phone: userInfo?.phone || '',
            photo: userInfo?.photo || '',
            gender: userInfo?.gender || '',
            race: userInfo?.race || '',
            dof: userInfo?.dof || '',
            age: userInfo?.age || '',
            weight: userInfo?.weight || '',
            height: userInfo?.height || '',
            presentDivision: userInfo?.presentDivision || '',
            permanentDivision: userInfo?.permanentDivision || '',
            fatherName: userInfo?.fatherName || '',
            motherName: userInfo?.motherName || '',
            occupation: userInfo?.occupation || '',
            partnerAge: userInfo?.partnerAge || '',
            partnerHeight: userInfo?.partnerHeight || '',
            partnerWeight: userInfo?.partnerWeight || '',
        },
    })

    const photoPreview = watch('photo')

    const onSubmit = async (data) => {
        const userData = {
            ...data,
            email: userEmail, // login email is fixed
        }
        try {
            const res = await axiosPublic.put(`/users/${userInfo?._id}`, userData)
            if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
                Swal.fire({
                    position: 'center', icon: 'success',
                    title: 'Your biodata has been saved!',
                    showConfirmButton: false, timer: 1600,
                });
                // refresh the cached profile so the dashboard meter updates
                queryClient.invalidateQueries({ queryKey: ['user'] })
                queryClient.invalidateQueries({ queryKey: ['users'] })
            } else {
                Swal.fire({
                    position: 'center', icon: 'info',
                    title: 'No changes to save',
                    text: 'Your biodata is already up to date.',
                    showConfirmButton: false, timer: 1600,
                });
            }
        } catch {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not save your biodata, please try again!' })
        }
    }

    // common props for native-select fields
    const selectProps = { select: true, SelectProps: { native: true }, InputLabelProps: { shrink: true }, fullWidth: true, size: 'small' }

    return (
        <Card component='form' onSubmit={handleSubmit(onSubmit)} sx={{ p: { xs: '22px', md: '35px' }, borderRadius: '16px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
            {/* basic info */}
            <SectionHeading>Basic Information</SectionHeading>
            <Typography sx={{ color: 'text.secondary', fontSize: '12.5px' }}>Who you are</Typography>
            <Box sx={fieldGrid}>
                <Box>
                    <TextField
                        label='Full Name'
                        fullWidth size='small'
                        {...register('name', { required: true })}
                        error={!!errors.name}
                        helperText={errors.name && 'Name is required'}
                    />
                </Box>
                <TextField
                    label='Email'
                    fullWidth size='small'
                    value={userEmail}
                    InputProps={{ readOnly: true }}
                    helperText='Login email — cannot be changed'
                />
                <TextField
                    label='Phone'
                    type='tel'
                    fullWidth size='small'
                    {...register('phone', { required: true })}
                    error={!!errors.phone}
                    helperText={errors.phone && 'Phone number is required'}
                />
                <TextField {...selectProps} label='Gender' {...register('gender', { required: true })} error={!!errors.gender} helperText={errors.gender && 'Gender is required'}>
                    <option value=''>Select gender…</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </TextField>
                <TextField
                    label='Date of Birth'
                    type='date'
                    fullWidth size='small'
                    InputLabelProps={{ shrink: true }}
                    {...register('dof')}
                />
                <TextField
                    label='Age'
                    type='number'
                    fullWidth size='small'
                    {...register('age', { required: true, min: 18 })}
                    error={!!errors.age}
                    helperText={errors.age && 'Age is required (18+)'}
                />
            </Box>

            <Divider sx={{ my: '30px' }} />

            {/* appearance & background */}
            <SectionHeading>Appearance & Background</SectionHeading>
            <Typography sx={{ color: 'text.secondary', fontSize: '12.5px' }}>Details shown on your public biodata</Typography>
            <Box sx={fieldGrid}>
                <TextField {...selectProps} label='Height (cm)' {...register('height')}>
                    <option value=''>Select height…</option>
                    {heights.map(value => <option key={value} value={value}>{value} cm</option>)}
                </TextField>
                <TextField {...selectProps} label='Weight (kg)' {...register('weight')}>
                    <option value=''>Select weight…</option>
                    {weights.map(value => <option key={value} value={value}>{value} kg</option>)}
                </TextField>
                <TextField {...selectProps} label='Complexion' {...register('race')}>
                    <option value=''>Select…</option>
                    {races.map(value => <option key={value} value={value}>{value}</option>)}
                </TextField>
                <TextField {...selectProps} label='Occupation' {...register('occupation')}>
                    <option value=''>Select occupation…</option>
                    {occupations.map(value => <option key={value} value={value}>{value}</option>)}
                </TextField>
                <TextField label="Father's Name" fullWidth size='small' {...register('fatherName')} />
                <TextField label="Mother's Name" fullWidth size='small' {...register('motherName')} />
                <TextField {...selectProps} label='Present Division' {...register('presentDivision')}>
                    <option value=''>Select division…</option>
                    {divisions.map(value => <option key={value} value={value}>{value}</option>)}
                </TextField>
                <TextField {...selectProps} label='Permanent Division' {...register('permanentDivision')}>
                    <option value=''>Select division…</option>
                    {divisions.map(value => <option key={value} value={value}>{value}</option>)}
                </TextField>
            </Box>

            {/* photo with live preview */}
            <Box sx={{ mt: '20px', display: 'flex', gap: '18px', alignItems: 'center' }}>
                <Avatar
                    src={photoPreview}
                    alt='Preview'
                    imgProps={{ referrerPolicy: 'no-referrer' }}
                    variant='rounded'
                    sx={{ width: 64, height: 64, borderRadius: '12px', bgcolor: brand.cream, color: brand.primary, fontWeight: 600 }}
                >
                    {userInfo?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <TextField
                    label='Photo URL'
                    fullWidth size='small'
                    placeholder='https://...'
                    helperText='Paste a direct image link — the preview updates as you type'
                    {...register('photo')}
                />
            </Box>

            <Divider sx={{ my: '30px' }} />

            {/* partner expectation */}
            <SectionHeading>Expected Partner</SectionHeading>
            <Typography sx={{ color: 'text.secondary', fontSize: '12.5px' }}>What you are looking for</Typography>
            <Box sx={{ ...fieldGrid, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' } }}>
                <TextField
                    label='Partner Age'
                    type='number'
                    fullWidth size='small'
                    {...register('partnerAge')}
                />
                <TextField {...selectProps} label='Partner Height (cm)' {...register('partnerHeight')}>
                    <option value=''>Any</option>
                    {heights.map(value => <option key={value} value={value}>{value} cm</option>)}
                </TextField>
                <TextField {...selectProps} label='Partner Weight (kg)' {...register('partnerWeight')}>
                    <option value=''>Any</option>
                    {weights.map(value => <option key={value} value={value}>{value} kg</option>)}
                </TextField>
            </Box>

            <Stack direction='row' justifyContent='flex-end' sx={{ mt: '35px' }}>
                <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    size='large'
                    disabled={isSubmitting}
                    startIcon={<SaveIcon />}
                    sx={{ px: '45px', py: '11px' }}
                >
                    {isSubmitting ? 'Saving…' : 'Save Bio Data'}
                </Button>
            </Stack>
        </Card>
    )
}

const EditBioData = () => {
    const { user } = useAuth()
    const [userInfo] = useUser()

    return (
        <Box>
            <Box sx={{ mb: '24px' }}>
                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '26px' }, color: brand.primary }}>
                    Edit Bio Data
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '2px' }}>
                    A complete biodata gets noticed — fill in as much as you can.
                </Typography>
            </Box>

            {!userInfo ? (
                <Card sx={{ p: '80px', borderRadius: '16px', textAlign: 'center', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                    <CircularProgress color='secondary' />
                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '15px' }}>Loading your biodata…</Typography>
                </Card>
            ) : (
                <BioForm userInfo={userInfo} userEmail={user?.email} />
            )}
        </Box>
    );
};

export default EditBioData;
