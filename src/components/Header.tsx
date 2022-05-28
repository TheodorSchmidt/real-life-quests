import React from "react";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import { Link } from "react-router-dom"; 
import { headerStyle } from "../styles/Header";


function Header() {
    const header = headerStyle();
    const {coins} = useStore();
    return (
       <div className={header.header}>
           <ul className={header.list}>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <Link to="/guild">Гильдия</Link>
                </li>
                {/* <li>
                    <Link to="/perks">Навыки</Link> 
                </li> */}
                <li>
                    <Link to="/characters">Персонажи</Link>
                </li>
                {/* <li>
                    <Link to="/locations">Локации</Link>
                </li> */}
                <li>
                    <Link to="/tavern">Таверна</Link>
                </li>
                <li>
                    <Link to="/statistic">Статистика</Link>
                </li>
                <li>
                    Монет: {coins}                
                </li>
            </ul>
       </div>
    )
}

export default observer(Header);