import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import { sectionStyle } from "../../styles/Section";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    Outlet
} from "react-router-dom"; 

function Guild() {
    const section = sectionStyle();
    return(
        <div>
            <div className={section.menu}>
                <ul className={section.navigation}>
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