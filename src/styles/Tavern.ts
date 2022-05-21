import { createUseStyles } from 'react-jss';

export const tavernStyle = createUseStyles({
    'content': {
        position: 'relative',
        padding: "150px",
        paddingLeft: "110px",
        transform: 'scale(2)'
    },
    'headline': {
        fontSize: '22',
        fontStyle: 'bold',
        maxWidth: '200px'
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
        display: 'inline-block',
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
            // border: "1px solid #000",
            padding: "3px"
        }
    }
})
