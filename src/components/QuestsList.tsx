import React from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestElement from "./QuestElement";
import {map} from "lodash";
import { Virtuoso } from "react-virtuoso";
import { toJS } from "mobx";
import  Quest  from "../models/Quest";

function QuestsList() {
    const {quests} = useStore();
    
    return(
        <Virtuoso
            style={{ height: "800px", width: "100%"}}
            data={quests}
            itemContent={(index) => {
                return(
                    <QuestElement item={quests[index]} />
                )}
            }
        />
    )
}

export default observer(QuestsList)