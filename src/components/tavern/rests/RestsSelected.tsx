import { observer } from "mobx-react-lite";
import { useState } from "react";
import useStore from "../../../hooks/useStore";
import { sectionStyle, sectionButtonStyle } from "../../../styles/Section";
import RestsEdit from "./RestsEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Modal from "../../Modal";

function RestsSelected() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {selectedRest, editRest, deleteRest} = useStore();
    const [modalActiveEditRest, setModalActiveEditRest] = useState(false);

    if (selectedRest) {
        return(
            <div className={section.info}>
                <div className={section.name}>{selectedRest.name}</div>
                <div className={section.description}>{selectedRest?.description}</div>
                <div>Цена за минуту: {selectedRest.cost}</div>
                <div>
                    <DeleteIcon className={sectionButton.buttonFailed} onClick={() => deleteRest(selectedRest.id)}/>
                    <EditIcon className={sectionButton.buttonCancel} onClick={() => setModalActiveEditRest(true)}/>
                </div>
                <Modal active={modalActiveEditRest} setActive={setModalActiveEditRest}>
                    <div className={section.content}>
                        <RestsEdit item={selectedRest}/>
                        <CheckIcon id="editRest" className={sectionButton.buttonComplete} onClick={() => {editRest(selectedRest?.id); setModalActiveEditRest(false)}}/>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return(<></>)
    }
    
}

export default observer(RestsSelected);