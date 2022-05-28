import { observer } from "mobx-react-lite";
import Character from "../../models/Character";
import { sectionStyle } from "../../styles/Section";

type Props = {
    item: Character | undefined;
}

function CharactersEdit({item}: Props) {
    const section = sectionStyle();
    return(
        <div>
            <p className={section.headline}>Изменить персонажа</p>
            <div key={item?.nickname}>
                <input 
                    id="characterNicknameE"
                    type="text"
                    defaultValue={item?.nickname}
                    placeholder="Введите никнейм *"
                />
            </div>
            <div key={item?.realname}>
                <input
                    id="characterRealnameE"
                    type="text"
                    defaultValue={item?.realname}
                    placeholder="Введите настоящее имя"
                />
            </div>
            <div key={item?.description}>
                <textarea id="characterDescriptionE" defaultValue={item?.description} placeholder="Введите описание персонажа"></textarea>
            </div>
            <div className={section.selectItem}>
                <select id="characterRelationsE" name="relations">
                    <option selected value="Nobody">Никто</option>
                    <option value="Familiar">Знакомый</option>
                    <option value="Fellow">Приятель</option>
                    <option value="Friend">Друг</option>
                    <option value="BestFriend">Лучший друг</option>
                    <option value="Soulmate">Родственная душа</option>
                </select>
            </div>
            <div key={item?.address}>
                <input
                    id="characterAddressE"
                    type="text"
                    defaultValue={item?.address}
                    placeholder="Введите адрес персонажа"
                />
            </div>
            <div key={item?.phone}>
                <input
                    id="characterPhoneE"
                    type="text"
                    defaultValue={item?.phone}
                    placeholder="Введите телефон персонажа"
                />
            </div>
            <div key={item?.email}>
                <input
                    id="characterEmailE"
                    type="text"
                    defaultValue={item?.email}
                    placeholder="Введите email персонажа"
                />
            </div>
            
        </div>
    )
}

export default observer(CharactersEdit);