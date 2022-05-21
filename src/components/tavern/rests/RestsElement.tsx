import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import Rest from "../../../models/Rest";
import RestsEdit from "./RestsEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../../Modal";
import {tavernElementStyle, tavernStyle} from "../../../styles/Tavern";

type Props = {
    item: Rest
}

function RestsElement({item}: Props) {
    const tavern = tavernStyle();
    const tavernElement = tavernElementStyle();
    const {editRest, deleteRest} = useStore();
    const [modalActiveEditRest, setModalActiveEditRest] = useState(false);
    return(
        <div className={tavernElement.questBlock}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>Цена за минуту: {item.cost}</div>
            <div>
                <EditIcon className={tavernElement.buttonCancel} onClick={() => setModalActiveEditRest(true)}/>
                <DeleteIcon className={tavernElement.buttonFailed} onClick={() => deleteRest(item.id)}/>
            </div>
            <Modal active={modalActiveEditRest} setActive={setModalActiveEditRest}>
                <div className={tavern.content}>
                    <RestsEdit item={item}/>
                    <div className={tavern.button}>
                        <button id="editRest" onClick={() => {editRest(item.id); setModalActiveEditRest(false)}}>Изменить отдых</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(RestsElement);