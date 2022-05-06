import { getDatabase, get, ref, onValue, child, push, update, remove } from 'firebase/database';
import { runInAction, action, makeObservable, flow, flowResult, observable, computed, makeAutoObservable } from 'mobx';
import { database } from '../firebase';
import Quest from "../models/Quest";
import fetchQuests from "../api/fetchQuests"
import { toJS } from 'mobx';

class Store {
    @observable quests: Quest[] = [];
    @observable points: number = 0;

    constructor() {
       const questsRef = ref(database, 'quests/');
       
       runInAction(() => {
           makeAutoObservable(this, {
                quests: observable,
                getquests: action,
                addQuest: action
            })
            onValue(questsRef, (snapshot) => {
                this.quests = [];
                const data: Quest[] = snapshot.val();
                Object.keys(data).map((key) => {
                    data[key].id = key; 
                    this.quests.push(data[key]);
                })
            })
            // makeObservable(this);            
       })
    }

    // getQuests = async() => {
    //     runInAction(() => {
    //         this.isLoadingQuests = true;
    //     })
    //     const data = await fetchQuests.quests();
    //     runInAction(() => {
    //         this.quests = data;
    //         this.isLoadingQuests = false;
    //     })
    //     return this.quests;
    // }

    getquests() {
        return(toJS(this.quests));
    }
    addQuest = () => {
        const questName = (<HTMLInputElement>document.querySelector('#questName')).value;
        // console.log(questName);
        if (questName && questName !== "") {
            const questData: Quest = {
                name: questName,
                completed: false
            }
            const newQuestKey = push(child(ref(database), 'quests')).key;
            const updates: any = {};
            updates['/quests/' + newQuestKey] = questData;
            return update(ref(database), updates);
        }
    }
    doQuest = (id: string = "default") => {
        
    }
    deleteQuest = (id: string = "default") => {
        return remove(ref(database, '/quests/' + id));
    }
    updateQuest = (id: string = "default") => {

    }
}

export default Store;