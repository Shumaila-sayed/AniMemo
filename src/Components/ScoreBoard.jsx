const ScoreBoard = ({score, highScore}) => {
    return (
        <div className="flex justify-center gap-1.5 lg:gap-10 text-amber-50 text-[12px] lg:text-[18px] font-mono w-full">
            <p>SCORE: {score}</p>
            <p>HIGH SCORE: {highScore}</p>
        </div>
    )
}

export default ScoreBoard