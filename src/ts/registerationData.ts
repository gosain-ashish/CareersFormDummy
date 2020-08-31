import Data from  './Data.js';
import registerationDataInterface from './registrationDataInterface.js'

type custType =  String| File;

export default class registerationData implements registerationDataInterface{
    private _firstName: custType;
   
    _lastName: custType;
   
    _email: custType;
   
    _phone: custType | number;
    
    _DOB: custType;
   
    _gender: custType;
   
    _country: custType;

    constructor(firstName: custType , lName: custType, mail: custType, phone: custType | number, dateofBirth: custType, gender: custType, country: custType){
        this._firstName = firstName;
        this._lastName = lName;
        this._email = mail;
        this._phone = phone;
        this._DOB = dateofBirth;
        this._gender = gender;
        this._country = country;
    }
  
    public get firstName(): custType {
        return this._firstName;
    }

    public get lastName(): custType {
        return this._lastName;
    }

    public get gender(): custType {
        return this._gender;
    }
    
    public get DOB(): custType {
        return this._DOB;
    }
    
    public get phone(): custType |number {
        return this._phone;
    }
    
    public get email(): custType {
        return this._email;
    }
    
    public get country(): custType {
        return this._country;
    }
    
}

