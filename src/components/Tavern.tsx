import React, {useState} from "react";
import { createUseStyles } from "react-jss";
import useStore from "../hooks/useStore";
import TavernRestList from "./TavernRestList";
import Modal from "./Modal";
import {observer} from "mobx-react-lite";

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


function Tavern() {
    const classes = useStyles();
    const {addRest} = useStore();
    const [modalActiveAdd, setModalActiveAdd] = useState(false);

    return(
        <div>
            <button id="createQuest" onClick={() => setModalActiveAdd(true)}>Создать отдых</button>
            <div>
                <TavernRestList/>
            </div>
            <Modal active={modalActiveAdd} setActive={setModalActiveAdd}>
                <div className={classes.content}>
                    <p>Создать отдых</p>
                    <input 
                        id="restName"
                        type="text"
                        placeholder="Введите название *"
                    />
                    <div>
                        <textarea id="restDescription" placeholder="Введите описание"></textarea>
                    </div>
                    <div className={classes.select}>
                        <div className={classes.selectItem}>
                            <select id="restSatisfaction" name="satisfaction">
                                <option selected disabled value="0">Выберите удовлетворение *</option>
                                <option value="VerySmall">1 (Очень мало)</option>
                                <option value="Small">2 (Мало)</option>
                                <option value="Middle">3 (Средне)</option>
                                <option value="Big">4 (Много)</option>
                                <option value="VeryBig">5 (Очень много)</option>
                            </select>
                        </div>
                        <div className={classes.selectItem}>
                            <select id="restBenefit" name="benefit">
                                <option selected disabled value="0">Выберите пользу *</option>
                                <option value="VerySmall">1 (Совсем не полезно)</option>
                                <option value="Small">2 (Не полезно)</option>
                                <option value="Middle">3 (Средне)</option>
                                <option value="Big">4 (Полезно)</option>
                                <option value="VeryBig">5 (Очень полезно)</option>
                            </select>
                        </div>   
                    </div>
                    <div className={classes.button}>
                        <button id="addRest" onClick={() => {addRest(); setModalActiveAdd(false)}}>Добавить</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Tavern);