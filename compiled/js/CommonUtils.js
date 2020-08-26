import registerationData from "./registerationData.js";
import data from './Data.js';
let datalist = [];
export default function saveData(form) {
    const formData = new FormData(form);
    let Fname = formData.get("firstName");
    let Lname = formData.get("lastName");
    let phone = formData.get("phone");
    let email = formData.get("emailAddress");
    let gender = formData.get("gender");
    let dateOfBirth = formData.get("birthDate");
    let country = formData.get("country");
    const data = new registerationData(Fname, Lname, email, phone, dateOfBirth, gender, country);
    datalist.push(data);
    console.log(datalist);
}
function getDataFromLocation() {
    let locationMap = new Map();
    for (let n in data) {
        let stateArray = [];
        let stateObj;
        for (let x in data[n].States) {
            stateObj = { State: data[n].States[x].State, city: data[n].States[x].Cities };
            stateArray.push(stateObj);
        }
        locationMap.set(data[n].Country, stateArray);
    }
    return locationMap;
}
const locationMap = getDataFromLocation();
let selectedCountry;
//This method is used fetching the data for dropdown of country, city state.
function getdropdownDataForLocation(catagory, country, state) {
    //return locationMap.get('INDIA');
    switch (catagory) {
        case 'country':
            return locationMap.keys();
            break;
        case 'state':
            selectedCountry = country;
            return getState(country);
            break;
        case 'Cities':
            return getCities(selectedCountry, state);
            break;
    }
}
//code for fetching states
function getState(country) {
    let states = [];
    for (let i = 0; i < locationMap.get(country).length; i++) {
        states.push(locationMap.get(country)[i].State);
    }
    return states;
}
//code for fetching cities
function getCities(contryval, val) {
    let cities = [];
    for (let i = 0; i < locationMap.get(contryval).length; i++) {
        if ((locationMap.get(contryval)[i].State) === val) {
            cities = locationMap.get(contryval)[i].city;
        }
    }
    return cities;
}
//this method will run after the loading of DOM
window.addEventListener('DOMContentLoaded', (event) => {
    let selectCountryEle = document.querySelector('.country');
    let selectStateEle = document.querySelector('.state');
    const loadCountry = getdropdownDataForLocation('country');
    for (let val of loadCountry) {
        selectCountryEle.add(new Option(val, val));
    }
    selectCountryEle.addEventListener('change', function (evt) {
        onChangeSelect(evt, 'state'); //load data for state on onChange of country
    });
    selectStateEle.addEventListener('change', function (evt) {
        onChangeSelect(evt, 'Cities'); //load data for state on onChange of country
    });
});
//@param evt contains the event that clicked ei: select box
//@param ID: contains the  value of name/class of select box
// This method is used to proceed with on change method. 
function onChangeSelect(evt, ID) {
    let ele = evt.currentTarget;
    let selectedValOfTarget = ele.value;
    let loadState;
    if (ID === 'Cities') {
        loadState = getdropdownDataForLocation(ID, selectedCountry, selectedValOfTarget);
    }
    else {
        loadState = getdropdownDataForLocation(ID, selectedValOfTarget);
        let selectCityEle = document.querySelector('.Cities');
        selectCityEle.options.length = 0;
    }
    let selectStateEle = document.querySelector('.' + ID);
    selectStateEle.options.length = 0;
    for (let val of loadState) {
        selectStateEle.add(new Option(val, val));
    }
}
//# sourceMappingURL=CommonUtils.js.map