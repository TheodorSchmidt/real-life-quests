import { get, ref, onValue, child, push, update, remove } from 'firebase/database';
import { runInAction, action, observable, makeAutoObservable } from 'mobx';
import { database } from '../firebase';
import Quest from "../models/Quest";
import Group from '../models/Group';
import Rest from "../models/Rest";
import { Coefficient, Status } from '../models/Quest';
import { Relations } from '../models/Character';
import { toJS } from 'mobx';
import Datetime from '../modules/Datetime';
import Relate from '../modules/Relate';
import Purchase from '../models/Purchase';
import Character from '../models/Character';

class Store {
    @observable coins: number = 0;
    @observable quests: Quest[] = [];
    @observable selectedQuest: Quest | undefined = undefined;
    @observable groups: Group[] = [];
    @observable selectedGroup: Group | undefined = undefined;
    @observable filterQuest: any = {
        status: 1,
        group: "all",
        character: "all"
    }
    @observable sortQuest: any = {
        attr: "default",
        isDown: true
    }
    @observable questStatistic: any[] = [];
    @observable rests: Rest[] = [];
    @observable selectedRest: Rest | undefined = undefined;
    @observable purchases: Purchase[] = [];
    @observable selectedPurchase: Purchase | undefined = undefined;
    @observable purchaseStatistic: any[] = [];
    @observable characters: Character[] = [];
    @observable selectedCharacter: Character | undefined = undefined;

    constructor() {
       const coinsRef = ref(database, 'coins/');
       const questsRef = ref(database, 'quests/');
       const groupsRef = ref(database, 'groups/');
       const restsRef = ref(database, 'rests/');
       const purchasesRef = ref(database, 'purchases/');
       const charactersRef = ref(database, 'characters/');

       runInAction(() => {
           makeAutoObservable(this, {
                coins: observable,
                quests: observable,
                selectedQuest: observable,
                selectedGroup: observable,
                selectedCharacter: observable,
                selectedRest: observable,
                selectedPurchase: observable,
                filterQuest: observable,
                sortQuest: observable,
                questStatistic: observable,
                purchaseStatistic: observable,
                groups: observable,
                rests: observable,
                purchases: observable,
                characters: observable,
                updateCoins: action,
                updateDateDiff: action,
                updateActivity: action,
                getQuests: action,
                getGroups: action,
                getRests: action,
                getPurchases: action,
                addQuest: action,
                addGroup: action,
                addRest: action,
                addPurchase: action,
                addCharacter: action,
                editQuest: action,
                editGroup: action,
                editRest: action,
                editPurchase: action,
                editCharacter: action,
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
            onValue(charactersRef, (snapshot) => {
                this.characters = [];
                const data: Character[] = snapshot.val();
                Object.keys(data).map((key) => {
                    data[key].id = key;
                    this.characters.push(data[key]);
                })
            })
       })
    }


    // ================================================================================ //
    // ================================= COINS BLOCK ================================== //
    // ================================================================================ //
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
        const questCharacter = (<HTMLSelectElement>document.querySelector('#questCharacter')).value;
        const questDeadline = (<HTMLInputElement>document.querySelector('#questDeadline')).value;
        // const questRepeatable = (<HTMLSelectElement>document.querySelector('#questRepeatable')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation && questGroup) {
            let questData: Quest = {
                name: questName,
                group: questGroup,
                difficulty: Coefficient[questDifficulty],
                importancy: Coefficient[questImportancy],
                motivation: Coefficient[questMotivation],
                reward: Math.round(100 * Coefficient[questDifficulty] * Coefficient[questImportancy] * Coefficient[questMotivation]),
                description: questDescription,
                character: questCharacter,
                status: Status["ACTIVE"]
            }
            if (questDeadline !== "" && questDeadline !== undefined) {
                const date = new Date(questDeadline);
                questData.deadline = date; 
                questData.dateDifference = Datetime.calcDaysDifference(date);
                questData.dateModif = Datetime.calcDateCoefficient(questData.dateDifference);
                questData.reward = Math.round(questData.reward * questData.dateModif);
                // if (questRepeatable !== "default") {
                //     questData.repeatableDays = Number(questRepeatable);
                //     questData.repeatableCurrent = 0;
                //     questData.repeatableBest = 0;
                // }
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
        const questCharacter = (<HTMLSelectElement>document.querySelector('#questCharacterE')).value;
        const questDeadline = (<HTMLInputElement>document.querySelector('#questDeadlineE')).value;
        if (questName && questName !== "" && questDifficulty && questImportancy && questMotivation) {
            get(child(questsRef, `quests/${id}`)).then((snapshot) => {
                let questData: Quest = snapshot.val();
                questData.name = questName;
                questData.group = questGroup;
                questData.difficulty = Coefficient[questDifficulty];
                questData.importancy = Coefficient[questImportancy];
                questData.motivation = Coefficient[questMotivation];
                questData.reward = 100 * Coefficient[questDifficulty] * Coefficient[questImportancy] * Coefficient[questMotivation];
                questData.description = questDescription;
                if (questDeadline !== "" && questDeadline !== undefined) {
                    const dateDeadline = new Date(questDeadline);
                    questData.deadline = dateDeadline; 
                    questData.dateDifference = Datetime.calcDaysDifference(dateDeadline);
                    const coefficient = Datetime.calcDateCoefficient(questData.dateDifference);
                    Datetime.newDateModif(questData, coefficient);
                } else {
                    delete questData.deadline;
                    delete questData.dateDifference;
                    delete questData.dateModif;
                }
                questData.character = questCharacter;
                const updates: any = {};
                updates['/quests/' + snapshot.key] = questData;
                this.selectQuest(questData);
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
                    quest.dateComplete = new Date();
                    if (quest.deadline) {
                        this.updateDateDiff(quest);
                    }
                    if (quest.character) {
                        this.updateActivity(quest.character, 1);
                        this.cancelSelectingCharacter();
                    }
                    // if (quest.repeatableDays && quest.repeatableBest && quest.repeatableCurrent) {
                    //     if (quest.dateModif && quest.dateModif >= 1) {
                    //         quest.repeatableCurrent += 1;
                    //     } else {
                    //         if (quest.repeatableCurrent > quest.repeatableBest) {
                    //             quest.repeatableBest = quest.repeatableCurrent;
                    //         }
                    //         quest.repeatableCurrent = 1;
                    //     }
                    //     quest.status = 1;
                    //     quest.deadline = Datetime.addDays(quest.dateComplete, quest.repeatableDays);
                    // } else {
                    //     quest.status = 2;
                    // }
                    this.updateCoins(quest.reward);
                } else {
                    quest.status = 3;
                    // quest.dateComplete = new Date();
                    // if (quest.repeatableDays && quest.repeatableBest && quest.repeatableCurrent) {
                    //     if (quest.repeatableCurrent > quest.repeatableBest) {
                    //         quest.repeatableBest = quest.repeatableCurrent;
                    //     }
                    //     quest.repeatableCurrent = 0;
                    //     quest.status = 1;
                    //     quest.deadline = Datetime.addDays(quest.dateComplete, quest.repeatableDays);
                    // }
                }
            } else if (cancel === true) {
                if (complete === true) {
                    quest.status = 1;
                    if (quest.character) {
                        this.updateActivity(quest.character, -1, quest.dateComplete, true);
                        this.cancelSelectingCharacter();
                    }
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
    setFilterOptions = (attr: string, value: string) => {
        this.cancelSelectingQuest();
        runInAction(() => {
            this.filterQuest[attr] = value;
        })
    }
    setSortOptions = (value: string) => {
        this.cancelSelectingQuest();
        let attr = "default";
        let isDown = true;
        if (value === "rewardUp") {
            attr = "reward";
            isDown = false;
        } else if (value === "rewardDown") {
            attr = "reward";
            isDown = true;
        } else if (value === "importancyUp") {
            attr = "importancy";
            isDown = false;
        } else if (value === "importancyDown") {
            attr = "importancy";
            isDown = true;
        } else if (value === "difficultyUp") {
            attr = "difficulty";
            isDown = false;
        } else if (value === "difficultyDown") {
            attr = "difficulty";
            isDown = true
        } else if (value === "motivationUp") {
            attr = "motivation";
            isDown = false;
        } else if (value === "motivationDown") {
            attr = "motivation";
            isDown = true;
        }
        runInAction(() => {
            this.sortQuest.attr = attr;
            this.sortQuest.isDown = isDown;
        })
    }
    

    // ================================================================================ //
    // ================================= GROUPS BLOCK ================================= //
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
                let groupData: Group = snapshot.val();
                groupData.name = groupName;
                groupData.description = groupDescription;
                const updates: any = {};
                updates['/groups/' + snapshot.key] = groupData;
                this.selectGroup(groupData);
                return update(ref(database), updates)
            })
        }
    }
    deleteGroup = (id: string = "group") => {
        this.cancelSelectingGroup();
        this.filterQuest.group = "default";
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
    selectGroup = (group: Group) => {
        runInAction(() => {
            this.selectedGroup = group;
        })
    }
    cancelSelectingGroup = () => {
        runInAction(() => {
            this.selectedGroup = undefined;
        })
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
            console.log(restData);
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
        const restCost = (<HTMLInputElement>document.querySelector('#restCostE')).value;
        if (restName && restCost) {
            get(child(restsRef, `rests/${id}`)).then((snapshot) => {
                let restData: Rest = snapshot.val();
                restData.name = restName;
                restData.description = restDescription;
                restData.cost = Number(restCost);
                const updates: any = {};
                updates['/rests/' + snapshot.key] = restData;
                this.selectRest(restData);
                return update(ref(database), updates)
            })
        }
    }
    deleteRest = (id: string = "default") => {
        this.cancelSelectingRest();
        return remove(ref(database, '/rests/' + id));
    }
    selectRest = (rest: Rest) => {
        runInAction(() => {
            this.selectedRest = rest;
        })
    }
    cancelSelectingRest = () => {
        runInAction(() => {
            this.selectedRest = undefined;
        })
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
        const purchaseCharacter = (<HTMLSelectElement>document.querySelector('#purchaseCharacter')).value;
        const rest = this.findRestById(purchaseName);
        if (rest && purchaseMinutes) {
            let purchaseData: Purchase = {
                name: rest.name,
                restId: rest.id,
                description: rest.description,
                cost: rest.cost,
                minutes: Number(purchaseMinutes),
                price: rest.cost * Number(purchaseMinutes),
                dateBuy: new Date(),
                character: purchaseCharacter
            }
            this.updateCoins(-purchaseData.price);
            if (purchaseCharacter) {
                this.updateActivity(purchaseData.character, 1);
                this.cancelSelectingCharacter();
            }
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
        const purchaseCharacter = (<HTMLSelectElement>document.querySelector('#purchaseCharacterE')).value;
        const rest = this.findRestById(purchaseName);
        if (rest && purchaseMinutes) {
            get(child(purchasesRef, `purchases/${id}`)).then((snapshot) => {
                let purchaseData: Purchase = snapshot.val();
                const priceOld = purchaseData.price;
                purchaseData.name = rest.name;
                purchaseData.restId = rest.id;
                purchaseData.description = rest.description;
                purchaseData.cost = rest.cost;
                purchaseData.minutes = Number(purchaseMinutes);
                purchaseData.price = rest.cost * Number(purchaseMinutes);
                this.updateCoins(priceOld - purchaseData.price);
                if (purchaseCharacter !== purchaseData.character) {
                    this.updateActivity(purchaseData.character, -1, purchaseData.dateBuy, true);
                    this.updateActivity(purchaseCharacter, 1, purchaseData.dateBuy);
                }
                const updates: any = {};
                updates['/purchases/' + snapshot.key] = purchaseData;
                this.selectPurchase(purchaseData);
                return update(ref(database), updates)
            })
        }
    }
    deletePurchase = (id: string = "default") => {
        this.cancelSelectingPurchase();
        return remove(ref(database, '/purchases/' + id));
    }
    cancelPurchase = (purchase: Purchase) => {
        this.cancelSelectingPurchase();
        this.updateCoins(purchase.price);
        if (purchase.character) {
            this.updateActivity(purchase.character, -1);
            this.cancelSelectingCharacter();
        }
        return remove(ref(database, '/purchases/' + purchase.id));
    }
    selectPurchase = (purchase: Purchase) => {
        runInAction(() => {
            this.selectedPurchase = purchase;
        })
    }
    cancelSelectingPurchase = () => {
        runInAction(() => {
            this.selectedPurchase = undefined;
        })
    }


    // ================================================================================ //
    // ============================== CHARACTERS BLOCK ================================ //
    // ================================================================================ //
    getCharacters = () => {
        return(toJS(this.characters));
    }
    addCharacter = () => {
        const characterNickname = (<HTMLInputElement>document.querySelector('#characterNickname')).value;
        const characterRealname = (<HTMLInputElement>document.querySelector('#characterRealname')).value;
        const characterDescription = (<HTMLInputElement>document.querySelector('#characterDescription')).value;
        const characterRelations = (<HTMLSelectElement>document.querySelector('#characterRelations')).value;
        const characterAddress = (<HTMLInputElement>document.querySelector('#characterAddress')).value;
        const characterPhone = (<HTMLInputElement>document.querySelector('#characterPhone')).value;
        const characterEmail = (<HTMLInputElement>document.querySelector('#characterEmail')).value;
        if (characterNickname && characterRelations) {
            let startCoins = Relate.setRelationsCoins(Relations[characterRelations])
            let characterData: Character = {
                nickname: characterNickname,
                realname: characterRealname,
                description: characterDescription,
                relations: Relations[characterRelations],
                address: characterAddress,
                relationsCoins: startCoins,
                phone: characterPhone,
                email: characterEmail,
                activity: []
            }
            characterData.activity.push(
                {
                    date: Datetime.dateToString(new Date()),
                    active: 0,
                    check: false
                }
            )
            const newCharacterKey = push(child(ref(database), 'characters')).key;
            const updates: any = {};
            updates['/characters/' + newCharacterKey] = characterData;
            return update(ref(database), updates);
        }
    }
    editCharacter = (id: string = "default") => {   
        const charactersRef = ref(database);
        const characterNickname = (<HTMLInputElement>document.querySelector('#characterNicknameE')).value;
        const characterRealname = (<HTMLInputElement>document.querySelector('#characterRealnameE')).value;
        const characterDescription = (<HTMLInputElement>document.querySelector('#characterDescriptionE')).value;
        const characterRelations = (<HTMLSelectElement>document.querySelector('#characterRelationsE')).value;
        const characterAddress = (<HTMLInputElement>document.querySelector('#characterAddressE')).value;
        const characterPhone = (<HTMLInputElement>document.querySelector('#characterPhoneE')).value;
        const characterEmail = (<HTMLInputElement>document.querySelector('#characterEmailE')).value;
        if (characterNickname && characterRelations) {
            get(child(charactersRef, `characters/${id}`)).then((snapshot) => {
                let characterData: Character = snapshot.val();
                characterData.nickname = characterNickname;
                characterData.realname = characterRealname;
                characterData.description = characterDescription;
                if (characterData.relations !== Relations[characterRelations]) {
                    characterData.relations = Relations[characterRelations];
                    characterData.relationsCoins = Relate.setRelationsCoins(Relations[characterRelations]);
                }
                characterData.address = characterAddress;
                characterData.phone = characterPhone;
                characterData.email = characterEmail;
                const updates: any = {};
                updates['/characters/' + snapshot.key] = characterData;
                this.selectCharacter(characterData);
                return update(ref(database), updates)
            })
        }
    }
    deleteCharacter = (id: string = "default") => {
        this.cancelSelectingCharacter();
        const searching = this.quests.filter(quest => quest.character === id);
        searching.forEach(quest => {
            if (quest.id)
            this.makeAttrDefault(quest.id, "character");
        })
        return remove(ref(database, '/characters/' + id));
    }
    selectCharacter = (character: Character) => {
        runInAction(() => {
            this.selectedCharacter = character;
        })
    }
    cancelSelectingCharacter = () => {
        runInAction(() => {
            this.selectedCharacter = undefined;
        })
    }
    findCharacterById = (id: string = "default") => {
        return this.characters.find(character => character.id === id)
    }
    updateActivity = (id: string = "default", act: number, day: Date = new Date(), isCancel: boolean = false) => {
        const charactersRef = ref(database);
        get(child(charactersRef, `characters/${id}`)).then((snapshot) => {
            let characterData: Character = snapshot.val();
            console.log(characterData);
            let thisDayInd = characterData.activity.findIndex((a) => a.date == Datetime.dateToString(new Date(day)))
            if (thisDayInd == -1) {
                characterData.activity.push(
                {
                    date: Datetime.dateToString(new Date()),
                    active: Number(act),
                    check: false
                })
                console.log("SOME SHIT")
            } else {
                characterData.activity[thisDayInd].active += act;
                characterData.activity[thisDayInd].check = false;
                console.log("Я ЗДЕСЬ")
            }
            if (act > 0) {
                characterData.relationsCoins = Relate.changeRelationsCoins(characterData.relationsCoins, characterData.relations, true, isCancel);
                characterData.relations = Relate.changeRelationsStatus(characterData.relationsCoins);
            } else {
                characterData.relationsCoins = Relate.changeRelationsCoins(characterData.relationsCoins, characterData.relations, false, isCancel);
                characterData.relations = Relate.changeRelationsStatus(characterData.relationsCoins);
            }
            const updates: any = {};
            updates['/characters/' + snapshot.key] = characterData;
            return update(ref(database), updates)
        })
    }
    checkActivity = (id: string = "default") => {
        const charactersRef = ref(database);
        get(child(charactersRef, `characters/${id}`)).then((snapshot) => {
            let characterData: Character = snapshot.val();
            let today =  Datetime.dateToString(new Date());
            let todayInd = characterData.activity.findIndex((a) => a.date == today)
            if (todayInd === -1) {
                characterData.activity.push(
                {
                    date: Datetime.dateToString(new Date()),
                    active: 0,
                    check: false
                })
            }
            let notChecked = characterData.activity.filter((a) => a.check === false && a.date !== today)
            let notActive = notChecked.filter((a) => a.active === 0);
            notActive.forEach(a => {
                let dayInd = characterData.activity.findIndex((i) => i.date === a.date);
                characterData.activity[dayInd].check = true;
                characterData.relationsCoins = Relate.changeRelationsCoins(characterData.relationsCoins, characterData.relations, false);
                characterData.relations = Relate.changeRelationsStatus(characterData.relationsCoins);
            })
            const updates: any = {};
            updates['/characters/' + snapshot.key] = characterData;
            return update(ref(database), updates)
        })
    }


    // ================================================================================ //
    // ============================== STATISTICS BLOCK ================================ //
    // ================================================================================ //
    makeQuestStatistic = (array: any[]) => {
        runInAction(() => {
            this.questStatistic = array;
        })
    }
    makePurchaseStatistic = (array: any[]) => {
        runInAction(() => {
            this.questStatistic = array;
        })
    }

}

export default Store;