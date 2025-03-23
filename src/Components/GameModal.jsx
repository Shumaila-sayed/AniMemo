import { forwardRef } from 'react';

const GameModal = forwardRef(({ modal: [text, imgUrl, score], playAgain  }, ref) => {

	return (
		<dialog
			ref={ref}
			className='rounded-4xl shadow-lg fixed inset-0 p-6 w-[300px] mx-auto my-32 bg-sky-50 backdrop:bg-gray-50/40
			flex flex-col justify-center items-center gap-2 text-sky-500'
		>
			<h1 className='text-2xl font-bold'>{text}</h1>
			<img
				className='h-[200px] w-[200px]'
				src={imgUrl}
			/>
			<p>You final score is: {score}</p>
			<button
				onClick={playAgain}
				className='cursor-pointer bg-sky-500 text-amber-50 px-4 py-2 rounded-4xl'
			>
				PLAY AGAIN
			</button>
		</dialog>
	);
});

export default GameModal;
