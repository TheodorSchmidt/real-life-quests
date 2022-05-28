import {observer} from "mobx-react-lite";
import useStore from "../../../hooks/useStore";
import Rest from "../../../models/Rest";
import { sectionStyle } from "../../../styles/Section";
import Character from "../../../models/Character";

function printRest(rest: Rest) {
    return(<option value={rest.id}>{rest.name}</option>)
}
function printCharacter(character: Character) {
    return (<option value={character.id}>{character.nickname}</option>)
}

function PurchasesAdd() {
    const section = sectionStyle();
    const {rests, characters} = useStore();

    return(
        <div>
            <p className={section.headline}>Добавить покупку</p>
            <div className={section.selectItem}>
                <select id="purchaseName" name="purchase">
                    {rests.map(r => printRest(r))}
                </select>
            </div>
            <div>
                Количество минут:
                <input id="purchaseMinutes" type="number" min="5" defaultValue={5} step={1}></input>
            </div>
            <div className={section.selectItem}>
                <select id="purchaseCharacter" name="character">
                    <option selected value="default">Без персонажа</option>
                    {characters.map(c => printCharacter(c))}
                </select>
            </div>
        </div>
    )
}

export default observer(PurchasesAdd);