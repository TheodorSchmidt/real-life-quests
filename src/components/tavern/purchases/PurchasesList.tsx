import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import "react-datepicker/dist/react-datepicker.css";
import { Virtuoso } from "react-virtuoso";
import PurchasesElement from "./PurchasesElement";

function PurchasesList() {
    const {purchases} = useStore();
    return(
        <Virtuoso
            style={{ height: "800px", width: "50%" }}
            data={purchases}
            itemContent={(index) => {
                return(
                    <PurchasesElement item={purchases[index]} />
                )}
            }
        />
    )
}

export default observer(PurchasesList);