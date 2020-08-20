import registerationData from "./registerationData.js"
import registrationDataInterface from "./registrationDataInterface"
import data from './Data.js'


let datalist : registrationDataInterface[] = [];
export default function saveData(form: HTMLFormElement){

    const formData = new FormData(form);

    let Fname = formData.get("firstName")! ;

    let Lname = formData.get("lastName")! ;

    let phone = formData.get("phone")! ;

    let email = formData.get("emailAddress")! ;

    let gender = formData.get("gender")!;

    let dateOfBirth = formData.get("birthDate")! ;

    let country = formData.get("country")!;

    const data = new registerationData(Fname, Lname, email, phone, dateOfBirth, gender, country);

    datalist.push(data);

    console.log(datalist);

}


