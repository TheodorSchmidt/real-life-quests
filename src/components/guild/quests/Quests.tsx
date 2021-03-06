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
                            <option value="0">??????</option>
                            <option selected value="1">????????????????</option>
                            <option value="2">??????????????????????</option>
                            <option value="3">??????????????????????</option>
                        </select>
                    </li>
                    <li>
                        <select id="questGroupFilter" name="group">
                            <option selected value="all">??????</option>
                            <option value="default">?????? ????????????</option>
                            {getGroups.map(g => printGroup(g))}
                        </select>
                    </li>
                    <li>
                        <select id="questCharacterFilter" name="character">
                            <option selected value="all">??????</option>
                            <option value="default">?????? ??????????????????</option>
                            {getCharacters.map(c => printCharacters(c))}
                        </select>
                    </li>
                    <li>
                        <select id="questSorting" name="sorting">
                            <option selected value="default">?????? ????????????????????</option>
                            <option value="rewardUp">?????????????? (???? ??????????????????????)</option>
                            <option value="rewardDown">?????????????? (???? ????????????????)</option>
                            <option value="importancyUp">???????????????? (???? ??????????????????????)</option>
                            <option value="importancyDown">???????????????? (???? ????????????????)</option>
                            <option value="difficultyUp">?????????????????? (???? ??????????????????????)</option>
                            <option value="difficultyDown">?????????????????? (???? ????????????????)</option>
                            <option value="motivationUp">???????????????????????????????????? (???? ??????????????????????)</option>
                            <option value="motivationDown">???????????????????????????????????? (???? ????????????????)</option>
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