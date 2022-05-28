import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";
import Modal from "../../Modal";
import "react-datepicker/dist/react-datepicker.css";
import { sectionButtonStyle, sectionStyle } from "../../../styles/Section";
import GroupsAdd from "./GroupsAdd";
import GroupsList from "./GroupsList";
import GroupsSelected from "./GroupsSelected";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

function Groups() {
    const section = sectionStyle();
    const sectionButton = sectionButtonStyle();
    const {addGroup} = useStore();
    const [modalActiveAddGroup, setModalActiveAddGroup] = useState(false);

    return(
        <div>
            <AddIcon id="createGroup" className={sectionButton.buttonAdd} onClick={() => setModalActiveAddGroup(true)} />
            <br />
            <GroupsSelected/>
            <GroupsList/>
            <Modal active={modalActiveAddGroup} setActive={setModalActiveAddGroup}>
                <div className={section.content}>
                    <GroupsAdd/>
                    <CheckIcon id="addGroup" className={sectionButton.buttonComplete} onClick={() => {addGroup(); setModalActiveAddGroup(false)}}/>
                </div>
            </Modal>
        </div>
    )
}

export default observer(Groups);