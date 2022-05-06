import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestElement from "./QuestElement";
import {map} from "lodash";
import { Virtuoso } from "react-virtuoso";
import { toJS } from "mobx";
import  Quest  from "../models/Quest";
import QuestsList from "./QuestsList";
import Modal from "./Modal";


const useStyles = createUseStyles({
    'content': {
        transform: 'scale(2)'
    }
})

function Quests() {
    const classes = useStyles();
    const {addQuest, quests} = useStore();
    const [modalActive, setModalActive] = useState(false);
    return(
        <div>
            <button id="createQuest" onClick={() => setModalActive(true)}>Создать квест</button>
            <QuestsList />
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={classes.content}>
                    <input 
                        id="questName"
                        type="text"
                        placeholder="Введите задание"
                    />
                    <button id="addQuest" onClick={() => addQuest()}>Добавить</button>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Quests);