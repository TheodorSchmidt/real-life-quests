import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import  { DateCoefficient }  from "../../../models/Quest";
import Modal from "../../Modal";
import "react-datepicker/dist/react-datepicker.css";
import QuestsEdit from "./QuestsEdit";
import Datetime from "../../../modules/Datetime";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { sectionStyle, sectionElementStyle, sectionButtonStyle } from "../../../styles/Section";

function QuestsSelected() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {selectedQuest, deleteQuest, editQuest, findGroupById, findCharacterById, } = useStore();
    const [modalActiveEditQuest, setModalActiveEditQuest] = useState(false);

    function printDescription(description: string | undefined) {
        if (description && description !== "") {
            return(
                <div className={section.description}>{description}</div>
            ) 
        } else {
            return(
                <></>
            )
        }
    }

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
                const percent = Math.round(modificator * 100 - 100);
                return(<div>Бонус +{percent}%</div>)
            } else if (modificator < 1) {
                const percent = Math.round(100 - modificator * 100);
                return(<div>Штраф -{percent}%</div>)
            } else {
                return(<div>Бонусы и штрафы отсутствуют</div>)
            }
        } else {
            return(<></>)
        }
    }

    function printGroup(groupId : string | undefined) {
        if (groupId) {
            const group = findGroupById(groupId);
            if (group) {
                return(<div>Группа: {group.name}</div>)
            } else {
                return(<div>Группа: без группы</div>)
            }
        } else {
            return(<></>)
        }
    }

    function printCharacter(characterId: string | undefined) {
        if (characterId) {
            const character = findCharacterById(characterId);
            if (character) {
                return(<div>Персонаж: {character.nickname}</div>)
            } else {
                return(<div>Персонаж: без персонажа</div>)
            }
        } else {
            return(<></>)
        }
    }

    function printCoefficient(coefficient: number) {
        if (coefficient === 0.25) {
            return(<span>1/5</span>)
        } else if (coefficient === 0.5) {
            return(<span>2/5</span>)
        } else if (coefficient === 1) {
            return(<span>3/5</span>)
        } else if (coefficient === 1.5) {
            return(<span>4/5</span>)
        } else {
            return(<span>5/5</span>)
        }
    }

    if (selectedQuest) {
        if (selectedQuest.status === 1) {
            return(
                <div className={section.info}>
                    <div className={section.name}>{selectedQuest?.name}</div>
                    {printDescription(selectedQuest.description)}
                    <div>Статус: в процессе</div>
                    <div>Сложность: {printCoefficient(selectedQuest.difficulty)}</div>  
                    <div>Важность: {printCoefficient(selectedQuest.importancy)}</div>  
                    <div>Мотивация: {printCoefficient(selectedQuest.motivation)}</div>
                    <br/>
                    {printGroup(selectedQuest.group)}
                    {printCharacter(selectedQuest.character)}
                    <br/>
                    <div>Крайний срок: {printDate(selectedQuest.deadline)}</div>
                    {printDaysDifference(selectedQuest.dateDifference)}
                    {printDateModif(selectedQuest.dateModif)}
                    <div>Награда: {selectedQuest.reward}</div> 
                    <div>
                        <DeleteIcon className={sectionButton.buttonFailed} onClick={() => deleteQuest(selectedQuest?.id)}/>
                        <EditIcon className={sectionButton.buttonCancel} onClick={() => setModalActiveEditQuest(true)}/>
                    </div>
                    <Modal active={modalActiveEditQuest} setActive={setModalActiveEditQuest}>
                        <div className={section.content}>
                            <QuestsEdit/>
                            <CheckIcon id="editQuest" className={sectionButton.buttonComplete} onClick={() => {editQuest(selectedQuest?.id); setModalActiveEditQuest(false)}}/>
                        </div>
                    </Modal>
                </div>
            )
        } else if (selectedQuest.status === 2) {
            return(
                <div className={section.info}>
                    <div className={section.name}>{selectedQuest?.name}</div>
                    {printDescription(selectedQuest.description)}
                    <div>Статус: выполнено</div>
                    <div>Сложность: {printCoefficient(selectedQuest.difficulty)}</div>  
                    <div>Важность: {printCoefficient(selectedQuest.importancy)}</div>  
                    <div>Мотивация: {printCoefficient(selectedQuest.motivation)}</div> 
                    <br/>
                    {printGroup(selectedQuest.group)}
                    {printCharacter(selectedQuest.character)}
                    <br/>
                    <div>Дата выполнения: {printDate(selectedQuest.dateComplete)}</div>
                    <div>Полученные очки: {selectedQuest.reward}</div>
                    <DeleteIcon className={sectionButton.buttonFailed} onClick={() => deleteQuest(selectedQuest?.id)}/>
                </div>
            )
        } else {
            return(
                <div className={section.info}>
                    <div className={section.name}>{selectedQuest?.name}</div>
                    {printDescription(selectedQuest.description)}
                    <div>Статус: провалено</div>
                    <div>Сложность: {printCoefficient(selectedQuest.difficulty)}</div>  
                    <div>Важность: {printCoefficient(selectedQuest.importancy)}</div>  
                    <div>Мотивация: {printCoefficient(selectedQuest.motivation)}</div>
                    <br />
                    {printGroup(selectedQuest.group)}
                    {printCharacter(selectedQuest.character)}
                    <DeleteIcon className={sectionButton.buttonFailed} onClick={() => deleteQuest(selectedQuest?.id)}/>
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