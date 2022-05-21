import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import {questsElementStyle, questsStyle} from "../../../styles/Guild";
import Group from "../../../models/Group";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../../Modal";
import GroupsEdit from "./GroupsEdit";

type Props = {
    item: Group
}

function QuestElement({item}: Props) {
    const groupsElement = questsElementStyle();
    const group = questsStyle();
    const {deleteGroup, editGroup} = useStore();
    const [modalActiveEditGroup, setModalActiveEditGroup] = useState(false);

    return(
        <div className={groupsElement.questBlock}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>
                <EditIcon className={groupsElement.buttonCancel} onClick={() => setModalActiveEditGroup(true)}/>
                <DeleteIcon className={groupsElement.buttonFailed} onClick={() => deleteGroup(item.id)}/>
            </div>
            <Modal active={modalActiveEditGroup} setActive={setModalActiveEditGroup}>
                <div className={group.content}>
                    <GroupsEdit item={item}/>
                    <div className={group.button}>
                        <button id="editGroup" onClick={() => {editGroup(item.id); setModalActiveEditGroup(false)}}>Изменить группу</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}


export default observer(QuestElement);