import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import Modal from "../../Modal";
import PurchasesList from "./PurchasesList";
import PurchasesAdd from "./PurchasesAdd";
import {observer} from "mobx-react-lite";
import { tavernStyle } from "../../../styles/Tavern";
import PurchasesSelected from "./PurchasesSelected";

function Purchases() {
    const tavern = tavernStyle();
    const {addPurchase} = useStore();
    const [modalActiveAddPurchase, setModalActiveAddPurchase] = useState(false);

    return(
        <div>
            <button id="addPurchase" onClick={() => setModalActiveAddPurchase(true)}>Купить отдых</button>
            <PurchasesSelected/>
            <PurchasesList/>
            <Modal active={modalActiveAddPurchase} setActive={setModalActiveAddPurchase}>
                <div className={tavern.content}>
                    <PurchasesAdd/>
                    <div className={tavern.button}>
                        <button id="addRest" onClick={() => {addPurchase(); setModalActiveAddPurchase(false)}}>Отдохнуть</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Purchases);