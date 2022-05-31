import { Virtuoso } from "react-virtuoso";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import CharactersElement from "./CharactersElement";

function CharactersList() {

    const {getCharacters} = useStore();
    return(
        <Virtuoso
            style={{ height: "800px", width: "50%" }}
            data={getCharacters}
            itemContent={(index) => {
                return(
                    <CharactersElement item={getCharacters[index]} />
                )}
            }
        />
    )
}

export default observer(CharactersList)