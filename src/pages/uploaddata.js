import {csv2Json} from "../shared.js";

export const uploadData = () => {
  return `
          
          <div class="align-left">
               <h1 
               class="page-header">How to upload data from your published manuscript
               </h1>
          </div> 
          </div>
            </span>
            <div class="align-left">
            This page will describe the uploading process.Need to include description of the prerequisites. It should be clear that before data can be uploaded aDSMP must be approved, and all ICs should be on file (in a machine-readable format). We will provide instructions here how to complete these steps.Screen shots will be shown on this page of the upload process.
            <div class="align-left"><br>
            </div>
          </div>
            <br><div class="home-page-stats font-size-18"><br>
            <div>
          `;
};

export const dataUploadForm = async () => {
  let template = `
  <div class="general-bg padding-bottom-1rem">
    <div class="container body-min-height">
      <div class="main-summary-row">
        <div class="align-left">
          <h1 class="page-header">Upload New Data to the DCEG Data Sharing Platform</h1>
        </div>
      </div>
      <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
        <h3><b>Data Sharing Plan and Institutional Certifications</b></h3>

        <form class="contact-form" id="regForm">
          <div class="tab">
            <div class="input-group">
              <label for="approved"> <b>Has a data sharing management plan(s) been approved for data in this manuscript? </b><span class='required-label'>*</span> </label>      
                <input id="approvedyes" name="approved" type="radio" value="Yes" required/>
                  <label class="inline" for="approvedyes"> Yes </label>
                <input id="approvedno" name="approved" type="radio" value="No" required/>
                  <label class="inline" for="approvedno"> No </label>
            </div>

            <div class='input-group d-none' >
              <label for="dsmp_name"> <b>Please select from a DSMP:</b><span class='required-label'>*</span> </label>
                <select class='form-select' id='approvedDSMP' name='dsmp_name'></select>
            </div>

            <div class='d-none' id="dsmp_no">
              <p class="dsmpno"><b>A DSMP must first be created before uploading.</b></p>
            </div>

            <div class='input-group'>
              <label for="study_name"> <b>Select study(ies) that generated the data associated with this manuscript.</b><span class='required-label'>*</span> </label>
                <select name="study_name" id="study_name" multiple>
                  <option value="study0">Study 0</option>
                  <option value="study1">Study 1</option>
                  <option value="study2">Study 2</option>
                </select>
              <p>Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>
            </div>
          </div>
          <div class="tab">

          </div>


          <!---<div style="overflow:auto;">
            <div style="float:right;">
              <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
              <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
            </div>
          </div>--->
        </form>
      </div>
    </div>          
  </div>
  `
  return template;
}

export const approvedFormSelect = async () => { //Is there a DSMP function
  const yesEl = document.getElementById("approvedyes");
  const approvedEl = document.getElementById("approvedDSMP");
  const noEl = document.getElementById("approvedno");
  const dsmp_noEl = document.getElementById("dsmp_no");

  if (yesEl.checked) {
    approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
    dsmp_noEl.classList.toggle("d-none", !noEl.checked);
  } else if (noEl.checked) {
    approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
    dsmp_noEl.classList.toggle("d-none", !noEl.checked);
  }
};

export const populateApprovedSelect = async () => { //Pulling data from dsmp_output
  const dsmp = await (await fetch("./imports/dsmp_output.csv")).text();
  console.log(dsmp);
  const csvData = csv2Json(dsmp);
  const dsmpdata = csvData.data;
  const dsmpheaders = csvData.headers;
  console.log(dsmpdata);
  console.log(dsmpheaders);
  let options = [];
  console.log(JSON.parse(localStorage.parms).login);
  for (const value of dsmpdata) {
    console.log(value.contact_email);
    if (value.contact_email === JSON.parse(localStorage.parms).login) {
      options = [...options,value.planID];
    }
  }
  console.log(options);
  const approvedEl = document.getElementById("approvedDSMP");
  options.forEach((option) => {
    const optionEl = document.createElement("option");
    optionEl.text = option;
    approvedEl.appendChild(optionEl);
  });
};

export function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  //fixStepIndicator(n)
};

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  //if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
};

export function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
};

export function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
};