import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import Purchase from "../../../models/Purchase";
import PurchasesEdit from "./PurchasesEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {tavernElementStyle} from "../../../styles/Tavern";

type Props = {
    item: Purchase
}

function PurchasesElement({item}: Props) {
    const tavernElement = tavernElementStyle();
    const {cancelPurchase, selectPurchase, selectedPurchase} = useStore();
    return(
        <div className={item.id === selectedPurchase?.id ? tavernElement.questBlockSelect : tavernElement.questBlock} onClick={() => selectPurchase(item)}>
            <div>{item.name}</div>
            <div>
                <KeyboardReturnIcon className={tavernElement.buttonCancel} onClick={() => cancelPurchase(item)}/>
            </div>
        </div>
    )
}

export default observer(PurchasesElement);