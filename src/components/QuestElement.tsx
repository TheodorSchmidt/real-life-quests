import React from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import  Quest  from "../models/Quest";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

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
    'questBlockCompleted': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#3de369'
    },
    'questBlockFailed': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#ff5447'
    }
})

function QuestElement({item}: Props) {
    const classes = useStyles();
    const {deleteQuest, completeQuest, selectQuest} = useStore();
    
    if (item.status === 1) {
        return(
            <div className={classes.questBlock} onClick={() => selectQuest(item)}>
                {item.name} - {item.reward}
                <div>
                    <ClearIcon className={classes.buttonFailed} onClick={() => completeQuest(item.id, false, false)}/>
                    <CheckIcon className={classes.buttonComplete} onClick={() => completeQuest(item.id, true, false)}/>
                </div>
            </div>
        )
    } else if (item.status === 2) {
        return(
            <div className={classes.questBlockCompleted} onClick={() => selectQuest(item)}>
                {item.name} - {item.reward}
                <div>
                    <KeyboardReturnIcon className={classes.buttonCancel} onClick={() => completeQuest(item.id, true, true)}/>
                </div>
            </div>
        )
    } else {
        return(
            <div className={classes.questBlockFailed} onClick={() => selectQuest(item)}>
                {item.name} - {item.reward}
                <div>
                    <KeyboardReturnIcon className={classes.buttonCancel} onClick={() => completeQuest(item.id, false, true)}/>
                </div>
            </div>
        )
    }
}

export default observer(QuestElement);