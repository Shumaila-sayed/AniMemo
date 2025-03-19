import AnimeCard from "./Components/AnimeCard"
import ScoreBoard from "./Components/ScoreBoard"
import charList from './data/charList';


const App = () => {
    return (
        <>
            <h1>AniMemo</h1>
            <ScoreBoard />
            {
                charList.map((char, index) => (
                    <AnimeCard key={index} char={char} />
                ))
            }
            
        </>
    )
}

export default App