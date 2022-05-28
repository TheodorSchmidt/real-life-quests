import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { sectionStyle } from "../../styles/Section";

function CharactersAdd() {
    const section = sectionStyle();

    return(
        <div>
            <p className={section.headline}>Создать персонажа</p>
            <div>
                <input 
                    id="characterNickname"
                    type="text"
                    placeholder="Никнейм *"
                />
            </div>
            <div>
                <input
                    id="characterRealname"
                    type="text"
                    placeholder="Настоящее имя"
                />
            </div>
            <div>
                <textarea id="characterDescription" placeholder="Описание"></textarea>
            </div>
            <div className={section.selectItem}>
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
                    placeholder="Адрес персонажа"
                />
            </div>
            <div>
                <input
                    id="characterPhone"
                    type="text"
                    placeholder="Телефон персонажа"
                />
            </div>
            <div>
                <input
                    id="characterEmail"
                    type="text"
                    placeholder="Email персонажа"
                />
            </div>
        </div>
    )
}

export default observer(CharactersAdd);