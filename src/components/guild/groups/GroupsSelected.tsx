import { observer } from "mobx-react-lite";
import { useState } from "react";
import useStore from "../../../hooks/useStore";
import { questsStyle } from "../../../styles/Guild";
import { questsElementStyle } from "../../../styles/Guild";
import GroupsEdit from "./GroupsEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../../Modal";

function GroupsSelected() {
    const groups = questsStyle();
    const groupsElement = questsElementStyle();
    const {selectedGroup, editGroup, deleteGroup} = useStore();
    const [modalActiveEditGroup, setModalActiveEditGroup] = useState(false);

    if (selectedGroup) {
        return(
            <div className={groups.info}>
                <div className={groups.name}>{selectedGroup?.name}</div>
                <div className={groups.description}>{selectedGroup?.description}</div>
                <div>
                    <EditIcon className={groupsElement.buttonCancel} onClick={() => setModalActiveEditGroup(true)}/>
                    <DeleteIcon className={groupsElement.buttonFailed} onClick={() => deleteGroup(selectedGroup?.id)}/>
                </div>
                <Modal active={modalActiveEditGroup} setActive={setModalActiveEditGroup}>
                    <div className={groups.content}>
                        <GroupsEdit item={selectedGroup}/>
                        <div className={groups.button}>
                            <button id="editGroup" onClick={() => {editGroup(selectedGroup?.id); setModalActiveEditGroup(false)}}>Изменить</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return(<></>)
    }
    
}

export default observer(GroupsSelected);