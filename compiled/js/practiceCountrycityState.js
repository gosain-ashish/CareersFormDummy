import data from './Data.js';
function firstapproach() {
    let locationMap = new Map();
    for (let val in data) {
        let stateCityMap = new Map();
        for (let stateVal in data[val].States) {
            stateCityMap.set(data[val].States[stateVal].State, data[val].States[stateVal].Cities);
            locationMap.set(data[val].Country, stateCityMap);
        }
    }
    console.log(data[0].Country);
}
function secondApproach() {
    let locationMap = new Map();
    for (let val in data) {
        let statesArray = [];
        let statesType;
        for (let stateVal in data[val].States) {
            statesType = { State: data[val].States[stateVal].State, city: data[val].States[stateVal].Cities };
            statesArray.push(statesType);
        }
        locationMap.set(data[val].Country, statesArray);
    }
    console.log(locationMap);
}
function thirdApproach() {
    let locationArray = [];
    let location;
    let jsondata = data;
    for (let val in jsondata) {
        /* let statesArray: states[] = [];

        let statesType : states; */
        /*  for(let stateVal in jsondata[val].States){
 
             statesType = {State: jsondata[val].States[stateVal].State , city: jsondata[val].States[stateVal].Cities  }
 
             statesArray.push(statesType)
 
             
         } */
        location = { countries: jsondata[val].Country, stateV: jsondata[val].States };
        //locationMap.push(data[val].Country , statesArray )
        locationArray.push(location);
        //  location.getcities();
    }
    console.log(locationArray);
}
function forthApproach() {
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
    console.log(locationMap);
}
function fifthApproach() {
    let location = [];
    let eachLocation;
    let jsondata = data;
    for (let n in jsondata) {
        if (jsondata[n].Country === "INDIA") {
            if (jsondata[n].States[0].State === "Haryana") {
                console.log('Haryana agya');
            }
            // eachLocation = {country: jsondata[n].Country, state:jsondata[n].Country  }
            //console.log('india agya');
        }
    }
    console.log(jsondata[0].States[1].State);
}
//firstapproach();
//fifthApproach();
//# sourceMappingURL=practiceCountrycityState.js.map