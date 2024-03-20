import React, { useState } from 'react';

type TSearch = {
	onSearch: (text: string) => void;
};
function Search(props: TSearch) {
	const { onSearch } = props;
	const [search, setSearch] = useState('');
	return (
		<div className='max-w-5xl w-full'>
			<div className='mt-4 text-[2.5rem] font-bold'>EMPLOYEE</div>
			<div className='border rounded-xl shadow-lg w-full h-[50px] bg-white mt-4 flex flex-row items-center overflow-hidden mx-auto'>
				<input
					className='w-full h-full px-4 outline-none '
					placeholder='Search any name or email'
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button
					onClick={() => onSearch(search)}
					className='h-full w-[200px] flex justify-center items-center bg-slate-500 text-white font-bold'>
					Search
				</button>
			</div>
			<div className='text-slate-400 my-2'>
				Press `Search` to find the result
			</div>
		</div>
	);
}

export default React.memo(Search);
