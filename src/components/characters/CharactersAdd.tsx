import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { charactersStyle } from "../../styles/Characters";

function CharactersAdd() {
    const characters = charactersStyle();

    return(
        <div>
            <p>Создать персонажа</p>
            <div>
                <input 
                    id="characterNickname"
                    type="text"
                    placeholder="Введите никнейм *"
                />
            </div>
            <div>
                <input
                    id="characterRealname"
                    type="text"
                    placeholder="Введите настоящее имя"
                />
            </div>
            <div>
                <textarea id="characterDescription" placeholder="Введите описание персонажа"></textarea>
            </div>
            <div className={characters.selectItem}>
                <select id="characterRelations" name="relations">
                    <option selected value="Nobody">Никто</option>
                    <option value="Familiar">Знакомый</option>
                    <option value="Fellow">Приятель</option>
                    <option value="Friend">Друг</option>
                    <option value="BestFriend">Лучший друг</option>
                    <option value="Soulmate">Родственная душа</option>
                </select>
            </div>
            <div>
                <input
                    id="characterAddress"
                    type="text"
                    placeholder="Введите адрес персонажа"
                />
            </div>
            <div>
                <input
                    id="characterPhone"
                    type="text"
                    placeholder="Введите телефон персонажа"
                />
            </div>
            <div>
                <input
                    id="characterEmail"
                    type="text"
                    placeholder="Введите email персонажа"
                />
            </div>
        </div>
    )
}

export default observer(CharactersAdd);