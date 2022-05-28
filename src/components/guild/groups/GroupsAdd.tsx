import {observer} from "mobx-react-lite";
import { sectionStyle } from "../../../styles/Section";

function GroupsAdd() {
    const section = sectionStyle();
    return(
        <div>
            <p className={section.headline}>Создать группу</p>
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