import React, { useState } from "react";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestsList from "./QuestsList";
import Modal from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../styles/Quests";
import QuestsSelected from "./QuestsSelected";
import QuestsAdd from "./QuestsAdd";
import Group from "../models/Group";
import QuestsGroup from "./QuestsGroup";
import EditIcon from '@mui/icons-material/Edit'
import { buttonStyle } from "../styles/Button";

function Quests() {
    const quests = questsStyle();
    const buttons = buttonStyle();
    const {addQuest, addGroup, groups, saveSearchOptions, setSearchOptions} = useStore();
    const [modalActiveAddQuest, setModalActiveAddQuest] = useState(false);
    const [modalActiveAddGroup, setModalActiveAddGroup] = useState(false);

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
            <button id="createGroup" onClick={() => setModalActiveAddGroup(true)}>Создать группу</button>
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
                            {groups.map(g => printGroup(g))}
                        </select>
                    </li>
                </ul>
            </div>
            <QuestsGroup/>
            <QuestsSelected/>
            <div className={quests.list}>
                <QuestsList/>
            </div>
            <Modal active={modalActiveAddQuest} setActive={setModalActiveAddQuest}>
                <div className={quests.content}>
                    <QuestsAdd />
                    <div className={quests.button}>
                        <button id="addQuest" onClick={() => {addQuest(); setModalActiveAddQuest(false)}}>Добавить</button>
                    </div>
                </div>
            </Modal>
            <Modal active={modalActiveAddGroup} setActive={setModalActiveAddGroup}>
                <div className={quests.content}>
                    <div>
                        <p>Создать группу</p>
                        <input 
                            id="groupName"
                            type="text"
                            placeholder="Введите название *"
                        />
                        <div>
                            <textarea id="groupDescription" placeholder="Введите описание"></textarea>
                        </div>
                    </div>
                    <div className={quests.button}>
                        <button id="addGroup" onClick={() => {addGroup(); setModalActiveAddGroup(false)}}>Создать группу</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Quests);