import {observer} from "mobx-react-lite";

function GroupsAdd() {
    return(
        <div>
            <p>Создать группу</p>
            <input 
                id="groupName"
                type="text"
                placeholder="Введите название *"
            />
            <div>
                <textarea id="groupDescription" placeholder="Введите описание"></textarea>
            </div>
        </div>
    )
}

export default observer(GroupsAdd);