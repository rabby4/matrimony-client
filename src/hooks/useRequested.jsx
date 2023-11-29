import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRequested = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: allRequest, refetch: isAllLoading } = useQuery({
        queryKey: ['request'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;
        },
    })
    const { data: userData, refetch: isRequestedLoading } = useQuery({
        queryKey: ['requestUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
    })
    return [allRequest, userData, isRequestedLoading]
};

export default useRequested;