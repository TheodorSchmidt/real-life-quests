import { useState } from "react";
import { observer } from "mobx-react-lite";
import { charactersStyle } from "../../styles/Characters";
import { charactersElementStyle } from "../../styles/Characters";
import CharactersEdit from "./CharactersEdit";
import useStore from "../../hooks/useStore";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Character from "../../models/Character";
import Modal from "../Modal";

type Props = {
    item: Character;
}

function CharactersElement({item}: Props) {
    const charactersElement = charactersElementStyle();
    const characters = charactersStyle()
    const {selectCharacter, selectedCharacter, checkActivity} = useStore();
    checkActivity(item.id);
    return(
        <div className={item.id === selectedCharacter?.id ? charactersElement.questBlockSelect : charactersElement.questBlock} onClick={() => selectCharacter(item)}>
            <div>{item.nickname}</div> 
        </div>
    )
}

export default observer(CharactersElement);