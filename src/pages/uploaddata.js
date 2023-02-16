import {csv2Json, csv2JsonTest, uploadFile, uploadFileAny, uploadWordFile} from "./../shared.js";

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
      <div id='popUpModal' class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id='modalBody'>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
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
            <div class="input-group input-group2">
              <label for="approved"> <b>Has a data sharing management plan(s) been approved for data in this manuscript? </b><span class='required-label'>*</span> </label>      
                <input id="approvedyes" name="approved" type="radio" value="Yes" required/>
                  <label class="inline" for="approvedyes"> Yes </label>
                <input id="approvedno" name="approved" type="radio" value="No" required/>
                  <label class="inline" for="approvedno"> No </label>
            </div>

            <div class='input-group input-group2 d-none' >
              <label for="dsmp_name"> <b>Please select from a DSMP:</b><span class='required-label'>*</span> </label>
                <select class='form-select' id='approvedDSMP' name='dsmp_name'>
                  <option disabled selected value>--select a DSMP--</option> 
                </select>
                <p>Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>                
            </div>

            <div class='d-none' id="dsmp_no">
              <p class="dsmpno"><b>A DSMP must first be created before uploading.</b></p>
            </div>

            <div class='input-group input-group2 d-none' id="duoSel">
              <label for="duoSel"> <b>Please select the required data use restrictions and requirements associated with 
              the data based on the study's Institutional Certification</b><span class='required-label'>*</span> </label> 
            </div>
          </div>

          <!---<div class="tab">
            <div class='input-group input-group2'>
              <label for="study_name"> <b>Select study(ies) that generated the data associated with this manuscript.</b><span class='required-label'>*</span> </label>
                <select class="form-select" name="study_name" id="study_name" multiple>
                  <option value="study0">Study 0</option>
                  <option value="study1">Study 1</option>
                  <option value="study2">Study 2</option>
                </select>
              <p>Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>
            </div>

            <div class='input-group input-group2'>
              <label for="add_studies_yn"> <b>Do additonal studies neet to be entered?</b><span class='required-label'>*</span> </label>      
              <input id="add_studies_y" name="add_studies_yn" type="radio" value="Yes" required/>
                <label class="inline" for="add_studies_y"> Yes </label>
              <input id="add_studies_n" name="add_studies_yn" type="radio" value="No" required/>
                <label class="inline" for="add_studies_n"> No </label>
            </div>

            <div class='input-group input-group2 d-none' >
              <label for="add_studies"> <b>Enter name of Study(ies)</b> </label>
              <input id="add_studies" name="add_studies" type="text"/>              
            </div>

            <div class='input-group input-group2' >
              <label for="cert_upload"> <b>Please upload Institutional Certification for Study(ies)</b> </label>
              <input id="add_studies" name="add_studies" type="file" multiple/>              
            </div>

          </div>--->

          <div class="tab">
            <h3><b>Journal Information</b></h3>

            <div class='input-group input-group2'>
              <label for="date" style="width: 100%"><b>Date: </b></label>
              <input type="month" id="date" name="date" style="width: 20%"/>
            </div>

            <div class='input-group input-group2'>
              <label for="journal_info" style="display:block"> <b>Please provide the Journal Name and Acronym</b> <span class='required-label'>*</span></label>
              <input id="journal_name" name="journal_info" type="text" placeholder="Journal Name" style="width: 80%"/>
              <input id="journal_acro" name="journal_info" type="text" placeholder="Journal Acronym" style="width: 20%"/>
            </div>

            <div class='input-group input-group2'>
              <label for="manu_info"> <b>Title of Manuscript</b> <span class='required-label'>*</span></label>
              <input id="manu_title" name="manu_info" type="text" placeholder="Manuscript Title"/>
            </div>

            <div class='input-group input-group2'>
              <label for="author_info" style="width: 100%"> <b>First author listed on manuscript</b><span class='required-label'>*</span></label>
              <input id="author_first" name="author_info" type="text" placeholder="First Name" style="width: 45%"/>
              <input id="author_middle" name="author_info" type="text" placeholder="Middle Initial" style="width: 10%"/>
              <input id="author_last" name="author_info" type="text" placeholder="Last Name" style="width: 45%"/>
            </div>

            <div class='input-group input-group2'>
              <label for="pmid"> <b>Provide manuscript PMID, when available</b></label>
              <input id="pmid" name="pmid" type="text" placeholder="PMID"/>
            </div>

            <div id='uploadData'>
              <h3><b>Upload Manuscript Data and Data Dictionary</b></h3>
            </div>
          </div>

          <!---<div class='tab'>
            <h3><b>Data Ready To Upload</b></h3>
            <div id='dataSummary'>
            </div>
          </div>--->


          <div style="overflow:auto;">
            <div style="float:left;">
              <button type="button" id="prevBtn" class="buttonsubmit">Previous</button>
            </div>
            <div style="float:right;">
              <button type="button" id="nextBtn" class="buttonsubmit">Next</button>
            </div>
            <div style="float:right;">
              <button type="button" id="subBtn" class="buttonsubmit">Submit</button>
            </div>
          </div>
        </form>
  `
  document.getElementById("uploadFormView").innerHTML = template;
  var currentTab = 0;
  showTab(currentTab);
  console.log(currentTab);
  const dsmp = await (await fetch("./imports/dsmp_output.csv")).text();
  //console.log(dsmp);
  let csvData = csv2JsonTest(dsmp);
  await populateApprovedSelect(csvData);
  document.getElementById("approvedyes").addEventListener("click", approvedFormSelect);
  document.getElementById("approvedno").addEventListener("click", approvedFormSelect);
  // document.getElementById("add_studies_y").addEventListener("click", addStudiesInput);
  // document.getElementById("add_studies_n").addEventListener("click", addStudiesInput);
  document.getElementById("approvedDSMP").addEventListener("change", () => {dsmpSelected(csvData)});
  const prevPress = document.getElementById("prevBtn");
  prevPress.addEventListener("click", function() {
      nextPrev(-1, currentTab);
      currentTab -=1;
    });
  const nextPress = document.getElementById("nextBtn");
  nextPress.addEventListener("click", function() {
      nextPrev(1, currentTab);
      currentTab += 1;
    });
  const subPress = document.getElementById("subBtn");
  subPress.addEventListener("click", function() {
      subForm();
    });
}

export const approvedFormSelect = async () => { //Is there a DSMP function
  const yesEl = document.getElementById("approvedyes");
  const approvedEl = document.getElementById("approvedDSMP");
  const noEl = document.getElementById("approvedno");
  const dsmp_noEl = document.getElementById("dsmp_no");
  const duoEl = document.getElementById("duoSel");
  var ele = document.getElementById("approvedDSMP");

  if (yesEl.checked) {
    approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
    dsmp_noEl.classList.toggle("d-none", !noEl.checked);
    document.getElementById("nextBtn").style.display = "inline";
  } else if (noEl.checked) {
    approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
    dsmp_noEl.classList.toggle("d-none", !noEl.checked);
    duoEl.classList.toggle("d-none", !yesEl.checked);
    document.getElementById("nextBtn").style.display = "none";
    ele.selectedIndex = 0;
  }
};

export const dsmpSelected = async (csvData) => {
  var ele = await document.getElementById("approvedDSMP");
  var values = await ele.value;//Array.from(ele.selectedOptions).map(v=>v.value);
  console.log(csvData.data);
  var selectedData = await csvData.data.find(item => item.planID === values);
  console.log(selectedData.studyName);
  var studies = selectedData.studyName.split(";");
  var cas = selectedData.cas.split(";");
  console.log(studies);
  console.log(cas);
  const duoEl = document.getElementById("duoSel");
  duoEl.classList.toggle("d-none", values === "");
  let template =`
    <label for="duoSel"> <b>Please select the required data use restrictions and requirements associated with the data based on the study's Institutional Certification</b><span class='required-label'>*</span> </label>
      <div class='input-group input-group2 font-size-22'>
        <h3>DSMP: ${values}</h3>`;
          for (let i=0; i <studies.length; i++) {
            console.log(studies[i]);
            template += `
            <div class="input-group input-group2 font-size-22">
              <h4><b>cas: ${cas[i]}</b>, ${studies[i]}</h4>
              <div class="input-group input-group2">
              <ul class="form" id='${i}duo' cas='${cas[i]}' study='${studies[i]}'>
                <div class="inline-field">
                  <input id="${i}nores" name="duoSel" type="checkbox" value="NR"/>
                  <label class="container-ul" for="${i}nores">No Restrictions</label>
                </div>
                <div class="inline-field">
                  <input id="${i}gru" name="duoSel" type="checkbox" value="GRU"/>
                  <label class="container-ul" for="${i}gru">General Research Use</label>
                </div>
                <div class="inline-field">
                  <input id="${i}hmb" name="duoSel" type="checkbox" value="HMB"/>
                  <label class="container-ul" for="${i}hmb">Health/Medical/Biomedical</label>
                </div>
                <div class="inline-field">
                  <input id="${i}dsr" name="duoSel" type="checkbox" value="DSR"/>
                  <label class="container-ul" for="${i}dsr">Disease-specific Research</label>
                </div>
                <div class="inline-field">
                  <input id="${i}ngm" name="duoSel" type="checkbox" value="NGM"/>
                  <label class="container-ul" for="${i}ngm">No General Methods</label>
                </div>
                <div class="inline-field">
                  <input id="${i}nfp" name="duoSel" type="checkbox" value="NFP"/>
                  <label class="container-ul" for="${i}nfp">Not for Profit Use Only</label>
                </div>
              </ul>
              </div>
              <div class='input-group input-group2'>
                <label for="${i}cert_upload"> <b>Upload Institutional Certifications</b> </label>
                <input id="${i}cert_upload" name="${i}cert_upload" type="file" multiple/>              
              </div>
            </div>
          `
          }
          template +=`
          </div>`
  //console.log(template);
  document.getElementById("duoSel").innerHTML = template;
}

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

export const populateApprovedSelect = async (csvData) => { //Pulling data from dsmp_output
  //const dsmp = await (await fetch("./imports/dsmp_output.csv")).text();
  //console.log(dsmp);
  //const csvData = csv2JsonTest(dsmp);
  const dsmpdata = csvData.data;
  const dsmpheaders = csvData.headers;
  // console.log(dsmpdata);
  // console.log(dsmpheaders);
  let options = [];

  //console.log(JSON.parse(localStorage.parms).login);
  for (const value of dsmpdata) {
    var email = value.contact_claims.split('|').pop();
    if (email === JSON.parse(localStorage.parms).login) {
      options = [...options,[value.planID, value.studyName, value.cas]];
    }
  }
  //console.log(options);
  const approvedEl = document.getElementById("approvedDSMP");
  options.forEach((option) => {
    const optionEl = document.createElement("option");
    optionEl.style="font-weight:bold";
    optionEl.value = option[0];
    console.log(optionEl.value);
    optionEl.text = `${option[0]}`//: ${option[1]}, cas: ${option[2]}`;
    approvedEl.appendChild(optionEl);
    var studies = option[1].split(";");
    console.log(studies);
    var cas = option[2].split(";");
    for (let i=0; i <studies.length; i++) {
      const optionEl = document.createElement("option");
      optionEl.disabled = true;
      optionEl.style="font-style:italic";
      optionEl.value = '';
      console.log(optionEl.value);
      optionEl.text = `${studies[i]}, cas: ${cas[i]}`;
      approvedEl.appendChild(optionEl);
    }
  });
  document.getElementById("approvedDSMP").addEventListener("change", dsmpSelected)
};

export function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("subBtn").style.display = "none";
    if (document.getElementById("approvedyes").checked) {
      document.getElementById("nextBtn").style.display = "inline";
    } else {
      document.getElementById("nextBtn").style.display = "none"
    }
  } else {
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("subBtn").style.display = "inline";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  //fixStepIndicator(n)
};

export async function subForm() {
  var ele = document.getElementById("approvedDSMP");
  var values = Array.from(ele.selectedOptions).map(v=>v.value);
  for (let i=0; i <values.length; i++){
    let file = document.getElementById(`${values[i]}data_files`).files[0];
    let filename = file.name;
    let blob = new Blob([file]);
    console.log(blob);
    await uploadWordFile(blob, filename, 189185316803);
    // var reader = new FileReader();
    // reader.readAsDataURL(file);
    // console.log(reader);
    // var path = (window.URL || window.webkitURL).createObjectURL(file);
    // console.log(path);
    //await uploadFile(url, filename, 189185316803, true);
  }
  document.getElementById("modalBody").innerHTML = `
          <p>File was successfully uploaded.</p>
          <p><b>Folder Name:</b> 12345</p>
          <p><b>Folder ID:</b> 12345</p>
          <br>
          <p><b><u>Uploaded Files</u></b></p>
          <p><b></b></p>
          `
          ;
        $("#popUpModal").modal("show");
}

export async function nextPrev(n, currentTab) {
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
    //document.getElementById("regForm").submit();
    document.getElementById("modalBody").innerHTML = `
          <p>File was successfully uploaded.</p>
          <p>Document ID: 12345</p>`;
        $("#popUpModal").modal("show");
    //return false;
  }
  if (currentTab === 1) {
    // var ele = document.getElementById("approvedDSMP");
    // var values = Array.from(ele.selectedOptions).map(v=>v.value);
    let template =`<h3><b>Upload Manuscript Data and Data Dictionary</b></h3>`
    const ele = document.getElementById("duoSel");
    const eleAll = ele.getElementsByClassName('form');
    //const testallval = testall.length;
    // console.log(test);
    // console.log(testall);
    // console.log(testallval);
    console.log(eleAll);
    for (let form of eleAll){
      const id = form.getAttribute('id');
      console.log(id);
      const cas = form.getAttribute('cas');
      const study = form.getAttribute('study');
      template +=
      `<div class="contact-form" id="${id}Form"> 
        <h4><b>cas: ${cas}</b>, ${study}</h4>
          <div class='input-group input-group2' >
            <label for="${id}data_upload"> <b>Upload data</b> </label>
            <input id="${id}data_files" name="${id}data_upload" type="file" single/>
            <input id="${id}data_description" name="${id}data_upload" type="text" placeholder="Provide description of uploaded data files. Note, this will be viewable by users of the data"/>
          </div>
          <div class='input-group input-group2'>
            <label for="${id}dict_upload"> <b>Upload data dictionary</b> </label>
            <input id="${id}data_dictionary" name="${id}dict_upload" type="file" single/> 
            <input id="${id}data_dictionary_description" name="${id}dict_upload" type="text" placeholder="Provide description of uploaded data dictionary. Note, this will be viewable by users of the data"/>            
          </div>
          <div class='input-group input-group2 d-none' id='${id}addAttachment'>
          </div>
          <div class='input-group input-group2'>
            <button type="button" id="addDataBtn" class="buttonsubmit">+Data</button>
          </div>
        </div>
          `
    }
    document.getElementById("uploadData").innerHTML = template;
    let addDataBtns = document.querySelectorAll('#addDataBtn');
    const clickEvent = e => {
      let parent = e.target.parentElement.parentElement;
      //const ele = document.getElementById(parent);
      console.log(parent);
      const eleAll = parent.getElementsByClassName('input-addedFiles');
      let id = parent.id.slice(0,-4);
      let num = eleAll.length
      let idaddAttachement = document.getElementById(`${id}addAttachment`)
      let template = `
      <div class='input-addedFiles input-group'>
        <label for="${id}data${num}"> <b>Upload additional data</b> </label>
        <input id="${id}data_upload${num}" name="${id}data${num}" type="file" single/>
        <input id="${id}data_upload_description${num}" name="${id}data${num}" type="text" placeholder="Provide description of uploaded data. Note, this will be viewable by users of the data"/>
      </div>
      `
      idaddAttachement.innerHTML += template;
      idaddAttachement.classList.toggle("d-none", false);
    }
    addDataBtns.forEach((item) => {
      item.addEventListener('click', clickEvent);
    })
  }
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