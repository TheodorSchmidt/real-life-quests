import { createUseStyles } from 'react-jss';

export const headerStyle = createUseStyles({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        boxShadow: "10px 0 3px 0 rgba(0, 0, 0, 0.9)",
        backgroundColor: "white"
    },
    sublist: {
        display: 'none',
        '& li': {
            fontSize: '24px',
            display: "inline",
            marginRight: "40px",
            padding: "3px"
        }
    },
    list: {
        margin: "0px",
        padding: "4px",
        '& li': {
            fontSize: '24px',
            display: "inline",
            marginRight: "40px",
            padding: "3px",
            '&:hover': {
                '.sublist': {
                    display: 'block'
                }
            }
        }
    }
})
