import { observer } from "mobx-react-lite";
import { useState } from "react";
import useStore from "../../../hooks/useStore";
import { tavernStyle } from "../../../styles/Tavern";
import { tavernElementStyle } from "../../../styles/Tavern";
import Datetime from "../../../modules/Datetime";
import RestsEdit from "./RestsEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../../Modal";

function RestsSelected() {
    const tavern = tavernStyle();
    const tavernElement = tavernElementStyle();
    const {selectedRest, editRest, deleteRest} = useStore();
    const [modalActiveEditRest, setModalActiveEditRest] = useState(false);

    if (selectedRest) {
        return(
            <div className={tavern.info}>
                <div className={tavern.name}>{selectedRest.name}</div>
                <div className={tavern.description}>{selectedRest?.description}</div>
                <div>Цена за минуту: {selectedRest.cost}</div>
                <div>
                    <EditIcon className={tavernElement.buttonCancel} onClick={() => setModalActiveEditRest(true)}/>
                    <DeleteIcon className={tavernElement.buttonFailed} onClick={() => deleteRest(selectedRest.id)}/>
                </div>
                <Modal active={modalActiveEditRest} setActive={setModalActiveEditRest}>
                    <div className={tavern.content}>
                        <RestsEdit item={selectedRest}/>
                        <div className={tavern.button}>
                            <button id="editRest" onClick={() => {editRest(selectedRest.id); setModalActiveEditRest(false)}}>Изменить</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return(<></>)
    }
    
}

export default observer(RestsSelected);