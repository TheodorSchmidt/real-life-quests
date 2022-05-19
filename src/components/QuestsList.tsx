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
    const {quests, searchQuest} = useStore();
    let showedQuests = quests.slice(0);

    if (searchQuest.status !== 0) {
        showedQuests = showedQuests.filter(quest => quest.status == searchQuest.status);
    }
    if (searchQuest.group !== "all") {
        if (searchQuest.group === "default") {
            showedQuests = showedQuests.filter(quest => quest.group === "default" || quest.group === undefined);
        } else {
            showedQuests = showedQuests.filter(quest => quest.group == searchQuest.group)
        }
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