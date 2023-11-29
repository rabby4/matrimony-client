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

    const { data: allUser, refetch: reload } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            return res.data;
        },
    })
    const { data: favUserInfo, refetch } = useQuery({
        queryKey: ['favUser'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/favorites/${user.email}`);
            return res.data;
        },
    })
    return [userInfo, allUser, reload, favUserInfo, refetch]
};

export default useUser;