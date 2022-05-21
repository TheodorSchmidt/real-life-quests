import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import Purchase from "../../../models/Purchase";
import PurchasesEdit from "./PurchasesEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Modal from "../../Modal";
import {tavernElementStyle, tavernStyle} from "../../../styles/Tavern";

type Props = {
    item: Purchase
}

function PurchasesElement({item}: Props) {
    const tavern = tavernStyle();
    const tavernElement = tavernElementStyle();
    const {editPurchase, deletePurchase, cancelPurchase} = useStore();
    const [modalActiveEditPurchase, setModalActiveEditPurchase] = useState(false);
    return(
        <div className={tavernElement.questBlock}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>Цена за минуту: {item.cost}</div>
            <div>Количество минут: {item.minutes}</div>
            <div>Итоговая стоимость: {item.price}</div>
            <div>
                <EditIcon className={tavernElement.buttonCancel} onClick={() => setModalActiveEditPurchase(true)}/>
                <DeleteIcon className={tavernElement.buttonFailed} onClick={() => deletePurchase(item.id)}/>
                <KeyboardReturnIcon className={tavernElement.buttonCancel} onClick={() => cancelPurchase(item)}/>

            </div>
            <Modal active={modalActiveEditPurchase} setActive={setModalActiveEditPurchase}>
                <div className={tavern.content}>
                    <PurchasesEdit item={item}/>
                    <div className={tavern.button}>
                        <button id="editPurchase" onClick={() => {editPurchase(item.id); setModalActiveEditPurchase(false)}}>Изменить покупку</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(PurchasesElement);