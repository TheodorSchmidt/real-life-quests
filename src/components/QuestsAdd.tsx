import React, { useState } from "react";
import {observer} from "mobx-react-lite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { questsStyle } from "../styles/Quests";

function QuestsAdd() {
    const quests = questsStyle();
    const [deadline, setDeadline] = useState(new Date());
    return(
        <div>
            <p>Создать квест</p>
            <input 
                id="questName"
                type="text"
                placeholder="Введите название *"
            />
            <div>
                <textarea id="questDescription" placeholder="Введите описание"></textarea>
            </div>
            <div className={quests.select}>
                <div className={quests.selectItem}>
                    <select id="questDifficulty" name="difficulty">
                        <option selected disabled value="0">Выберите сложность *</option>
                        <option value="VerySmall">1 (Очень просто)</option>
                        <option value="Small">2 (Просто)</option>
                        <option value="Middle">3 (Средне)</option>
                        <option value="Big">4 (Сложно)</option>
                        <option value="VeryBig">5 (Сложно)</option>
                    </select>
                </div>
                <div className={quests.selectItem}>
                    <select id="questImportancy" name="importancy">
                        <option selected disabled value="0">Выберите важность *</option>
                        <option value="VerySmall">1 (Совсем не важно)</option>
                        <option value="Small">2 (Не важно)</option>
                        <option value="Middle">3 (Средне)</option>
                        <option value="Big">4 (Важно)</option>
                        <option value="VeryBig">5 (Очень важно)</option>
                    </select>
                </div>
                <div className={quests.selectItem}>
                    <select id="questMotivation" name="motivation">
                        <option selected disabled value="0">Выберите важность *</option>
                        <option value="VeryBig">1 (Совсем не хочу делать)</option>
                        <option value="Big">2 (Не хочу делать)</option>
                        <option value="Middle">3 (Не очень хочу делать)</option>
                        <option value="Small">4 (Хочу делать)</option>
                        <option value="VerySmall">5 (Очень хочу делать)</option>
                    </select>
                </div>      
            </div>
            <div>
                <span>Срок выполнения</span>
                <DatePicker id="questDeadline" selected={deadline} onChange={(date: Date) => setDeadline(date)}/>
            </div>
        </div>
    )
}

export default observer(QuestsAdd);