import { createUseStyles } from 'react-jss';

export const headerStyle = createUseStyles({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "white"
    },
    list: {
        margin: "0px",
        padding: "4px",
        '& li': {
            display: "inline",
            marginRight: "5px",
            border: "1px solid #000",
            padding: "3px"
        }
    }
})
