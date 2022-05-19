import { createUseStyles } from 'react-jss';

export const buttonStyle = createUseStyles({
    'buttonComplete': {
        color: 'black',
        float: 'right',
        '&:hover': {
            color: 'green'
        }
    },
    'buttonEdit': {
        color: 'black',
        float: 'right',
        '&:hover': {
            color: 'orange'
        }
    },
    'buttonFailed': {
        color: 'black',
        float: 'right',
        '&:hover': {
            color: 'red'
        }
    },
    'buttonCancel': {
        color: 'black',
        float: 'right',
        '&:hover': {
            color: 'blue'
        }
    }
})