import React, {useState} from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import  Quest  from "../models/Quest";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import toJS from "mobx-react-lite";

type Props = {
    item: Quest
}

const useStyles = createUseStyles({
    'buttonComplete': {
        color: 'black',
        float: 'right',
        '&:hover': {
            color: 'green'
        }
    },
    'buttonFailed': {
        color: 'black',
        float: 'right',
        '&:hover': {
            color: 'red'
        }
    },
    'buttonCancel': {
        color: 'black',
        float: 'right',
        '&:hover': {
            color: 'blue'
        }
    },
    'questBlock': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid'
    },
    'questBlockSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: 'grey'
    },
    'questBlockCompleted': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#3de369'
    },
    'questBlockCompletedSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#114d21'
    },
    'questBlockFailed': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#ff5447'
    },
    'questBlockFailedSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#941a0f'
    }
})

function QuestElement({item}: Props) {
    const classes = useStyles();
    const {deleteQuest, completeQuest, selectQuest, selectedQuest, updateDateDiff} = useStore();
    // if (item.deadline) {
    //     updateDateDiff(item);
    // }
    updateDateDiff(item);
    if (item.status === 1) {
        return(
            <div className={item.id === selectedQuest?.id ? classes.questBlockSelect : classes.questBlock} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <ClearIcon className={classes.buttonFailed} onClick={() => completeQuest(item.id, false, false)}/>
                    <CheckIcon className={classes.buttonComplete} onClick={() => completeQuest(item.id, true, false)}/>
                </div>
            </div>
        )
    } else if (item.status === 2) {
        return(
            <div className={item.id === selectedQuest?.id ? classes.questBlockCompletedSelect : classes.questBlockCompleted} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <KeyboardReturnIcon className={classes.buttonCancel} onClick={() => completeQuest(item.id, true, true)}/>
                </div>
            </div>
        )
    } else if (item.status === 3) {
        return(
            <div className={item.id === selectedQuest?.id ? classes.questBlockFailedSelect : classes.questBlockFailed} onClick={() => selectQuest(item)}>
                {item.name}
                <div>
                    <KeyboardReturnIcon className={classes.buttonCancel} onClick={() => completeQuest(item.id, false, true)}/>
                </div>
            </div>
        )
    } else {
        return(<></>)
    }
}


export default observer(QuestElement);