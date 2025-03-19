const AnimeCard = ({ char: { name, img_path } }) => {
	return (
		<div>
			<img
				src={img_path}
				alt={name}
			/>
			<p>{name}</p>
		</div>
	);
};

export default AnimeCard