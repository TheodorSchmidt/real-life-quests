import React, { useState } from "react";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import  Quest  from "../models/Quest";
import Modal from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../styles/Quests";
import QuestsEdit from "./QuestsEdit";

function QuestsSelected() {
    const quests = questsStyle();
    const {selectedQuest, deleteQuest, editQuest} = useStore();
    const [modalActiveEdit, setModalActiveEdit] = useState(false);

    if (selectedQuest) {
        if (selectedQuest.status === 1) {
            return(
                <div className={quests.info}>
                        <div className={quests.name}>{selectedQuest?.name}</div>
                        <div>Статус: в процессе</div>
                        <div className={quests.description}>{selectedQuest?.description}</div>
                        <div>Награда: {selectedQuest.reward}</div>
                        <div>Крайний срок: {selectedQuest.deadline?.toString()}</div>
                        <div>
                            Осталось: {selectedQuest.dateDifference} дня
                        </div> 
                        <button onClick={() => setModalActiveEdit(true)}>Редактировать квест</button>
                        <button onClick={() => deleteQuest(selectedQuest.id)}>Удалить квест</button>
                        <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
                            <div className={quests.content}>
                                <QuestsEdit/>
                                <div className={quests.button}>
                                    <button id="editQuest" onClick={() => {editQuest(selectedQuest?.id); setModalActiveEdit(false)}}>Изменить</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
            )
        } else if (selectedQuest.status === 2) {
            return(
                <div className={quests.info}>
                    <div className={quests.name}>{selectedQuest?.name}</div>
                    <div>Статус: выполнено</div>
                    <div className={quests.description}>{selectedQuest?.description}</div>
                    <div>Дата выполнения: {selectedQuest?.dateComplete?.toString()}</div>
                    <div>Полученные очки: {selectedQuest.reward}</div>
                    <button onClick={() => deleteQuest(selectedQuest.id)}>Удалить запись</button>
                </div>
            )
        } else {
            return(
                <div className={quests.info}>
                    <div className={quests.name}>{selectedQuest?.name}</div>
                    <div>Статус: провалено</div>
                    <div className={quests.description}>{selectedQuest?.description}</div>
                    {/* <div>Дата выполнения: {selectedQuest?.dateComplete?.toString()}</div>
                    <div>Полученные очки: {selectedQuest.reward}</div> */}
                    <button onClick={() => deleteQuest(selectedQuest.id)}>Удалить запись</button>
                </div>
            )
        }
    } else {
        return(
            <></>
        )
    }
}

export default observer(QuestsSelected);