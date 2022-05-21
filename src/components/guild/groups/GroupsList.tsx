import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestsList from "../tasks/QuestsList";
import Modal from "../../Modal";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../../../styles/Guild";
import QuestsSelected from "../tasks/QuestsSelected";
import QuestsAdd from "../tasks/QuestsAdd";
import Group from "../../../models/Group";
import EditIcon from '@mui/icons-material/Edit'
import { buttonStyle } from "../../../styles/Button";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    Outlet
} from "react-router-dom"; 
import { Virtuoso } from "react-virtuoso";
import GroupsElement from "./GroupsElement";

function GroupsList() {
    const {groups} = useStore();
    return(
        <Virtuoso
            style={{ height: "800px", width: "100%" }}
            data={groups}
            itemContent={(index) => {
                return(
                    <GroupsElement item={groups[index]} />
                )}
            }
        />
    )
}

export default observer(GroupsList);