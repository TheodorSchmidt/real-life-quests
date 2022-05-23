import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import Modal from "../../Modal";
import {observer} from "mobx-react-lite";
import { tavernStyle } from "../../../styles/Tavern";
import RestsAdd from "./RestsAdd";
import RestsList from "./RestsList";
import RestsSelected from "./RestsSelected";

function Rests() {
    const tavern = tavernStyle();
    const {addRest} = useStore();
    const [modalActiveAddRest, setModalActiveAddRest] = useState(false);

    return(
        <div>
            <button id="addRest" onClick={() => setModalActiveAddRest(true)}>Создать отдых</button>
            <RestsSelected/>
            <RestsList/>
            <Modal active={modalActiveAddRest} setActive={setModalActiveAddRest}>
                <div className={tavern.content}>
                    <RestsAdd/>
                    <div className={tavern.button}>
                        <button id="addRest" onClick={() => {addRest(); setModalActiveAddRest(false)}}>Добавить</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Rests);