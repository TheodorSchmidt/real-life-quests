import Quest from "../models/Quest";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { database } from "../firebase";
// const db = getDatabase();
const fetchQuests = {
    quests: async(): Promise<Quest[]> => {
        const questsRef = ref(database, 'quests/');
        const snapshot = await get(questsRef);
        return snapshot.val();
    }
}

export default fetchQuests;