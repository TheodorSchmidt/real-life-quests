import { Scale } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    'modal': {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '0.5s',
        opacity: '0',
        pointerEvents: 'none'
    },
    'modal_active': {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '0.5s',
        transform: 'scale(1)',
        opacity: '1',
        pointerEvents: 'all',
       
    },
    'modal_content': {
        display: 'inline-block',
        padding: '50px',
        borderRadius: '12px',
        backgroundColor: 'white',
        width: '50wv',
        transition: '0.4s all',
        transform: 'scale(0.5)',
    },
    'modal_content_active': {
        display: 'inline-block',
        padding: '50px',
        borderRadius: '12px',
        backgroundColor: 'white',
        width: '50wv',
        transition: '0.4s all',
        transform: 'scale(1)',
    }
})

type Props = {
    active: boolean;
    setActive: any;
    children: any
}

function Modal({active, setActive, children} : Props) {
    const classes = useStyles();
    return(
        <div className={active ? classes.modal_active : classes.modal } onClick={() => setActive(false)}>
            <div className={active ? classes.modal_content : classes.modal_content_active} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default observer(Modal)