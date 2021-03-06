import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Group from "../../../models/Group";
import Character from "../../../models/Character";
import { sectionStyle } from "../../../styles/Section";

function QuestsAdd() {
    const section = sectionStyle();
    const [deadline, setDeadline] = useState(new Date());
    const {groups, characters} = useStore();

    function printGroup(group: Group) {
        return(<option value={group.id}>{group.name}</option>)
    }
    function printCharacter(character: Character) {
        return (<option value={character.id}>{character.nickname}</option>)
    }

    return(
        <div>
            <p className={section.headline}>Создать квест</p>
            <input 
                id="questName"
                type="text"
                placeholder="Введите название *"
            />
            <div className={section.selectItem}>
                <select id="questGroup" name="group">
                    <option selected value="default">Без группы</option>
                    {groups.map(g => printGroup(g))}
                </select>
            </div>
            <div>
                <textarea id="questDescription" placeholder="Введите описание"></textarea>
            </div>
            <div className={section.select}>
                <div className={section.selectItem}>
                    <select id="questDifficulty" name="difficulty">
                        <option selected disabled value="0">Выберите сложность *</option>
                        <option value="VerySmall">1 (Очень просто)</option>
                        <option value="Small">2 (Просто)</option>
                        <option value="Middle">3 (Средне)</option>
                        <option value="Big">4 (Сложно)</option>
                        <option value="VeryBig">5 (Очень сложно)</option>
                    </select>
                </div>
                <div className={section.selectItem}>
                    <select id="questImportancy" name="importancy">
                        <option selected disabled value="0">Выберите важность *</option>
                        <option value="VerySmall">1 (Совсем не важно)</option>
                        <option value="Small">2 (Не важно)</option>
                        <option value="Middle">3 (Средне)</option>
                        <option value="Big">4 (Важно)</option>
                        <option value="VeryBig">5 (Очень важно)</option>
                    </select>
                </div>
                <div className={section.selectItem}>
                    <select id="questMotivation" name="motivation">
                        <option selected disabled value="0">Выберите замотивированность *</option>
                        <option value="VeryBig">1 (Совсем не хочу делать)</option>
                        <option value="Big">2 (Не хочу делать)</option>
                        <option value="Middle">3 (Не очень хочу делать)</option>
                        <option value="Small">4 (Хочу делать)</option>
                        <option value="VerySmall">5 (Очень хочу делать)</option>
                    </select>
                </div>      
            </div>
            <div className={section.selectItem}>
                <select id="questCharacter" name="character">
                    <option selected value="default">Без персонажа</option>
                    {characters.map(c => printCharacter(c))}
                </select>
            </div>
            <div>
                <span>Срок выполнения</span>
                <DatePicker id="questDeadline" selected={deadline} onChange={(date: Date) => setDeadline(date)}/>
            </div>
            {/* <div>
                <select id="questRepeatable" name="repeatable">
                    <option selected value="default">Не повторять</option>
                    <option value="1">Каждый день</option>
                    <option value="2">Каждые два дня</option>
                    <option value="7">Каждую неделю</option>
                    <option value="14">Каждые две недели</option>
                    <option value="28">Каждый месяц</option>
                </select>
            </div> */}
        </div>
    )
}

export default observer(QuestsAdd);