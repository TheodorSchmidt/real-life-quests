import Perk from "./Perk";

// enum Coefficient { VerySmall=0.25, Small=0.5, Middle=1, Big=1.5, VeryBig=2 }

export default interface Rest {
    id?: string;
    name: string;
    description?: string;
    // icon?: string;
    // satisfaction?: Coefficient;
    // benefit?: Coefficient;
    cost: number;
    // perks?: Perk[];
    // expirience?: number;
}