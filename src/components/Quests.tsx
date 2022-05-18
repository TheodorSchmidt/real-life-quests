import React, { useState } from "react";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestsList from "./QuestsList";
import Modal from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../styles/Quests";
import QuestsSelected from "./QuestsSelected";
import QuestsAdd from "./QuestsAdd";

function Quests() {
    const quests = questsStyle();
    const {addQuest, cancelSelectingQuest} = useStore();
    const [modalActiveAdd, setModalActiveAdd] = useState(false);
    const [questType, setQuestType] = useState("ACTIVE");

    return(
        <div>
            <div className={quests.menu}>
                <ul className={quests.navigation}>
                    <li onClick={() => {setQuestType("ALL"); cancelSelectingQuest()}}>Все</li>
                    <li onClick={() => {setQuestType("ACTIVE"); cancelSelectingQuest()}}>Активные</li>
                    <li onClick={() => {setQuestType("COMPLETED"); cancelSelectingQuest()}}>Выполненные</li>
                    <li onClick={() => {setQuestType("FAILED"); cancelSelectingQuest()}}>Проваленные</li>    
                </ul>
            </div>
            <button id="createQuest" onClick={() => setModalActiveAdd(true)}>Создать квест</button>
            {/* место для сортировки и фильтров */}
            <QuestsSelected />
            <div className={quests.list}>
                <QuestsList type={questType}/>
            </div>
            <Modal active={modalActiveAdd} setActive={setModalActiveAdd}>
                <div className={quests.content}>
                    <QuestsAdd />
                    <div className={quests.button}>
                        <button id="addQuest" onClick={() => {addQuest(); setModalActiveAdd(false)}}>Добавить</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Quests);