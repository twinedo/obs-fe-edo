import { setUsers } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import { _useAxios } from '@/services/useAxios';
import { TUser } from '@/utils/types/users';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetUsers() {
	const dispatch = useAppDispatch();
	const { ...rest } = useQuery({
		queryKey: ['useGetUsers'],
		queryFn: async () => {
			try {
				const response = await _useAxios({
					url: '/users',
					method: 'get',
				});
				console.log('resp get users', response?.data);
				dispatch(setUsers(response?.data as TUser[]));
				return response?.data as TUser[];
			} catch (error) {
				console.log('error get users', error);
				return error;
			}
		},
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	return { ...rest };
}

export function useAddUser() {
	const { mutate, ...rest } = useMutation({
		mutationKey: ['useAddUser'],
		mutationFn: async (data: TUser) => {
			try {
				const response = await _useAxios({
					url: `/users/${data.id}`,
					method: 'post',
					data,
				});
				console.log('resp add user', response?.data);
				return response?.data;
			} catch (error) {
				console.log('error add user', error);
				return error;
			}
		},
		onSuccess: (data) => {
			return Promise.resolve(data);
		},
		onError: (err) => {
			return Promise.reject(err);
		},
	});
	return { addUser: mutate, ...rest };
}

export function useUpdateUserByID() {
	const { mutate, ...rest } = useMutation({
		mutationKey: ['useUpdateUserByID'],
		mutationFn: async (data: TUser) => {
			try {
				const response = await _useAxios({
					url: `/users/${data.id}`,
					method: 'put',
					data,
				});
				console.log('resp update user', response?.data);
				return response?.data;
			} catch (error) {
				console.log('error update user', error);
				return error;
			}
		},
		onSuccess: (data) => {
			return Promise.resolve(data);
		},
		onError: (err) => {
			return Promise.reject(err);
		},
	});
	return { updateUser: mutate, ...rest };
}

export function useDeleteUserByID() {
	const { mutate, ...rest } = useMutation({
		mutationKey: ['useDeleteUserByID'],
		mutationFn: async (id: string) => {
			try {
				const response = await _useAxios({
					url: `/users/${id}`,
					method: 'delete',
				});
				console.log('resp delete user', response?.data);
				return response?.data;
			} catch (error) {
				console.log('error delete user', error);
				return error;
			}
		},
		onSuccess: (data) => {
			return Promise.resolve(data);
		},
		onError: (err) => {
			return Promise.reject(err);
		},
	});
	return { deleteUser: mutate, ...rest };
}
