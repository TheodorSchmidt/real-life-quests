import { createUseStyles } from "react-jss";

export const globalStyles = createUseStyles({
    '@global': {
      boxSizing: "border-box",
      body: {
        // fontFamily: "sans-serif",
        fontFamily: "Gothical",
        src: "url('../../public/fonts/19783.ttf') format('truetype')",
        margin: "0px",
        padding: "0px"
      },
      quotes: '"«" "»"'
    }
    
})
  