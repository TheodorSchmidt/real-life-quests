import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import Modal from "../../Modal";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../../../styles/Guild";
import Group from "../../../models/Group";
import { buttonStyle } from "../../../styles/Button";
import GroupsAdd from "./GroupsAdd";
import GroupsList from "./GroupsList";

function Groups() {
    const quests = questsStyle();
    const {addGroup} = useStore();
    const [modalActiveAddGroup, setModalActiveAddGroup] = useState(false);

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