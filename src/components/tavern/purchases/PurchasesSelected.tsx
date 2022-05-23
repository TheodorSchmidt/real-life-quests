import { observer } from "mobx-react-lite";
import { useState } from "react";
import useStore from "../../../hooks/useStore";
import { tavernStyle } from "../../../styles/Tavern";
import { tavernElementStyle } from "../../../styles/Tavern";
import Datetime from "../../../modules/Datetime";
import PurchasesEdit from "./PurchasesEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../../Modal";

function PurchasesSelected() {
    const tavern = tavernStyle();
    const tavernElement = tavernElementStyle();
    const {selectedPurchase, editPurchase, deletePurchase} = useStore();
    const [modalActiveEditPurchase, setModalActiveEditPurchase] = useState(false);

    if (selectedPurchase) {
        return(
            <div className={tavern.info}>
                <div className={tavern.name}>{selectedPurchase?.name}</div>
                <div className={tavern.description}>{selectedPurchase?.description}</div>
                <div>Дата: {Datetime.dateToString(selectedPurchase?.dateBuy)}</div>
                <div>Время: {selectedPurchase.minutes}</div>
                <div>Цена: {selectedPurchase.price}</div>
                <div>
                    <EditIcon className={tavernElement.buttonCancel} onClick={() => setModalActiveEditPurchase(true)}/>
                    <DeleteIcon className={tavernElement.buttonFailed} onClick={() => deletePurchase(selectedPurchase.id)}/>
                </div>
                <Modal active={modalActiveEditPurchase} setActive={setModalActiveEditPurchase}>
                    <div className={tavern.content}>
                        <PurchasesEdit item={selectedPurchase}/>
                        <div className={tavern.button}>
                            <button id="editPurchase" onClick={() => {editPurchase(selectedPurchase.id); setModalActiveEditPurchase(false)}}>Изменить</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return(<></>)
    }
    
}

export default observer(PurchasesSelected);