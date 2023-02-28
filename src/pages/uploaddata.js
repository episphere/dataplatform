import {csv2Json, csv2JsonTest, uploadFile, uploadFileAny, uploadWordFile, json2other, uploadTSV, createFolder, getFolderItems} from "./../shared.js";

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
  const dateToday = new Date();
  const today =
    dateToday.getFullYear() +
    "-" +
    ("0" + (dateToday.getMonth() + 1)).slice(-2);
  let template = `
        <form class="contact-form" id="regForm">
          <div class="tab">
            <h3><b>Data Sharing Plan</b></h3>
            <div class="input-group input-group2">
              <label for="approved"> <b>Has a data sharing management plan(s) been approved for data in this manuscript? </b><span class='required-label'>*</span> </label>      
                <input id="approvedyes" name="approved" type="radio" value="Yes" required/>
                  <label class="inline" for="approvedyes"> Yes </label>
                <input id="approvedno" name="approved" type="radio" value="No" required/>
                  <label class="inline" for="approvedno"> No </label>
            </div>

            <div class="input-group input-group2 d-none">
              <label for="dsmp_type"> <b>What type of DSMP(s) are you selecting from? </b><span class='required-label'>*</span> </label>      
                <input id="dsmp_pubpres" name="dsmp_type" type="radio" value="Publication/Presentation" required/>
                  <label class="inline" for="dsmp_pubpres"> Publication/Presentation </label>
                <input id="dsmp_study" name="dsmp_type" type="radio" value="Study" required/>
                  <label class="inline" for="dsmp_study"> Study </label>
            </div>

            <div class='input-group input-group2 d-none' >
              <label for="dsmp_name"> <b>Please select from a DSMP:</b><span class='required-label'>*</span> </label>
                <select class='form-select' id='approvedDSMP' name='dsmp_name' multiple>
                </select>
                <p>Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>                
            </div>

            <div class='d-none' id="dsmp_no">
              <p class="dsmpno"><b>A DSMP must first be created before uploading. <a href="https://nih.sharepoint.com/sites/NCI-DCEG-myDCEG/SitePages/Data-Sharing-and-Management-(DSM)-Policy.aspx" target="__blank">Click here to create a DSMP.</a></b></p>
            </div>

            <div class='input-group input-group2 d-none' id="duoSel">
              <label for="duoSel"> <b>Please select the required data use restrictions and requirements associated with the data based on the study's Institutional Certification</b><span class='required-label'>*</span> </label> 
            </div>
          </div>

          <div class="tab">
            <h3><b>Journal Information</b></h3>

            <div class='input-group input-group2'>
              <label for="date" style="width: 100%"><b>Year of Manuscript Acceptance: </b></label>
              <input type="month" id="date" name="date" max=${today} style="width: 20%"/>
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

            <!---<div class='input-group input-group2'>
              <label for="pmid"> <b>Provide manuscript PMID, when available</b></label>
              <input id="pmid" name="pmid" type="text" placeholder="PMID"/>
            </div>--->

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
  //await populateApprovedSelect(csvData);
  document.getElementById("approvedyes").addEventListener("click", approvedFormSelect);
  document.getElementById("approvedno").addEventListener("click", approvedFormSelect);
  document.getElementById("dsmp_pubpres").addEventListener("click", () => {approvedFormSelect(csvData)});
  document.getElementById("dsmp_study").addEventListener("click", () => {approvedFormSelect(csvData)});
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

export const approvedFormSelect = async (csvData) => { //Is there a DSMP function
  const yesEl = document.getElementById("approvedyes");
  const approvedEl = document.getElementById("approvedDSMP");
  const pubpresEl = document.getElementById("dsmp_pubpres");
  const studyEl = document.getElementById("dsmp_study")
  const noEl = document.getElementById("approvedno");
  const dsmp_noEl = document.getElementById("dsmp_no");
  const duoEl = document.getElementById("duoSel");
  var ele = document.getElementById("approvedDSMP");

  pubpresEl.parentElement.classList.toggle("d-none", !yesEl.checked);
  dsmp_noEl.classList.toggle("d-none", !noEl.checked);

  if (noEl.checked) {
    approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
    dsmp_noEl.classList.toggle("d-none", !noEl.checked);
    duoEl.classList.toggle("d-none", !yesEl.checked);
    document.getElementById("nextBtn").style.display = "none";
    ele.selectedIndex = 0;
  }

  if (pubpresEl.checked && yesEl.checked) {
    console.log('pubpres selected');
    approvedEl.parentElement.classList.toggle("d-none", !pubpresEl.checked);
    duoEl.classList.toggle("d-none", !pubpresEl.checked);
    document.getElementById("nextBtn").style.display = "none";
    console.log(csvData);
    await populateApprovedSelect(csvData);
  } else if (studyEl.checked && yesEl.checked) {
    console.log('study selected');
    approvedEl.parentElement.classList.toggle("d-none", !studyEl.checked);
    duoEl.classList.toggle("d-none", !studyEl.checked);
    document.getElementById("nextBtn").style.display = "none";
    console.log(csvData);
    await populateApprovedSelect(csvData);
  }
};

export const dsmpSelected = async (csvData) => {
  document.getElementById("nextBtn").style.display = "inline";
  let template =`
  <label for="duoSel"> <b>Please select the required data use restrictions and requirements associated with the data based on the study's Institutional Certification</b><span class='required-label'>*</span> </label>
    <div class='input-group input-group2 font-size-22'>`;
  var ele = document.getElementById("approvedDSMP");
  var values = Array.from(ele.selectedOptions).map(({ value }) => value);//Array.from(ele.selectedOptions).map(v=>v.value);
  console.log(values);
  for (const value of values){
    var selectedData = csvData.data.find(item => item.planID === value);
    console.log(selectedData.studyName);
    var studies = selectedData.studyName.split(";");
    var cas = selectedData.cas.split(";");
    console.log(studies);
    console.log(cas);
    const duoEl = document.getElementById("duoSel");
    duoEl.classList.toggle("d-none", values === "");
    template +=`
          <h3>DSMP: ${value}</h3>`;
            for (let i=0; i <studies.length; i++) {
              console.log(studies[i]);
    template += `
              <div class="input-group input-group2 font-size-22">
                <h4><b>cas: ${cas[i]}</b>, ${studies[i]}</h4>
                <div class="input-group input-group2">
                <ul class="form2" id='${value}duo${i}' cas='${cas[i]}' study='${studies[i]}'>
                  <div class="inline-field">
                    <input id="${value}nores${i}" name="duoSel" type="checkbox" value="NR"/>
                    <label class="container-ul" for="${value}nores${i}">No Restrictions</label>
                  </div>
                  <div class="inline-field">
                    <input id="${value}gru${i}" name="duoSel" type="checkbox" value="GRU"/>
                    <label class="container-ul" for="${value}gru${i}">General Research Use</label>
                  </div>
                  <div class="inline-field">
                    <input id="${value}hmb${i}" name="duoSel" type="checkbox" value="HMB"/>
                    <label class="container-ul" for="${value}hmb${i}">Health/Medical/Biomedical</label>
                  </div>
                  <div class="inline-field">
                    <input id="${value}ngm${i}" name="duoSel" type="checkbox" value="NGM"/>
                    <label class="container-ul" for="${value}ngm${i}">No General Methods</label>
                  </div>
                  <div class="inline-field">
                    <input id="${value}nfp${i}" name="duoSel" type="checkbox" value="NFP"/>
                    <label class="container-ul" for="${value}nfp${i}">Not for Profit Use Only</label>
                  </div>
                  <div class="inline-field">
                    <input id="${value}dsr${i}" name="duoSel" type="checkbox" value="DSR"/>
                    <label class="container-ul" for="${value}dsr${i}">Disease-specific Research</label>
                  </div>
                  <div class="inline-field">
                    <input id="${value}dsr${i}input" name="duoSel" type="text" placeholder="Cancer" class='d-none'/>
                  </div>
                </ul>
                </div>
                <!---<div class='input-group input-group2'>
                  <label for="${value}cert_upload${i}"> <b>Upload Institutional Certifications</b> </label>
                  <input id="${value}cert_upload${i}" name="${value}cert_upload${i}" type="file" multiple/>              
                </div>--->
              </div>
            `
              // console.log(document.getElementById(`${value}dsr${i}`));
              // document.getElementById(`${value}dsr${i}`).addEventListener("change", () => {
              // document.getElementById(`${value}dsr${i}input`).classList.toggle("d-none");
              // });
            }
  }
  template +=`
            </div>`
  //console.log(template);
  document.getElementById("duoSel").innerHTML = template;
  const dsrs = document.querySelectorAll('[id*="dsr"]');
  for (let value of dsrs) {
    if (!value.id.endsWith('input')) {
      document.getElementById(`${value.id}`).addEventListener("change", () => {
      document.getElementById(`${value.id}input`).classList.toggle("d-none");
      })
    }
  }
  console.log(dsrs[0].id);
}

export const addStudiesInput = () => { //Is there a DSMP function
  const yesEl = document.getElementById("add_studies_y");
  const approvedEl = document.getElementById("add_studies");

  approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
};

export const populateApprovedSelect = async (csvData) => { //Pulling data from dsmp_output
  const dsmpdata = csvData.data;
  console.log(dsmpdata);
  const dsmpheaders = csvData.headers;
  const pubpresEl = document.getElementById("dsmp_pubpres");
  const studyEl = document.getElementById("dsmp_study")
  const approvedEl = document.getElementById("approvedDSMP");
  const duoEl = document.getElementById("duoSel");
  duoEl.classList.toggle("d-none");
  let options = [];
  if (pubpresEl.checked) {
    approvedEl.multiple = false;
    approvedEl.size="1";
    for (const value of dsmpdata) {
      var email = value.contact_claims.split('|').pop();
        if (email === JSON.parse(localStorage.parms).login) {
          options = [...options,[value.planID, value.studyName, value.cas]];
        }
    }
  } else if (studyEl.checked) {
    approvedEl.multiple = true;
    approvedEl.size="10";
    for (const value of dsmpdata) {
      if (value.dmsPlanType === 'Study') {
        options = [...options, [value.planID, value.studyName, value.cas]];
      }
    }
  }
  console.log(options);
  approvedEl.length = 0;
  const optionEl = document.createElement("option")
  optionEl.disabled = true;
  optionEl.selected = true;
  optionEl.value = '';
  optionEl.text = `--select a DSMP--`;
  approvedEl.appendChild(optionEl);
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
  const ele = document.getElementById("duoSel");
  const eleAll = ele.getElementsByClassName('form2');
  var obj = [];
  for (const form of eleAll) {
    //var obj = new Object();
    const id = form.getAttribute('id');
    const dsmp = id.split('duo')[0];
    const ver = id.split('duo')[1];
    const cas = form.getAttribute('cas');
    const study = form.getAttribute('study');
    const nores = document.getElementById(`${dsmp}nores${ver}`).checked;
    const hmb = document.getElementById(`${dsmp}hmb${ver}`).checked;
    const ngm = document.getElementById(`${dsmp}ngm${ver}`).checked;
    const gru = document.getElementById(`${dsmp}gru${ver}`).checked;
    const dsr = document.getElementById(`${dsmp}dsr${ver}`).checked;
    const dsrinput = document.getElementById(`${dsmp}dsr${ver}input`).value;
    const nfp = document.getElementById(`${dsmp}nfp${ver}`).checked;
    const date = document.getElementById(`date`).value;
    const journal_name = document.getElementById(`journal_name`).value;
    const journal_acro = document.getElementById(`journal_acro`).value;
    const manu_title = document.getElementById(`manu_title`).value;
    const author_first = document.getElementById(`author_first`).value;
    const author_middle = document.getElementById(`author_middle`).value;
    const author_last = document.getElementById(`author_last`).value;

    const userval = {dsmp: dsmp, cas: cas, study: study, date: date, 
      journal_name: journal_name, journal_acro: journal_acro, title: manu_title, 
      author_first: author_first, author_middle: author_middle, author_last: author_last, 
      nores: nores, hmb: hmb, ngm: ngm, gru: gru, dsr: dsr, dsr_value: dsrinput, nfp: nfp};
    obj.push(userval);

    const folderName = JSON.parse(localStorage.parms).login.split('@')[0];
    const folderId = await folderStructure(196554876811, folderName); //create users parent folder //make Variable
    const folderName2 = journal_acro + '_' + date
    const folderId2 = await folderStructure(folderId, folderName+'_'+folderName2) //create per journal/year folder
    const studyName = study;
    const folderId3 = await folderStructure(folderId2, studyName);
    
    await uploadStructure(document.getElementById(`${id}data_files`).files[0], folderId3);
    await uploadStructure(document.getElementById(`${id}data_dictionary`).files[0], folderId3);
    const dataAdded = document.querySelectorAll(`[id*="${id}data_upload"]`);
    console.log(dataAdded);
    for (var val of dataAdded){
      console.log(val);
      if (!val.id.includes('data_upload_description')){
        uploadStructure(val.files[0], folderId3);
      }
    };



    // let file = document.getElementById(`dsmp0034.v1cert_upload0`).files[0];
    // let filename = file.name;
    // let blob = new Blob([file]);
    // console.log(blob);
    // await uploadWordFile(blob, filename, 156698557621);

  }
  console.log(obj);
  const headers = Object.keys(obj[0]);
  const tsvValue = json2other(obj, headers, true).replace(/(<b>)|(<\/b>)/g, "");
  let tsvContent =
      "data:text/tsv;charset=utf-8," +
      tsvValue;
  const encodedUri = encodeURI(tsvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `test.tsv`);
  document.body.appendChild(link);
  // const folderName = JSON.parse(localStorage.parms).login.split('@')[0];
  // //link.click();
  // const folderId = await folderStructure(156698557621, folderName); //create users parent folder
  // const folderName2 = obj[0].journal_acro + '_' + obj[0].date
  // const folderId2 = await folderStructure(folderId, folderName+'_'+folderName2) //create per journal/year folder
  // for (let item of obj){
  //   const studyName = item.study
  //   const folderId3 = await folderStructure(folderId2, studyName)

  // };

  //uploadTSV(tsvValue, "test.tsv", 156698557621);
  // var form = document.getElementById('regForm');
  // for (const element of form.elements) {
  //   console.log(element);
  // }
  // var elements = form.elements;
  // console.log(elements);
  // console.log(values);
  // for (let i=0; i <values.length; i++){
    // let file = document.getElementById(`dsmp0034.v1cert_upload0`).files[0];
    // let filename = file.name;
    // let blob = new Blob([file]);
    // console.log(blob);
    // await uploadWordFile(blob, filename, 156698557621);
  //   // var reader = new FileReader();
  //   // reader.readAsDataURL(file);
  //   // console.log(reader);
  //   // var path = (window.URL || window.webkitURL).createObjectURL(file);
  //   // console.log(path);
  //   //await uploadFile(url, filename, 189185316803, true);
  // }
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

export async function uploadStructure(file, folder) {
  let fileName = file.name;
  let fileBlob = new Blob([file]);
  await uploadFileAny(fileBlob, fileName, folder);
}

export async function folderStructure(folderID, folderName) {
  let folderItems = await getFolderItems(folderID);
  console.log(folderItems);
  //const folderName = JSON.parse(localStorage.parms).login.split('@')[0];
  console.log(folderName);
  const folderNames = [];
  for (const folder of folderItems.entries){
    folderNames.push(folder.name);
  };
  console.log(folderNames);
  if (folderNames.includes(folderName)) {
    const testing = folderItems.entries.filter(dt => dt.name === folderName);
    return testing[0].id
  } else {
    const testing2 = await createFolder(folderID, folderName);
    return testing2.id;
  };
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
    const eleAll = ele.getElementsByClassName('form2');
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
      `<div class="contact-form input-group input-group2 font-size-22" id="${id}Form">
        <h3>DSMP: ${id.split('duo')[0]}</h3>
        <div class="input-group input-group2 font-size-22">
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
        </div>
          `
    }
    document.getElementById("uploadData").innerHTML = template;
    let addDataBtns = document.querySelectorAll('#addDataBtn');
    const clickEvent = e => {
      let parent = e.target.parentElement.parentElement.parentElement;
      //const ele = document.getElementById(parent);
      console.log(parent);
      const eleAll = parent.getElementsByClassName('input-addedFiles');
      let id = parent.id.slice(0,-4); //Remove 'Form' from id
      console.log(id);
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