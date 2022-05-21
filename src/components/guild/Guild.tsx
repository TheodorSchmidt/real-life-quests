import React, {useState} from "react";
import useStore from "../../hooks/useStore";
import Modal from "../Modal";
import {observer} from "mobx-react-lite";
import { tavernStyle } from "../../styles/Tavern";
import { questsStyle } from "../../styles/Guild";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    Outlet
} from "react-router-dom"; 

function Guild() {
    const guild = questsStyle();
    return(
        <div>
            <div className={guild.menu}>
                <ul className={guild.navigation}>
                    <li>
                        <Link to="quests">Квесты</Link>
                    </li>
                    <li>
                        <Link to="groups">Группы</Link> 
                    </li>
                </ul>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default observer(Guild);