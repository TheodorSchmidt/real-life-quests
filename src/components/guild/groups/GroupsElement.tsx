import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import { sectionElementStyle } from "../../../styles/Section";
import Group from "../../../models/Group";

type Props = {
    item: Group
}

function GroupsElement({item}: Props) {
    const sectionElement = sectionElementStyle();
    const {selectGroup, selectedGroup} = useStore();

    return(
        <div className={item.id === selectedGroup?.id ? sectionElement.blockSelect : sectionElement.block} onClick={() => selectGroup(item)}>
            <div>{item.name}</div>
        </div>
    )
}


export default observer(GroupsElement);