import { useEffect, useState, useRef } from 'react';
import AnimeCard from '../Components/AnimeCard';
import ScoreBoard from '../Components/ScoreBoard';
import Spinner from '../Components/Spinner';
import GameModal from '../Components/GameModal';

const Game = ({ limit }) => {
	const [charList, setCharList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modal, setModal] = useState([]);

	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);

	const fetchCharacters = async (limit) => {
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

	function playAgain() {
		setIsModalOpen(false);
		dialogRef.current.close();
		fetchCharacters(limit);
		setScore(0);
	}

	useEffect(() => {
		fetchCharacters(limit);
	}, []);

	const dialogRef = useRef(null);

	const openModal = (text, imgUrl) => {
		setModal([text, imgUrl, score]);
		setIsModalOpen(true);

		setTimeout(() => {
			if (dialogRef.current) {
				dialogRef.current.showModal();
			}
		}, 0);
	};

	useEffect(() => {
		if (
			charList.length > 0 &&
			charList.every((char) => char.hasClicked === true)
		) {
			setHighScore(() => {
				if (highScore < score) {
					return score;
				}
				return highScore;
			});
			openModal('You Win!', '/win.jpg');
		}
	}, [charList]);

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
		const alreadyClicked = charList.some(
			(char) => char.name === name && char.hasClicked
		);

		if (alreadyClicked) {
			setHighScore(() => {
				if (highScore < score) {
					return score;
				}
				return highScore;
			});
			openModal('You Lose!', '/lose.jpg');
			return;
		}

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
			<ScoreBoard
				score={score}
				highScore={highScore}
			/>

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

			{isModalOpen && (
				<GameModal
					modal={modal}
					ref={dialogRef}
					playAgain={playAgain}
				/>
			)}
		</div>
	);
};

export default Game;
