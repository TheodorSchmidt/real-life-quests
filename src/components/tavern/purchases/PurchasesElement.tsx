import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import Purchase from "../../../models/Purchase";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {sectionElementStyle, sectionButtonStyle} from "../../../styles/Section";

type Props = {
    item: Purchase
}

function PurchasesElement({item}: Props) {
    const sectionElement = sectionElementStyle();
    const sectionButton = sectionButtonStyle();
    const {cancelPurchase, selectPurchase, selectedPurchase} = useStore();
    return(
        <div className={item.id === selectedPurchase?.id ? sectionElement.blockSelect : sectionElement.block} onClick={() => selectPurchase(item)}>
            <div>{item.name}</div>
            <div>
                <KeyboardReturnIcon className={sectionButton.buttonCancel} onClick={() => cancelPurchase(item)}/>
            </div>
        </div>
    )
}

export default observer(PurchasesElement);