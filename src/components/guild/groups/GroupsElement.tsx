import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import {questsElementStyle} from "../../../styles/Guild";
import Group from "../../../models/Group";

type Props = {
    item: Group
}

function GroupsElement({item}: Props) {
    const groupsElement = questsElementStyle();
    const {selectGroup, selectedGroup} = useStore();

    return(
        <div className={item.id === selectedGroup?.id ? groupsElement.questBlockSelect : groupsElement.questBlock} onClick={() => selectGroup(item)}>
            <div>{item.name}</div>
        </div>
    )
}


export default observer(GroupsElement);