import {useEffect} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from "../components/Grid";

function Wordle({solution}) {
let {currentGuess, handleKeyup, guesses, isCorrect, turn} = useWordle(solution);

useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
    
}, [handleKeyup]);

  return (
    <>
        Solution - {solution}
        <Grid currentGuess = {currentGuess} guesses = {guesses} turn = {turn} />
    </>
  )
}

export default Wordle