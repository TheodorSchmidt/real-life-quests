import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import useStore from "../../hooks/useStore";
import { charactersStyle } from "../../styles/Characters";
import { sectionButtonStyle, sectionStyle } from "../../styles/Section";
import Modal from "../Modal";
import CharactersAdd from "./CharactersAdd";
import CharactersList from "./CharactersList";
import CharactersSelected from "./CharactersSelected";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

function Characters() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {addCharacter} = useStore();
    const [modalActiveAddCharacter, setModalActiveAddCharacter] = useState(false);
    return(
        <div>
            <div className={section.menu}>
                <ul className={section.navigation}>
                    <li>
                        <AddIcon id="createCharacter" className={sectionButton.buttonAdd} onClick={() => setModalActiveAddCharacter(true)}/>
                    </li>
                    <li>   
                        <select id="characterRelationsFilter" name="relations">
                            <option value="0">Никто</option>
                            <option value="1">Знакомые</option>
                            <option value="2">Приятели</option>
                            <option selected value="3">Друзья</option>
                            <option value="4">Лучшие друзья</option>
                            <option value="5">Родственные души</option>
                        </select>
                    </li>
                </ul>
            </div>
            <CharactersSelected/>
            <CharactersList/>
            <Modal active={modalActiveAddCharacter} setActive={setModalActiveAddCharacter}>
                <div className={section.content}>
                    <CharactersAdd/>
                    <CheckIcon id="addCharacter" className={sectionButton.buttonComplete} onClick={() => {addCharacter(); setModalActiveAddCharacter(false)}}/>                
                </div>
            </Modal>
        </div>
    )
}

export default observer(Characters);