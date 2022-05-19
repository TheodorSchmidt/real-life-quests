import React, { useState } from "react";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import  Quest, { DateCoefficient }  from "../models/Quest";
import Modal from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../styles/Quests";
import QuestsEdit from "./QuestsEdit";
import Datetime from "../modules/Datetime";

function QuestsSelected() {
    const quests = questsStyle();
    const {selectedQuest, deleteQuest, editQuest, updateDateDiff} = useStore();
    const [modalActiveEdit, setModalActiveEdit] = useState(false);


    function printDate(date: Date | undefined) {
        if (date) {
            return (<span>{Datetime.dateToString(date)}</span>);
        } else {
            return (<span>Нет</span>)
        }
    }

    function printDaysDifference(difference : number | undefined) {
        if (difference !== undefined) {
            if (difference > 0) {
                return(<div>Осталось {difference} дня</div>)
            } else if (difference < 0){
                return(<div>Просрочено на {-difference} дня</div>)
            } else {
                return(<div>Истекает сегодня</div>)
            }
        } else {
            return(<></>)
        }
    }

    function printDateModif(modificator : DateCoefficient | undefined) {
        if (modificator) {
            if (modificator > 1) {
                const percent = modificator / 10 * 100;
                return(<div>Бонус +{modificator}%</div>)
            } else if (modificator < 1) {
                const percent = 100 - modificator * 100;
                return(<div>Штраф -{percent}%</div>)
            } else {
                return(<div>Бонусы и штрафы отсутствуют</div>)
            }
        } else {
            return(<></>)
        }
    }

    if (selectedQuest) {
        if (selectedQuest.status === 1) {
            // updateDateDiff(selectedQuest);
            return(
                <div className={quests.info}>
                        <div className={quests.name}>{selectedQuest?.name}</div>
                        <div>Статус: в процессе</div>
                        <div className={quests.description}>{selectedQuest?.description}</div>
                        <div>Крайний срок: {printDate(selectedQuest.deadline)}</div>
                        {printDaysDifference(selectedQuest.dateDifference)}
                        {printDateModif(selectedQuest.dateModif)}
                        <div>Награда: {selectedQuest.reward}</div>
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
                    <div>Дата выполнения: {printDate(selectedQuest.dateComplete)}</div>
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
                    {/* <div>Дата выполнения: {Datetime.dateToString(selectedQuest?.dateComplete)}</div>
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