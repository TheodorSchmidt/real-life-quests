import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestsList from "./QuestsList";
import Modal from "../../Modal";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../../../styles/Guild";
import QuestsSelected from "./QuestsSelected";
import QuestsAdd from "./QuestsAdd";
import Group from "../../../models/Group";
import EditIcon from '@mui/icons-material/Edit'
import { buttonStyle } from "../../../styles/Button";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    Outlet
} from "react-router-dom"; 

function Quests() {
    const quests = questsStyle();
    const buttons = buttonStyle();
    const {addQuest, getGroups, setSearchOptions} = useStore();
    const [modalActiveAddQuest, setModalActiveAddQuest] = useState(false);

    function printGroup(group : Group) {
        return(<option value={group.id}>{group.name}</option>)
    }

    const filterStatus: HTMLSelectElement | null = document.querySelector('#questStatusFilter');
    filterStatus?.addEventListener('change', function() {
        setSearchOptions("status", this.value);
    })
    const filterGroup: HTMLSelectElement | null = document.querySelector('#questGroupFilter');
    filterGroup?.addEventListener('change', function() {
        setSearchOptions("group", this.value);
    })

    return(
        <div>
            <button id="createQuest" onClick={() => setModalActiveAddQuest(true)}>Создать квест</button>
            <div className={quests.menu}>
                <ul className={quests.navigation}>
                    <li>Фильтрация</li>
                    <li>   
                        <select id="questStatusFilter" name="status">
                            <option value="0">Все</option>
                            <option selected value="1">Активные</option>
                            <option value="2">Выполненные</option>
                            <option value="3">Проваленные</option>
                        </select>
                    </li>
                    <li>
                        <select id="questGroupFilter" name="group">
                            <option selected value="all">Все</option>
                            <option value="default">Без группы</option>
                            {getGroups().map(g => printGroup(g))}
                        </select>
                    </li>
                </ul>
            </div>
            <QuestsSelected/>
            <QuestsList/>
            <Modal active={modalActiveAddQuest} setActive={setModalActiveAddQuest}>
                <div className={quests.content}>
                    <QuestsAdd />
                    <div className={quests.button}>
                        <button id="addQuest" onClick={() => {addQuest(); setModalActiveAddQuest(false)}}>Добавить</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Quests);