export default interface Character {
    nickname: string;
    firstname: string;
    lastname: string;
    relations?: string;
    photo?: string;
    address?: string;
    work?: string;
    phone?: string;
    second_phone?: string;
    email?: string;
    second_email?: string;
    description?: string;
    social?: {
        [network: string]: string;
    } 
}