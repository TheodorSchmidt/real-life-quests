import { observer } from "mobx-react-lite";
import { useState } from "react";
import useStore from "../../../hooks/useStore";
import { sectionStyle, sectionElementStyle, sectionButtonStyle } from "../../../styles/Section";
import Datetime from "../../../modules/Datetime";
import PurchasesEdit from "./PurchasesEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Modal from "../../Modal";

function PurchasesSelected() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {selectedPurchase, editPurchase, deletePurchase} = useStore();
    const [modalActiveEditPurchase, setModalActiveEditPurchase] = useState(false);

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

    if (selectedPurchase) {
        return(
            <div className={section.info}>
                <div className={section.name}>{selectedPurchase?.name}</div>
                {printDescription(selectedPurchase.description)}
                <div>Дата: {Datetime.dateToString(selectedPurchase?.dateBuy)}</div>
                <div>Время: {selectedPurchase.minutes}</div>
                <div>Цена: {selectedPurchase.price}</div>
                <div>
                    <DeleteIcon className={sectionButton.buttonFailed} onClick={() => deletePurchase(selectedPurchase.id)}/>
                    <EditIcon className={sectionButton.buttonCancel} onClick={() => setModalActiveEditPurchase(true)}/>
                </div>
                <Modal active={modalActiveEditPurchase} setActive={setModalActiveEditPurchase}>
                    <div className={section.content}>
                        <PurchasesEdit item={selectedPurchase}/>
                        <CheckIcon id="editPurchase" className={sectionButton.buttonComplete} onClick={() => {editPurchase(selectedPurchase?.id); setModalActiveEditPurchase(false)}}/>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return(<></>)
    }
    
}

export default observer(PurchasesSelected);