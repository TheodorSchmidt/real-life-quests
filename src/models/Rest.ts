import Perk from "./Perk";

enum Coefficient { VerySmall=1, Small=2, Middle=3, Big=4, VeryBig=5 }

export default interface Rest {
    name: string;
    description?: string;
    icon?: string;
    satisfaction: Coefficient;
    benefit: Coefficient;
    cost: number;
    perks?: Perk[];
    expirience?: number;
}