export class Item {
    itemId: number = 0;
    itemName: string = "";
    itemApiKey: number = 0;
}

export class Food {
    apiKey: string = "";
    name: string = "";
    description: string = "";
    basePrice: number = 0.0;
}

export interface Cart {
    itemApiKey: {
        [key: string]: Item
    };
}