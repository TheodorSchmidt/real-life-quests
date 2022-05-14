import React from "react";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import { createUseStyles } from "react-jss";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    useParams
} from "react-router-dom"; 

const useStyles = createUseStyles({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "white"
    },
    list: {
        margin: "0px",
        padding: "4px",
        '& li': {
            display: "inline",
            marginRight: "5px",
            border: "1px solid #000",
            padding: "3px"
        }
    }
})

function Header() {
    const classes = useStyles();
    const {coins} = useStore();
    return (
       <div className={classes.header}>
           <ul className={classes.list}>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <Link to="/quests">Квесты</Link>
                </li>
                <li>
                    <Link to="/perks">Навыки</Link>
                </li>
                <li>
                    <Link to="/characters">Персонажи</Link>
                </li>
                <li>
                    <Link to="/locations">Локации</Link>
                </li>
                <li>
                    <Link to="/tavern">Таверна</Link>
                </li>
                <li>
                    <Link to="/diary">Дневник</Link>
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