export default class registerationData {
    constructor(firstName, lName, mail, phone, dateofBirth, gender, country) {
        this._firstName = firstName;
        this._lastName = lName;
        this._email = mail;
        this._phone = phone;
        this._DOB = dateofBirth;
        this._gender = gender;
        this._country = country;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get gender() {
        return this._gender;
    }
    get DOB() {
        return this._DOB;
    }
    get phone() {
        return this._phone;
    }
    get email() {
        return this._email;
    }
    get country() {
        return this._country;
    }
}
//# sourceMappingURL=registerationData.js.map