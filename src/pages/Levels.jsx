import { NavLink } from 'react-router-dom';

const Levels = ({ setLimit }) => {
	return (
		<div className={`bg-anime bg-no-repeat bg-cover w-full min-h-screen `}>
			<h1
				className='lg:text-6xl text-3xl text-center pt-7 text-yellow-50 cursor-pointer '
				style={{ fontFamily: 'anime_font, sans-serif' }}
			>
				AniMemo
			</h1>
			<div className=' text-center w-80 h-82 rounded-2xl mx-auto p-5 gap-6 mt-8 font-semibold bg-white/85 flex flex-col'>
				<p className='text-2xl border-b-2 border-dashed border-amber-500'>
					Select Level of Difficulty
				</p>

				<button
					className='cursor-pointer hover:text-amber-500 hover:underline hover:underline-offset-8
'
				>
					Easy
				</button>

				<button
					className='cursor-pointer hover:text-amber-500 hover:underline hover:underline-offset-8'
					onClick={() => setLimit(9)}
				>
					Medium
				</button>

				<button
					className='cursor-pointer hover:text-amber-500 hover:underline hover:underline-offset-8'
					onClick={() => setLimit(12)}
				>
					Hard
				</button>

				<NavLink to='/game'>
					<button className='w-30 text-white font-bold rounded-full bg-amber-300 p-3 cursor-pointer hover:bg-amber-600 border-b-6  border-amber-600 hover:bg-amber-600 hover:border-amber-300'>
						Let's Play!
					</button>
				</NavLink>
			</div>
		</div>
	);
};

export default Levels;
