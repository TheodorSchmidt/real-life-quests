import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import "react-datepicker/dist/react-datepicker.css";
import { Virtuoso } from "react-virtuoso";
import GroupsElement from "./GroupsElement";

function GroupsList() {
    const {groups} = useStore();
    return(
        <Virtuoso
            style={{ height: "800px", width: "50%" }}
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