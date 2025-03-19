import AnimeCard from "./Components/AnimeCard"
import ScoreBoard from "./Components/ScoreBoard"
import charList from './data/charList';

const App = () => {
    return (
			<div className="bg-anime bg-no-repeat bg-cover">
            <h1 className="text-5xl text-center pt-4 text-yellow-50" style={{ fontFamily: 'anime_font, sans-serif' }}>AniMemo</h1>
				<ScoreBoard />
				{charList.map((char, index) => (
					<AnimeCard
						key={index}
						char={char}
					/>
				))}
			</div>
		);
}

export default App