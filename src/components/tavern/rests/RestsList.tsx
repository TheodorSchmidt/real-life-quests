import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import "react-datepicker/dist/react-datepicker.css";
import { Virtuoso } from "react-virtuoso";
import RestsElement from "./RestsElement";

function RestsList() {
    const {rests} = useStore();
    return(
        <Virtuoso
            style={{ height: "800px", width: "100%" }}
            data={rests}
            itemContent={(index) => {
                return(
                    <RestsElement item={rests[index]} />
                )}
            }
        />
    )
}

export default observer(RestsList);