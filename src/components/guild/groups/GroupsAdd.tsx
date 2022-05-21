import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import { questsStyle } from "../../../styles/Guild";
import Group from "../../../models/Group";


function GroupsAdd() {
    const quests = questsStyle();
    const [deadline, setDeadline,] = useState(new Date());
    const {groups} = useStore();

    return(
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
    )
}

export default observer(GroupsAdd);