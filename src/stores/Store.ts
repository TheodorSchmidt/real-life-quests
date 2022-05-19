import { getDatabase, get, ref, onValue, child, push, update, remove } from 'firebase/database';
import { runInAction, action, makeObservable, flow, flowResult, observable, computed, makeAutoObservable } from 'mobx';
import { database } from '../firebase';
import Quest from "../models/Quest";
import Rest from "../models/Rest";
import { Coefficient, Status } from '../models/Quest';
import fetchQuests from "../api/fetchQuests"
import { toJS } from 'mobx';
import { DateCoefficient } from "../models/Quest";
import Datetime from '../modules/Datetime';

class Store {
    @observable coins: number = 0;
    @observable quests: Quest[] = [];
    @observable selectedQuest: Quest | undefined = undefined;
    @observable purchases: Rest[] = [];
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

    // ================================================================================ //
    // ================================= QUESTS BLOCK ================================= //
    // ================================================================================ //
    getquests() {
        return(toJS(this.quests));
    }
    addQuest = () => {
        const questName = (<HTMLInputElement>document.querySelector('#questName')).value;
        const questDifficulty = (<HTMLSelectElement>document.querySelector('#questDifficulty')).value;
        const questImportancy = (<HTMLSelectElement>document.querySelector('#questImportancy')).value;
        const questMotivation = (<HTMLSelectElement>document.querySelector('#questMotivation')).value;
        const questDescription = (<HTMLTextAreaElement>document.querySelector('#questDescription')).value;
        const questDeadline = (<HTMLInputElement>document.querySelector('#questDeadline')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation) {
            let questData: Quest = {
                name: questName,
                difficulty: Coefficient[questDifficulty],
                importancy: Coefficient[questImportancy],
                motivation: Coefficient[questMotivation],
                reward: Math.round(100 * Coefficient[questDifficulty] * Coefficient[questImportancy] * Coefficient[questMotivation]),
                description: questDescription,
                status: Status["ACTIVE"]
            }
            if (questDeadline !== "" && questDeadline !== undefined) {
                const date = new Date(questDeadline);
                questData.deadline = date; 
                questData.dateDifference = Datetime.calcDaysDifference(date);
                questData.dateModif = Datetime.calcDateCoefficient(questData.dateDifference);
                questData.reward = Math.round(questData.reward * questData.dateModif);
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
                    quest.dateComplete = new Date();
                    if (quest.deadline) {
                        this.updateDateDiff(quest);
                    }
                    this.updateCoins(quest.reward);
                } else {
                    quest.status = 3;
                }
            } else if (cancel === true) {
                if (complete === true) {
                    quest.status = 1;
                    delete quest.dateComplete;
                    this.updateCoins(-quest.reward);
                } else {
                    quest.status = 1;
                }
            }
            this.cancelSelectingQuest();
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
    cancelSelectingQuest = () => {
        runInAction(() => {
            this.selectedQuest = undefined;
        })
    }
    deleteQuest = (id: string = "default") => {
        this.cancelSelectingQuest();
        return remove(ref(database, '/quests/' + id));
    }
    editQuest = (id: string = "default") => {
        const questsRef = ref(database);
        const questName = (<HTMLInputElement>document.querySelector('#questNameE')).value;
        const questDifficulty = (<HTMLSelectElement>document.querySelector('#questDifficultyE')).value;
        const questImportancy = (<HTMLSelectElement>document.querySelector('#questImportancyE')).value;
        const questMotivation = (<HTMLSelectElement>document.querySelector('#questMotivationE')).value;
        const questDescription = (<HTMLTextAreaElement>document.querySelector('#questDescriptionE')).value;
        const questDeadline = (<HTMLInputElement>document.querySelector('#questDeadlineE')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation) {
            get(child(questsRef, `quests/${id}`)).then((snapshot) => {
                let quest: Quest = snapshot.val();
                quest.name = questName;
                quest.difficulty = Coefficient[questDifficulty];
                quest.importancy = Coefficient[questImportancy];
                quest.motivation = Coefficient[questMotivation];
                quest.reward = 100 * Coefficient[questDifficulty] * Coefficient[questImportancy] * Coefficient[questMotivation];
                quest.description = questDescription;
                if (questDeadline !== "" && questDeadline !== undefined) {
                    const dateDeadline = new Date(questDeadline);
                    quest.deadline = dateDeadline; 
                    quest.dateDifference = Datetime.calcDaysDifference(dateDeadline);
                    const coefficient = Datetime.calcDateCoefficient(quest.dateDifference);
                    Datetime.newDateModif(quest, coefficient);
                    // this.updateDateDiff(quest);
                }
                const updates: any = {};
                updates['/quests/' + snapshot.key] = quest;
                this.selectQuest(quest);
                return update(ref(database), updates)
            })
        }  
    }
    updateDateDiff = (quest: Quest) => {
        if (quest.deadline) {
            const difference = Datetime.calcDaysDifference(quest.deadline);
            // console.log("Новая разница: ", difference);
            // console.log("Старая разница: ", quest.dateDifference);
            if (difference !== quest.dateDifference) {
                const questsRef = ref(database);
                get(child(questsRef, `quests/${quest.id}`)).then((snapshot) => {
                    let questData: Quest = snapshot.val();
                    const coefficient = Datetime.calcDateCoefficient(difference);
                    // console.log("Старый коэффициент: ", questData.dateModif, " , новый коэффициент: ", coefficient);
                    Datetime.newDateModif(questData, coefficient);
                    questData.dateDifference = difference;
                    const updates: any = {};
                    updates['/quests/' + snapshot.key] = questData;
                    return update(ref(database), updates);
                })
            }
        }
    }

    // ================================================================================ //
    // ================================= TAVERN BLOCK ================================= //
    // ================================================================================ //
    addRest = () => {
        
    }
}

export default Store;