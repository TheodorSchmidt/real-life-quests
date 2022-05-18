import { createUseStyles } from "react-jss";

export const globalStyles = createUseStyles({
    '@global': {
      boxSizing: "border-box",
      body: {
        fontFamily: "sans-serif",
        margin: "0px",
        padding: "0px"
      }
    } 
  })
  