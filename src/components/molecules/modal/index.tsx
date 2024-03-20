// components/Modal.tsx
import { ReactNode } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	isIconClose?: boolean;
	containerClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	isIconClose = false,
	children,
	containerClassName,
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none'>
			<div className='fixed inset-0 bg-black opacity-50'></div>
			<div className={'relative w-auto mx-auto my-6 ' + containerClassName}>
				<div
					className={
						'relative bg-white border-2 border-gray-300 rounded-lg shadow-lg '
					}>
					{isIconClose && (
						<button
							onClick={onClose}
							className='absolute top-0 right-0 p-3 text-xl text-gray-500 hover:text-gray-700'>
							&times;
						</button>
					)}
					<div className='p-4'>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
