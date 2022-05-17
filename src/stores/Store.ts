import { getDatabase, get, ref, onValue, child, push, update, remove } from 'firebase/database';
import { runInAction, action, makeObservable, flow, flowResult, observable, computed, makeAutoObservable } from 'mobx';
import { database } from '../firebase';
import Quest from "../models/Quest";
import { Coefficient, Status } from '../models/Quest';
import fetchQuests from "../api/fetchQuests"
import { toJS } from 'mobx';
import { DateCoefficient } from "../models/Quest";

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
        const questDeadline = (<HTMLInputElement>document.querySelector('#questDeadline')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation) {
            let questData: Quest = {
                name: questName,
                difficulty: Coefficient[questDifficulty],
                importancy: Coefficient[questImportancy],
                motivation: Coefficient[questMotivation],
                reward: 100 * Coefficient[questDifficulty] * Coefficient[questImportancy] * Coefficient[questMotivation],
                description: questDescription,
                status: Status["ACTIVE"]
            }
            if (questDeadline !== "" && questDeadline !== undefined) {
                const date = new Date(questDeadline);
                questData.deadline = date; 
                questData = this.calcDateDiff(questData);
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
            console.log(quest);
            return update(ref(database), updates)
        })
    }
    selectQuest = (quest: Quest) => {
        // if (quest.deadline && quest.status === 1) {
        // }
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
                    const date = new Date(questDeadline);
                    quest.deadline = date; 
                    quest = this.calcDateDiff(quest);
                }
                const updates: any = {};
                updates['/quests/' + snapshot.key] = quest;
                runInAction(() => {
                    this.selectedQuest = quest;
                })
                return update(ref(database), updates)
            })
        }  
    }
    calcDateDiff(quest: Quest) {
        console.log(11)
        if (quest.deadline) {
            let currentDate = new Date();
            if (quest.dateComplete) {
                currentDate = new Date(quest.dateComplete);
            } 
            const dateDeadline = new Date(quest.deadline);
            const dateDifference = new Date(dateDeadline.getTime() - currentDate.getTime());
            const difference = dateDifference.getUTCDate() - 1;
            quest.dateDifference = difference;
            if (difference > 30) {
                quest.dateModif = DateCoefficient["TooEarlier"];
            } else if (difference <= 30 && difference > 14) {
                quest.dateModif = DateCoefficient["MonthEarlier"];
            } else if (difference <= 14 && difference > 7) {
                quest.dateModif = DateCoefficient["TwoWeeksEarlier"];
            } else if (difference <= 7 && difference > 3) {
                quest.dateModif = DateCoefficient["WeekEarlier"];
            } else if (difference <= 3 && difference > 0) {
                quest.dateModif = DateCoefficient["ThreeDaysEarlier"];
            } else if (difference === 0) {
                quest.dateModif = DateCoefficient["Today"];
            } else if (difference < 0 && difference > -3) {
                quest.dateModif = DateCoefficient["ThreeDaysLater"];
            } else if (difference <= -3 && difference > -7) {
                quest.dateModif = DateCoefficient["WeekLater"];
            } else if (difference <= -7 && difference > -14) {
                quest.dateModif = DateCoefficient["TwoWeeksLater"];
            } else if (difference <= -14 && difference > -30) {
                quest.dateModif = DateCoefficient["MonthLater"];
            } else {
                quest.dateModif = DateCoefficient["TooLater"];
            }
            // console.log("Текущая дата: ", currentDate);
            // console.log("Дедлайн: ", quest.deadline);
            // console.log("Дата разницы: ", dateDifference);
            // console.log("Разница: ", difference);
            // console.log("Модификатор: ", quest.dateModif);
            // console.log("Награда до: ", quest.reward);
            quest.reward = 100 * quest.difficulty * quest.importancy * quest.motivation * quest.dateModif;
            // console.log("Награда после:", quest.reward);
        }
        return quest;
    }
    updateDateDiff(quest: Quest) {
        const questsRef = ref(database);
        get(child(questsRef, `quests/${quest.id}`)).then((snapshot) => {
            let quest: Quest = snapshot.val();
            console.log(quest);
            this.calcDateDiff(quest);
            const updates: any = {};
            updates['/quests/' + snapshot.key] = quest;
            return update(ref(database), updates)
        })
    }
}

export default Store;