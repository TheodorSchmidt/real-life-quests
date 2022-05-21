import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import Modal from "../../Modal";
import {observer} from "mobx-react-lite";
import { tavernStyle } from "../../../styles/Tavern";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link
} from "react-router-dom"; 

function TavernRests() {
    const tavern = tavernStyle();
    const {addRest} = useStore();
    const [modalActiveAddRest, setModalActiveAddRest] = useState(false);
    const [modalActiveBuyRest, setModalActiveBuyRest] = useState(false);

    return(
        <div>
            <button id="addRest" onClick={() => setModalActiveAddRest(true)}>Создать отдых</button>
            <Modal active={modalActiveAddRest} setActive={setModalActiveAddRest}>
                <div className={tavern.content}>
                    <p>Создать отдых</p>
                    <input 
                        id="restName"
                        type="text"
                        placeholder="Введите название *"
                    />
                    <div>
                        <textarea id="restDescription" placeholder="Введите описание"></textarea>
                    </div>
                    <div>
                        Цена за минуту:
                        <input id="restCost" type="number" min="0.5" defaultValue={0.5} step={0.5}></input>
                    </div>
                    <div className={tavern.button}>
                        <button id="addRest" onClick={() => {addRest(); setModalActiveAddRest(false)}}>Добавить</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(TavernRests)