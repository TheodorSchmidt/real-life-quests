import {observer} from "mobx-react-lite";
import useStore from "../../../hooks/useStore";
import Purchase from "../../../models/Purchase";
import Rest from "../../../models/Rest";
import { tavernStyle } from "../../../styles/Tavern";

function printRest(rest: Rest) {
    return(<option value={rest.id}>{rest.name}</option>)
}

type Props = {
    item: Purchase
}
function PurchasesEdit({item}: Props) {
    const tavern = tavernStyle();
    const {rests} = useStore();

    return(
        <div>
            <div>Изменить покупку</div>
            <div className={tavern.selectItem}>
                <select id="purchaseNameE" name="purchase">
                    {rests.map(r => printRest(r))}
                </select>
            </div>
            <div key={item.minutes}>
                Количество минут:
                <input id="purchaseMinutesE" type="number" min="5" defaultValue={item.minutes} step={1}></input>
            </div>
        </div>
    )
}

export default observer(PurchasesEdit);