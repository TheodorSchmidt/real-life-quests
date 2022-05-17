import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import {observer} from "mobx-react-lite";
import QuestElement from "./QuestElement";
import {map} from "lodash";
import { Virtuoso } from "react-virtuoso";
import { toJS } from "mobx";
import  Quest  from "../models/Quest";
import QuestsList from "./QuestsList";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = createUseStyles({
    'content': {
        position: 'relative',
        padding: "150px",
        paddingLeft: "110px",
        transform: 'scale(2)'
    },
    'select': {
        padding: "20px 0px",
    },
    'selectItem': {
        padding: "2px 0px",
    },
    'button': {
        justifyContent: 'right',
    },
    'list': {
        width: '47%',
        minWidth: '250px'
    },
    'info': {
        display: 'inline-block',
        float: 'right',
        padding: '20px',
        marginTop: '25px',
        border: '2px solid',
        width: '45%'
    },
    'name': {
        fontStyle: 'bold',
        fontSize: '14',
    },
    'description': {
        fontStyle: 'italic'
    },
    'menu': {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "white"
    },
    'navigation': {
        margin: "0px",
        padding: "4px",
        '& li': {
            // width: "70px",
            display: "inline",
            marginRight: "5px",
            border: "1px solid #000",
            padding: "3px"
        }
    }
})

function Quests() {
    const classes = useStyles();
    const {addQuest, selectedQuest, deleteQuest, editQuest, cancelSelectingQuest, updateDateDiff} = useStore();
    const [modalActiveAdd, setModalActiveAdd] = useState(false);
    const [modalActiveEdit, setModalActiveEdit] = useState(false);
    const [questType, setQuestType] = useState("ACTIVE");
    const [deadline, setDeadline] = useState(new Date());

    function printSelectedQuest() {
        if (selectedQuest) {
            if (selectedQuest.status === 1) {
                if (selectedQuest.deadline) {
                    updateDateDiff(selectedQuest);
                }
                return(
                    <div className={classes.info}>
                        <div className={classes.name}>{selectedQuest?.name}</div>
                        <div>Статус: в процессе</div>
                        <div className={classes.description}>{selectedQuest?.description}</div>
                        <div>Награда: {selectedQuest.reward}</div>
                        <div>Крайний срок: {selectedQuest.deadline?.toString()}</div>
                        <div>
                            Осталось: {selectedQuest.dateDifference} дня
                        </div> 
                        <button onClick={() => setModalActiveEdit(true)}>Редактировать квест</button>
                        <button onClick={() => deleteQuest(selectedQuest.id)}>Удалить квест</button>
                        <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
                            <div className={classes.content}>
                                <p>Редактирование квеста</p>
                                <div key={selectedQuest.name}>
                                    <input 
                                        id="questNameE"
                                        type="text"
                                        defaultValue={selectedQuest.name}
                                        placeholder="Введите название *"
                                    />
                                </div>
                                <div key={selectedQuest.description}>
                                    <div>
                                        <textarea id="questDescriptionE" defaultValue={selectedQuest.description}placeholder="Введите описание"></textarea>
                                    </div>
                                </div>
                                <div className={classes.select}>
                                    <div className={classes.selectItem}>
                                        <select id="questDifficultyE" name="difficulty" defaultValue={selectedQuest.difficulty}>
                                            <option selected disabled value="0">Выберите сложность *</option>
                                            <option value="VerySmall">1 (Очень просто)</option>
                                            <option value="Small">2 (Просто)</option>
                                            <option value="Middle">3 (Средне)</option>
                                            <option value="Big">4 (Сложно)</option>
                                            <option value="VeryBig">5 (Сложно)</option>
                                        </select>
                                    </div>
                                    <div className={classes.selectItem}>
                                        <select id="questImportancyE" name="importancy" defaultValue={selectedQuest.importancy}>
                                            <option selected disabled value="0">Выберите важность *</option>
                                            <option value="VerySmall">1 (Совсем не важно)</option>
                                            <option value="Small">2 (Не важно)</option>
                                            <option value="Middle">3 (Средне)</option>
                                            <option value="Big">4 (Важно)</option>
                                            <option value="VeryBig">5 (Очень важно)</option>
                                        </select>
                                    </div>
                                    <div className={classes.selectItem}>
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
                                <div>
                                    <span>Срок выполнения</span>
                                    <DatePicker id="questDeadlineE" selected={deadline} onChange={(date: Date) => setDeadline(date)}/>
                                </div>
                                <div className={classes.button}>
                                    <button id="editQuest" onClick={() => {editQuest(selectedQuest?.id); setModalActiveEdit(false)}}>Изменить</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                )
            } else if (selectedQuest.status === 2){
                return(
                    <div className={classes.info}>
                        <div className={classes.name}>{selectedQuest?.name}</div>
                        <div>Статус: выполнено</div>
                        <div className={classes.description}>{selectedQuest?.description}</div>
                        <div>Дата выполнения: {selectedQuest?.dateComplete?.toString()}</div>
                        <div>Полученные очки: {selectedQuest.reward}</div>
                        <button onClick={() => deleteQuest(selectedQuest.id)}>Удалить запись</button>
                    </div>
                )
            } else {
                return(
                    <div className={classes.info}>
                        <div className={classes.name}>{selectedQuest?.name}</div>
                        <div>Статус: провалено</div>
                        <div className={classes.description}>{selectedQuest?.description}</div>
                        {/* <div>Дата выполнения: {selectedQuest?.dateComplete?.toString()}</div>
                        <div>Полученные очки: {selectedQuest.reward}</div> */}
                        <button onClick={() => deleteQuest(selectedQuest.id)}>Удалить запись</button>
                    </div>
                )
            }
        }
    }
    return(
        <div>
            <div className={classes.menu}>
                <ul className={classes.navigation}>
                    <li onClick={() => {setQuestType("ALL"); cancelSelectingQuest()}}>Все</li>
                    <li onClick={() => {setQuestType("ACTIVE"); cancelSelectingQuest()}}>Активные</li>
                    <li onClick={() => {setQuestType("COMPLETED"); cancelSelectingQuest()}}>Выполненные</li>
                    <li onClick={() => {setQuestType("FAILED"); cancelSelectingQuest()}}>Проваленные</li>    
                </ul>
            </div>
            <button id="createQuest" onClick={() => setModalActiveAdd(true)}>Создать квест</button>
            {/* место для сортировки и фильтров */}
            {printSelectedQuest()}
            <div className={classes.list}>
                <QuestsList type={questType}/>
            </div>
            <Modal active={modalActiveAdd} setActive={setModalActiveAdd}>
                <div className={classes.content}>
                    <p>Создать квест</p>
                    <input 
                        id="questName"
                        type="text"
                        placeholder="Введите название *"
                    />
                    <div>
                        <textarea id="questDescription" placeholder="Введите описание"></textarea>
                    </div>
                    <div className={classes.select}>
                        <div className={classes.selectItem}>
                            <select id="questDifficulty" name="difficulty">
                                <option selected disabled value="0">Выберите сложность *</option>
                                <option value="VerySmall">1 (Очень просто)</option>
                                <option value="Small">2 (Просто)</option>
                                <option value="Middle">3 (Средне)</option>
                                <option value="Big">4 (Сложно)</option>
                                <option value="VeryBig">5 (Сложно)</option>
                            </select>
                        </div>
                        <div className={classes.selectItem}>
                            <select id="questImportancy" name="importancy">
                                <option selected disabled value="0">Выберите важность *</option>
                                <option value="VerySmall">1 (Совсем не важно)</option>
                                <option value="Small">2 (Не важно)</option>
                                <option value="Middle">3 (Средне)</option>
                                <option value="Big">4 (Важно)</option>
                                <option value="VeryBig">5 (Очень важно)</option>
                            </select>
                        </div>
                        <div className={classes.selectItem}>
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
                    <div className={classes.button}>
                        <button id="addQuest" onClick={() => {addQuest(); setModalActiveAdd(false)}}>Добавить</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Quests);