import {csv2Json} from "../shared.js";

export const uploadData = () => {
  let template = `
  <div class="general-bg padding-bottom-1rem">
    <div class="container body-min-height">
      <div class="main-summary-row">
        <div class="align-left">
          <h1 class="page-header">Upload New Data to the DCEG Data Sharing Platform</h1>
        </div>
      </div>
      <div id="uploadFormView" class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
      </div>
    </div>
  </div>
  `;
  return template;
};

export const dataUploadForm = async () => {
  let template = `
        <form class="contact-form" id="regForm">
          <div class="tab">
            <h3><b>Data Sharing Plan and Institutional Certifications</b></h3>
            <div class="input-group">
              <label for="approved"> <b>Has a data sharing management plan(s) been approved for data in this manuscript? </b><span class='required-label'>*</span> </label>      
                <input id="approvedyes" name="approved" type="radio" value="Yes" required/>
                  <label class="inline" for="approvedyes"> Yes </label>
                <input id="approvedno" name="approved" type="radio" value="No" required/>
                  <label class="inline" for="approvedno"> No </label>
            </div>

            <div class='input-group d-none' >
              <label for="dsmp_name"> <b>Please select from a DSMP:</b><span class='required-label'>*</span> </label>
                <select class='form-select' id='approvedDSMP' name='dsmp_name' multiple></select>
                <p>Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>                
            </div>

            <div class='d-none' id="dsmp_no">
              <p class="dsmpno"><b>A DSMP must first be created before uploading.</b></p>
            </div>
          </div>
          <div class="tab">

            <div class='input-group'>
              <label for="study_name"> <b>Select study(ies) that generated the data associated with this manuscript.</b><span class='required-label'>*</span> </label>
                <select class="form-select" name="study_name" id="study_name" multiple>
                  <option value="study0">Study 0</option>
                  <option value="study1">Study 1</option>
                  <option value="study2">Study 2</option>
                </select>
              <p>Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>
            </div>

            <div class='input-group'>
              <label for="add_studies_yn"> <b>Do additonal studies neet to be entered?</b><span class='required-label'>*</span> </label>      
              <input id="add_studies_y" name="add_studies_yn" type="radio" value="Yes" required/>
                <label class="inline" for="add_studies_y"> Yes </label>
              <input id="add_studies_n" name="add_studies_yn" type="radio" value="No" required/>
                <label class="inline" for="add_studies_n"> No </label>
            </div>

            <div class='input-group d-none' >
              <label for="add_studies"> <b>Enter name of Study(ies)</b> </label>
              <input id="add_studies" name="add_studies" type="text"/>              
            </div>

            <div class='input-group' >
              <label for="cert_upload"> <b>Please upload Institutional Certification for Study(ies)</b> </label>
              <input id="add_studies" name="add_studies" type="file" multiple/>              
            </div>

          </div>

          <div class="tab">
            <h3><b>Journal Information</b></h3>
            <div class='input-group'>
              <label for="journal_info"> <b>Please provide the Journal Name and Acronym</b> <span class='required-label'>*</span></label>
              <input id="journal_name" name="journal_info" type="text" placeholder="Journal Name" style="width: 75%"/>
              <input id="journal_acro" name="journal_info" type="text" placeholder="Journal Acronym" style="width: 25%"/>
            </div>

            <div class='input-group'>
              <label for="manu_info"> <b>Title of Manuscript</b> <span class='required-label'>*</span></label>
              <input id="manu_title" name="manu_info" type="text" placeholder="Manuscript Title"/>
            </div>

            <div class='input-group'>
              <label for="author_info"> <b>First author listed on manuscript</b><span class='required-label'>*</span></label>
            </div>
            <div class='input-group'>
              <input id="author_first" name="author_info" type="text" placeholder="First Name" style="width: 45%"/>
              <input id="author_middle" name="author_info" type="text" placeholder="Middle Initial" style="width: 10%"/>
              <input id="author_last" name="author_info" type="text" placeholder="Last Name" style="width: 45%"/>
            </div>

            <div class='input-group'>
              <label for="cancer_sites"> <b>Select cancer site(s) investigated</b><span class='required-label'>*</span> </label>
                <select class="form-select" name="cancer_sites" id="cancer_sites" multiple>
                  <option value="cancer0">Cancer 0</option>
                  <option value="cancer1">Cancer 1</option>
                  <option value="cancer2">Cancer 2</option>
                </select>
              <p>Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>
            </div>

            <div class='input-group'>
              <label for="pmid"> <b>Provide manuscript PMID, when available</b></label>
              <input id="pmid" name="pmid" type="text" placeholder="PMID"/>
            </div>
          </div>

          <div class='tab'>
            <h3><b>Upload Manuscript Data and Data Dictionary</b></h3>
            <div class='input-group' >
              <label for="data_upload"> <b>Upload data</b> </label>
              <input id="data_files" name="data_upload" type="file" multiple/>
              <input id="data_description" name="data_upload" type="text" placeholder="Provide description of uploaded data file. Note, this will be viewable by users of the data"/>
            </div>
            <div class='input-group'>
              <label for="dict_upload"> <b>Upload data dictionary</b> </label>
              <input id="data_dictionary" name="dict_upload" type="file" multiple/> 
              <input id="data_dictionary_description" name="dict_upload" type="text" placeholder="Provide description of uploaded data dictionary. Note, this will be viewable by users of the data"/>            
            </div>
          </div>


          <div style="overflow:auto;">
            <div style="float:left;">
              <button type="button" id="prevBtn" class="buttonsubmit">Previous</button>
            </div>
            <div style="float:right;">
              <button type="button" id="nextBtn" class="buttonsubmit">Next</button>
            </div>
          </div>
        </form>
  `
  document.getElementById("uploadFormView").innerHTML = template;
  var currentTab = 0;
  showTab(currentTab);
  console.log(currentTab);
  await populateApprovedSelect();
  document.getElementById("approvedyes").addEventListener("click", approvedFormSelect);
  document.getElementById("approvedno").addEventListener("click", approvedFormSelect);
  document.getElementById("add_studies_y").addEventListener("click", addStudiesInput);
  document.getElementById("add_studies_n").addEventListener("click", addStudiesInput);
  const prevpress = document.getElementById("prevBtn");
  prevpress.addEventListener("click", function() {
    nextPrev(-1, currentTab);
    currentTab -=1;
  });
  const nextpress = document.getElementById("nextBtn");
  nextpress.addEventListener("click", function() {
    nextPrev(1, currentTab);
    currentTab += 1;
  });
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

export const addStudiesInput = () => { //Is there a DSMP function
  const yesEl = document.getElementById("add_studies_y");
  const approvedEl = document.getElementById("add_studies");
  const noEl = document.getElementById("add_studies_n");

  if (yesEl.checked) {
    approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
  } else if (noEl.checked) {
    approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
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

export function nextPrev(n, currentTab) {
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