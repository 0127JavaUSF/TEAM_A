export class orderHistory {
    id: number = 0;
    orderItems: foodItem[] = [];
    restApiKey: '';
    method;
    timestamp;
    object: {};
}

export class foodItem  {
    "name": "";
    "itemQuantity": 0;
    "apiKey": 0;
}

export class Order {
    userId: myUser;
    orderItems: foodItem[] = [];
    restApiKey: '';
    method;
    timestamp;
}

export class myUser {
    id: number = 0;
}