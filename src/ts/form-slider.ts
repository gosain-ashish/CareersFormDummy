/**
 * Typescript file containing all form slider functions.
 */

import saveData from './CommonUtils.js';
import { Transition_Sequence, Shift_Towards } from './transition-enum.js';


const shiftMap = new Map<Transition_Sequence, string>()
    .set(Transition_Sequence.PREV_SEQ_1,"0%")
    .set(Transition_Sequence.PREV_SEQ_2,"-25%")
    .set(Transition_Sequence.PREV_SEQ_3,"-50%")
    .set(Transition_Sequence.NEXT_SEQ_2,"-25%")
    .set(Transition_Sequence.NEXT_SEQ_3,"-50%")
    .set(Transition_Sequence.NEXT_SEQ_4,"-75%");

const sliderPage = document.querySelector('.sliderpage') as HTMLBodyElement;

const firstNextButton = document.querySelector('.next-1');
const secondNextButton = document.querySelector('.next-2');
const thirdNextButton = document.querySelector('.next-3');
const submitButton = document.querySelector('.submit');
const allNextButtons = [firstNextButton, secondNextButton, thirdNextButton, submitButton];

const firstPrevButton = document.querySelector('.prev-1');
const secondPrevButton = document.querySelector('.prev-2');
const thirdPrevButton = document.querySelector('.prev-3');
const allPrevButtons = [firstPrevButton, secondPrevButton, thirdPrevButton];

const progressText = document.querySelectorAll('.step p');
const progressCheck = document.querySelectorAll('.step .check');
const bullet = document.querySelectorAll('.step .bullet');
const navigation = document.querySelectorAll('.navigate');

let max = 4;
let current = 1;

let marginValue = "";
let marginIntValue = 0;

/**
 * Adding navigation to each navigation div either it is bullet, check or span
 */
navigation.forEach(function(value) {
    value.addEventListener("click", function(evt) {
        findElement(evt);
    })
})

/**
 * @summary This function is responsible to find user input, To check user has clicked which navigation
 * to move.
 * 
 * @param evt Event: This is the clicked event to get user input
 */
function findElement(evt: Event) {
    let ele = <HTMLElement>evt.target;
    let nameOfNode = ele.nodeName;

    switch(nameOfNode) {
        case "DIV":
            navigate(+ele.firstElementChild?.innerHTML!);
            break;
        
        case "SPAN":
            navigate(+ele.innerHTML);
            break;

        case "I":
            navigate(+ele.previousElementSibling?.firstElementChild?.innerHTML!);
            break;

        default:
            break;
    }
}

/**
 * @summary This is most complex function and final function to move user next or previous from navigation
 * bar. This function move navigation bar along with check boxes.
 * 
 * @param currentWindow number: This is the input we get from user, To identify on which step user 
 * wants to move.
 */
function navigate(currentWindow: number) {
    if(isNaN(currentWindow)) {
        return;
    }

    let currentActiveCheckWindow = getCurrentActiveCheckWindow();
    //This if is for move in previous direction
    if(isCheckWindowActive(currentWindow) && currentWindow <= currentActiveCheckWindow) {
        currentActiveCheckWindow = currentActiveCheckWindow!==4 
            ? currentActiveCheckWindow+1 : currentActiveCheckWindow;
            
        switch(currentActiveCheckWindow) {
            case 4:
                prepareTransition(currentWindow, 
                    Transition_Sequence.PREV_SEQ_3, [3,2,1], Shift_Towards.SHIFT_PREV);
            case 3:
                prepareTransition(currentWindow, 
                    Transition_Sequence.PREV_SEQ_2, [2,1], Shift_Towards.SHIFT_PREV);
            case 2:
                prepareTransition(currentWindow, 
                    Transition_Sequence.PREV_SEQ_1, [1], Shift_Towards.SHIFT_PREV);
        }
    } //Below else is responsible to move in next direction 
    else if(currentWindow !== 1 && currentWindow !== currentActiveCheckWindow+1) {
        currentActiveCheckWindow = currentActiveCheckWindow+1;
        switch(currentActiveCheckWindow) {
            case 1:
                prepareTransition(currentWindow, 
                    Transition_Sequence.NEXT_SEQ_2, [2,3,4], Shift_Towards.SHIFT_NEXT);
            case 2:
                prepareTransition(currentWindow, 
                    Transition_Sequence.NEXT_SEQ_3, [3,4], Shift_Towards.SHIFT_NEXT);
            case 3:
                prepareTransition(currentWindow, 
                    Transition_Sequence.NEXT_SEQ_4, [4], Shift_Towards.SHIFT_NEXT);
        }
    }
}

/**
 * Below function is responsible to calculate the margin and next or previous step from user. Before
 * doing actual transition this method will prepare all pre-requisites
 * 
 * @param currentWindow number: This is the chosen window by user where user wants to move
 * @param shiftSequence string: This is the sequence of move to find margin from map
 * @param possibleMove number[]: These are the possible moves one case can have
 * @param shiftTowards number: This is to measure is user going next or previous
 */
function prepareTransition(currentWindow: number, shiftSequence: number, 
    possibleMove: number[], shiftTowards: number) {
    switch(currentWindow) {
        case 4:
            if(possibleMove.indexOf(4) > -1)
                makeTransition(shiftMap.get(shiftSequence)!, shiftTowards);
            break;
        case 3:
            if(possibleMove.indexOf(3) > -1)
                makeTransition(shiftMap.get(shiftSequence)!, shiftTowards);
            break;
        case 2:
            if(possibleMove.indexOf(2) > -1)
                makeTransition(shiftMap.get(shiftSequence)!, shiftTowards);
            break;
        case 1:
            if(possibleMove.indexOf(1) > -1)
                makeTransition(shiftMap.get(shiftSequence)!, shiftTowards);
            break;
        default:
            break;
    }
}

/**
 * @summary This function is responsible to get current active check window to identify whether user
 * want to move next or previous
 */
function getCurrentActiveCheckWindow(): number {
    let currentActiveWindow = 0;
    for(let check of progressCheck) {
        if(check.classList.contains("active")) {
            currentActiveWindow++;
        }
    }

    return currentActiveWindow;
}

/**
 * @summary This function is responsible to check that which step user has chosen to move is already 
 * on enabled or not.
 * 
 * @param currentWindow number: This is the input we get from user, To identify on which step user 
 * wants to move.
 */
function isCheckWindowActive(currentWindow: number): boolean {
    for(let check of progressCheck) {
        if(+check.previousElementSibling?.firstElementChild?.innerHTML! === currentWindow)
            return check.classList.contains("active");
    }
    return false;
}

//Variable to indicate whether to reset margin value or not
let resetMarginIntValue = true;

//Binding event listeners to all next buttons with specified margin
allNextButtons.forEach(function(value) {
    marginIntValue += 25;
    marginValue = `-${marginIntValue}%`;
    addCustomEventListeners(value as HTMLBodyElement, marginValue, Shift_Towards.SHIFT_NEXT);
})

//Adding event listener to all previous buttons with specified margin
allPrevButtons.forEach(function(value) {
    if(resetMarginIntValue)
        marginIntValue = 0; //reset value of margin before further proceeding

    marginValue = `-${marginIntValue}%`;
    addCustomEventListeners(value as HTMLBodyElement, marginValue, Shift_Towards.SHIFT_PREV);
    marginIntValue += 25;
    resetMarginIntValue = false;
})

/**
 * 
 * @param element HTMLBodyElement: Element type to which set event listener
 * @param marginValue string: Margin value string to shift page
 * @param shift number: A constant value to indicate shift next or previous
 */
function addCustomEventListeners(element: HTMLBodyElement, marginValue: string, shift: number) {
    if(element.innerHTML !== "Submit") {
        element.addEventListener("click", function() {
            makeTransition(marginValue, shift);
        })
    } else if(element.innerHTML === "Submit") {
        element.addEventListener("click", function() {
            makeTransition("", Shift_Towards.SHIFT_SUBMIT);

            let form =<HTMLFormElement> document.getElementById('initial-form') as HTMLFormElement ;
            //Save the data after clicking on submit.
             saveData(form); 
        })
    }
}

/**
 * @summary This function is responsible to make a transition on page next or previous
 * 
 * @param marginValue string : Actual margin value to shift page
 * @param shiftTowards number: A constant defining whether shift to next or previous on page
 */
function makeTransition(marginValue:string, shiftTowards:number) {
    if(marginValue !== "")
        sliderPage.style.marginLeft = marginValue;
    
    if(shiftTowards === Shift_Towards.SHIFT_NEXT) {
        bullet[current - 1 ].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        current += 1;
    } else if(shiftTowards === Shift_Towards.SHIFT_PREV) {
        bullet[current - 2].classList.remove("active");
        progressCheck[current - 2].classList.remove("active");
        current -= 1;
    } else if(shiftTowards === Shift_Towards.SHIFT_SUBMIT && current <= bullet.length) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        current += 1;
        
        let form = document.getElementById("initial-form") as HTMLFormElement;
        document.getElementById("initial-form")!.style.display = "none";
        document.getElementById("afterSubmit")!.style.display = "block";
        setTimeout(function(){
            form.reset();

            //Changing position of form after reset
            navigate(1);
            //Recursive call in order to remove all bullet & check active classes
            makeTransition("", Shift_Towards.SHIFT_PREV);
            document.getElementById("initial-form")!.style.display = "flex";
            document.getElementById("afterSubmit")!.style.display = "none";

            //resetting the values after form submission
            let selectCityEle = document.querySelector('.Cities') as HTMLSelectElement;
            selectCityEle.options.length = 0;
            selectCityEle.add(new Option("Select", ""));
            
            let selectStateEle = document.querySelector('.state') as HTMLSelectElement;
            selectStateEle.options.length = 0;
            selectStateEle.add(new Option("Select", ""));
        }, 5000);
    }
}


