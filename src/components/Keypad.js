import { useState, useEffect} from 'react'

const Keypad = ({usedKeys}) => {
    const [letters, setLetters] = useState(null);
    useEffect(() => {
       async function fetchLetters(){
           let data = await fetch("http://localhost:3001/letters");
           let json = await data.json();
           setLetters(json);
       }
       fetchLetters();
    }, [])
  return (
    <div className='keypad'>
        {letters && letters.map((letter)=>{
            const color = usedKeys[letter.key]
            return (
                <div key = {letter.key} className={color} >{letter.key}</div>
            )
        })}
    </div>
  )
}

export default Keypad