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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { buttonStyle } from "../styles/Button";

function QuestsGroup() {
    const quests = questsStyle();
    const buttons = buttonStyle();
    const {addQuest, addGroup, cancelSelectingQuest, groups, editGroup, deleteGroup, searchQuest, findGroupById} = useStore();
    const [modalActiveEditGroup, setModalActiveEditGroup] = useState(false);

    if (searchQuest.group !== "default" && searchQuest.group !== "all" && searchQuest.group) {
        const group = findGroupById(searchQuest.group)
        return(
            <div>
                <p>
                    {group?.name}
                    <DeleteIcon id="deleteGroup" className={buttons.buttonFailed} onClick={() => deleteGroup(group?.id)}/>
                    <EditIcon id="editGroup" className={buttons.buttonEdit} onClick={() => setModalActiveEditGroup(true)}/>
                </p>
                <div>{group?.description}</div>
                <Modal active={modalActiveEditGroup} setActive={setModalActiveEditGroup}>
                    <div className={quests.content}>
                        <div>
                            <p>Изменить группу</p>
                            <div key={group?.name}>
                                <input 
                                    id="groupNameE"
                                    type="text"
                                    defaultValue={group?.name}
                                    placeholder="Введите название *"
                                />
                            </div>
                            <div key={group?.description}>
                                <textarea id="groupDescriptionE" defaultValue={group?.description} placeholder="Введите описание"></textarea>
                            </div>
                        </div>
                        <div className={quests.button}>
                            <button id="editGroup" onClick={() => {editGroup(group?.id); setModalActiveEditGroup(false)}}>Изменить группу</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    } else if (searchQuest.group === "default") {
        return(
            <div>
                Без группы
            </div>
        )
    } else {
        return(<></>)
    }
}

export default observer(QuestsGroup);