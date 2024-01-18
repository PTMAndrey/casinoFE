import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

const data = [
    { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '11', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '5', style: { backgroundColor: 'red', textColor: 'black' } },
    { option: '10', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '6', style: { backgroundColor: 'red', textColor: 'black' } },
    { option: '9', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'red', textColor: 'black' } },
    { option: '8', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'red', textColor: 'black' } },
    { option: '14', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'red', textColor: 'black' } },
    { option: '13', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'red', textColor: 'black' } },
    { option: '12', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'red', textColor: 'black' } },
]

const Roulette = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [balance, setBalance] = useState(3500);

    const handleSpinClick = (betColor) => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);

            if (data[newPrizeNumber].style.backgroundColor === betColor) {
                // setBalance()
                console.log('You won on ' + betColor)
            }
            else{
                console.log("You lost!");
            }
        }
    }
    return (
        <>
            <p>Balance: {balance} </p>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                startingOptionIndex={0}
                spinDuration={0.1}
                onStopSpinning={() => {
                    setMustSpin(false);
                    console.log(data[prizeNumber]);
                }}
            />
            <button onClick={()=>handleSpinClick('red')}>RED</button>
            <button onClick={()=>handleSpinClick('black')}>BLACK</button>
            <button onClick={()=>handleSpinClick('green')}>Green</button>

        </>
    )
}

export default Roulette