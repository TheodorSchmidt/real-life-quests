import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestsList from "./QuestsList";
import Modal from "../../Modal";
import "react-datepicker/dist/react-datepicker.css";
import { sectionStyle, sectionButtonStyle } from "../../../styles/Section";
import QuestsSelected from "./QuestsSelected";
import QuestsAdd from "./QuestsAdd";
import Group from "../../../models/Group";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Character from "../../../models/Character";

function Quests() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {addQuest, getGroups, getCharacters, setFilterOptions, setSortOptions} = useStore();
    const [modalActiveAddQuest, setModalActiveAddQuest] = useState(false);

    function printGroup(group: Group) {
        return(<option value={group.id}>{group.name}</option>)
    }
    function printCharacters(character: Character) {
        return(<option value={character.id}>{character.nickname}</option>)
    }

    const filterStatus: HTMLSelectElement | null = document.querySelector('#questStatusFilter');
    filterStatus?.addEventListener('change', function() {
        setFilterOptions("status", this.value);
    })
    const filterGroup: HTMLSelectElement | null = document.querySelector('#questGroupFilter');
    filterGroup?.addEventListener('change', function() {
        setFilterOptions("group", this.value);
    })
    const filterCharacter: HTMLSelectElement | null = document.querySelector('#questCharacterFilter');
    filterCharacter?.addEventListener('change', function() {
        setFilterOptions("character", this.value);
    })

    const sorting: HTMLSelectElement | null = document.querySelector('#questSorting');
    sorting?.addEventListener('change', function() {
        setSortOptions(this.value);
    })
    return(
        <div>
            <div className={section.menu}>
                <ul className={section.navigation}>
                    <li>
                        <AddIcon id="createQuest" className={sectionButton.buttonAdd} onClick={() => setModalActiveAddQuest(true)} />
                    </li>
                    <li>   
                        <select id="questStatusFilter" name="status">
                            <option value="0">Все</option>
                            <option selected value="1">Активные</option>
                            <option value="2">Выполненные</option>
                            <option value="3">Проваленные</option>
                        </select>
                    </li>
                    <li>
                        <select id="questGroupFilter" name="group">
                            <option selected value="all">Все</option>
                            <option value="default">Без группы</option>
                            {getGroups.map(g => printGroup(g))}
                        </select>
                    </li>
                    <li>
                        <select id="questCharacterFilter" name="character">
                            <option selected value="all">Все</option>
                            <option value="default">Без персонажа</option>
                            {getCharacters.map(c => printCharacters(c))}
                        </select>
                    </li>
                    <li>
                        <select id="questSorting" name="sorting">
                            <option selected value="default">Без сортировки</option>
                            <option value="rewardUp">Награда (по возрастанию)</option>
                            <option value="rewardDown">Награда (по убыванию)</option>
                            <option value="importancyUp">Важность (по возрастанию)</option>
                            <option value="importancyDown">Важность (по убыванию)</option>
                            <option value="difficultyUp">Сложность (по возрастанию)</option>
                            <option value="difficultyDown">Сложность (по убыванию)</option>
                            <option value="motivationUp">Замотивированность (по возрастанию)</option>
                            <option value="motivationDown">Замотивированность (по убыванию)</option>
                        </select>
                    </li>
                </ul>
            </div>
            <QuestsSelected/>
            <QuestsList/>
            <Modal active={modalActiveAddQuest} setActive={setModalActiveAddQuest}>
                <div className={section.content}>
                    <QuestsAdd />
                    <CheckIcon id="addQuest" className={sectionButton.buttonComplete} onClick={() => {addQuest(); setModalActiveAddQuest(false)}} />
                </div>
            </Modal>
        </div>
    )
}

export default observer(Quests);