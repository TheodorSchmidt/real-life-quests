import { createUseStyles } from 'react-jss';

export const sectionStyle = createUseStyles({
    'content': {
        position: 'relative',
        padding: "150px",
        paddingLeft: "110px",
        paddingRight: "110px",
        transform: 'scale(2)'
    },
    'headline': {
        fontSize: '22px',
        fontWeight: 'bold',
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
        marginTop: '10px',
        border: '1px solid',
        boxShadow: '6px 6px #989898, 12px 12px #6c6666',
        width: '45%'
    },
    'name': {
        fontWeight: 'bold',
        fontSize: '30px',
    },
    'description': {
        fontStyle: 'italic',
        background: 'none repeat scroll 0 0',
        padding: '10px 20px',
        textAlign: 'left',
        borderLeft: '5px solid'
    },
    'menu': {
        marginTop: '5px',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        // boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "white"
    },
    'navigation': {
        margin: "0px",
        padding: "4px",
        '& li': {
            display: "inline",
            marginRight: "5px",
            padding: "3px"
        }
    }
})

export const sectionElementStyle = createUseStyles({
    'block': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '10px',
        // border: '3px solid',
        boxShadow: "0 0 10px 5px rgba(221, 221, 221, 1)"
    },
    'blockSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '10px',
        // border: '3px solid',
        backgroundColor: 'grey',
        boxShadow: "0 0 10px 5px grey"
    },
    'blockCompleted': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '10px',
        // border: '3px solid',
        backgroundColor: '#3de369',
        boxShadow: "0 0 10px 5px #3de369"
    },
    'blockCompletedSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '10px',
        // border: '3px solid',
        backgroundColor: '#114d21',
        boxShadow: "0 0 10px 5px #114d21"
    },
    'blockFailed': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '10px',
        // border: '3px solid',
        backgroundColor: '#ff5447',
        boxShadow: "0 0 10px 5px #ff5447"
    },
    'blockFailedSelect': {
        padding: '25px',
        paddingRight: '5px',
        paddingLeft: '5px',
        margin: '10px',
        // border: '3px solid',
        backgroundColor: '#941a0f',
        boxShadow: "0 0 10px 5px #941a0f"
    }
})

export const sectionButtonStyle = createUseStyles({
    'buttonAdd': {
        color: 'black',
        float: 'left',
        paddingLeft: '5px',
        height: '10px',
        '&:hover': {
            color: 'green'
        }
    },
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
    }

})