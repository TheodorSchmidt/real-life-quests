import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import Rest from "../../../models/Rest";
import {tavernElementStyle} from "../../../styles/Tavern";

type Props = {
    item: Rest
}

function RestsElement({item}: Props) {
    const tavernElement = tavernElementStyle();
    const {selectedRest, selectRest} = useStore();
    return(
        <div className={item.id === selectedRest?.id ? tavernElement.questBlockSelect : tavernElement.questBlock} onClick={() => selectRest(item)}>
            <div>{item.name}</div>
        </div>
    )
}

export default observer(RestsElement);