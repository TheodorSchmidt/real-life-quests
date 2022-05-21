import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import  Quest  from "../../../models/Quest";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { questsElementStyle } from "../../../styles/Guild";

type Props = {
    item: Quest
}

function QuestsElement({item}: Props) {
    const questsElement = questsElementStyle();
    const {completeQuest, selectQuest, selectedQuest, updateDateDiff} = useStore();
    updateDateDiff(item);
    if (item.status === 1) {
        return(
            <div className={item.id === selectedQuest?.id ? questsElement.questBlockSelect : questsElement.questBlock} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <ClearIcon className={questsElement.buttonFailed} onClick={() => completeQuest(item.id, false, false)}/>
                    <CheckIcon className={questsElement.buttonComplete} onClick={() => completeQuest(item.id, true, false)}/>
                </div>
            </div>
        )
    } else if (item.status === 2) {
        return(
            <div className={item.id === selectedQuest?.id ? questsElement.questBlockCompletedSelect : questsElement.questBlockCompleted} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <KeyboardReturnIcon className={questsElement.buttonCancel} onClick={() => completeQuest(item.id, true, true)}/>
                </div>
            </div>
        )
    } else if (item.status === 3) {
        return(
            <div className={item.id === selectedQuest?.id ? questsElement.questBlockFailedSelect : questsElement.questBlockFailed} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <KeyboardReturnIcon className={questsElement.buttonCancel} onClick={() => completeQuest(item.id, false, true)}/>
                </div>
            </div>
        )
    } else {
        return(<></>)
    }
}


export default observer(QuestsElement);