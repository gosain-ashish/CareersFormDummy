/**
 * Typescript file containing all form slider functions.
 */
const SHIFT_PREV = 0;
const SHIFT_NEXT = 1;
const SHIFT_SUBMIT = 2;

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
        currentActiveCheckWindow = currentActiveCheckWindow+1;
        switch(currentActiveCheckWindow) {
            case 4:
                switch(currentWindow) {
                    case 3:
                        makeTransition("-50%", SHIFT_PREV);
                        break;
                    case 2:
                        makeTransition("-25%", SHIFT_PREV);
                        break;
                    case 1:
                        makeTransition("0%", SHIFT_PREV);
                        break;
                    default:
                        break;
                }
            case 3:
                switch(currentWindow) {
                    case 2:
                        makeTransition("-25%", SHIFT_PREV);
                        break;
                    case 1:
                        makeTransition("0%", SHIFT_PREV);
                        break;
                    default:
                        break;
                }
            case 2:
                switch(currentWindow) {
                    case 1:
                        makeTransition("0%", SHIFT_PREV);
                        break;
                    default:
                        break;
                }
        }
    } //Below else is responsible to move in next direction 
    else if(currentWindow !== 1 && currentWindow !== currentActiveCheckWindow+1) {
        currentActiveCheckWindow = currentActiveCheckWindow+1;
        switch(currentActiveCheckWindow) {
            case 1:
                switch(currentWindow) {
                    case 2:
                        makeTransition("-25%", SHIFT_NEXT);
                        break;
                    case 3:
                        makeTransition("-50%", SHIFT_NEXT);
                        break;
                    case 4:
                        makeTransition("-75%", SHIFT_NEXT);
                        break;
                    default:
                        break;
                }
            case 2:
                switch(currentWindow) {
                    case 3:
                        makeTransition("-50%", SHIFT_NEXT);
                        break;
                    case 4:
                        makeTransition("-75%", SHIFT_NEXT);
                        break;
                    default:
                        break;
                }
            case 3:
                switch(currentWindow) {
                    case 4:
                        makeTransition("-75%", SHIFT_NEXT);
                        break;
                    default:
                        break;
                }
        }
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
    addCustomEventListeners(value as HTMLBodyElement, marginValue, SHIFT_NEXT);
})

//Adding event listener to all previous buttons with specified margin
allPrevButtons.forEach(function(value) {
    if(resetMarginIntValue)
        marginIntValue = 0; //reset value of margin before further proceeding

    marginValue = `-${marginIntValue}%`;
    addCustomEventListeners(value as HTMLBodyElement, marginValue, SHIFT_PREV);
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
            makeTransition("", SHIFT_SUBMIT);
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
    
    if(shiftTowards === SHIFT_NEXT) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        current += 1;
    } else if(shiftTowards === SHIFT_PREV) {
        bullet[current - 2].classList.remove("active");
        progressCheck[current - 2].classList.remove("active");
        current -= 1;
    } else if(shiftTowards === SHIFT_SUBMIT) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        current += 1;
        document.getElementById("initial-form")!.style.display = "none";
        document.getElementById("afterSubmit")!.style.display = "block";
        setTimeout(function(){
            location.reload();
        }, 5000);
    }
}