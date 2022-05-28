import { observer } from "mobx-react-lite";
import { useState } from "react";
import useStore from "../../hooks/useStore";
import { Relations } from "../../models/Character";
import CharactersEdit from "./CharactersEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Modal from "../Modal";
import { sectionStyle, sectionElementStyle, sectionButtonStyle } from "../../styles/Section";
// import Print from "../../modules/Print";
function CharactersSelected() {
    const section = sectionStyle();
    const sectionElement = sectionElementStyle();
    const sectionButton = sectionButtonStyle();
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
    function printDescription(description: string | undefined) {
        if (description && description !== "") {
            return(
                <div className={section.description}>{description}</div>
            ) 
        } else {
            return(
                <></>
            )
        }
    }
    function printAddress(address: string | undefined) {
        if (address && address !== "") {
            return(
                <div>Адрес: {address}</div>
            )
        } else {
            return(<></>)
        }
    }
    function printPhone(phone: string | undefined) {
        if (phone && phone !== "") {
            return(
                <div>Телефон: {phone}</div>
            )
        } else {
            return(<></>)
        }
    }
    function printEmail(email: string | undefined) {
        if (email && email !== "") {
            return(
                <div>Email: {email}</div>
            )
        } else {
            return(<></>)
        }
    }

    if (selectedCharacter) {
        return(
            <div className={section.info}>
                <div className={section.name}>{selectedCharacter?.nickname}</div>
                {printDescription(selectedCharacter.description)}
                <br/>
                <div>Отношения: {printRelations(selectedCharacter?.relations)}</div>
                <div>Очки отношений: {selectedCharacter?.relationsCoins}</div>
                <br/>
                {printAddress(selectedCharacter.address)}
                {printPhone(selectedCharacter.phone)}
                {printEmail(selectedCharacter.email)}
                <div>
                    <DeleteIcon className={sectionButton.buttonFailed} onClick={() => deleteCharacter(selectedCharacter?.id)}/>
                    <EditIcon className={sectionButton.buttonCancel} onClick={() => setModalActiveEditCharacter(true)}/>
                </div>
                <Modal active={modalActiveEditCharacter} setActive={setModalActiveEditCharacter}>
                    <div className={section.content}>
                        <CharactersEdit item={selectedCharacter}/>
                        <CheckIcon id="editCharacter" className={sectionButton.buttonComplete} onClick={() => {editCharacter(selectedCharacter?.id); setModalActiveEditCharacter(false)}}/>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return(<></>)
    }
    
}

export default observer(CharactersSelected);