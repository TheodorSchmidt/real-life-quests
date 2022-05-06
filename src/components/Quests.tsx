import React from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestElement from "./QuestElement";
import {map} from "lodash";
import { Virtuoso } from "react-virtuoso";
import { toJS } from "mobx";
import  Quest  from "../models/Quest";
import QuestsList from "./QuestsList";

type Props = {
    item: Quest
}

function Quests() {
    const {addQuest, quests} = useStore();
    
    return(
        <div>
            {/* Здесь должна быть кнопка вызывающая модальное окно */}
            <input 
              id="questName"
              type="text"
              placeholder="Введите задание"
            />
            <button id="addQuest" onClick={() => addQuest()} >Добавить</button>
            <QuestsList />
        </div>
    )
}

export default observer(Quests);