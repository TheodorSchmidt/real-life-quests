import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    footer: {
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        height: "40px",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "white",        
        fontWeight: "bold"
    }
})

function Footer() {
    const classes = useStyles();
    return(
        <div className={classes.footer}>2022</div>
    )
}

export default Footer;