export class User {
    fristName: string;
    lastName: string;
    birthDate: number;
    street: string;
    zipcode: number;
    city: string;

    constructor(obj?: any){
        this.fristName = obj ? obj.fristName : ''; //ist ein if abfrage ? wenn obj nicht existiert ein leerer string
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipcode = obj ? obj.zipcode : '';
        this.city = obj ? obj.city : '';
    }
}