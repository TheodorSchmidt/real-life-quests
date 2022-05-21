import { getDatabase, get, ref, onValue, child, push, update, remove } from 'firebase/database';
import { runInAction, action, makeObservable, flow, flowResult, observable, computed, makeAutoObservable } from 'mobx';
import { database } from '../firebase';
import Quest from "../models/Quest";
import Group from '../models/Group';
import Rest from "../models/Rest";
import { Coefficient, Status } from '../models/Quest';
import fetchQuests from "../api/fetchQuests"
import { toJS } from 'mobx';
import { DateCoefficient } from "../models/Quest";
import Datetime from '../modules/Datetime';
import Purchase from '../models/Purchase';

class Store {
    @observable coins: number = 0;
    @observable quests: Quest[] = [];
    @observable selectedQuest: Quest | undefined = undefined;
    @observable groups: Group[] = [];
    @observable searchQuest: any = {
        status: 1,
        group: "all"
    }
    @observable rests: Rest[] = [];
    @observable purchases: Purchase[] = [];

    constructor() {
       const coinsRef = ref(database, 'coins/');
       const questsRef = ref(database, 'quests/');
       const groupsRef = ref(database, 'groups/');
       const restsRef = ref(database, 'rests/');
       const purchasesRef = ref(database, 'purchases/');
       runInAction(() => {
           makeAutoObservable(this, {
                coins: observable,
                quests: observable,
                selectedQuest: observable,
                searchQuest: observable,
                groups: observable,
                rests: observable,
                purchases: observable,
                updateCoins: action,

                getQuests: action,
                getGroups: action,
                getRests: action,
                getPurchases: action,
                addQuest: action,
                addGroup: action,
                addRest: action,
                addPurchase: action,
                deleteQuest: action,
                deleteGroup: action,
                deleteRest: action,
                completeQuest: action,
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
            onValue(groupsRef, (snapshot) => {
                this.groups = [];
                const data: Group[] = snapshot.val();
                Object.keys(data).map((key) => {
                    data[key].id = key;
                    this.groups.push(data[key]);
                })
            })
            onValue(restsRef, (snapshot) => {
                this.rests = [];
                const data: Rest[] = snapshot.val();
                Object.keys(data).map((key) => {
                    data[key].id = key;
                    this.rests.push(data[key]);
                })
            })
            onValue(purchasesRef, (snapshot) => {
                this.purchases = [];
                const data: Purchase[] = snapshot.val();
                Object.keys(data).map((key) => {
                    data[key].id = key;
                    this.purchases.push(data[key]);
                })
            })

       })
    }

    getCoins = () => {
        return(toJS(this.coins));
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
    getQuests = () => {
        return(toJS(this.quests));
    }
    addQuest = () => {
        const questName = (<HTMLInputElement>document.querySelector('#questName')).value;
        const questGroup = (<HTMLSelectElement>document.querySelector('#questGroup')).value
        const questDifficulty = (<HTMLSelectElement>document.querySelector('#questDifficulty')).value;
        const questImportancy = (<HTMLSelectElement>document.querySelector('#questImportancy')).value;
        const questMotivation = (<HTMLSelectElement>document.querySelector('#questMotivation')).value;
        const questDescription = (<HTMLTextAreaElement>document.querySelector('#questDescription')).value;
        const questDeadline = (<HTMLInputElement>document.querySelector('#questDeadline')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation && questGroup) {
            let questData: Quest = {
                name: questName,
                group: questGroup,
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
    editQuest = (id: string = "default") => {
        const questsRef = ref(database);
        const questName = (<HTMLInputElement>document.querySelector('#questNameE')).value;
        const questGroup = (<HTMLSelectElement>document.querySelector('#questGroupE')).value
        const questDifficulty = (<HTMLSelectElement>document.querySelector('#questDifficultyE')).value;
        const questImportancy = (<HTMLSelectElement>document.querySelector('#questImportancyE')).value;
        const questMotivation = (<HTMLSelectElement>document.querySelector('#questMotivationE')).value;
        const questDescription = (<HTMLTextAreaElement>document.querySelector('#questDescriptionE')).value;
        const questDeadline = (<HTMLInputElement>document.querySelector('#questDeadlineE')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation) {
            get(child(questsRef, `quests/${id}`)).then((snapshot) => {
                let quest: Quest = snapshot.val();
                quest.name = questName;
                quest.group = questGroup;
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
                } else {
                    delete quest.deadline;
                    delete quest.dateDifference;
                    delete quest.dateModif;
                }
                const updates: any = {};
                updates['/quests/' + snapshot.key] = quest;
                this.selectQuest(quest);
                return update(ref(database), updates)
            })
        }  
    }
    deleteQuest = (id: string = "default") => {
        this.cancelSelectingQuest();
        return remove(ref(database, '/quests/' + id));
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
    makeAttrDefault = (id: string, attr: string) => {
        const questsRef = ref(database);
        get(child(questsRef, `quests/${id}`)).then((snapshot) => {
            let quest: Quest = snapshot.val();
            quest[attr] = 'default';
            const updates: any = {};
            updates['/quests/' + snapshot.key] = quest;
            return update(ref(database), updates)
        })  
    }
    setSearchOptions = (attr: string, value: string) => {
        runInAction(() => {
            this.searchQuest[attr] = value;
        })
    }
    

    // ================================================================================ //
    // ================================= GROUP BLOCK ================================= //
    // ================================================================================ //
    getGroups = () => {
        return(toJS(this.groups));
    }
    addGroup = () => {
        const groupName = (<HTMLInputElement>document.querySelector('#groupName')).value;
        const groupDescription = (<HTMLTextAreaElement>document.querySelector('#groupDescription')).value;
        if (groupName) {
            let groupData: Group = {
                name: groupName,
                description: groupDescription
            }
            const newGroupKey = push(child(ref(database), 'groups')).key;
            const updates: any = {};
            updates['/groups/' + newGroupKey] = groupData;
            return update(ref(database), updates);
        }
    }
    editGroup = (id: string = "default") => {
        const groupsRef = ref(database);
        const groupName = (<HTMLInputElement>document.querySelector('#groupNameE')).value;
        const groupDescription = (<HTMLTextAreaElement>document.querySelector('#groupDescriptionE')).value;
        if (groupName) {
            get(child(groupsRef, `groups/${id}`)).then((snapshot) => {
                let group: Group = snapshot.val();
                group.name = groupName;
                group.description = groupDescription;
                const updates: any = {};
                updates['/groups/' + snapshot.key] = group;
                return update(ref(database), updates)
            })
        }
    }
    deleteGroup = (id: string = "group") => {
        this.searchQuest.group = "default";
        const searching = this.quests.filter(quest => quest.group === id);
        // console.log(toJS(searching));
        searching.forEach(quest => {
            // console.log(toJS(quest));
            if (quest.id)
            this.makeAttrDefault(quest.id, "group");
        })
        return remove(ref(database, '/groups/' + id));
    }
    findGroupById = (id: string = "default") => {
        return this.groups.find(group => group.id === id)
    }

    // ================================================================================ //
    // ================================ RESTS BLOCK =================================== //
    // ================================================================================ //
    getRests = () => {
        return(toJS(this.rests));
    }
    addRest = () => {
        const restName = (<HTMLInputElement>document.querySelector('#restName')).value;
        const restDescription = (<HTMLTextAreaElement>document.querySelector('#restDescription')).value;
        const restCost = (<HTMLInputElement>document.querySelector('#restCost')).value;
        if (restName && restCost) {
            let restData: Rest = {
                name: restName,
                description: restDescription,
                cost: Number(restCost)
            }
            const newRestKey = push(child(ref(database), 'rests')).key;
            const updates: any = {};
            updates['/rests/' + newRestKey] = restData;
            return update(ref(database), updates);
        }
    }
    editRest = (id: string = "default") => {
        const restsRef = ref(database);
        const restName = (<HTMLInputElement>document.querySelector('#restNameE')).value;
        const restDescription = (<HTMLTextAreaElement>document.querySelector('#restDescriptionE')).value;
        const restCost = (<HTMLInputElement>document.querySelector('#restCost')).value;
        if (restName) {
            get(child(restsRef, `rests/${id}`)).then((snapshot) => {
                let restData: Rest = snapshot.val();
                restData.name = restName;
                restData.description = restDescription;
                restData.cost = Number(restCost);
                const updates: any = {};
                updates['/rests/' + snapshot.key] = restData;
                return update(ref(database), updates)
            })
        }
    }
    deleteRest = (id: string = "default") => {
        return remove(ref(database, '/rests/' + id));
    }
    findRestById = (id: string = "default") => {
        return this.rests.find(rest => rest.id === id);
    }

    // ================================================================================ //
    // =============================== PURCHASES BLOCK ================================ //
    // ================================================================================ //
    getPurchases = () => {
        return(toJS(this.purchases));
    }
    addPurchase = () => {
        const purchaseName = (<HTMLSelectElement>document.querySelector('#purchaseName')).value;
        const purchaseMinutes = (<HTMLInputElement>document.querySelector('#purchaseMinutes')).value;
        const rest = this.findRestById(purchaseName);
        if (rest && purchaseMinutes) {
            let purchaseData: Purchase = {
                name: rest.name,
                restId: rest.id,
                description: rest.description,
                cost: rest.cost,
                minutes: Number(purchaseMinutes),
                price: rest.cost * Number(purchaseMinutes),
                dateBuy: new Date()
            }
            this.updateCoins(-purchaseData.price);
            const newPurchaseKey = push(child(ref(database), 'purchases')).key;
            const updates: any = {};
            updates['/purchases/' + newPurchaseKey] = purchaseData;
            return update(ref(database), updates);
        }
    }
    editPurchase = (id: string = "default") => {
        const purchasesRef = ref(database);
        const purchaseName = (<HTMLSelectElement>document.querySelector('#purchaseNameE')).value;
        const purchaseMinutes = (<HTMLInputElement>document.querySelector('#purchaseMinutesE')).value;
        const rest = this.findRestById(purchaseName);
        if (rest && purchaseMinutes) {
            get(child(purchasesRef, `purchases/${id}`)).then((snapshot) => {
                let purchaseData: Purchase = snapshot.val();
                this.updateCoins(+purchaseData.price);
                purchaseData.name = rest.name;
                purchaseData.restId = rest.id;
                purchaseData.description = rest.description;
                purchaseData.cost = rest.cost;
                purchaseData.minutes = Number(purchaseMinutes);
                purchaseData.price = rest.cost * Number(purchaseMinutes);
                const updates: any = {};
                updates['/purchases/' + snapshot.key] = purchaseData;
                return update(ref(database), updates)
            })
        }
    }
    deletePurchase = (id: string = "default") => {
        return remove(ref(database, '/purchases/' + id));
    }
    cancelPurchase = (purchase: Purchase) => {
        this.updateCoins(+purchase.price);
        return remove(ref(database, '/purchases/' + purchase.id));
    }

}

export default Store;