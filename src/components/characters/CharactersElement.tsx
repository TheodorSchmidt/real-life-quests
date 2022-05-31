import { useState } from "react";
import { observer } from "mobx-react-lite";
import { sectionElementStyle, sectionStyle } from "../../styles/Section";
import useStore from "../../hooks/useStore";
import Character from "../../models/Character";

type Props = {
    item: Character;
}

function CharactersElement({item}: Props) {
    const sectionElement = sectionElementStyle();
    const section = sectionStyle();
    const {selectCharacter, selectedCharacter, checkActivity} = useStore();
    checkActivity(item.id);
    return(
        <div className={item.id === selectedCharacter?.id ? sectionElement.blockSelect : sectionElement.block} onClick={() => selectCharacter(item)}>
            <div className={section.element}>{item.nickname}</div> 
        </div>
    )
}

export default observer(CharactersElement);