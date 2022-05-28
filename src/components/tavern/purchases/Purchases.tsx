import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import Modal from "../../Modal";
import PurchasesList from "./PurchasesList";
import PurchasesAdd from "./PurchasesAdd";
import {observer} from "mobx-react-lite";
import { sectionButtonStyle, sectionStyle } from "../../../styles/Section";
import PurchasesSelected from "./PurchasesSelected";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

function Purchases() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {addPurchase} = useStore();
    const [modalActiveAddPurchase, setModalActiveAddPurchase] = useState(false);

    return(
        <div>
            <AddIcon id="createPurchase" className={sectionButton.buttonAdd} onClick={() => setModalActiveAddPurchase(true)}/>
            <br />
            <PurchasesSelected/>
            <PurchasesList/>
            <Modal active={modalActiveAddPurchase} setActive={setModalActiveAddPurchase}>
                <div className={section.content}>
                    <PurchasesAdd/>
                    <CheckIcon id="addRest" className={sectionButton.buttonComplete} onClick={() => {addPurchase(); setModalActiveAddPurchase(false)}}/>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Purchases);