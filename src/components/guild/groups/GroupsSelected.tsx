import { observer } from "mobx-react-lite";
import { useState } from "react";
import useStore from "../../../hooks/useStore";
import { sectionStyle, sectionButtonStyle } from "../../../styles/Section";
import GroupsEdit from "./GroupsEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Modal from "../../Modal";

function GroupsSelected() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {selectedGroup, editGroup, deleteGroup} = useStore();
    const [modalActiveEditGroup, setModalActiveEditGroup] = useState(false);


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

    if (selectedGroup) {
        return(
            <div className={section.info}>
                <div className={section.name}>{selectedGroup?.name}</div>
                {printDescription(selectedGroup.description)}
                <div>
                    <EditIcon className={sectionButton.buttonCancel} onClick={() => setModalActiveEditGroup(true)}/>
                    <DeleteIcon className={sectionButton.buttonFailed} onClick={() => deleteGroup(selectedGroup?.id)}/>
                </div>
                <Modal active={modalActiveEditGroup} setActive={setModalActiveEditGroup}>
                    <div className={section.content}>
                        <GroupsEdit item={selectedGroup}/>
                        <CheckIcon id="editGroup" className={sectionButton.buttonComplete} onClick={() => {editGroup(selectedGroup?.id); setModalActiveEditGroup(false)}}/>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return(<></>)
    }
    
}

export default observer(GroupsSelected);