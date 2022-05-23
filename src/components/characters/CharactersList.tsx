import { Virtuoso } from "react-virtuoso";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import CharactersElement from "./CharactersElement";

function CharactersList() {

    const {characters} = useStore();
    return(
        <Virtuoso
            style={{ height: "800px", width: "50%" }}
            data={characters}
            itemContent={(index) => {
                return(
                    <CharactersElement item={characters[index]} />
                )}
            }
        />
    )
}

export default observer(CharactersList)