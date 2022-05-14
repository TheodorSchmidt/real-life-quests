import Character from "./Character";
import Location from "./Location";
import Perk from "./Perk";

export enum Coefficient { VerySmall=0.25, Small=0.5, Middle=1, Big=1.5, VeryBig=2 }
enum DateCoefficient { TooEarlier=1, MonthEarlier=2, TwoWeeksEarlier=3, WeekEarlier=4, ThreeDaysEarlier=5, 
                       Today=6,
                       ThreeDaysLater=7, WeekLater=8, TwoWeeksLater=9, MonthLater=10, TooLater=11}
export enum Status { ACTIVE=1, COMPLETED=2, FAILED=3 }

export default interface Quest {
    id?: string;
    name: string;
    description?: string;
    difficulty: Coefficient; //? yet
    importancy: Coefficient; //? yet
    motivation: Coefficient; //? yet
    date?: Date;
    dateModif?: DateCoefficient;
    reward: number; 
    experience?: number; //? yet
    characters?: Character[];
    locations?: Location;
    perks?: Perk[];
    //line?: string;
    status: Status;
}