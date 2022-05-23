import Group from "./Group";
import Character from "./Character";
import Location from "./Location";
import Perk from "./Perk";

export enum Coefficient { VerySmall=0.25, Small=0.5, Middle=1, Big=1.5, VeryBig=2 }
export enum DateCoefficient { TooEarlier=1.8, MonthEarlier=1.6, TwoWeeksEarlier=1.4, WeekEarlier=1.2, ThreeDaysEarlier=1.1, 
                       Today=1,
                       ThreeDaysLater=0.9, WeekLater=0.8, TwoWeeksLater=0.6, MonthLater=0.4, TooLater=0.2}
export enum Status { ACTIVE=1, COMPLETED=2, FAILED=3 }

export default interface Quest {
    id?: string;
    name: string;
    group?: string;
    description?: string;
    difficulty: Coefficient; 
    importancy: Coefficient; 
    motivation: Coefficient; 
    deadline?: Date;
    dateModif?: DateCoefficient;
    dateDifference?: number;
    dateComplete?: Date;
    reward: number; 
    experience?: number; //? yet
    character?: string;
    locations?: Location;
    perks?: Perk[];
    //line?: string;
    status: Status;
}