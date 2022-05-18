import { createUseStyles } from 'react-jss';

export const questsStyle = createUseStyles({
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

export const questsElementStyle = createUseStyles({
    'buttonComplete': {
        color: 'black',
        float: 'right',
        '&:hover': {
            color: 'green'
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
    },
    'questBlock': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid'
    },
    'questBlockSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: 'grey'
    },
    'questBlockCompleted': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#3de369'
    },
    'questBlockCompletedSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#114d21'
    },
    'questBlockFailed': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#ff5447'
    },
    'questBlockFailedSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '5px',
        border: '3px solid',
        backgroundColor: '#941a0f'
    }
})