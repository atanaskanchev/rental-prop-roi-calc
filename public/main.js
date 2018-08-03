"use strict";

//Listen for form submit
document.getElementById("input-form").addEventListener("submit", submitForm);

//Listen for form reset
document.getElementById("input-form").addEventListener("reset", resetForm);

/**
 * Submit the form and calculate the result
 * @param  {} e event
 */
function submitForm(e) {
  e.preventDefault();

  const formValues = getFormValues();

  console.log(formValues);

  const runningCost =
    formValues.lettingAgent +
    formValues.insurance +
    formValues.maintanance +
    formValues.groundRent +
    formValues.serviceCharges +
    formValues.voidPeriod;

  const purchaseCost =
    formValues.solicitorFees +
    formValues.surveyFees +
    formValues.refurbCost +
    formValues.stampDuty +
    formValues.otherCosts;

  const financeCost = formValues.mortgageArrFee + formValues.otherFinancial;

  const roi =
    (((formValues.monthlyRent - runningCost) * 12) /
      (formValues.purchasePrice + purchaseCost + financeCost)) *
    100;

  console.log(roi);

  document.getElementById("result").style.visibility = "visible";
  document.getElementById("result").innerHTML =
    "Rental ROI " + roundUp(roi, 2) + "%";
}

/**
 * Round number
 * @param  {Number} num the number to be rounded
 * @param  {Number} precision the target decimal places
 */
function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}
/**
 * Reset the form
 * @param  {} e
 */
function resetForm(e) {
  document.getElementById("result").style.visibility = "hidden";
}

/**
 * get form values
 * @param  {String} id the element id
 */
function getInputVal(id) {
  let value = parseInt(document.getElementById(id).value);
  if (isNaN(value)) return 0;
  else return value;
}
/**
 * getFormValues returns an object with the form input fields values
 */
function getFormValues() {
  return {
    mortgageArrFee: getInputVal("mortgage-arr-fee"),
    otherFinancial: getInputVal("other-financial"),

    monthlyRent: getInputVal("monthly-rent"),
    purchasePrice: getInputVal("purchase-price"),

    solicitorFees: getInputVal("solicitor-fees"),
    surveyFees: getInputVal("survey-fees"),
    refurbCost: getInputVal("refurb-cost"),
    stampDuty: getInputVal("stamp-duty"),
    otherCosts: getInputVal("other-costs"),

    lettingAgent: getInputVal("letting-agent"),
    insurance: getInputVal("insurance"),
    maintanance: getInputVal("maintanance"),
    groundRent: getInputVal("ground-rent"),
    serviceCharges: getInputVal("service-charges"),
    voidPeriod: getInputVal("void-period")
  };
}
