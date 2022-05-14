import { getDatabase, get, ref, onValue, child, push, update, remove } from 'firebase/database';
import { runInAction, action, makeObservable, flow, flowResult, observable, computed, makeAutoObservable } from 'mobx';
import { database } from '../firebase';
import Quest from "../models/Quest";
import { Coefficient, Status } from '../models/Quest';
import fetchQuests from "../api/fetchQuests"
import { toJS } from 'mobx';

class Store {
    @observable coins: number = 0;
    @observable quests: Quest[] = [];
    @observable selectedQuest: Quest | undefined = undefined;

    constructor() {
       const questsRef = ref(database, 'quests/');
       const coinsRef = ref(database, 'coins/');
       
       runInAction(() => {
           makeAutoObservable(this, {
                coins: observable,
                quests: observable,
                selectedQuest: observable,
                updateCoins: action,
                getquests: action,
                addQuest: action,
                deleteQuest: action,
                completeQuest: action
            })
            onValue(coinsRef, (snapshot) => {
                this.coins = 0;
                const data = snapshot.val();
                this.coins = data;
            })
            onValue(questsRef, (snapshot) => {
                this.quests = [];
                const data: Quest[] = snapshot.val();
                Object.keys(data).map((key) => {
                    data[key].id = key; 
                    this.quests.push(data[key]);
                })
            })
       })
    }

    updateCoins = (sum: number = 0) => {
        const coinsRef = ref(database);
        get(child(coinsRef, 'coins')).then((snapshot) => {
            let coins = snapshot.val();
            coins += sum;
            const updates: any = {};
            updates['coins'] = coins;
            return update(ref(database), updates);
        })
    }
    getquests() {
        return(toJS(this.quests));
    }
    addQuest = () => {
        const questName = (<HTMLInputElement>document.querySelector('#questName')).value;
        const questDifficulty = (<HTMLSelectElement>document.querySelector('#questDifficulty')).value;
        const questImportancy = (<HTMLSelectElement>document.querySelector('#questImportancy')).value;
        const questMotivation = (<HTMLSelectElement>document.querySelector('#questMotivation')).value;
        const questDescription = (<HTMLTextAreaElement>document.querySelector('#questDescription')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation) {
            const questData: Quest = {
                name: questName,
                difficulty: Coefficient[questDifficulty],
                importancy: Coefficient[questImportancy],
                motivation: Coefficient[questMotivation],
                reward: 100 * Coefficient[questDifficulty] * Coefficient[questImportancy] * Coefficient[questMotivation],
                description: questDescription,
                status: Status["ACTIVE"]
            }
            const newQuestKey = push(child(ref(database), 'quests')).key;
            const updates: any = {};
            updates['/quests/' + newQuestKey] = questData;
            return update(ref(database), updates);
        }
    }
    completeQuest = (id: string = "default", complete: boolean, cancel: boolean) => {
        const questsRef = ref(database);
        get(child(questsRef, `quests/${id}`)).then((snapshot) => {
            const quest: Quest = snapshot.val();
            if (cancel === false) {
                if (complete === true) {
                    quest.status = 2;
                    this.updateCoins(quest.reward);
                } else {
                    quest.status = 3;
                }
            } else if (cancel === true) {
                if (complete === true) {
                    quest.status = 1;
                    this.updateCoins(-quest.reward);
                } else {
                    quest.status = 1;
                }
            }
            console.log(quest);
            const updates: any = {};
            updates['/quests/' + snapshot.key] = quest;
            return update(ref(database), updates)
        })
    }
    selectQuest = (quest: Quest) => {
        runInAction(() => {
            this.selectedQuest = quest;
        })
    }
    deleteQuest = (id: string = "default") => {
        runInAction(() => {
            this.selectedQuest = undefined;
        })
        return remove(ref(database, '/quests/' + id));
    }
    editQuest = (id: string = "default") => {
        const questsRef = ref(database);
        const questName = (<HTMLInputElement>document.querySelector('#questNameE')).value;
        const questDifficulty = (<HTMLSelectElement>document.querySelector('#questDifficultyE')).value;
        const questImportancy = (<HTMLSelectElement>document.querySelector('#questImportancyE')).value;
        const questMotivation = (<HTMLSelectElement>document.querySelector('#questMotivationE')).value;
        const questDescription = (<HTMLTextAreaElement>document.querySelector('#questDescriptionE')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation) {
            get(child(questsRef, `quests/${id}`)).then((snapshot) => {
                const quest: Quest = snapshot.val();
                quest.name = questName;
                quest.difficulty = Coefficient[questDifficulty];
                quest.importancy = Coefficient[questImportancy];
                quest.motivation = Coefficient[questMotivation];
                quest.reward = 100 * Coefficient[questDifficulty] * Coefficient[questImportancy] * Coefficient[questMotivation];
                quest.description = questDescription;
                console.log(questName);
                const updates: any = {};
                updates['/quests/' + snapshot.key] = quest;
                runInAction(() => {
                    this.selectedQuest = quest;
                })
                return update(ref(database), updates)
            })
        }  
    }
}

export default Store;