import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import Rest from "../../../models/Rest";
import {sectionElementStyle} from "../../../styles/Section";

type Props = {
    item: Rest
}

function RestsElement({item}: Props) {
    const sectionElement = sectionElementStyle();
    const {selectedRest, selectRest} = useStore();
    return(
        <div className={item.id === selectedRest?.id ? sectionElement.blockSelect : sectionElement.block} onClick={() => selectRest(item)}>
            <div>{item.name}</div>
        </div>
    )
}

export default observer(RestsElement);