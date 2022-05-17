import React from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestElement from "./QuestElement";
import {map} from "lodash";
import { Virtuoso } from "react-virtuoso";
import { toJS } from "mobx";
import  Quest  from "../models/Quest";


type Props = {
    type: string,
}

function QuestsList({type}: Props) {
    const {quests} = useStore();
    let showedQuests = quests.slice(0);
    if (type === "ACTIVE") {
        showedQuests = showedQuests.filter(quest => quest.status === 1)
    } else if (type === "COMPLETED") {
        showedQuests = showedQuests.filter(quest => quest.status === 2)
    } else if (type === "FAILED") {
        showedQuests = showedQuests.filter(quest => quest.status === 3)
    }
    
    return(
        <Virtuoso
            style={{ height: "800px", width: "100%"}}
            data={showedQuests}
            itemContent={(index) => {
                return(
                    <QuestElement item={showedQuests[index]} />
                )}
            }
        />
    )
}

export default observer(QuestsList)