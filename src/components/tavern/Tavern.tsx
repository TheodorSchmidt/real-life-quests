import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import { tavernStyle } from "../../styles/Tavern";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    Outlet
} from "react-router-dom"; 

function Tavern() {
    const tavern = tavernStyle();
    return(
        <div>
            <div className={tavern.menu}>
                <ul className={tavern.navigation}>
                    <li>
                        <Link to="purchases">Отдых</Link>
                    </li>
                    <li>
                        <Link to="rests">Прейскурант</Link> 
                    </li>
                </ul>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default observer(Tavern);