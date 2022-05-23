import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import useStore from "../../hooks/useStore";
import { charactersStyle } from "../../styles/Characters";
import Modal from "../Modal";
import CharactersAdd from "./CharactersAdd";
import CharactersList from "./CharactersList";
import CharactersSelected from "./CharactersSelected";
function Characters() {
    const characters = charactersStyle();
    const {addCharacter} = useStore();
    const [modalActiveAddCharacter, setModalActiveAddCharacter] = useState(false);
    return(
        <div>
            <button id="createCharacter" onClick={() => setModalActiveAddCharacter(true)}>Создать персонажа</button>
            <div className={characters.menu}>
                <ul className={characters.navigation}>
                    <li>Фильтрация</li>
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
                <div className={characters.content}>
                    <CharactersAdd/>
                    <div className={characters.button}>
                        <button id="addCharacter" onClick={() => {addCharacter(); setModalActiveAddCharacter(false)}}>Добавить</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Characters);