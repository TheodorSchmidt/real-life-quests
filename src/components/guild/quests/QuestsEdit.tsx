import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sectionStyle } from "../../../styles/Section";
import Group from "../../../models/Group";
import Character from "../../../models/Character";
function QuestsEdit() {
    const section = sectionStyle();
    const {selectedQuest, groups, characters} = useStore();
    const [deadline, setDeadline] = useState(new Date());

    function printGroup(group : Group) {
        return(<option value={group.id}>{group.name}</option>)
    }
    function printCharacter(character: Character) {
        return (<option value={character.id}>{character.nickname}</option>)
    }


    if (selectedQuest) {
        return(
            <div>
                <p className={section.headline}>Редактировать квест</p>
                <div key={selectedQuest.name}>
                    <input 
                        id="questNameE"
                        type="text"
                        defaultValue={selectedQuest.name}
                        placeholder="Введите название *"
                    />
                </div>
                <div className={section.selectItem}>
                    <select id="questGroupE" name="group">
                        <option selected value="default">Без группы</option>
                        {groups.map(g => printGroup(g))}
                    </select>
                </div>
                <div key={selectedQuest.description}>
                    <div>
                        <textarea id="questDescriptionE" defaultValue={selectedQuest.description} placeholder="Введите описание"></textarea>
                    </div>
                </div>
                <div className={section.select}>
                    <div className={section.selectItem}>
                        <select id="questDifficultyE" name="difficulty" defaultValue={selectedQuest.difficulty}>
                            <option selected disabled value="0">Выберите сложность *</option>
                            <option value="VerySmall">1 (Очень просто)</option>
                            <option value="Small">2 (Просто)</option>
                            <option value="Middle">3 (Средне)</option>
                            <option value="Big">4 (Сложно)</option>
                            <option value="VeryBig">5 (Сложно)</option>
                        </select>
                    </div>
                    <div className={section.selectItem}>
                        <select id="questImportancyE" name="importancy" defaultValue={selectedQuest.importancy}>
                            <option selected disabled value="0">Выберите важность *</option>
                            <option value="VerySmall">1 (Совсем не важно)</option>
                            <option value="Small">2 (Не важно)</option>
                            <option value="Middle">3 (Средне)</option>
                            <option value="Big">4 (Важно)</option>
                            <option value="VeryBig">5 (Очень важно)</option>
                        </select>
                    </div>
                    <div className={section.selectItem}>
                        <select id="questMotivationE" name="motivation" defaultValue={selectedQuest.motivation}>
                            <option selected disabled value="0">Выберите важность *</option>
                            <option value="VeryBig">1 (Совсем не хочу делать)</option>
                            <option value="Big">2 (Не хочу делать)</option>
                            <option value="Middle">3 (Не очень хочу делать)</option>
                            <option value="Small">4 (Хочу делать)</option>
                            <option value="VerySmall">5 (Очень хочу делать)</option>
                        </select>
                    </div>      
                </div>
                <div className={section.selectItem}>
                    <select id="questCharacterE" name="character">
                        <option selected value="default">Без персонажа</option>
                        {characters.map(c => printCharacter(c))}
                    </select>
                </div>
                <div>
                    <span>Срок выполнения</span>
                    <DatePicker id="questDeadlineE" selected={deadline} onChange={(date: Date) => setDeadline(date)}/>
                </div>
            </div>                    
        )
    } else {
        return(<></>)
    }  
}

export default observer(QuestsEdit);