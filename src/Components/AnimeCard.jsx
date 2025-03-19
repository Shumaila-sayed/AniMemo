const AnimeCard = ({ char: { name, img_path } }) => {
	return (
            <div className="card">
                <img className="lg:h-50 h-40 w-30 lg:w-45"
				src={img_path}
				alt={name}
			/>
			<p className="text-2xl text-amber-950 font-bold">{name}</p>
            </div>
			
	);
};

export default AnimeCard