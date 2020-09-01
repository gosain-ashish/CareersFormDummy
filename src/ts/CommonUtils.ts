import registerationData from "./registerationData.js";
import registrationDataInterface from "./registrationDataInterface";
import data from './Data.js';
import {states} from './locationInterface';

const locationMap  =  getDataFromLocation();
let selectedCountry: string;
let datalist : registrationDataInterface[] = [];

export default function saveData(form: HTMLFormElement){

    const formData = new FormData(form);

    let Fname = formData.get("firstName")!;

    let Lname = formData.get("lastName")!;

    let phone = formData.get("phone")!;

    let email = formData.get("emailAddress")!;

    let gender = formData.get("gender")!;

    let dateOfBirth = formData.get("birthDate")!;

    let country = formData.get("country")!;

    const data = new registerationData(Fname, Lname, email, phone, dateOfBirth, gender, country);

    datalist.push(data);

    console.log(datalist);

}

function getDataFromLocation(){
    let locationMap = new Map<string, states[]>();

    for(let n in data)
    {
        let stateArray : states[]= [];
        let stateObj : states;

        for(let x in data[n].States)
        {
            stateObj = {State: data[n].States[x].State , city: data[n].States[x].Cities };
           
            stateArray.push(stateObj);
        }
        locationMap.set(data[n].Country , stateArray);
    }

    return locationMap;
}


//this method will run after the loading of DOM
window.addEventListener('DOMContentLoaded', (event) => {
   
    let selectCountryEle = document.querySelector('.country') as HTMLSelectElement;
    let selectStateEle = document.querySelector('.state') as HTMLSelectElement;
    
    //Load data for countries
    getdropdownDataForLocation('country')!;  

    //load data for state on onChange of country
   selectCountryEle.addEventListener('change', function(evt) {
    onChangeSelect(evt, 'state');  
   
    });

    //load data for city on onChange of country  
    selectStateEle.addEventListener('change', function(evt) {
        onChangeSelect(evt, 'Cities');       
        });   
});




/**
 * This method is used fetching the data for dropdown of country, city state.
 * @param catagory string : Element catagory to which we need to load the data for Ex: Country city and state
 * @param country string: value of country selected
 * @param State string: value of state selected by the dropdown
 */
function getdropdownDataForLocation(catagory: string, country?: string , state?: string  ) {
    
    let selectCountryEle = document.querySelector('.country') as HTMLSelectElement;
    //return locationMap.get('INDIA');
    switch(catagory){

        case 'country':
            for(let val of locationMap.keys()){
                selectCountryEle.add(new Option(val, val));
            }
            break;
        
        case 'state' : 
            selectedCountry = country!;
            getState(country!);
            break;

        case 'Cities' :
            getCities(selectedCountry!, state!);
            break;
    }     
}


/**
 * This method is used fetching/loading the data for dropdown state.
 * @param country string: value of country selected.
 */
function getState(country: string) {   
    let selectStateEle = document.querySelector('.state') as HTMLSelectElement;
    let selectCityEle = document.querySelector('.Cities') as HTMLSelectElement;
    let stateVale ='';
    
    resetOptions(selectStateEle, selectCityEle);

    for(let i = 0; i < locationMap.get(country)!.length; i++ )
    {
        stateVale = locationMap.get(country)![i].State;
        selectStateEle.add(new Option(stateVale, stateVale));
    }    
}


/**
 * This method is used fetching/loading the data for dropdown Cities.
 * @param contryval string: value of country selected
 * @param val string: value of state selected by the dropdown
 */
function getCities(contryval: string, val: string){
    let cities: string[] = [];
    let selectCityEle = document.querySelector('.Cities') as HTMLSelectElement;
    
    resetOptions(selectCityEle);
    
    for(let i = 0; i < locationMap.get(contryval)!.length; i++ )
    {
        if((locationMap.get(contryval)![i].State) === val){
          cities = locationMap.get(contryval)![i].city;
        }
    }  
    
    for(let val of cities){
        selectCityEle.add(new Option(val, val)) ;
    }
}

/**
*@param evt contains the event that clicked ei: select box
*@param elementClass: contains the  value of name/class of select box
*This method is used to proceed with on change method. 
*/
function onChangeSelect(evt: Event, elementClass: string){
    let ele = evt.currentTarget as HTMLSelectElement;
    let selectedValOfTarget = ele.value;

    if(elementClass === 'Cities') {
       getdropdownDataForLocation(elementClass ,selectedCountry,  selectedValOfTarget)!;
    }
    else {
        getdropdownDataForLocation(elementClass,  selectedValOfTarget)!;
    }
}

/**
 * This below function is used to reset options in a select element, While selecting a new option it will
 * empty current options first.
 * 
 * @param selectElement HTMLSelectElement: Rest parameters of SelectElement type to add options
 */
function resetOptions(...selectElement: HTMLSelectElement[]) {
    selectElement.forEach((value) => {
        value.length = 0;
        value.add(new Option("Select","",true,true));
    })
}