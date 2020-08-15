"use strict";
/**
 * Typescript file containing all form slider functions.
 */
const SHIFT_PREV = 0;
const SHIFT_NEXT = 1;
const SHIFT_SUBMIT = 2;
const sliderPage = document.querySelector('.sliderpage');
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
let max = 4;
let current = 1;
let marginValue = "";
let marginIntValue = 0;
//Variable to indicate whether to reset margin value or not
let resetMarginIntValue = true;
//Binding event listeners to all next buttons with specified margin
allNextButtons.forEach(function (value) {
    marginIntValue += 25;
    marginValue = `-${marginIntValue}%`;
    addCustomEventListeners(value, marginValue, SHIFT_NEXT);
});
//Adding event listener to all previous buttons with specified margin
allPrevButtons.forEach(function (value) {
    if (resetMarginIntValue)
        marginIntValue = 0; //reset value of margin before further proceeding
    marginValue = `-${marginIntValue}%`;
    addCustomEventListeners(value, marginValue, SHIFT_PREV);
    marginIntValue += 25;
    resetMarginIntValue = false;
});
/**
 *
 * @param element HTMLBodyElement: Element type to which set event listener
 * @param marginValue string: Margin value string to shift page
 * @param shift number: A constant value to indicate shift next or previous
 */
function addCustomEventListeners(element, marginValue, shift) {
    if (element.innerHTML !== "Submit") {
        element.addEventListener("click", function () {
            makeTransition(marginValue, shift);
        });
    }
    else if (element.innerHTML === "Submit") {
        element.addEventListener("click", function () {
            makeTransition("", SHIFT_SUBMIT);
        });
    }
}
/**
 * @summary This function is responsible to make a transition on page next or previous
 *
 * @param marginValue string : Actual margin value to shift page
 * @param shiftTowards number: A constant defining whether shift to next or previous on page
 */
function makeTransition(marginValue, shiftTowards) {
    if (marginValue !== "")
        sliderPage.style.marginLeft = marginValue;
    if (shiftTowards === SHIFT_NEXT) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        current += 1;
    }
    else if (shiftTowards === SHIFT_PREV) {
        bullet[current - 2].classList.remove("active");
        progressCheck[current - 2].classList.remove("active");
        current -= 1;
    }
    else if (shiftTowards === SHIFT_SUBMIT) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        current += 1;
        location.reload();
    }
}
