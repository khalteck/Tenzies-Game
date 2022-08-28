import React from "react"
import Die from "./components/Die"
import Confetti from 'react-confetti'

export default function App() {

    let randomNum = () => Math.floor(Math.random() * 6);

    //to loop over 10 numbers and create 10 objects
    function eachDie() {
        const newArray = []
        for(let i = 0; i < 10; i++) {
           let eachDieValue = {
            id: i + 1,
            value: randomNum(),
            held: false
        }
            newArray.push(eachDieValue)
        }
        return newArray
    }

    const [dice, setDice] = React.useState(eachDie()) //the initial state is an array of objects for each die

    //to handle holding each die onClick, change the state by mapping over dice array of obj,
    //then if an object id matches the id passed in as param, update the held property of that obj, else return the obj
    function hold(id) {
        setDice(prevState => {
            return prevState.map((item) => {
                return item.id === id ? { ...item, held: !item.held } : item
            })
        })
    }
    
    //to map over the dice state array and create a Die component for each item
    const diceElements = dice?.map((item) => (
        <Die 
            key={item.id}
            {...item}
            handleClick={() => hold(item.id)}
        />
    ))

    //variable for when all dice have been held
    const allHeld = dice.every(item => item.held === true);

    //to check if all dice match
    function checkDice() {
        let firstValue = dice[0].value;
        let sameValue = dice.every(item => item.value === firstValue);
        return sameValue && allHeld ? true : false;
    }

    //to roll the dice
    function rollDice() {
        if (!allHeld) {
            setDice(prevState => prevState.map(item => {
                return !item.held ? {
                    ...item,
                    value: randomNum()
                } : {
                    ...item
                } 
            
            }))
        } else {
            setDice(eachDie())
        }
    }
    
    return (
        <main className="w-[360px] sm:w-[360px] p-[36px] bg-slate-200 rounded-lg shadow-xl text-center">
            {checkDice() ? <Confetti numberOfPieces={500} width={window.innerWidth || 300} height={window.innerHeight || 200}/> : null}
            <div>
                <h1 className="text-[1.75rem] font-bold">Tenzies</h1>
                {checkDice() ? <p className="w-full bg-violet-800 text-white rounded-lg p-3">CONGRATS!!<br/> You have matched all the tiles!</p> 
                : <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
                <div className="w-full grid gap-[15px] grid-cols-5 font-bold mt-5">
                    {diceElements}
                </div>
                <button 
                className="mt-7 py-[6px] px-8 bg-violet-800 hover:bg-violet-500 text-white rounded-md shadow-md"
                onClick={rollDice}
                >{checkDice() ? "Restart Game" : "Roll"}</button>
            </div>
            <p className="w-full text-center text-[12px] text-slate-50 fixed bottom-[20px] left-0 text-[400] tracking-widest">&copy; 2022 Built by <a href="https://khalteck.netlify.app" className="underline text-blue-200">Khalid</a></p>
    </main>
    )
}