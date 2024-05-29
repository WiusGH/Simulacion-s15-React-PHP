import { useState } from 'react';
import { RiInformation2Line } from 'react-icons/ri';
import { FaCircleArrowLeft } from "react-icons/fa6";
import InfoGameButton from '../buttons/InfoGameButton';
import './SideBar.css';

const SideBar = ({ game }: { game: string }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
            <div className="sidebar-handle" onClick={toggleSidebar}>
                <span><FaCircleArrowLeft /></span>
            </div>
            <div className="sidebar-content">
                <h1 className='text-white text-center text-2xl font-bold mb-4'>{game}</h1>
                <InfoGameButton text="Info" icon={<RiInformation2Line />} nameGame={game} />
            </div>
        </div>
    );
};

export default SideBar;
