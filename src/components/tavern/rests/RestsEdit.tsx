import {observer} from "mobx-react-lite";
import Rest from "../../../models/Rest";

type Props = {
    item: Rest
}

function RestsEdit({item}: Props) {
    return(
        <div>
            <p>Изменить отдых</p>
            <div key={item.name}>
                <input 
                    id="restNameE"
                    defaultValue={item.name}
                    type="text"
                    placeholder="Введите название *"
                />
            </div>
            <div key={item.description}>
                <div>
                    <textarea id="restDescriptionE" defaultValue={item.description} placeholder="Введите описание"></textarea>
                </div>
            </div>
            <div>
                Цена за минуту:
                <input id="restCostE" type="number" min="0.5" defaultValue={0.5} step={0.5}></input>
            </div>
        </div>
    )
}

export default observer(RestsEdit);