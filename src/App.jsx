import Game from './pages/Game';
import Levels from './pages/Levels';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    const [limit, setLimit] = useState(6);
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Levels setLimit={setLimit} />}
				/>
				<Route
					path='/game'
					element={<Game limit={limit} />}
				/>
			</Routes>
		</>
	);
};

export default App;