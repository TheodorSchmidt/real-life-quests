import React from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import  Quest  from "../models/Quest";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
type Props = {
    item: Quest
}

const useStyles = createUseStyles({
    'button': {
        pointer: 'cursor'
    }
})

function QuestElement({item}: Props) {
    const classes = useStyles();
    const {deleteQuest} = useStore();
    return(
        <div>
            {item.name} <DeleteIcon className={classes.button} onClick={() => deleteQuest(item.id)}/>
        </div>
    )
}

export default observer(QuestElement);