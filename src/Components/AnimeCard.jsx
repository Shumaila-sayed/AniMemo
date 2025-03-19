const AnimeCard = ({ char: { name, img_path } }) => {
	return (
            <div className="card">
                <img className="h-50 w-45"
				src={img_path}
				alt={name}
			/>
			<p className="text-2xl text-amber-950 font-bold " >{name}</p>
            </div>
			
	);
};

export default AnimeCard