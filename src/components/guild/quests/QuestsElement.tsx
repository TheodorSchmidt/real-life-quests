import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import  Quest  from "../../../models/Quest";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {sectionButtonStyle, sectionElementStyle} from "../../../styles/Section";

type Props = {
    item: Quest
}

function QuestsElement({item}: Props) {
    const sectionElement = sectionElementStyle();
    const sectionButton = sectionButtonStyle();
    const {completeQuest, selectQuest, selectedQuest, updateDateDiff} = useStore();
    updateDateDiff(item);
    if (item.status === 1) {
        return(
            <div className={item.id === selectedQuest?.id ? sectionElement.blockSelect : sectionElement.block} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <ClearIcon className={sectionButton.buttonFailed} onClick={() => completeQuest(item.id, false, false)}/>
                    <CheckIcon className={sectionButton.buttonComplete} onClick={() => completeQuest(item.id, true, false)}/>
                </div>
            </div>
        )
    } else if (item.status === 2) {
        return(
            <div className={item.id === selectedQuest?.id ? sectionElement.blockCompletedSelect : sectionElement.blockCompleted} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <KeyboardReturnIcon className={sectionButton.buttonCancel} onClick={() => completeQuest(item.id, true, true)}/>
                </div>
            </div>
        )
    } else if (item.status === 3) {
        return(
            <div className={item.id === selectedQuest?.id ? sectionElement.blockFailedSelect : sectionElement.blockFailed} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <KeyboardReturnIcon className={sectionButton.buttonCancel} onClick={() => completeQuest(item.id, false, true)}/>
                </div>
            </div>
        )
    } else {
        return(<></>)
    }
}


export default observer(QuestsElement);