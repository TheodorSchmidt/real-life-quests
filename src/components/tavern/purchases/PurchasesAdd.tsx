import {observer} from "mobx-react-lite";
import useStore from "../../../hooks/useStore";
import Rest from "../../../models/Rest";
import { tavernStyle } from "../../../styles/Tavern";

function printRest(rest: Rest) {
    return(<option value={rest.id}>{rest.name}</option>)
}

function PurchasesAdd() {
    const tavern = tavernStyle();
    const {rests} = useStore();

    return(
        <div>
            <p>Купить отдых</p>
            <div className={tavern.selectItem}>
                <select id="purchaseName" name="purchase">
                    {rests.map(r => printRest(r))}
                </select>
            </div>
            <div>
                Количество минут:
                <input id="purchaseMinutes" type="number" min="5" defaultValue={5} step={1}></input>
            </div>
        </div>
    )
}

export default observer(PurchasesAdd);