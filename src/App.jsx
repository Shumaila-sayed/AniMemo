import Game from './pages/Game';
import Levels from './pages/Levels';
import { Route, Routes } from 'react-router-dom';

const App = () => {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Levels />}
				/>
				<Route
					path='/game'
					element={<Game />}
				/>
			</Routes>
		</>
	);
};

export default App;