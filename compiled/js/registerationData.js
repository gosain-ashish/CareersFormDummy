export default class registerationData {
    constructor(fname, lName, mail, phone, dateofBirth, gender, country) {
        this.firstName = fname;
        this.lastName = lName;
        this.email = mail;
        this.phone = phone;
        this.DOB = dateofBirth;
        this.gender = gender;
        this.country = country;
    }
    getfirstName() {
        return this.firstName;
    }
    setfirstName(value) {
        this.firstName = value;
    }
    getlastName() {
        return this.lastName;
    }
    setlastName(value) {
        this.lastName = value;
    }
    getgender() {
        return this.gender;
    }
    setgender(value) {
        this.gender = value;
    }
    getDOB() {
        return this.DOB;
    }
    setDOB(value) {
        this.DOB = value;
    }
    getphone() {
        return this.phone;
    }
    setphone(value) {
        this.phone = value;
    }
    getemail() {
        return this.email;
    }
    setemail(value) {
        this.email = value;
    }
    getcountry() {
        return this.country;
    }
    setcountry(value) {
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
//# sourceMappingURL=registerationData.js.map