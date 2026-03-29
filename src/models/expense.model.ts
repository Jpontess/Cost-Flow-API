
export interface Expense {
    id?: number;
    name: string;
    value: number
    user_id?: number
    type?: string
    created_in?: Date
    edited_in?: Date
}