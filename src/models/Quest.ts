import Character from "./Character";
import Location from "./Location";
import Perk from "./Perk";

enum Coefficient { VerySmall=1, Small=2, Middle=3, Big=4, VeryBig=5 }
enum DateCoefficient { TooEarlier=1, MonthEarlier=2, TwoWeeksEarlier=3, WeekEarlier=4, ThreeDaysEarlier=5, 
                       Today=6,
                       ThreeDaysLater=7, WeekLater=8, TwoWeeksLater=9, MonthLater=10, TooLater=11}

export default interface Quest {
    name: string;
    description?: string;
    difficulty: Coefficient;
    importancy: Coefficient;
    motivation: Coefficient;
    date?: Date;
    dateModif?: DateCoefficient;
    reward: number;
    experience: number;
    characters?: Character[];
    locations?: Location;
    perks?: Perk[];
    completed: boolean;
}