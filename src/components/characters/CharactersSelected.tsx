import { observer } from "mobx-react-lite";
import { useState } from "react";
import useStore from "../../hooks/useStore";
import { Relations } from "../../models/Character";
import { charactersStyle } from "../../styles/Characters";
import CharactersEdit from "./CharactersEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { charactersElementStyle } from "../../styles/Characters";
import Modal from "../Modal";

function CharactersSelected() {
    const characters = charactersStyle();
    const charactersElement = charactersElementStyle();
    const {selectedCharacter, editCharacter, deleteCharacter} = useStore();
    const [modalActiveEditCharacter, setModalActiveEditCharacter] = useState(false);

    function printRelations(relations: Relations = 0) {
        if (relations === 0) {
            return(<span>Никто</span>)
        } else if (relations === 1) {
            return(<span>Знакомый</span>)
        } else if (relations === 2) {
            return(<span>Приятель</span>)
        } else if (relations === 3) {
            return(<span>Друг</span>)
        } else if (relations === 4) {
            return(<span>Лучший друг</span>)
        } else {
            return(<span>Родственная душа</span>)
        }
    }
    if (selectedCharacter) {
        return(
            <div className={characters.info}>
                <div className={characters.name}>{selectedCharacter?.nickname}</div>
                <div>Отношения: {printRelations(selectedCharacter?.relations)}</div>
                <div>Очки отношений: {selectedCharacter?.relationsCoins}</div>
                <div className={characters.description}>{selectedCharacter?.description}</div>
                <div>Адрес: {selectedCharacter?.address}</div>
                <div>Телефон: {selectedCharacter?.phone}</div>
                <div>Email: {selectedCharacter?.email}</div>
                <div>
                    <EditIcon className={charactersElement.buttonCancel} onClick={() => setModalActiveEditCharacter(true)}/>
                    <DeleteIcon className={charactersElement.buttonFailed} onClick={() => deleteCharacter(selectedCharacter?.id)}/>
                </div>
                <Modal active={modalActiveEditCharacter} setActive={setModalActiveEditCharacter}>
                    <div className={characters.content}>
                        <CharactersEdit item={selectedCharacter}/>
                        <div className={characters.button}>
                            <button id="editRest" onClick={() => {editCharacter(selectedCharacter?.id); setModalActiveEditCharacter(false)}}>Изменить</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return(<></>)
    }
    
}

export default observer(CharactersSelected);