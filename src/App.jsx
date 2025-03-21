import { useEffect, useState } from 'react';
import AnimeCard from './Components/AnimeCard';
import ScoreBoard from './Components/ScoreBoard';
import Spinner from './Components/Spinner';

const App = () => {
	const [charList, setCharList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	 const [isFlipped, setIsFlipped] = useState(false);

	const fetchCharacters = async (limit = 6) => {
		setIsLoading(true);
		setErrorMessage('');

		try {
			const response = await fetch(
				`https://api.jikan.moe/v4/top/characters?page=${
					Math.floor(Math.random() * 15) + 1
				}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch characters');
			}

			const data = await response.json();
			if (data.Response === 'False') {
				setErrorMessage(data.Error || 'Failed to fetch characters.');
				setCharList([]);
				return;
			}

			if (data.data && data.data.length > 0) {
				//Sort to randomize character from the page and Slice to limit the number of characters
				let charactersArr = data.data
					.sort(() => 0.5 - Math.random())
					.slice(0, limit);

				setCharList(charactersArr);
				console.log(charactersArr)
				setIsLoading(false);
			} else {
				console.log('Failed to fetch characters');
			}
		} catch (error) {
			console.error(`Error fetching characters: ${error}`);
			setErrorMessage('Error fetching characters. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCharacters();
	}, []);

	 useEffect(() => {
			if (isFlipped) {
				const timer = setTimeout(() => setIsFlipped(false), 1000);
				return () => clearTimeout(timer);
			}
		}, [isFlipped]);

	
	const handleClick = (e) => {
		 setIsFlipped(!isFlipped);
		console.log(e.target.dataset.info);
		
		setCharList((prev) => prev.sort(() => 0.5 - Math.random()));
	}

	return (
		<div
			className={`bg-anime bg-no-repeat bg-cover w-full min-h-screen` }
		>
			<h1
				className='lg:text-6xl text-3xl text-center pt-7 text-yellow-50 cursor-pointer '
				style={{ fontFamily: 'anime_font, sans-serif' }}
			>
				AniMemo
			</h1>
			<ScoreBoard />

			{isLoading ? (
				<Spinner />
			) : errorMessage ? (
				<p className='text-red-800 text-center mt-15 text-2xl'>{errorMessage}</p>
			) : (
				<div className='card-container'>
						{charList.map((char) => (
						char.hasClicked = false,
						<AnimeCard
								key={
								char.mal_id}
								char={char}
								handleClick={handleClick}
								isFlipped={isFlipped}
							/>
					))}
				</div>
			)}
		</div>
	);
};

export default App;