import { useEffect, useState } from 'react';
import AnimeCard from './Components/AnimeCard';
import ScoreBoard from './Components/ScoreBoard';
import Spinner from './Components/Spinner';

const App = () => {
	const [charList, setCharList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [score, setScore] = useState(0);

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
				//Sort to randomize character from the page and Slice to limit the number of characters and Ensure each character starts with this property
				let charactersArr = data.data
					.sort(() => 0.5 - Math.random())
					.slice(0, limit)
					.map((char) => ({
						...char,
						hasClicked: false,
					}));

				setCharList(charactersArr);
				console.log(charactersArr);
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
		if (
			charList.length > 0 &&
			charList.every((char) => char.hasClicked === true)
		) {
			console.log('You win');
		}
	}, [charList])

	const handleClick = (e) => {
		gameFlow(e.target.dataset.info);

		setIsFlipped(true);
		setTimeout(() => {
			setCharList((prev) => {
				const shuffled = [...prev].sort(() => 0.5 - Math.random());
				return shuffled;
			});

			setTimeout(() => {
				setIsFlipped(false);
			}, 500);
		}, 1000);
	};


	const gameFlow = (name) => {
		charList.map((char) =>
			char.name === name && char.hasClicked ? console.log('you lose') : null
		);

		setCharList((prevCharList) => {
			const updatedList = prevCharList.map((char) => {
				if (char.name === name && !char.hasClicked) {
					setScore((prev) => prev + 1);
					return { ...char, hasClicked: true };
				}
				return char;
			});
			return updatedList;
		});
	};

	return (
		<div className={`bg-anime bg-no-repeat bg-cover w-full min-h-screen`}>
			<h1
				className='lg:text-6xl text-3xl text-center pt-7 text-yellow-50 cursor-pointer '
				style={{ fontFamily: 'anime_font, sans-serif' }}
			>
				AniMemo
			</h1>
			<ScoreBoard score={score} />

			{isLoading ? (
				<Spinner />
			) : errorMessage ? (
				<p className='text-red-800 text-center mt-15 text-2xl'>
					{errorMessage}
				</p>
			) : (
				<div className='card-container'>
					{charList.map((char) => (
						<AnimeCard
							key={char.mal_id}
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
