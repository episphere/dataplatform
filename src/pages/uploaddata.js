import {csv2Json, csv2JsonTest, uploadFile, uploadAnyFileVersion, uploadFileAny, uploadWordFile, json2other, uploadTSV, createFolder, getFolderItems, descFolder, dataPlatformFolder, dataPlatformDataFolder, publicDataFolder, descFile, showAnimation, hideAnimation, selectProps, uploadFileVersion} from "./../shared.js";
import { config } from "./../config.js";
import { addEventFilterBarToggle } from "../event.js";
let previousValue = "";

export const uploadData = () => {
  let template = `
  <div class="general-bg padding-bottom-1rem">
    <div class="container body-min-height">
      <div class="main-summary-row">
        <div class="align-left">
          <h1 class="page-header">Upload New Data to the DCEG Data Sharing Platform</h1>
        </div>
      </div>
      <div id="uploadFormView" class="data-submission div-border font-size-18" style="padding-left: 0rem; padding-right: 0rem;">
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
              <button type="button" class="btn-close btn btn-secondary" data-dismiss="modal" aria-label="Return">Return</button>
              <button type="button" class="btn btn-secondary confirmButton" data-dismiss="modal" aria-label="Confirm">Confirm</button>
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
              <label for="dsmp_type"> <b>What type of DMSP(s) are you selecting from? </b><span class='required-label'>*</span> </label>      
                <input id="dsmp_pubpres" name="dsmp_type" type="radio" value="Publication/Presentation" required/>
                  <label class="inline" for="dsmp_pubpres"> Publication/Presentation </label>
                <input id="dsmp_study" name="dsmp_type" type="radio" value="Study" required/>
                  <label class="inline" for="dsmp_study"> Study </label>
            </div>

            <!--<div class='input-group input-group2 d-none' >
              <label for="dsmp_name"> <b>Please select from a DMSP:</b><span class='required-label'>*</span> </label>
                <select class='form-select' id='approvedDSMP' name='dsmp_name' multiple>
                </select>             
            </div>-->

            <div class="main-summary-row input-group input-group2 d-none" id='approvedDSMP'>
              <div class="col-xl-2 filter-column white-bg align-left p-2" id="summaryFilterSiderBar">
                      <div class="col-xl-12 pl-1 pr-0 div-border">
                          <span class="font-size-17 font-bold">Filter</span>
                          <div id="filterDataCatalogue" class="align-left"></div>
                      </div>
              </div>
              <div class="col-xl-10 padding-right-zero font-size-16" id="summaryStatsCharts">
                  <button id="filterBarToggle"><i class="fas fa-lg fa-caret-left"></i></button>
                  <div class="main-summary-row pl-2">
                      <div class="col-xl-12 pb-2 pl-0 pr-0 white-bg div-border">
                        <div class="allow-overflow" style="height: calc(100vh - 500px) !important;min-height: 300px;" id="descriptionBody"></div>
                      </div>
                  </div>
              </div>
            </div>

            <div class='d-none' id="dsmp_no">
              <p class="dsmpno"><b>A DMSP must first be created before uploading. <a href="https://nih.sharepoint.com/sites/NCI-DCEG-myDCEG/SitePages/Data-Sharing-and-Management-(DSM)-Policy.aspx" target="__blank">Click here to create a DMSP.</a></b></p>
            </div>

            <div class='input-group input-group2 d-none' id="duoSel">
              <label for="duoSel"> <b>Please select the study and required data use restrictions and requirements associated with the data based on the study's Institutional Certification (IC). If you have questions about your study's IC, please contact your <a href="https://nih.sharepoint.com/sites/NCI-DCEG-myDCEG/SitePages/Data-Sharing-and-Management-(DSM)-Policy.aspx" target="__blank">Data Sharing Administrator (DSA)</a>.</b><span class='required-label'>*</span> </label> 
            </div>
          </div>

          <div class="tab">
            <h3><b>Journal Information</b></h3>

            <div class='input-group input-group2'>
              <label for="date" style="width: 100%"><b>Month and year of manuscript acceptance</b><span class='required-label'>*</span></label>
              <input type="month" id="date" name="date" max=${today} style="width: 20%" required/>
            </div>

            <div class='input-group input-group2'>
              <label for="journal_info" style="display:block"> <b>Please provide the journal name and acronym. The journal acronym can be located using the <a href="https://www.ncbi.nlm.nih.gov/nlmcatalog/journals/" target="__blank"> National Library of Medicine Catalog Database</a>.</b> <span class='required-label'>*</span></label>
              <input id="journal_name" name="journal_info" type="text" placeholder="Journal Name" style="width: 80%" required/>
              <input id="journal_acro" name="journal_info" type="text" placeholder="Journal Acronym" style="width: 20%" required/>
            </div>

            <div class='input-group input-group2'>
              <label for="manu_title"> <b>Title of manuscript</b> <span class='required-label'>*</span></label>
              <input id="manu_title" name="manu_title" type="text" placeholder="Manuscript Title" required/>
            </div>

            <div class='input-group input-group2'>
              <label for="author_info" style="width: 100%"> <b>First author listed on manuscript</b><span class='required-label'>*</span></label>
              <input id="author_first" name="author_info" type="text" placeholder="First Name" style="width: 45%" required/>
              <input id="author_middle" name="author_info" type="text" placeholder="Middle Initial" style="width: 10%"/>
              <input id="author_last" name="author_info" type="text" placeholder="Last Name" style="width: 45%" required/>
            </div>

            <!---<div class='input-group input-group2'>
              <label for="pmid"> <b>Provide manuscript PMID, when available</b></label>
              <input id="pmid" name="pmid" type="text" placeholder="PMID"/>
            </div>--->

            <div id='uploadData'>
              <h3><b>Upload Manuscript Data, Data Dictionary, and Other Associated Metadata</b></h3>
            </div>
          </div>

          <!---<div class='tab'>
            <h3><b>Data Ready To Upload</b></h3>
            <div id='dataSummary'>
            </div>
          </div>--->


          <div style="overflow:auto;">
            <div style="float:left;">
              <button type="button" id="prevBtn" class="buttonsubmit2">Previous</button>
            </div>
            <div style="float:right;">
              <button type="button" id="nextBtn" class="buttonsubmit2">Next</button>
            </div>
            <div style="float:right;">
              <button type="submit" form="regForm" id="subBtn" class="buttonsubmit2">Submit</button>
            </div>
          </div>
        </form>
  `
  document.getElementById("uploadFormView").innerHTML = template;
  // document.getElementById("logineRA").addEventListener("click", async function () {
  //   location.href = `https://stsstg.nih.gov/auth/oauth/v2/authorize?response_type=code&client_id=ff775e46-ec74-46a3-b19f-ee2c60e8cf11&redirect_uri=https://episphere.github.io/dataplatform/&state=${config.iniAppLocal.stateIni}`
  // });
  var currentTab = 0;
  showTab(currentTab);
  //console.log(currentTab);
  const dsmp = await (await fetch("https://raw.githubusercontent.com/episphere/dataplatform/main/imports/dmsp_output.csv")).text();//await (await fetch("./imports/dsmp_output.csv")).text();
  const icoutput = await (await fetch("https://raw.githubusercontent.com/episphere/dataplatform/main/imports/ic_output.csv")).text();
  let icData = csv2JsonTest(icoutput);
  let csvData = csv2JsonTest(dsmp);
  console.log(csvData)
  console.log(icData);
  //await populateApprovedSelect(csvData);
  document.getElementById("approvedyes").addEventListener("click", approvedFormSelect);
  document.getElementById("approvedno").addEventListener("click", approvedFormSelect);
  document.getElementById("dsmp_pubpres").addEventListener("click", () => {approvedFormSelect(csvData)});
  document.getElementById("dsmp_study").addEventListener("click", () => {approvedFormSelect(csvData)});
  // document.getElementById("add_studies_y").addEventListener("click", addStudiesInput);
  // document.getElementById("add_studies_n").addEventListener("click", addStudiesInput);
  document.getElementById("approvedDSMP").addEventListener("change", () => {dsmpSelected(csvData)});
  const prevPress = document.getElementById("prevBtn");
  prevPress.addEventListener("click", async function() {
      await nextPrev(-1, currentTab);
        currentTab -=1;
    });
  const nextPress = document.getElementById("nextBtn");
  nextPress.addEventListener("click", async function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    var allStudies = document.getElementsByName('studySel')
    var selStudies = Array.from(allStudies).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value)
    if (selStudies.length < 1) return alert("Please select at least one study");
    for (var study of selStudies){
      var ele = document.getElementById(study);
      var eleCheck = ele.querySelectorAll('input[type="checkbox"]')
      if (!Array.prototype.slice.call(eleCheck).some(x => x.checked)) return alert("To continue, all studies require an Institutional Certification.")
    }
      // for (var ele of document.getElementsByClassName('form2')) {
      //   var eleCheck = ele.querySelectorAll('input[type="checkbox"]');
      //   if (!Array.prototype.slice.call(eleCheck).some(x => x.checked)) return alert("Please select at least one checkbox per study.")
      // }
      await nextPrev(1, currentTab);
        currentTab += 1;
    });
  addEventFilterBarToggle();
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", confirmSubmission);
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
  const dsmpdata = csvData.data;
  const dsmpdataHeaders = csvData.headers;
  pubpresEl.parentElement.classList.toggle("d-none", !yesEl.checked);
  dsmp_noEl.classList.toggle("d-none", !noEl.checked);

  if (noEl.checked) {
    approvedEl.classList.toggle("d-none", !yesEl.checked);
    dsmp_noEl.classList.toggle("d-none", !noEl.checked);
    duoEl.classList.toggle("d-none", !yesEl.checked);
    document.getElementById("nextBtn").style.display = "none";
    ele.selectedIndex = 0;
  }

  if (pubpresEl.checked && yesEl.checked) {
    //console.log('pubpres selected');
    approvedEl.classList.toggle("d-none", !pubpresEl.checked);
    duoEl.classList.toggle("d-none", !pubpresEl.checked);
    document.getElementById("nextBtn").style.display = "none";
    // const dsmpdata = csvData.data;
    // const dsmpdataHeaders = csvData.headers;
    function filterForPDRPub(data) {
      if (data.repositories && data.repositories.includes("PDR") && data.dmsPlanType && data.dmsPlanType.includes("Publication/Presentation")) {
        return true;
      } else {
        return false;
      }
    }
    const dsmpdataPDR = dsmpdata.filter(filterForPDRPub);
    //const dsmpdataPDR = dsmpdata.filter((df) => ((df['repositories'] || []).includes('PDR')) && (df['dmsPlanType']).includes('Publication/Presentation'));
    let dsmpdataPDR2 = [];
    for(let item of dsmpdataPDR){
      if (item.cas) {
        dsmpdataPDR2.push(item);
      };
    };
    console.log(dsmpdataPDR2);
    createFilter(dsmpdataPDR, dsmpdataHeaders);
    await populateApprovedSelect(dsmpdataPDR, dsmpdataHeaders);

  } else if (studyEl.checked && yesEl.checked) {
    //console.log('study selected');
    approvedEl.classList.toggle("d-none", !studyEl.checked);
    duoEl.classList.toggle("d-none", !studyEl.checked);
    document.getElementById("nextBtn").style.display = "none";
    // const dsmpdata = csvData.data;
    // for (const value of dsmpdata){
    //   console.log(value);
    // }
    // const dsmpdataHeaders = csvData.headers;
    function filterForPDRStudy(data) {
      if (data.repositories && data.repositories.includes("PDR") && data.dmsPlanType && data.dmsPlanType.includes("Study")) {
        return true;
      } else {
        return false;
      }
    }

    const dsmpdataPDR = dsmpdata.filter(filterForPDRStudy);
    //console.log(dsmpdataPDRTest);
    //const dsmpdataPDR = dsmpdata.filter((df) => ((df["repositories"] || []).includes("DCEG")) && (df["dmsPlanType"]).includes("Study"));
    createFilter(dsmpdataPDR, dsmpdataHeaders);
    await populateApprovedSelect(dsmpdataPDR, dsmpdataHeaders);
  }
};

export const dsmpSelected = async (csvData) => {
  document.getElementById("nextBtn").style.display = "inline";
  const icoutput = await (await fetch("https://raw.githubusercontent.com/episphere/dataplatform/main/imports/ic_output.csv")).text();
  let icData = csv2JsonTest(icoutput);
  console.log(icData);
  let template =`
  <label for="duoSel"> <b>Below are the data use restrictions and requirements associated with the data based on the study's Institutional Certification (IC). If you have questions about your study's IC, please contact your <a href="https://nih.sharepoint.com/sites/NCI-DCEG-myDCEG/SitePages/Data-Sharing-and-Management-(DSM)-Policy.aspx" target="__blank">Data Sharing Administrator (DSA)</a>.</b><span class='required-label'>*</span> </label>
    `;
  const elePlan = document.getElementById('approvedDSMP')
  const checked = elePlan.querySelectorAll('input[type="checkbox"]:checked');
  const values = [...checked].map(c=>c.value);
  //var values = Array.from(ele.selectedOptions).map(({ value }) => value);//Array.from(ele.selectedOptions).map(v=>v.value);
  console.log(values);
  for (const value of values){
    let dmspVal = value//.split('.v')[0];
    console.log(dmspVal);
    console.log(icData);
    let casID = csvData.data.find(item => item.planID === dmspVal).cas;
    console.log(casID);
    var dmspIC = icData.data.find(item => item.cas === casID);
    if (dmspIC){
      console.log('yes');
    }
    var selectedData = csvData.data.find(item => item.planID === value);
    if (!selectedData.studyName){
      selectedData.studyName = 'None'
    }
    var studies = selectedData.studyName.split(";");
    if (!selectedData.cas){
      selectedData.cas = 'None'
    }
    var cas = selectedData.cas.split(";");
    //console.log(cas);
    const duoEl = document.getElementById("duoSel");
    duoEl.classList.toggle("d-none", values === "");
    template +=`
    <div class='input-group input-group2 font-size-22'>
        <div class="selectionInfo">
          <b>DMSP:</b> ${value}
        </div>
          `;
    if (dmspIC){
      for (let i=0; i <studies.length; i++) {
      template += `
      <div class="input-group input-group2 font-size-22">
        <div class="inline-field field-br">
          <input id="${value}sel${i}" name="studySel" type="checkbox" value="${value}duo${i}" checked/> <!---${studies.length === 1 ? 'checked':''}--->
          <label class="container-ul" for="${value}sel${i}"><b>Study Name:</b> ${studies[i]}</label>
        </div>
        <div class="input-group input-group2">
          <ul class="form2" id='${value}duo${i}' cas='${cas[i]}' study='${studies[i]}'>
            <div class="inline-field">
              <input id="${value}${dmspIC.dul}${i}" name="duoSel" type="checkbox" value="${dmspIC.dul}" checked disabled/>
              `
          if (dmspIC.dul === 'Disease-specific'){
          template += `
              <label class="container-ul" for="${value}nores${i}">${dmspIC.dul}: ${dmspIC.ds_dul ? dmspIC.ds_dul : "Not-specified"}</label>`
          } else {
          template += `
            <label class="container-ul" for="${value}nores${i}">${dmspIC.dul}</label>`
          }
        template += `
            </div>
          </ul>
          </div>
        </div>
      `
      }
    } else {
    for (let i=0; i <studies.length; i++) {
              //console.log(studies[i]);
    template += `
            <div class="input-group input-group2 font-size-22">
              <div class="inline-field field-br">
                <input id="${value}sel${i}" name="studySel" type="checkbox" value="${value}duo${i}" checked/> <!---${studies.length === 1 ? 'checked':''}--->
                <label class="container-ul" for="${value}sel${i}"><b>Study:</b> ${studies[i]}</label>
              </div>
              <div class="input-group input-group2">
                <ul class="form3" id='${value}duo${i}' cas='${cas[i]}' study='${studies[i]}'>
               <!--<input id="${value}none${i}" name="duoSel" type="checkbox" value="NR" checked disabled/>-->
               <label class="container-ul" for="${value}none${i}">No IC found. Please complete the IC form <a href="https://nih.sharepoint.com/sites/NCI-DCEG-myDCEG/SitePages/Data-Sharing-and-Management-(DSM)-Policy.aspx" target="__blank"> here</a>. If you have questions please contact your branch's Data Sharing Administrator.</label>
                </ul>
                </div>
              </div>
            `
            }
    }
    template += `<hr width="100%" size="2"></div></div>`
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
  //console.log(dsrs[0].id);
}

export const addStudiesInput = () => { //Is there a DSMP function
  const yesEl = document.getElementById("add_studies_y");
  const approvedEl = document.getElementById("add_studies");

  approvedEl.parentElement.classList.toggle("d-none", !yesEl.checked);
};

export const createFilter = (dsmpdataPDR, dsmpdataHeaders) => {
  let filterTemplate = `
  <div class="main-summary-row">
      <div style="width: 100%;">
          <div class="form-group" margin:0px>
              <div id="searchContainer">
                <div class="input-group">
                    <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search" aria-label="Search" id="searchDataCatalog" aria-describedby="search-addon" />
                    </span>
                </div>
              </div>
          </div>
      </div>
  </div>
  `; 
  document.getElementById("filterDataCatalogue").innerHTML = filterTemplate;
  const input = document.getElementById("searchDataCatalog");
  input.addEventListener("input", () => {
    filterDataBasedOnSelectionDSMP(dsmpdataPDR, dsmpdataHeaders);
  });
}

export const populateApprovedSelect = async (dsmpdataPDR, dsmpheaders) => { //Pulling data from dsmp_output
  // const dsmpdataPDR = csvData;
  // console.log(dsmpdataPDR);
  //console.log(dsmpdata);
  //const dsmpdataPDR = dsmpdata.filter((df) => (df['repositories'] || []).includes('PDR'));
  //console.log(dsmpdataPDR);
  //const dsmpheaders = csvData.headers;
  const pubpresEl = document.getElementById("dsmp_pubpres");
  const studyEl = document.getElementById("dsmp_study")
  const approvedEl = document.getElementById("approvedDSMP");
  const duoEl = document.getElementById("duoSel");
  duoEl.classList.toggle("d-none");

  // let filterTemplate = `
  //   <div class="main-summary-row">
  //       <div style="width: 100%;">
  //           <div class="form-group" margin:0px>
  //               <div id="searchContainer">
  //                 <div class="input-group">
  //                     <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="searchDataCatalog" aria-describedby="search-addon" />
  //                     <span class="input-group-text border-0 search-input">
  //                         <i class="fas fa-search"></i>
  //                     </span>
  //                 </div>
  //               </div>
  //           </div>
  //       </div>
  //   </div>
  //   `; 
  // document.getElementById("filterDataCatalogue").innerHTML = filterTemplate;

  let template = "";
  const newDesc = dsmpdataPDR.map(selectProps("planID", "contact_email", "contact_displayName", "studyName", "cas", "planTitle"));
  //console.log(newDesc);
  template = `
      <div class="row m-0 pt-2 pb-2 align-left div-sticky" style="border-bottom: 1px solid rgb(0,0,0, 0.1);">
          <div class="col-md-1"></div>
          <div class="col-md-2 font-bold ws-nowrap pl-2">Plan ID <button class="transparent-btn sort-column" data-column-name="planID"><i class="fas fa-sort"></i></button></div>
          <div class="col-md-2 font-bold ws-nowrap">Name <button class="transparent-btn sort-column" data-column-name="contact_displayName"><i class="fas fa-sort"></i></button></div>
          <div class="col-md-4 font-bold ws-nowrap">Study Name <button class="transparent-btn sort-column" data-column-name="studyName"><i class="fas fa-sort"></i></button></div>
          <div class="col-md-3 font-bold ws-nowrap">Plan Title <button class="transparent-btn sort-column" data-column-name="planTitle"><i class="fas fa-sort"></i></button></div>
      </div>`;
  newDesc.forEach((desc, index) => {
    //console.log(desc);
    //console.log(index);
    template += `
    <div class="card mt-1 mb-1 align-left">
        <div style="padding: 10px" aria-expanded="false" id="heading${index}">
            <div class="row">
                <div class="col-md-1">
                  <input type="checkbox" id="${index}" name="dsmpSelected" value="${desc.planID}">
                </div>
                <div class="col-md-2">${
                  desc["planID"] ? desc["planID"] : ""
                }</div>
                <div class="col-md-2">${
                  desc["contact_displayName"] ? desc["contact_displayName"].replace(/ *\([^)]*\) */g, "").replace(/\[.+?\]/, "") : ""
                }</div>
                <div class="col-md-4">${
                  desc["studyName"] ? desc["studyName"] : ""
                }</div>
                <div class="col-md-3">${
                  desc["planTitle"] ? desc["planTitle"] : ""
                }</div>
            </div>
        </div>
      </div>`
  })
  document.getElementById("descriptionBody").innerHTML = template;
  addEventToggleCollapsePanelBtn();
  addEventSortColumn(newDesc, dsmpheaders);
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

export async function checkFileExt() {
  let approvedFormats = ['csv', 'txt', 'xlsx', 'xls', 'json', 'xml', 'tsv']
  let dataFile = document.querySelectorAll(`[id*="data_files"]`)[0];
  let dataDict = document.querySelectorAll(`[id*="data_dictionary"]`)[0];
  dataFile.onchange = function() {
    let input = this.files[0].name;
    let ext = input.split('.').pop();
    if (!approvedFormats.includes(ext)){
      document.getElementById("dcegPreviewerModalHeader").getElementsByClassName("modal-title")[0].innerHTML = `
      Non-Machine-Readable Format Detected`
      document.getElementById("dcegPreviewerModalBody").innerHTML = `
      <p><b>File ${input} does not appear to be machine readable.</b></p>
      <p><b>Please consider uploading file in a different format such as csv or json.</b></p>`
      $("#dcegPreviewerModal").modal("show");
    }
  }
  dataDict.onchange = function() {
    let input = this.files[0].name;
    let ext = input.split('.').pop();
    if (!approvedFormats.includes(ext)){
      document.getElementById("dcegPreviewerModalHeader").getElementsByClassName("modal-title")[0].innerHTML = `
      Non-Machine-Readable Format Detected`
      document.getElementById("dcegPreviewerModalBody").innerHTML = `
      <p><b>File ${input} does not appear to be machine readable.</b></p>
      <p><b>Please consider uploading file in a different format such as csv or json.</b></p>`
      $("#dcegPreviewerModal").modal("show");
    }
  }
}

export async function confirmSubmission(eventtest) {
  const btn = document.activeElement;
  btn.disabled = true;
  let dataFile = document.querySelectorAll(`[id*="data_files"]`)[0].value.split('.').pop();
  let dataDict = document.querySelectorAll(`[id*="data_dictionary"]`)[0].value.split('.').pop();
  let approvedFormats = ['csv', 'txt', 'xlsx', 'xls', 'json', 'xml', 'tsv']
  eventtest.preventDefault();

  document.getElementById("modalBody").innerHTML = `
    <p><b>Please confirm all files and information are correct.</b></p>
    <p><b>Confirmation will lock the folder to prevent any edits.</b></p>
    <p><b>If edits are required after confirmation, please contact the PDR Administrator.</b></p>
    `;
  $("#popUpModal").modal("show");
  let popup = document.getElementById('popUpModal');
  //let btns = popup.querySelectorAll('button');
  let confirmButton = popup.getElementsByClassName('confirmButton');
  for (let button of confirmButton) {
  button.addEventListener('click', function () {
    subForm(eventtest);
  })
  }
  btn.disabled = false;
}

export async function subForm(eventtest) {
  const btn = document.activeElement;
  btn.disabled = true;
  eventtest.preventDefault();
  showAnimation();
  // const ele = document.getElementById("duoSel");
  // const eleAll = ele.getElementsByClassName('form2');
  document.getElementById("modalBody").innerHTML = `
  <p><b>Collecting information</b></p>
  `;
  const ele = document.getElementsByName('studySel');
  const eleAll = Array.from(ele).filter((checkbox) => checkbox.checked).map((checkbox) => document.getElementById(checkbox.value));
  var obj = [];

  const date = document.getElementById(`date`).value;
  const journal_name = document.getElementById(`journal_name`).value;
  const journal_acro = document.getElementById(`journal_acro`).value;
  const manu_title = document.getElementById(`manu_title`).value;
  const author_first = document.getElementById(`author_first`).value;
  const author_middle = document.getElementById(`author_middle`).value;
  const author_last = document.getElementById(`author_last`).value;

  const folderName = JSON.parse(localStorage.parms).login.split('@')[0];
  const folderId = await folderStructure(dataPlatformDataFolder, folderName+'_DCEG_Data_Platform'); //create users parent folder //make Variable
  const folderName2 = journal_acro + '_' + date
  const folderId2 = await folderStructure(folderId, folderName+'_'+folderName2) //create per journal/year folder
  var studies = [];
  let descArray = [];
  for (const form of eleAll) {
    const id = form.getAttribute('id');
    const dsmp = id.split('duo')[0];
    const ver = id.split('duo')[1];
    const cas = form.getAttribute('cas');
    const study = form.getAttribute('study');
    studies.push(study);
    const restrictions = form.querySelectorAll('input[type="checkbox"]:checked')[0].value;

    const userval = {dsmp: dsmp, cas: cas, study: study, date: date, 
      journal_name: journal_name, journal_acro: journal_acro, title: manu_title, 
      author: author_first + ' ' + author_middle + ' ' + author_last, 
      res: restrictions};
    obj.push(userval);
    const studyName = study;
    document.getElementById("modalBody").innerHTML = `
    <p><b>Creating Folder</b></p>
    `;
    const folderId3 = await folderStructure(folderId2, studyName);
    
    document.getElementById("modalBody").innerHTML = `
    <p><b>Uploading Data File</b></p>
    `;

    let uploadItem = await uploadStructure(document.getElementById(`${id}data_files`).files[0], folderId3, document.getElementById(`${id}data_description`).value);
    let uploadObject = {type: 'file', name: document.getElementById(`${id}data_files`).files[0].name, val: uploadItem.entries[0].id, desc: document.getElementById(`${id}data_description`).value}
    descArray.push(uploadObject);

    document.getElementById("modalBody").innerHTML = `
    <p><b>Uploading Dictionary</b></p>
    `;

    uploadItem = await uploadStructure(document.getElementById(`${id}data_dictionary`).files[0], folderId3, document.getElementById(`${id}data_dictionary_description`).value);
    uploadObject = {type: 'file', name: document.getElementById(`${id}data_dictionary`).files[0].name, val: uploadItem.entries[0].id, desc: document.getElementById(`${id}data_dictionary_description`).value}
    descArray.push(uploadObject);

    const dataAdded = document.querySelectorAll(`[id*="${id}data_upload"]`);
    //console.log(dataAdded);
    for (var val of dataAdded){
      //console.log(val);
      if (!val.id.includes('data_upload_description')){
        document.getElementById("modalBody").innerHTML = `
        <p><b>Uploading Additional Files</b></p>
        `;

        uploadItem = await uploadStructure(val.files[0], folderId3, document.getElementById(val.id.replace('data_upload', 'data_upload_description')).value);
        uploadObject = {type: 'file', name: val.files[0].name, val: uploadItem.entries[0].id, desc: document.getElementById(val.id.replace('data_upload', 'data_upload_description')).value}
        descArray.push(uploadObject);
      }
    }
    console.log(descArray)
    const headers = Object.keys(obj[0]);
    const tsvValue = json2other(obj, headers, true).replace(/(<b>)|(<\/b>)/g, "");
    let tsvContent =
        "data:text/tsv;charset=utf-8," +
        tsvValue;
    const encodedUri = encodeURI(tsvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `test.tsv`);

    document.getElementById("modalBody").innerHTML = `
    <p><b>Uploading TSV Data</b></p>
    `;

    await uploadTSV(tsvValue, folderName+"_"+folderName2+".tsv", publicDataFolder);
    await uploadTSV(tsvValue, "details_"+folderName2+".tsv", folderId3);
    link.click();
    document.body.appendChild(link);
  }

  let uploadObject = {type: 'folder', name: folderName2, val: folderId2, desc: manu_title + ', ' + studies};
  descArray.push(uploadObject);
  const descheaders = Object.keys(descArray[0]);
  const desctsvValue = json2other(descArray, descheaders, true).replace(/(<b>)|(<\/b>)/g, "");
  let desctsvContent =
      "data:text/tsv;charset=utf-8," +
      desctsvValue;
  const descencodedUri = encodeURI(desctsvContent);
  const desclink = document.createElement("desca");
  desclink.setAttribute("href", descencodedUri);
  desclink.setAttribute("download", `desctest.tsv`);
  await uploadTSV(desctsvValue, "pdr_desc_"+folderName2+".tsv", folderId);

  document.getElementById("modalBody").innerHTML = `
          <p><b>Process complete.</b></p>
          <p><b>Please visit the below folders to check all files were properly uploaded and confirm. For any issues please contact the PDR Administrator.</b></p>
          <p><b>Author Folder Name:</b> <a href="https://nih.app.box.com/folder/${folderId}" target="__blank">${folderName}_DCEG_Data_Platform</a></p>
          <p><b>Author Folder ID:</b> ${folderId}</p>
          <p><b>Publication Folder Name:</b> <a href="https://nih.app.box.com/folder/${folderId2}" target="__blank">${folderName2}</a></p>
          <p><b>Publication Folder ID:</b> ${folderId2}</p>
          <p><b>In your manuscript, you can refer to this data being available on the National Cancer Institute, Division of Cancer Epidemiology and Genetics Publication Data Repository </b></p>
          <!--(epidataplatforms.cancer.gov; ID=${folderId2})-->
          `
          ;
  $("#popUpModal").modal("show");
  let popup = document.getElementById('popUpModal');
  let btns = popup.querySelectorAll('button');
  for (let button of btns) {
    button.addEventListener('click', function () {
      location.reload();
      })
    }
  //let popup = document.getElementById('popUpModal');
  //let btns = popup.querySelectorAll('button');
  // let confirmButton = popup.getElementsByClassName('confirmButton');
  // for (let button of confirmButton) {
  //   button.addEventListener('click', function () {
  //     location.reload();
  //   })
  // }
  hideAnimation();
  //location.reload();
  btn.disabled = false;
}

export async function uploadStructure(file, folder, description) {
  let fileName = file.name;
  let fileBlob = new Blob([file]);
  var uploadFile = 'none';
  let folderItems = await getFolderItems(folder);
  console.log(folderItems);
  for (let item of folderItems.entries){
    if (item.name === fileName) {
      console.log('uploading existing file');
      uploadFile = await uploadAnyFileVersion(fileBlob, item.id, fileName);
    }
  }
  if (uploadFile == 'none'){
    var uploadFile = await uploadFileAny(fileBlob, fileName, folder);
  }
  //let uploadFile = await uploadFileAny(fileBlob, fileName, folder);
  //await descFile(uploadFile.entries[0].id, description);
  return uploadFile;
}

export async function folderStructure(folderID, folderName) {
  let folderItems = await getFolderItems(folderID);
  const folderNames = [];
  for (const folder of folderItems.entries){
    folderNames.push(folder.name);
  };
  //console.log(folderNames);
  if (folderNames.includes(folderName)) {
    const testing = folderItems.entries.filter(dt => dt.name === folderName);
    return testing[0].id
  } else {
    const testing2 = await createFolder(folderID, folderName);
    return testing2.id;
  };
}

// export function fileValidation() {
//   if(this.item === undefined) {return};
//   var fileInput = document.getElementById(this.id);
//   console.log(fileInput);
// }

export async function nextPrev(n, currentTab) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  //if (n == 1 && !validateForm(currentTab)) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  //console.log(currentTab);
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
    let template =`<h3><b>Upload Manuscript Data, Data Dictionary, and Other Associated Metadata</b></h3>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
      <b><i>To support FAIR Research Practices, DCEG strongly encourages the sharing of all data and metadata files in machine readable formats (e.g., csv, tsv, json).</i></b>
    </div>`
    const ele = document.getElementsByName('studySel');
    const eleAll = Array.from(ele).filter((checkbox) => checkbox.checked).map((checkbox) => document.getElementById(checkbox.value));
    //const ele = document.getElementById("duoSel");
    //const eleAll = ele.getElementsByClassName('form2');
    //const testallval = testall.length;
    // console.log(test);
    // console.log(testall);
    // console.log(testallval);
    //console.log(eleAll);
    for (let form of eleAll){
      const id = form.getAttribute('id');
      //console.log(id);
      const cas = form.getAttribute('cas');
      const study = form.getAttribute('study');
      template +=
      `<div class="contact-form input-group input-group2 font-size-22" id="${id}Form">
        <b>DMSP: </b> ${id.split('duo')[0]}
        <div class="input-group input-group2 font-size-22">
          <b>Study Name: </b> ${study}
            <!--<div class='input-group input-group2 inline-field field-br'>
              <input type="checkbox" id="${id}data_elsewhere" name="${id}data_elsewhere" value="Yes" onclick="
              var checkBox = document.getElementById('${id}data_elsewhere')
              var inputBox = document.getElementById('${id}data_elsewhere_loc')
              console.log(inputBox);
              if (checkBox.checked == true){
                inputBox.style.display = 'block'
                } else {
                  inputBox.style.display = 'none'
                }">
              <label for="${id}data_elsewhere">Select if you have data also stored outside of the PDR for this publication.</label><br>
              <input id="${id}data_elsewhere_loc" name="${id}data_elsewhere_loc" type="text" placeholder="Data location" style="display:none"/>  
            </div>-->
            <div class='input-group input-group2' >
              <label for="${id}data_upload"> <b>Upload data</b> </label>
              <input id="${id}data_files" name="${id}data_upload" type="file" single required onchange=""/>
              <input id="${id}data_description" name="${id}data_upload" type="text" placeholder="Provide description of uploaded data files including any software required to view data. Note, this will be viewable by users of the data" required/>
            </div>
            <div class='input-group input-group2'>
              <label for="${id}dict_upload"> <b>Upload data dictionary</b> </label>
              <input id="${id}data_dictionary" name="${id}dict_upload" type="file" accept=".xls, .xlsx, .csv, .txt, .tsv" single required onchange=""/> 
              <input id="${id}data_dictionary_description" name="${id}dict_upload" type="text" placeholder="Provide description of uploaded data dictionary. This will be viewable by users of the data. Note, the PDR does not permit sharing of data dictionaries as PDFs" required/>            
            </div>
            <div class='input-group input-group2 d-none' id='${id}addAttachment'>
            </div>
            <div style="overflow:auto;">
              <div style="float:left;">
                <button type="button" id="${id}addDataBtn" class="buttonsubmit2"><i class="fa fa-plus" aria-hidden="true"></i> More Data</button>
              </div>
              <div style="display: none; float:right;">
                <button type="button" id="${id}remDataBtn" class="buttonsubmit2"><i class="fa fa-trash-can" aria-hidden="true"></i> Last Data</button>
              </div>
            </div>
          </div>
        </div>
          `
    }
    document.getElementById("uploadData").innerHTML = template;
    let addDataBtns = document.querySelectorAll('[id$=addDataBtn]');
    let remDataBtns = document.querySelectorAll('[id$=remDataBtn]');
    const clickEvent = e => {
      let parent = e.target.parentElement.parentElement.parentElement.parentElement;
      //const ele = document.getElementById(parent);
      //console.log(parent);
      const eleAll = parent.getElementsByClassName('input-addedFiles');
      let id = parent.id.slice(0,-4); //Remove 'Form' from id
      //console.log(id);
      let num = eleAll.length
      if (num > 0 && document.getElementById(`${id}data_upload${num-1}`).value===''){
        return alert("Please attach file to additional data before adding more data");
      }
      let idaddAttachment = document.getElementById(`${id}addAttachment`)
      var newInput = document.createElement('div');
      const selection = ["Data", "Dictionary", "Other Metadata"];
      newInput.className = 'input-addedFiles input-group'
      
      newInput.innerHTML = `
        <select class="datatype-select" name="${id}data${num}">
          <option value="Data">Data</option>
          <option value="Dictionary">Dictionary</option>
          <option value="MetaData">Other Metadata</option>
        </select>
        <input id="${id}data_upload${num}" name="${id}data${num}" type="file" single required onchange=""/>
        <input id="${id}data_upload_description${num}" name="${id}data${num}" type="text" placeholder="Provide description of uploaded data/metadata. Note, this will be viewable by users of the data" required/>
      `
      idaddAttachment.appendChild(newInput);
      idaddAttachment.classList.toggle("d-none", false);
      var remBtn = document.getElementById(`${id}remDataBtn`);
      remBtn.parentElement.style.display = "inline";
    }
    const clickEventRem = e => {
      var parId = e.target.id.replace('remDataBtn','addAttachment');
      var parDiv = document.getElementById(parId);
      //console.log(parDiv.lastChild);
      parDiv.removeChild(parDiv.lastChild);
      if (parDiv.childElementCount < 1) {
        e.target.parentElement.style.display = "none";
      }
    }
    addDataBtns.forEach((item) => {
      item.addEventListener('click', clickEvent);
    })
    remDataBtns.forEach((item) => {
      item.addEventListener('click', clickEventRem);
    })
  }
  checkFileExt();
  showTab(currentTab);
};

export function validateForm(currentTab) {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  //console.log(currentTab);
  //console.log(y);
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

const filterDataBasedOnSelectionDSMP = (descriptions, headers) => {
  let filteredData = descriptions;
  const input = document.getElementById("searchDataCatalog");
  const currentValue = input.value.trim().toLowerCase();

  //console.log(currentValue);

  if (
    currentValue.length <= 2 &&
    (previousValue.length > 2 || previousValue.length === 0)
  ) {
    populateApprovedSelect(
      filteredData,
      headers
    );
    return;
  }

  previousValue = currentValue;
  let searchedData = JSON.parse(JSON.stringify(filteredData));
  searchedData = searchedData.filter((dt) => {
    let found = false;
    if (dt["planID"].toLowerCase().includes(currentValue)) found = true;
    if (dt["contact_displayName"].toLowerCase().includes(currentValue)) found = true;
    if (dt["studyName"]) if (dt["studyName"].toLowerCase().includes(currentValue)) found = true;
    if (dt["planTitle"]) if (dt["planTitle"].toLowerCase().includes(currentValue)) found = true;
    if (found) return dt;
  });
  searchedData = searchedData.map((dt) => {
    dt["planID"] = dt["planID"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    dt["contact_displayName"] = dt["contact_displayName"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    if (dt["studyName"]){ 
    dt["studyName"] = dt["studyName"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
  };
  if (dt["planTitle"]){ 
    dt["planTitle"] = dt["planTitle"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
  }
    return dt;
  });

  populateApprovedSelect(
    searchedData,
    headers
  );
};

const addEventSortColumn = (descriptions, headers) => {
  const btns = document.getElementsByClassName("sort-column");
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", () => {
      const sortDirection = !btn.classList.contains("sort-column-asc") ? 1 : -1;
      const columnName = btn.dataset.columnName;
      console.log(columnName);
      descriptions = descriptions.sort((a, b) =>
        a[columnName] > b[columnName]
          ? 1 * sortDirection
          : b[columnName] > a[columnName]
          ? -1 * sortDirection
          : 0
      );
      btn.classList.remove("sort-column-asc", "sort-column-desc");

      populateApprovedSelect(descriptions, headers);

      if (sortDirection === 1) {
        document
          .querySelectorAll(`[data-column-name="${columnName}"]`)[0]
          .classList.add("sort-column-asc");
      } else {
        document
          .querySelectorAll(`[data-column-name="${columnName}"]`)[0]
          .classList.add("sort-column-desc");
      }
    });
  });
};

export const addEventToggleCollapsePanelBtn = () => {
  const btns = document.getElementsByClassName("collapse-panel-btn");
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.querySelector(".fas.fa-2x").classList.contains("fa-caret-down")) {
        btn.querySelector(".fas.fa-2x").classList.remove("fa-caret-down");
        btn.querySelector(".fas.fa-2x").classList.add("fa-caret-up");
      } else {
        btn.querySelector(".fas.fa-2x").classList.remove("fa-caret-up");
        btn.querySelector(".fas.fa-2x").classList.add("fa-caret-down");
      }
    });
  });
};