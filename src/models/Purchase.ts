export default interface Purchase {
    id?: string,
    restId?: string,
    name: string,
    description?: string,
    character?: string,
    cost: number,
    minutes: number,
    price: number,
    dateBuy: Date
}