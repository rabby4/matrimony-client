import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useUser = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: userInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        },
    })
    return [userInfo]
};

export default useUser;