import React from 'react';

type TCard = {
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function Card({ children, ...props }: TCard) {
	return (
		<div
			className='flex flex-col flex-wrap p-4 rounded-2xl bg-white relative shadow-sm hover:shadow-2xl cursor-pointer'
			{...props}>
			{children}
		</div>
	);
}

export default Card;
