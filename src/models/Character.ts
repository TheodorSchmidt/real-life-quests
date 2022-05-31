export enum Relations { Nobody=0, Familiar=1, Fellow=2, Friend=3, BestFriend=4, Soulmate=5 }
//Familiar, fellow, friend, bestfriend, soulmate,

export type Activity = {
    date: string,
    active: number,
    check: boolean
}
export default interface Character {
    id?: string;
    nickname: string;
    realname: string;
    relations: Relations; 
    relationsCoins: number;
    // photo?: string;
    address?: string;
    // work?: string;
    phone?: string;
    // secondPhone?: string;
    email?: string;
    // secondEmail?: string;
    description?: string;
    activity: Activity[];
    // social?: {
    //     [network: string]: string;
    // } 
}