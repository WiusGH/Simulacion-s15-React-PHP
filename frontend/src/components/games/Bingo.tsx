import { useState, useEffect } from 'react';
import './Bingo.css';

const Bingo = () => {
    const generateNumbersRange = (start: number, end: number): number[] => {
        const numbers = [];
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        return numbers;
    };

    const generateRandomNumber = (start: number, end: number): number => {
        const rangeSize = end - start + 1;
        return Math.floor(Math.random() * rangeSize) + start;
    };

    const createUniqueRandomNumberArray = (start: number, end: number, size: number): number[] => {
        const arrayNumbers: number[] = [];
        while (arrayNumbers.length < size) {
            const newNumber = generateRandomNumber(start, end);
            if (!arrayNumbers.includes(newNumber)) {
                arrayNumbers.push(newNumber);
            }
        }
        return arrayNumbers;
    };

    const CreateBoard = ({ numbers, selectedNumbers, columns, boardTitle }: { numbers: number[], selectedNumbers: number[], columns: number, boardTitle: string }) => {
        return (
            <div className='bingo-board' style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}>
                <h3>{boardTitle}</h3>
                {numbers.map((number, index) => (
                    <div key={index} className={`bingo-balls ${selectedNumbers.includes(number) ? 'highlighted' : ''}`}>
                        {number}
                    </div>
                ))}
            </div>
        );
    };

    const Reel = ({ spinning, finalNumber }: { spinning: boolean, finalNumber: number | null }) => {
        const [currentNumber, setCurrentNumber] = useState(finalNumber);

        useEffect(() => {
            if (spinning) {
                const interval = setInterval(() => {
                    setCurrentNumber(generateRandomNumber(1, 100));
                }, 100);
                return () => clearInterval(interval);
            } else if (finalNumber !== null) {
                setCurrentNumber(finalNumber);
            }
        }, [spinning, finalNumber]);

        return (
            <div className={`reel ${spinning ? 'spinning' : ''}`}>
                <div className="number">{currentNumber}</div>
            </div>
        );
    };

    const checkForWin = (boardNumbers: number[], selectedNumbers: number[]) => {
        for (let row = 0; row < 5; row++) {
            let rowWin = true;
            for (let col = 0; col < 5; col++) {
                const index = row * 5 + col;
                if (!selectedNumbers.includes(boardNumbers[index])) {
                    rowWin = false;
                    break;
                }
            }
            if (rowWin) return true;
        }
        for (let col = 0; col < 5; col++) {
            let colWin = true;
            for (let row = 0; row < 5; row++) {
                const index = row * 5 + col;
                if (!selectedNumbers.includes(boardNumbers[index])) {
                    colWin = false;
                    break;
                }
            }
            if (colWin) return true;
        }
        return false;
    };

    const Modal = ({ show, message, onClose }: { show: boolean, message: string, onClose: () => void }) => {
        if (!show) return null;
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">{message}</h2>
                    <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Continuar
                    </button>
                </div>
            </div>
        );
    };

    const [userArrayNumbers, setUserArrayNumbers] = useState(createUniqueRandomNumberArray(1, 100, 25));
    const [machineArrayNumbers, setMachineArrayNumbers] = useState(createUniqueRandomNumberArray(1, 100, 25));
    const [crupierArrayNumbers, setCrupierArrayNumbers] = useState(generateNumbersRange(1, 100));
    const [lotteryNumberArray, setLotteryNumberArray] = useState<number[]>([]);
    const [selectedLotteryNumber, setSelectedLotteryNumber] = useState<number | null>(null);
    const [spinning, setSpinning] = useState(false);
    const [finalNumber, setFinalNumber] = useState<number | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [userWins, setUserWins] = useState(0);
    const [machineWins, setMachineWins] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const spinRoulette = () => {
        let newNumber: number;
        do {
            newNumber = generateRandomNumber(1, 100);
        } while (lotteryNumberArray.includes(newNumber));

        const newLotteryArray = [...lotteryNumberArray, newNumber];
        setLotteryNumberArray(newLotteryArray);
        setFinalNumber(newNumber);
        setSelectedLotteryNumber(newNumber);

        return newLotteryArray;
    };

    const updateUserBoard = () => {
        setUserArrayNumbers(createUniqueRandomNumberArray(1, 75, 25));
    };

    const handleSpinClick = () => {
        setSpinning(true);
        setIsButtonDisabled(true);
        setTimeout(() => {
            setSpinning(false);
            const newLotteryArray = spinRoulette();
            setIsButtonDisabled(false);

            if (checkForWin(userArrayNumbers, newLotteryArray)) {
                setUserWins(userWins + 1);
                setModalMessage('¡El usuario ha ganado!');
                setShowModal(true);
            } else if (checkForWin(machineArrayNumbers, newLotteryArray)) {
                setMachineWins(machineWins + 1);
                setModalMessage('¡La máquina ha ganado!');
                setShowModal(true);
            }
        }, 2000);
    };

    const handleNewGameClick = () => {
        setLotteryNumberArray([]);
        setFinalNumber(null);
        setSelectedLotteryNumber(null);
        setUserArrayNumbers(createUniqueRandomNumberArray(1, 100, 25));
        setMachineArrayNumbers(createUniqueRandomNumberArray(1, 100, 25));
        setCrupierArrayNumbers(generateNumbersRange(1, 100));
        setShowModal(false);
    };

    return (
        <div className='bingo-section-game'>
            <div className='bingo-section-crupier'>
                <CreateBoard numbers={crupierArrayNumbers} selectedNumbers={lotteryNumberArray} columns={25} boardTitle="Crupier" />
            </div>
            <div className='bingo-section-machine'>
                <CreateBoard numbers={machineArrayNumbers} selectedNumbers={lotteryNumberArray} columns={5} boardTitle="Máquina" />
            </div>
            <div className='bingo-section-roulette'>
                <Reel spinning={spinning} finalNumber={finalNumber} />
            </div>
            <div className='bingo-section-controls'>
                <p> Máquina: {machineWins} | Usuario: {userWins} </p>
                <button onClick={handleSpinClick} className="button-roulette" disabled={isButtonDisabled}>
                    {selectedLotteryNumber === null ? "Jugar" : "Próximo número"}
                </button>
                {selectedLotteryNumber === null
                    ? <button onClick={updateUserBoard} disabled={isButtonDisabled} className="button-user">Cambiar números</button>
                    : <button onClick={handleNewGameClick} disabled={isButtonDisabled} className="button-new-game">Nuevo Juego</button>}
            </div>
            <div className='bingo-section-user'>
                <CreateBoard numbers={userArrayNumbers} selectedNumbers={lotteryNumberArray} columns={5} boardTitle="Usuario" />
            </div>
            {selectedLotteryNumber !== null
                ? <div className='bingo-section-history'>
                    <h3>Números que salieron:</h3>
                    <ul>
                        {lotteryNumberArray.map((number, index) => (
                            <li key={index}>{number}</li>
                        ))}
                    </ul>
                </div>
                : ''}
            <Modal show={showModal} message={modalMessage} onClose={handleNewGameClick} />
        </div>
    );
};

export default Bingo;
