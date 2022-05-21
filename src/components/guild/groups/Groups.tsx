import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestsList from "../tasks/QuestsList";
import Modal from "../../Modal";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../../../styles/Guild";
import QuestsSelected from "../tasks/QuestsSelected";
import QuestsAdd from "../tasks/QuestsAdd";
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
import GroupsAdd from "./GroupsAdd";
import GroupsList from "./GroupsList";

function Groups() {
    const quests = questsStyle();
    const buttons = buttonStyle();
    const {addQuest, addGroup, groups, saveSearchOptions, setSearchOptions} = useStore();
    const [modalActiveAddGroup, setModalActiveAddGroup] = useState(false);

    function printGroup(group : Group) {
        return(<option value={group.id}>{group.name}</option>)
    }

    return(
        <div>
            <button id="createGroup" onClick={() => setModalActiveAddGroup(true)}>Создать группу</button>
            <GroupsList/>
            <Modal active={modalActiveAddGroup} setActive={setModalActiveAddGroup}>
                <div className={quests.content}>
                    <GroupsAdd/>
                    <div className={quests.button}>
                        <button id="addGroup" onClick={() => {addGroup(); setModalActiveAddGroup(false)}}>Создать группу</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Groups);