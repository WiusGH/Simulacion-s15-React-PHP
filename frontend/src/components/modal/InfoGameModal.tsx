import React, { useState } from 'react';
import './InfoGameModal.css';

const InfoGameModal = ({ isOpen, onClose, nameGame }: { isOpen: boolean, onClose: () => void, nameGame: string }) => {

    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const handleButtonClick = (buttonText: string) => {
        setSelectedButton(buttonText);
    };

    const imageUrl = `/public/images/${nameGame}.png`;

    return (
        <div className="InfoGameModal-overlay" onClick={handleOverlayClick}>
            <div className="InfoGameModal-content">
                <button className="InfoGameModal-close" onClick={onClose}>X</button>
                <h1 className='text-white'>{nameGame}</h1>
                <div className='flex flex-col md:flex-row md:items-center'>
                    <div className="InfoGameModal-buttons md:mr-4 md:w-1/3">
                        <button className="info-button" onClick={() => handleButtonClick('¿CÓMO JUGAR?')}>¿CÓMO JUGAR?</button>
                        <button className="info-button" onClick={() => handleButtonClick('REGLAS')}>REGLAS</button>
                        <button className="info-button" onClick={() => handleButtonClick('PUNTUACIÓN')}>PUNTUACIÓN</button>
                    </div>
                    <img src={imageUrl} alt={nameGame} className='max-w-40 m-auto' />
                </div>
                {selectedButton && (
                    <div className="info-text">
                        {selectedButton === '¿CÓMO JUGAR?' && (
                            <p>Aquí va el texto sobre cómo jugar.</p>
                        )}
                        {selectedButton === 'REGLAS' && (
                            <p>Aquí van las reglas del juego.</p>
                        )}
                        {selectedButton === 'PUNTUACIÓN' && (
                            <p>Aquí se muestra la puntuación del juego.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoGameModal;
