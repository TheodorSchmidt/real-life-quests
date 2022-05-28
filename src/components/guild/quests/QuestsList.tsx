import React from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestsElement from "./QuestsElement";
import { Virtuoso } from "react-virtuoso";


function QuestsList() {
    const {quests, filterQuest, sortQuest} = useStore();
    let showedQuests = quests.slice(0);

    if (filterQuest.status != 0) {
        showedQuests = showedQuests.filter(quest => quest.status == filterQuest.status);
    }
    if (filterQuest.group !== "all") {
        if (filterQuest.group === "default") {
            showedQuests = showedQuests.filter(quest => quest.group === "default" || quest.group === undefined);
        } else {
            showedQuests = showedQuests.filter(quest => quest.group == filterQuest.group);
        }
    }
    if (filterQuest.character !== "all") {
        if (filterQuest.character === "default") {
            showedQuests = showedQuests.filter(quest => quest.character === "default" || quest.character === undefined);
        } else {
            showedQuests = showedQuests.filter(quest => quest.character == filterQuest.character);
        }
    }
    if (sortQuest.attr !== "default") {
        if (sortQuest.attr === "reward") {
            if (sortQuest.isDown) {
                showedQuests = showedQuests.sort((questA, questB) => questB.reward - questA.reward);
            } else {
                showedQuests = showedQuests.sort((questA, questB) => questA.reward - questB.reward);
            }
        } else if (sortQuest.attr === "difficulty") {
            if (sortQuest.isDown) {
                showedQuests = showedQuests.sort((questA, questB) => questB.difficulty - questA.difficulty);
            } else {
                showedQuests = showedQuests.sort((questA, questB) => questA.difficulty - questB.difficulty);
            }
        } else if (sortQuest.attr === "importancy") {
            if (sortQuest.isDown) {
                showedQuests = showedQuests.sort((questA, questB) => questB.importancy - questA.importancy);
            } else {
                showedQuests = showedQuests.sort((questA, questB) => questA.importancy - questB.importancy);
            }
        } else if (sortQuest.attr === "motivation") {
            if (sortQuest.isDown) {
                showedQuests = showedQuests.sort((questA, questB) => questB.motivation - questA.motivation);
            } else {
                showedQuests = showedQuests.sort((questA, questB) => questA.motivation - questB.motivation);
            }
        }
    }

    return(
        <Virtuoso
            style={{ height: "800px", width: "50%" }}
            data={showedQuests}
            itemContent={(index) => {
                return(
                    <QuestsElement item={showedQuests[index]} />
                )}
            }
        />
    )
}

export default observer(QuestsList)