import {useEffect, useState} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from "../components/Grid";
import Keypad from './Keypad';
import Modal from './Modal';

function Wordle({solution}) {
let {currentGuess, handleKeyup, guesses, isCorrect, usedKeys, turn} = useWordle(solution);
const [showModal, setShowModal] = useState(false);
useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    if(isCorrect) {
        setTimeout(()=>{
            setShowModal(true);
        }, 3000)
        window.removeEventListener('keyup', handleKeyup);
    }
    if(turn > 5) {
        setTimeout(()=>{
            setShowModal(true);
        }, 3000)
        window.removeEventListener('keyup', handleKeyup);
    }
    return () => window.removeEventListener('keyup', handleKeyup);
    
}, [handleKeyup, isCorrect, turn]);

  return (
    <>
        <Grid currentGuess = {currentGuess} guesses = {guesses} turn = {turn} />
        <Keypad usedKeys = {usedKeys}/>
        {showModal && <Modal isCorrect={isCorrect} turn = {turn} solution = {solution}/>}
    </>
  )
}

export default Wordle