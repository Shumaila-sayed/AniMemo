import { useEffect, useState } from 'react';
import AnimeCard from './Components/AnimeCard';
import ScoreBoard from './Components/ScoreBoard';

const App = () => {
	const [charList, setCharList] = useState([]);

	const fetchCharacters = async (limit = 6) => {
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
				console.log(data.Error || 'Failed to fetch characters');
				return;
			}

			if (data.data && data.data.length > 0) {
				//Sort to randomize character from the page and Slice to limit the number of characters
				let charactersArr = data.data
					.sort(() => 0.5 - Math.random())
					.slice(0, limit);

				setCharList(charactersArr);
			} else {
				console.log('Failed to fetch characters');
			}
		} catch (error) {
			console.error(`Error fetching characters: ${error}`);
		}
	};

	useEffect(() => {
		fetchCharacters();
	}, []);

	return (
		<div className='bg-anime bg-no-repeat bg-cover w-full'>
			<h1
				className='lg:text-6xl text-3xl text-center pt-7 text-yellow-50 '
				style={{ fontFamily: 'anime_font, sans-serif' }}
			>
				AniMemo
			</h1>
			<ScoreBoard />
			<div className='card-container'>
				{charList.map((char) => (
					<AnimeCard
						key={char.mal_id}
						char={char}
					/>
				))}
			</div>
		</div>
	);
};

export default App;