import {observer} from "mobx-react-lite";

function RestsAdd() {
    return(
        <div>
            <p>Создать отдых</p>
            <input 
                id="restName"
                type="text"
                placeholder="Введите название *"
            />
            <div>
                <textarea id="restDescription" placeholder="Введите описание"></textarea>
            </div>
            <div>
                Цена за минуту:
                <input id="restCost" type="number" defaultValue={0.5} min="0.5" step={0.5}></input>
            </div>
        </div>
    )
}

export default observer(RestsAdd);