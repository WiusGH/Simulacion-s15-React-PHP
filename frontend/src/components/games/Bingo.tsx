import React, { useState } from 'react';
import './Bingo.css';

const BingoBoard: React.FC = () => {
    const [boardNumbers, setBoardNumbers] = useState<number[]>([]);
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

    const generateNumbersInRange = (start: number, end: number): number[] => {
        const numbers = [];
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        return numbers;
    };

    const generateUniqueRandomNumbers = (count: number, max: number): number[] => {
        const numbers = new Set<number>();
        while (numbers.size < count) {
            numbers.add(generateRandomUniqueNumber(max));
        }
        return Array.from(numbers);
    };

    const generateRandomUniqueNumber = (max: number): number => {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * max) + 1;
        } while (selectedNumbers.includes(randomNumber));
        return randomNumber;
    };

    const generateBingoCells = (numbers: number[], rows: number, columns: number): JSX.Element[] => {
        const dividedNumbers: number[][] = [];
        for (let i = 0; i < numbers.length; i += columns) {
            dividedNumbers.push(numbers.slice(i, i + columns));
        }

        return dividedNumbers.map((row, rowIndex) => (
            <div key={rowIndex} className="bingo-row">
                {row.map(number => (
                    <div key={number} className={`bingo-cell ${currentNumber === number ? 'highlighted' : ''}`}>
                        {number}
                    </div>
                ))}
            </div>
        )).slice(0, rows);
    };

    const crupierNumbers = generateNumbersInRange(1, 100);

    const generateRandomNumber = () => {
        const randomNumber = generateRandomUniqueNumber(100);
        setCurrentNumber(randomNumber);
        setSelectedNumbers([...selectedNumbers, randomNumber]);
    };

    const updateBoard = () => {
        setBoardNumbers(generateUniqueRandomNumbers(25, 100));
    };

    return (
        <div className='bingo-game-container'>
            <div className='bingo-section-crupiers'>
                {generateBingoCells(crupierNumbers, 100, 1)}
            </div>
            <div className='bingo-section-users'>
                <button onClick={updateBoard} className="update-button">Actualizar Tablero</button>
                {generateBingoCells(boardNumbers, 5, 5)}
            </div>
            <div className='bingo-section-random-number'>
                <button onClick={generateRandomNumber} className="random-number-button">Generar Número Aleatorio</button>
                {currentNumber && <div className="bingo-cell current-number">{currentNumber}</div>}
            </div>
        </div>
    );
};

export default BingoBoard;
