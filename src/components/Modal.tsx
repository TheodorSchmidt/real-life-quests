import { Scale } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { modalStyle } from "../styles/Modal";

type Props = {
    active: boolean;
    setActive: any;
    children: any
}

function Modal({active, setActive, children} : Props) {
    const modal = modalStyle();
    return(
        <div className={active ? modal.modal_active : modal.modal } onClick={() => setActive(false)}>
            <div className={active ? modal.modal_content : modal.modal_content_active} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default observer(Modal)