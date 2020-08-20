import Data from  './Data.js';
import registerationDataInterface from './registrationDataInterface.js'

type custType =  String| File;

export default class registerationData implements registerationDataInterface{
    firstName: custType;
   
    lastName: custType;
   
    email: custType;
   
    phone: custType | number;
    
    DOB: custType;
   
    gender: custType;
   
    country: custType;

    constructor(fname: custType , lName: custType, mail: custType, phone: custType | number, dateofBirth: custType, gender: custType, country: custType){
        this.firstName = fname;
        this.lastName = lName;
        this.email = mail;
        this.phone = phone;
        this.DOB = dateofBirth;
        this.gender = gender;
        this.country = country;
    }

    
    public getfirstName(): custType {
        return this.firstName;
    }
    public setfirstName(value: custType) {
        this.firstName = value;
    }


    public getlastName(): custType {
        return this.lastName;
    }
    public setlastName(value: custType) {
        this.lastName = value;
    }

    public getgender(): custType {
        return this.gender;
    }
    public setgender(value: custType) {
        this.gender = value;
    }

    public getDOB(): custType {
        return this.DOB;
    }
    public setDOB(value: custType) {
        this.DOB = value;
    }

    public getphone(): custType |number {
        return this.phone;
    }
    public setphone(value: custType | number) {
        this.phone = value;
    }

    public getemail(): custType {
        return this.email;
    }
    public setemail(value: custType) {
        this.email = value;
    }

    public getcountry(): custType {
        return this.country;
    }
    public setcountry(value: custType) {
        this.country = value;
    }
}



//console.log(Data.Country);

/* function getCountry() {
    let location: Map<custType, Map<custType, custType[]>>;
    let states: Map<custType, custType[]>;

    // let country: custType = Data.

    let country = new Map<custType, custType>()

} */