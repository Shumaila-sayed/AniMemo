const AnimeCard = ({ char: { name, images } }) => {
	return (
		<div className='card'>
			<img
				className='lg:h-60 h-40 w-30 lg:w-48'
				src={images.jpg.image_url}
				alt={name}
			/>
			<p className='text-amber-950 font-bold text-2xl relative z-10'>{name}</p>
		</div>
	);
};

export default AnimeCard