import React from 'react';

type TCard = {
	children: React.ReactNode;
};

function Card({ children }: TCard) {
	return (
		<div className='flex flex-wrap p-4 rounded-2xl bg-white shadow-sm hover:shadow-2xl'>
			{children}
		</div>
	);
}

export default Card;
