'use client';
import Image from 'next/image';
import React from 'react';

function Header() {
	return (
		<div>
			<div
				className={`w-full h-[88px] px-8 fixed justify-center items-center inline-flex bg-[#F8F9F9] z-1`}>
				<div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
					<div className='border-3 flex h-48 w-full  items-end justify-center  lg:static lg:h-auto lg:w-auto lg:bg-none'>
						<a className='flex place-items-center gap-2 p-8 lg:p-0' href='/'>
							<Image
								src='https://obssolution.com.sg/wp-content/uploads/2021/03/OBS_logo_h86.png'
								alt='OBS Logo'
								className='w-[100px] h-[24px] z-30'
								width={100}
								height={24}
								priority
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
