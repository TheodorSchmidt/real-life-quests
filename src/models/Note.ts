export default interface Note {
    date: Date;
    headline?: string;
    note: string;
    editing: boolean;
}