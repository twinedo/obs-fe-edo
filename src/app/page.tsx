'use client';
import Card from '@/components/atoms/card';
import Modal from '@/components/molecules/modal';
import Search from '@/components/molecules/search';
import {
	addUser,
	removeUser,
	searchUser,
	setSelectedUser,
	updateUser,
} from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useGetUsers } from '@/services/api/users';
import { TUser } from '@/utils/types/users';
import { UseQueryResult } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { IoIosMore, IoMdCloseCircleOutline } from 'react-icons/io';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

type TResponseUsers = {
	data: TUser[];
} & UseQueryResult;

const UserSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
});

export default function Home() {
	const { isFetching } = useGetUsers() as TResponseUsers;
	const dispatch = useAppDispatch();
	const userList = useAppSelector((state) => state.users.users);
	const searchList = useAppSelector((state) => state.users.searchList);
	const userDetail = useAppSelector((state) => state.users.detail);

	const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
	const [isEdit, setIsEdit] = useState(false);
	const [initState, setInitState] = useState({
		id: Math.random(),
		name: '',
		username: '',
		email: '',
		address: {
			street: '',
			suite: '',
			city: '',
			zipcode: '',
			geo: {
				lat: '',
				lng: '',
			},
		},
		phone: '',
		website: '',
		company: {
			name: '',
			catchPhrase: '',
			bs: '',
		},
	});

	const [isShowModal, setIsShowModal] = useState(false);
	const _onShowModal = (val?: TUser) => {
		modalMode === 'add'
			? dispatch(setSelectedUser(initState))
			: dispatch(setSelectedUser(val!));
		setTimeout(() => {
			setIsShowModal(!isShowModal);
		}, 500);
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-start p-24'>
			<div className="relative w-full flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>

			<Search onSearch={(text: string) => dispatch(searchUser(text))} />
			<button
				className='bg-blue-500 text-white font-bold p-4 rounded-lg items-start justify-start'
				onClick={() => {
					setModalMode('add');
					_onShowModal();
					setIsEdit(true);
				}}>
				Add User
			</button>
			<div className='mb-32 mt-5 grid grid-cols-2 gap-5 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left'>
				{isFetching && <div className='w-full text-lg'>Fetching...</div>}
				{searchList?.map((o, i) => (
					<Card
						key={o.id.toString()}
						onClick={() => {
							setIsEdit(false);
							setModalMode('edit');
						}}>
						<div className='flex flex-col flex-wrap relative justify-center'>
							<div className='flex w-full justify-center items-center'>
								<img
									src={o.imageProfile!}
									alt={o.name}
									className='rounded-md w-full h-[200px]'
								/>
							</div>
							<div className='my-2 text-lg font-bold text-[20px] truncate'>
								{o.name}
							</div>
							<div className='my-2 text-lg text-slate-400 truncate'>
								{o.email}
							</div>
							<div
								className='w-full flex justify-end items-end'
								onClick={() => _onShowModal(o)}>
								<IoIosMore size={30} />
							</div>
						</div>
					</Card>
				))}
			</div>
			<Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
				<div className='flex flex-col gap-4 w-[400px]'>
					<IoMdCloseCircleOutline
						onClick={() => setIsShowModal(false)}
						size={32}
					/>
					{modalMode === 'edit' && (
						<div className='flex w-full justify-center items-center'>
							<Image
								src={userDetail?.imageProfile!}
								alt={userDetail?.name}
								width={200}
								height={200}
								className='rounded-md'
							/>
						</div>
					)}
					<div className='flex flex-col'>
						<Formik
							initialValues={{
								name: modalMode === 'add' ? '' : userDetail.name,
								email: modalMode === 'add' ? '' : userDetail.email,
							}}
							validationSchema={UserSchema}
							onSubmit={(values) => {
								if (modalMode === 'add') {
									dispatch(
										addUser({
											...initState,
											...values,
											imageProfile:
												`${process.env.baseImageURL}` +
												`/id/5${Math.round(Math.random()) + 1}/200`,
										})
									);
								} else {
									dispatch(
										updateUser({ ...userDetail, ...values, id: userDetail.id })
									);
								}
								alert('Success');
								setIsEdit(false);
								setIsShowModal(false);
							}}>
							{({
								handleBlur,
								handleChange,
								handleSubmit,
								values,
								errors,
								touched,
							}) => (
								<Form className='flex flex-col gap-5 w-full'>
									<div className='w-full h-[50px]'>
										<p className='text-sm text-[#999]'>Name</p>
										<input
											placeholder='Name'
											value={values.name}
											className={
												'flex h-[40px] grow shrink basis-0 bg-white text-stone-950 text-base font-medium leading-tight outline-none border border-3 rounded-xl px-3'
											}
											onChange={handleChange('name')}
											onBlur={handleBlur('name')}
											contentEditable={!isEdit}
											disabled={!isEdit}
										/>
										{errors.name && touched.name ? (
											<div className='text-red'>{errors.name}</div>
										) : null}
									</div>
									<div className='w-full h-[50px]'>
										<p className='text-sm text-[#999]'>Email</p>
										<input
											placeholder='Email'
											value={values.email}
											contentEditable={!isEdit}
											disabled={!isEdit}
											className={
												'flex h-[40px] grow shrink basis-0 bg-white text-stone-950 text-base font-medium leading-tight outline-none border border-3 rounded-xl px-3'
											}
											onChange={handleChange('email')}
											onBlur={handleBlur('email')}
										/>
										{errors.email && touched.email ? (
											<div className='text-red'>{errors.email}</div>
										) : null}
									</div>
									{modalMode === 'add' && isEdit && (
										<div className='flex w-full flex-row gap-4'>
											<button
												className='bg-red-500 text-white font-bold p-4 rounded-lg'
												onClick={() => setIsShowModal(false)}>
												Cancel
											</button>
											<button
												className='bg-cyan-500 text-white font-bold p-4 rounded-lg'
												type='submit'>
												Submit User
											</button>
										</div>
									)}
									{modalMode === 'edit' && isEdit && (
										<div className='flex w-full flex-row gap-4'>
											<button
												className='bg-red-500 text-white font-bold p-4 rounded-lg'
												onClick={() => setIsEdit(false)}>
												Cancel
											</button>
											<button
												className='bg-cyan-500 text-white font-bold p-4 rounded-lg'
												onClick={() => handleSubmit()}>
												Submit Changes
											</button>
										</div>
									)}
									{modalMode === 'edit' && !isEdit && (
										<div className='flex w-full flex-row gap-4'>
											<button
												className='bg-red-500 text-white font-bold p-4 rounded-lg'
												onClick={() => {
													dispatch(removeUser(userDetail.id));
													setIsShowModal(false);
												}}>
												Delete User
											</button>
											<button
												className='bg-cyan-500 text-white font-bold p-4 rounded-lg'
												onClick={() => setIsEdit(true)}>
												Update User
											</button>
										</div>
									)}
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</Modal>
		</main>
	);
}
