import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array. initial length is 6
    const [history, setHistory] = useState([]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map(item=> {
            return {key: item, color: "grey"};
        })
        //find any green letters
        formattedGuess.forEach((item, index) => {
            if(solutionArray[index] === item.key) {
                formattedGuess[index].color = "green";
                solutionArray[index] = null; 
            }
        })
        //find any yellow letters
        formattedGuess.forEach((item, index) => {
            if(solutionArray.includes(item.key) && item.color !== "green") {
                formattedGuess[index].color = "yellow";
                solutionArray[solutionArray.indexOf(item.key)] = null; 
            }
        })
        return formattedGuess;
    }

    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses((prevGuesses)=> {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })
        setHistory((prevHistory)=> {
            return [...prevHistory, currentGuess];
        })
        setTurn(prevTurn => prevTurn + 1);
        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
              const currentColor = prevUsedKeys[l.key];
      
              if (l.color === 'green') {
                prevUsedKeys[l.key] = 'green';
                return
              }
              if (l.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[l.key] = 'yellow';
                return
              }
              if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[l.key] = 'grey';
                return
              }
            })
      
            return prevUsedKeys;
          })
        setCurrentGuess("");
    }

    const handleKeyup = (e) => {
        if(e.key === "Enter") {
        if(turn > 5) {
            console.log("you used all your guesses");
            return;
        }
        if(history.includes(currentGuess)){
            console.log("you already tried that word");
            return;
        }
        if(currentGuess.length !== 5) {
            console.log("Length of the word should be 5 characters");
            return;
        }
        const formatted = formatGuess();
        addNewGuess(formatted);
        }
        if(e.key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
             })
             return;
        }
        if(/^[A-Za-z]$/.test(e.key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prev)=>{
                    return prev + e.key
                })
            }
        }
    }
    return {turn, currentGuess, guesses,isCorrect, usedKeys, handleKeyup}
}

export default useWordle;