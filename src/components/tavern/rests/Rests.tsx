import React, {useState} from "react";
import useStore from "../../../hooks/useStore";
import Modal from "../../Modal";
import {observer} from "mobx-react-lite";
import { sectionButtonStyle, sectionStyle } from "../../../styles/Section";
import RestsAdd from "./RestsAdd";
import RestsList from "./RestsList";
import RestsSelected from "./RestsSelected";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

function Rests() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {addRest} = useStore();
    const [modalActiveAddRest, setModalActiveAddRest] = useState(false);

    return(
        <div>
            <AddIcon id="createRest" className={sectionButton.buttonAdd} onClick={() => setModalActiveAddRest(true)}/>
            <RestsSelected/>
            <RestsList/>
            <Modal active={modalActiveAddRest} setActive={setModalActiveAddRest}>
                <div className={section.content}>
                    <RestsAdd/>
                    <CheckIcon id="addRest" className={sectionButton.buttonComplete} onClick={() => {addRest(); setModalActiveAddRest(false)}}/>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Rests);