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
import Character from "../../../models/Character";

function Purchases() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {addPurchase, getCharacters} = useStore();
    const [modalActiveAddPurchase, setModalActiveAddPurchase] = useState(false);

    function printCharacters(character: Character) {
        return(<option value={character.id}>{character.nickname}</option>)
    }

    return(
        <div>
            <div className={section.menu}>
                <ul className={section.navigation}>
                    <li>
                        <AddIcon id="createPurchase" className={sectionButton.buttonAdd} onClick={() => setModalActiveAddPurchase(true)}/>
                    </li>
                    <li>
                        <select id="purchaseCharacterFilter" name="character">
                            <option selected value="all">Все</option>
                            <option value="default">Без персонажа</option>
                            {getCharacters().map(c => printCharacters(c))}
                        </select>
                    </li>
                    <li>
                        <select id="purchaseSorting" name="sorting">
                            <option selected value="default">Без сортировки</option>
                            <option value="minutesUp">Время (по возрастанию)</option>
                            <option value="minutesDown">Время (по убыванию)</option>
                            <option value="priceUp">Стоимость (по возрастанию)</option>
                            <option value="priceDown">Стоимость (по убыванию)</option>
                            <option value="dateUp">Дата (сначала старые)</option>
                            <option value="dateDown">Дата (сначала новые)</option>
                        </select>
                    </li>
                </ul>
            </div>
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