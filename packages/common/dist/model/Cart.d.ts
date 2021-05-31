export declare type CartList = {
    id: string;
    title: string;
    description: string;
    due_date: Date;
};
export declare type AllCarts = {
    data: (Omit<CartList, "due_date"> & {
        due_date: string;
    })[];
};
