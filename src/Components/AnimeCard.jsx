const AnimeCard = ({ char: { name, images }, handleClick, isFlipped }) => {
	return (
		<div
			className={`relative md:h-[300px] md:w-[200px] h-[240px] w-[160px] transition-transform duration-700 [transform-style:preserve-3d] ${
				isFlipped ? 'rotate-y-180' : 'rotate-y-0'
			}`}
			onClick={(e) => handleClick(e)}
		>
			{/* Front Side */}
			<div
				className='card'
				data-info={name}
			>
				<img
					className='h-[85%] w-full object-cover rounded-t-xl'
					src={images.jpg.image_url}
					alt={name}
					data-info={name}
				/>
				<p
					data-info={name}
					className='text-amber-950 text-center font-bold text-lg md:py-2  h-[15%]'
				>
					{name}
				</p>
			</div>

			{/* Back Side */}
			<div className='absolute inset-0 flex items-center justify-center bg-gray-900 rounded-xl shadow-md rotate-y-180 [backface-visibility:hidden]'>
				<img
					src='/back-card.jpg'
					alt='Card Back'
					className='h-full w-full object-cover rounded-xl'
				/>
			</div>
		</div>
	);
};

export default AnimeCard;
