export class User {
    id: number = 0;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    password: string = "";
    phoneNumber: string = "";
    
    address: string = "";
    city: string = "";
    state: string = "";
    zipCode: string = "";
    
    hasProfilePicture: boolean = false;
    profilePictureUrl: string = "";
    presignedUrl: string = "";
    
    orders: object = {};
}