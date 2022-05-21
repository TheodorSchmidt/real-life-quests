import {observer} from "mobx-react-lite";
import Group from "../../../models/Group";

type Props = {
    item: Group
}

function GroupsEdit({item}: Props) {
    return(
        <div>
            <p>Изменить группу</p>
            <div key={item?.name}>
                <input 
                    id="groupNameE"
                    type="text"
                    defaultValue={item?.name}
                    placeholder="Введите название *"
                />
            </div>
            <div key={item?.description}>
                <textarea id="groupDescriptionE" defaultValue={item?.description} placeholder="Введите описание"></textarea>
            </div>
        </div>
    )
}

export default observer(GroupsEdit);