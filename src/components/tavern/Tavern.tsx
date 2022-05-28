import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    Outlet
} from "react-router-dom"; 
import { sectionStyle } from "../../styles/Section";

function Tavern() {
    const section = sectionStyle();
    return(
        <div>
            <div className={section.menu}>
                <ul className={section.navigation}>
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