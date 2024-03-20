'use client';
import Card from '@/components/atoms/card';
import Modal from '@/components/molecules/modal';
import Search from '@/components/molecules/search';
import { useGetUsers } from '@/services/api/users';
import { TUser } from '@/utils/types/users';
import { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { IoIosMore } from 'react-icons/io';

type TResponseUsers = {
	data: TUser[];
} & UseQueryResult;

export default function Home() {
	const { data, isFetching } = useGetUsers() as TResponseUsers;

	console.log('datanya', data);

	const [isShowModal, setIsShowModal] = useState(false);

	const _onShowModal = () => setIsShowModal(!isShowModal);

	return (
		<main className='flex min-h-screen flex-col items-center justify-start p-24'>
			<div className="relative w-full flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>

			<Search onSearch={(text: string) => console.log(text)} />
			<div className='mb-32 mt-5 grid gap-5 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
				{data?.map((o, i) => (
					<Card key={o.id.toString()}>
						<img
							src={process.env.baseImageURL + `/id/5${i + 1}/200`}
							alt={o.name}
							width={200}
							height={200}
							className='rounded-md'
						/>
						<div className='my-2 text-lg font-bold text-[20px] truncate'>
							{o.name}
						</div>
						<div className='my-2 text-lg text-slate-400 truncate'>
							{o.email}
						</div>
						<div
							className='w-full flex justify-end items-end'
							onClick={_onShowModal}>
							<IoIosMore size={30} />
						</div>
					</Card>
				))}
			</div>
			<Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
				<div>test</div>
			</Modal>
		</main>
	);
}
