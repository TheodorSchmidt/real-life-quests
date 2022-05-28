import {observer} from "mobx-react-lite";
import useStore from "../../../hooks/useStore";
import Purchase from "../../../models/Purchase";
import Rest from "../../../models/Rest";
import { sectionStyle } from "../../../styles/Section";
import Character from "../../../models/Character";

function printRest(rest: Rest) {
    return(<option value={rest.id}>{rest.name}</option>)
}
function printCharacter(character: Character) {
    return (<option value={character.id}>{character.nickname}</option>)
}

type Props = {
    item: Purchase
}
function PurchasesEdit({item}: Props) {
    const section = sectionStyle();
    const {rests, characters} = useStore();

    return(
        <div>
            <p className={section.headline}>Редактировать покупку</p>
            <div className={section.selectItem}>
                <select id="purchaseNameE" name="purchase">
                    {rests.map(r => printRest(r))}
                </select>
            </div>
            <div>Количество минут:</div>
            <div key={item.minutes}>
                <input id="purchaseMinutesE" type="number" min="5" defaultValue={item.minutes} step={1}></input>
            </div>
            <div className={section.selectItem}>
                <select id="purchaseCharacterE" name="character">
                    <option selected value="default">Без персонажа</option>
                    {characters.map(c => printCharacter(c))}
                </select>
            </div>
        </div>
    )
}

export default observer(PurchasesEdit);