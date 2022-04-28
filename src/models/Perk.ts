export default interface Perk {
    name: string;
    description?: string;
    experience: number;
    level: number;
    icon?: string;
    child_perk?: number;
    parent_perk?: number;
}