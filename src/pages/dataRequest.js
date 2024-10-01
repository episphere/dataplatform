import {
  createComment,
  createCompleteTask,
  showComments,
  updateMetadata,
  getMetadata,
  searchMetadata,
  createMetadata,
  getTaskList,
  updateTaskAssignment,
  uploadWordFile,
  getFolderItems,
  emailforChair,
  emailforDACC,
  uploadFormFolder,
  daccReviewFolder,
  daccReviewChairFolder,
  chairReviewFolder,
  //finalFolder,
  assignTask,
  createFileTask,
  getFileInfo,
  numberWithCommas,
  hideAnimation,
  getTask,
  consortiumSelection,
  moveFile,
  acceptedFolder,
  deniedFolder,
  createFolder,
  copyFile,
  submitterFolder,
  listComments,
  addNewCollaborator,
  getCollaboration,
  checkDataSubmissionPermissionLevel,
  deleteTask,
  showCommentsDropDown,
  getChairApprovalDate,
  uploadFile,
  showCommentsDCEG,
  nameofDACC
} from "../shared.js";
import { addEventToggleCollapsePanelBtn } from "./description.js";
import { showPreview } from "../components/boxPreview.js";
import { pageNavBar } from "../components/navBarMenuItems.js";
import { renderFilePreviewDropdown } from "../components/elements.js";
import {
  switchTabs,
  switchFiles,
  sortTableByColumn,
  filterCheckBox,
} from "../event.js";
import { template, testingDataGov, dataGovTest } from "./dataGovernance.js";

export const dataAccessNotSignedIn = () => {
  let template = `
      <div class="general-bg padding-bottom-1rem">
          <div class="container body-min-height">
              <div class="main-summary-row">
                  <div class="align-left">
                      <h1 class="page-header">Data Platforms for Consortia Projects
                      </h1>
                  </div>
              </div>
              <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
                  <div class="row m-0">
                  The following are data platforms for collaborative consortium projects that are coordinated by DCEG:
                  </div></br>
                  <div class="row m-0">
                     
                  </div>
                  <div class="row m-0">
                      <ul>
                          <li>
                          <a href= "https://confluence.cancer.gov" target="__blank">The Confluence Project:</a>
                          The Confluence Project is a large international project to study breast cancer genetic susceptibility in women and men of multiple ancestries, by integrating existing and new genome-wide genetic data, across several breast cancer consortia.
                           </li>
                           <li><a href= "https://episphere.github.io/bcrpDataPlatform" target="__blank">The Breast Cancer Risk Prediction Project (BCRPP):</a>
                           The BCRPP is a collaboration in the NCI Cohort Consortium Study that is developing risk prediction models for female breast cancer across racial and ethnic groups.                           
                           </li>
                      </ul>
                  </div>
                </div>
            </div>
            
        </div>
      `;

  return template;
};
//All the "Project Concept Form" and "View Submissions" that are commented out in this code can be used if we want to add them to the top bar in the data access page
export const dataAccess = (activeTab, showDescripton) => {
  // let authChair =
  //   emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  // let authDacc =
  //   emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = "";
  // console.log(authChair);
  // console.log(authDacc);
  // if (authDacc && authChair) {
  //   navBarItems = pageNavBar(
  //     "data_access",
  //     activeTab
  //     // "Overview",
  //     // "Project Concept Form",
  //     // "View Submissions",
  //     // "Chair Menu",
  //     // "DACC Menu"
  //   );
  // } else if (authChair) {
  //   navBarItems = pageNavBar(
  //     "data_access",
  //     activeTab
  //     // "Overview",
  //     // "Project Concept Form",
  //     // "View Submissions",
  //     // "Chair Menu"
  //   );
  // } else if (authDacc) {
  //   navBarItems = pageNavBar(
  //     "data_access",
  //     activeTab
  //     // "Overview",
  //     // "Project Concept Form",
  //     // "View Submissions",
  //     // "DACC Menu"
  //   );
  // } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab
      // "Overview",
      // "Project Concept Form",
      // "View Submissions"
    );
  //}
  let template = `

        <div class="general-bg body-min-height padding-bottom-1rem">
            <div class="container">
              ${navBarItems}
            
        </div>
        `;

  template += `
        <div class="general-bg padding-bottom-1rem">
            <div class="container body-min-height">
                <div class="main-summary-row">
                    <div class="align-left">
                        <h1 class="page-header">Data Platforms for Consortium Projects
                        </h1>
                    </div>
                </div>
                <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
                    <div class="row m-0">

                        The following are data platforms for collaborative consortium projects that are coordinated by DCEG:

                    </div></br>
                    <div class="row m-0">
                     
                    </div>
                    <div class="row m-0">
                        <ul> 
                            <li>
                            <a href= "https://confluence.cancer.gov" target="__blank">The Confluence Project:</a>
                            The Confluence Project is a large international project to study breast cancer genetic susceptibility in women and men of multiple ancestries, by integrating existing and new genome-wide genetic data, across several breast cancer consortia.
                            </li>
                            <li> 
                            <a href= "https://episphere.github.io/bcrpDataPlatform" target="__blank">The Breast Cancer Risk Prediction Project (BCRPP):</a>
                            The BCRPP is a collaboration in the NCI Cohort Consortium Study that is developing risk prediction models for female breast cancer across racial and ethnic groups.
                            </li>
                        </ul>
                    </div> `;
  template += `</div>
              </div>
            </div>
            `;

  return template;
};
export const formSectionOther = async (activeTab, showDescripton) => {
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;

  let navBarItems = "";
  if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab
      // "Overview"
      // "Project Concept Form",
      // "View Submissions",
      // "Chair Menu",
      // "DACC Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab
      // "Overview",
      // "Project Concept Form",
      // "View Submissions"
    );
  }

  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
          
      </div>
      `;

  template += ` 
                  <div class="general-bg padding-bottom-1rem">
                          <div class="container body-min-height">

                              <!---<div class="main-summary-row">
                                  <div class="align-left">
                                      <h1 class="page-header">Analysis Proposal Form</h1>
                                  </div>-->
                              </div>

                              <div class="main-summary-row confluence-resources white-bg div-border font-size-18">
                                <div class="col">
                                  <span>You currently do not have access to submit a data request form.</span></br>
                                  <span>For access, please contact <a href="mailto:thomas.ahearn@nih.gov">Thomas Ahearn</a></span>
                          </div>
                  </div>
                `;
  return template;
};

export const formSection = async (activeTab, showDescripton) => {
  let eraLogin = localStorage.parmsERa;
  let boxLogin = localStorage.parms;
  let navBarItems = "";
  let template = `
    <div class="general-bg body-min-height padding-bottom-1rem">
        <div class="container">
    </div>
    `;
  const date = new Date();
  const today =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  if (boxLogin === undefined){
    template += ` 
      <div class="general-bg padding-bottom-1rem">
        <div class="container body-min-height">
          <div class="main-summary-row">
              <div class="align-left">
                  <h1 class="page-header">Data Access Proposal Form</h1>
                  <button id='autofillJson' class='d-none'>AutoFill JSON</button>
              </div>
          </div>
          <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
            <div class="input-group input-group2">
              To access data proposal form, please first log in.
            </div>
          </div>
        </div>
      </div>     
      `;
    return template;
  }

  if (eraLogin == undefined) {
    //console.log(eraLogin);
    template += ` 
      <div class="general-bg padding-bottom-1rem">
        <div class="container body-min-height">
          <div class="main-summary-row">
              <div class="align-left">
                  <h1 class="page-header">Data Access Proposal Form</h1>
                  <button id='autofillJson' class='d-none'>AutoFill JSON</button>
              </div>
          </div>
          <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
            <div>
              <p>To request access to DCEG data on the Publication Data Repository, please use the following link to log-in with your eRA credentials.</p>
              <button class="nav-link nav-menu-links custom-btn" title="Login eRA" id="logineRA">
                <img src="./static/images/era.png"> Login eRA
              </button>
              <p>Extramural researchers should use "Login.gov" to provide their eRA credentials, and NCI intramural researchers should use their PIV card credentials.</p>
            </div>
          </div>
        </div>
      </div>     
      `;
    return template;
  }

const dictionaryVars = localStorage.getItem("dictionaryVars");
template += ` 
  <div class="general-bg padding-bottom-1rem">
    <div class="container body-min-height">
      <div class="main-summary-row">
          <div class="align-left">
              <h1 class="page-header">Data Access Proposal Form</h1>
              <button id='autofillJson' class='d-none'>AutoFill JSON</button>
          </div>
      </div>
      <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">          
        <section class="contact-form">
          <p style="color:red;"><b>This form is a work in progress and will change dependent on feedback. Current plans include:</b></p>
          <p>Please fill out the form below. This will be reviewed by the DCEG and the necessary DAC(s)</p>
          
          <form>
            <div class="input-group">
              <label for="date"><b>Date</b><span class='required-label'>*</span></label>
              <input id="date" name="date" type="date" value='${today}' required/>
            </div>
            <div class="input-group">
              <label for="projname"><b>Title of Proposed Project</b><span class='required-label'>*</span></label>
              <input id="projname" name="projname" type="text" required/>
            </div>
            <div class="input-group">
              <label for="typeofres"><b>Data Use Limitations</b><span class='required-label'>*</span></label>
            </div>
            <div class="input-group">
                <div class="inline-field">
                  <input id="disres" name="typeofres" type="checkbox" value="placeholder" checked/>
                  <label class="container-ul" for="disres"><b>Placeholder</b> </label>
                </div>
            </div>
          <div id="investigators">
            <div class="input-group author_name">
              <label for="investigators"><b>Primary Requestor</b> <span class='required-label'>*</span></label>
              <input id="author_first" name="author_info" type="text" value="${JSON.parse(localStorage.parmsERa).first_name}" style="width: 33%" readonly/>
              <input id="author_last" name="author_info" type="text" value="${JSON.parse(localStorage.parmsERa).last_name}" style="width: 33%" readonly/>
            
            <div class="input-group">
              <label for="institution"><b>Institution</b><span class='required-label'>*</span></label>`
    if(JSON.parse(localStorage.parmsERa).company){
            template += `
              <input id="institution" name="institution" type="text" value="${JSON.parse(localStorage.parmsERa).company}" readonly/>
              </div>`
    } else {
          template += `
            <input id="institution" name="institution" type="text" value="placeholder"/>
            </div>`
    }

    if(JSON.parse(localStorage.parmsERa).email){
          template += `
            <div class="input-group">
              <label for="email"><b>Contact Email</b><span class='required-label'>*</span></label>
              <input id="email" name="email" type="email" value="${JSON.parse(localStorage.parmsERa).email}" readonly/>
            </div>`
    } else {
      template += `
            <div class="input-group">
              <label for="email"><b>Contact Email</b><span class='required-label'>*</span></label>
              <input id="email" name="email" type="email" value="placeholder"/>
            </div>`
    }
        template += `
            </div>
          </div>
          <div style="overflow:auto;">
            <div style="float:left;">
                <button type="button" id="addDataBtn" class="buttonsubmit2"><i class="fa fa-plus" aria-hidden="true"></i> Requestor</button>
            </div>
            <div style="display: none; float:left;">
                <button type="button" id="remDataBtn" class="buttonsubmit2"><i class="fa fa-trash-can" aria-hidden="true"></i> Requestor</button>
            </div>
          </div>
          <div class="input-group">
              <label><input id="confirmation" name="confirmation" type="checkbox" value="Yes" required/><b> Please confirm that ALL the named investigators have read AND agreed to be named on this proposal?</b><span class='required-label'>*</span></label>
          </div>
          <br>
          <p><u><b>Publication Data Being Requested</b></u></p>
          <div class="input-group">
              <label for="datatitle"><b>Title</b></label>
              <input id="datatitle" name="datatitle" type="text" value="${JSON.parse(localStorage.dataSelected).title}" readonly/>
          </div>
          <div class="input-group">
            <label for="datajournal"><b>Journal</b></label>
            <input id="datajournal" name="datajournal" type="text" value="${JSON.parse(localStorage.dataSelected).journal}" readonly/>
          </div>
          <div class="input-group">
            <label for="dataauthor"><b>First Listed Author of Article</b></label>
            <input id="dataauthor" name="dataauthor" type="text" value="${JSON.parse(localStorage.dataSelected).author}" readonly/>
          </div>
          <br>
          <p><u><b>Description of Proposed Project</b></u></p>
          <div class="input-group">
            <label for="background"><b>Planned use of data</b><span class='required-label'>*</span></label>
            <textarea maxlength="1500" id="background" name="background" placeholder="Please provide a brief description of your planned use of the data (1500 character limit)" rows="4" cols="65" required></textarea>
          </div>
          <div class="input-group">
            <label for="aims"><b>Study Aims</b><span class='required-label'>*</span></label>
            <textarea maxlength="1000" id="aims" name="aims" placeholder="Please provide a brief description of your study aims (1000 character limit)" rows="4" cols="65" required></textarea>
          </div>
              <button type="submit" id="submitFormButton" class="buttonsubmit"> 
                <span class="buttonsubmit__text"> Send Form </span>
              </button>
              <button type="button" id="downloadJSON" class="buttonsubmit" hidden> 
                <span class="buttonsubmit__text"> Download JSON </span>
              </button>
        </form>
      </section>
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
      </div>
    </div>`;

return template;
};

export const approveRejectSection = () => {
  let template = `
                            <div class="general-bg padding-bottom-1rem">
                              <div class="container body-min-height">
                                  <div class="main-summary-row">
                                      <div class="align-left">
                                          <h1 class="page-header">Data Approval</h1>
                                      </div>
                                  </div>
                                  <div class="div-border font-size-18" style="padding-left: 1rem;">
                                      <div class="row m-0 align-center data-approval">
                                          <iframe
                                              class="row m-0 align-center"
                                              src="https://nih.app.box.com/embed/s/myksohhrdv6klrzk3b0237yz3m502siw?sortColumn=date&view=list"
                                              width="700"
                                              height="800"
                                              frameborder="0"
                                              allowfullscreen
                                              webkitallowfullscreen
                                              msallowfullscreen
                                          ></iframe>
                                          <form>
                                              <label for="message">Enter a Message</label>
                                              <div class="input-group">
                                                  <textarea id="message" name="message" rows="6" cols="65"></textarea>
                                              </div>
                                              <button type="submit" value="approved" class="btn-primary">Approve</button>
                                              <button type="submit" value="rejected" class="btn-primary">Reject</button>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>`;

  return template;
};

export const importDictVars = () => {
  const mmdArr = Array.from(document.getElementsByName("mmdvarv"));
  const baseArr = Array.from(document.getElementsByName("basevar"));
  const ibcArr = Array.from(document.getElementsByName("ibcvar"));

  const vars = [...mmdArr, ...baseArr, ...ibcArr];

  const dictionaryVars = localStorage
    .getItem("dictionaryVars")
    .split(",")
    .map((v) => v.toLowerCase());

  vars.forEach((v) => {
    if (dictionaryVars.includes(v.value.toLowerCase())) v.checked = true;
  });
};

export const amendFormSelect = async () => {
  const yesEl = document.getElementById("amendmentyes");
  const amendmentEl = document.getElementById("amendmentSelect");

  amendmentEl.parentElement.classList.toggle("d-none", !yesEl.checked);
};

export const populateAmendSelect = async () => {
  const items = await getFolderItems("162222418449");
  const folders = items.entries;
  let options = [];
  for (const folder of folders) {
    if (folder.name === JSON.parse(localStorage.parms).login) {
      const userFolder = await getFolderItems(folder.id);
      const userFiles = userFolder.entries;
      options = [...userFiles];
    }
  }
  const amendmentEl = document.getElementById("amendmentSelect");
  options.forEach((option) => {
    const optionEl = document.createElement("option");
    optionEl.text = option.name;
    amendmentEl.appendChild(optionEl);
  });
};
export const acceptedStudiesSection = (activeTab) => {
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = "";
  if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "DACC Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "View Submissions"
    );
  }
  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
          
      </div>
      `;
  template += `
    <div id="acceptedStudiesView" class="align-left"></div>
  </div>
  `;
  return template;
};
export const acceptedStudiesView = async () => {
  let template = `
    <div class="main-summary-row">
            <div class="row align-left w-100 m-0">
                <h1 class="col page-header pl-0 pt-2">Information on Accessing DCEG Data</h1>
                <div class="ml-auto allow-overflow mr-2" style="margin:1rem 0" id="pagesContainer"></div>
                <div class="ml-auto mt-3 mb-3 mr-2" id="pageSizeContainer"></div>
                <div class="ml-auto mt-3 mb-3" id="downloadContainer">
                    <div class="col-md-12 p-0 dropdown">
                        <div class="grid-elements ">
                            <button title="Download" class="transparent-btn form-control dropdown-toggle dropdown-btn" data-toggle="dropdown" id="downloadDictionary" style="color:#000000 !important">
                                Download <i class="fas fa-download" style="color:#000000 !important"></i>
                            </button>
                            <div class="dropdown-menu navbar-dropdown" aria-labelledby="downloadDictionary">
                                <button class="transparent-btn dropdown-item dropdown-menu-links" title="Download dictionary as csv" id="downloadDictionaryCSV">CSV</button>
                                <button class="transparent-btn dropdown-item dropdown-menu-links" title="Download dictionary as tsv" id="downloadDictionaryTSV">TSV</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-summary-row">
            <div class="col-xl-2 filter-column div-border white-bg align-left p-2" id="summaryFilterSiderBar">
                <div class="main-summary-row">
                    <div class="col-xl-12 pl-1 pr-0">
                        <span class="font-size-17 font-bold">Filter</span>
                        <div id="filterDataCatalogue" class="align-left"></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-10 padding-right-zero font-size-16" id="summaryStatsCharts">
                <button id="filterBarToggle"><i class="fas fa-lg fa-caret-left"></i></button>
                <div class="main-summary-row pl-2" style="min-height: 10px;margin-bottom: 1rem;">
                    <div class="col white-bg div-border align-left font-size-17" style="padding: 0.5rem;" id="listFilters">
                        <span class="font-bold">Region:</span> All
                    </div>
                </div>
                <div class="main-summary-row pl-2">
                    <div class="col-xl-12 pb-2 pl-0 pr-0 white-bg div-border">
                        <div class="pt-0 pl-2 pb-2 pr-2 allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" id="descriptionBody"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-summary-row">
            <div class="offset-xl-2 col data-last-modified align-left mt-3 mb-0 pl-4" id="dataLastModified">
                Data last modified at - LAST MODIFIED DATE
            </div>
        </div>`;

  document.getElementById("acceptedStudiesView").innerHTML = template;
};

// export const chairFileView = async () => {
//   const responseUpload = await getFolderItems(uploadFormFolder);
//   let filearrayUpload = responseUpload.entries;

//   const responseDACC = await getFolderItems(daccReviewFolder);
//   let filearrayDACC = responseDACC.entries;

//   const responseDACCChairReview = await getFolderItems(daccReviewChairFolder);
//   let filearrayDACCChairReview = responseDACCChairReview.entries;

//   const responseChair = await getFolderItems(chairReviewFolder);
//   let filearrayChair = responseChair.entries;

//   const responseAccepted = await getFolderItems(acceptedFolder);
//   let filearrayAccepted = responseAccepted.entries;

//   const responseDenied = await getFolderItems(deniedFolder);
//   let filearrayDenied = responseDenied.entries;

//   var template = `
//     <div class="general-bg padding-bottom-1rem">
//       <div class="container body-min-height">
//         <div class="main-summary-row">
//             <div class="align-left">
//                 <h1 class="page-header">Chair Access Only</h1>
//             </div>
//         </div>

  
//     <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
//     <ul class='nav nav-tabs mb-3' role='tablist'>
//       <li class='nav-item' role='presentation'>
//         <a class='nav-link active' id='toBeCompletedTab' href='#toBeCompleted' data-mdb-toggle="tab" role='tab' aria-controls='toBeCompleted' aria-selected='true'> New Concepts </a>
//       </li>
//       <li class='nav-item' role='presentation'>
//          <a class='nav-link' id='inProgressTab' href='#inProgress' data-mdb-toggle="tab" role='tab' aria-controls='inProgress' aria-selected='true'> Under Review </a>
//       </li>
//       <li class='nav-item' role='presentation'>
//          <a class='nav-link' id='daccCompletedTab' href='#daccCompleted' data-mdb-toggle="tab" role='tab' aria-controls='daccCompleted' aria-selected='true'> Review Completed </a>
//       </li>
//       <li class='nav-item' role='presentation'>
//          <a class='nav-link' id='decidedTab' href='#decided' data-mdb-toggle="tab" role='tab' aria-controls='decided' aria-selected='true'> DACC Decision </a>
//       </li>
//       <!--li class='nav-item' role='presentation'>
//          <a class='nav-link' id='deniedTab' href='#denied' data-mdb-toggle="tab" role='tab' aria-controls='denied' aria-selected='true'> Denied </a>
//       </li-->
//     </ul>`;

//   const filesincomplete = [];
//   const filesinprogress = [];
//   const filescompleted = [];
//   const filesdecided = [];

//   for (let obj of filearrayUpload) {
//     filesincomplete.push(obj);
//   }

//   for (let obj of filearrayDACC) {
//     filesinprogress.push(obj);
//   }

//   for (let obj of filearrayDACCChairReview) {
//     filesinprogress.push(obj);
//   }

//   for (let obj of filearrayChair) {
//     filescompleted.push(obj);
//   }

//   for (let obj of filearrayAccepted) {
//     filesdecided.push(obj);
//   }

//   for (let obj of filearrayDenied) {
//     filesdecided.push(obj);
//   }

//   template += "<div class='tab-content' id='selectedTab'>";

//   template += `<div class='tab-pane fade show active' 
//                   id='toBeCompleted' role='tabpanel' 
//                   aria-labeledby='toBeCompletedTab'> `;
//   template += renderFilePreviewDropdown(filesincomplete, "toBeCompleted");

//   template += `<div class='tab-pane fade'
//                  id='inProgress' role='tabpanel'
//                  aria-labeledby='inProgressTab' style="vertical-align:top">
//                  <a href="mailto:${emailforDACC.join(
//                    "; "
//                  )}" id='email' class='btn btn-dark'>Send Email to DACC</a>`;
//   template += renderFilePreviewDropdown(filesinprogress, "inProgress");

//   template += `<div class='tab-pane fade'
//                 id='daccCompleted' role='tabpanel'
//                 aria-labelledby='daccCompletedTab'>
//                <a href="mailto:${emailforDACC.join(
//                  "; "
//                )}" id='email' class='btn btn-dark'>Send Email to DACC</a>`;
//   template += renderFilePreviewDropdown(filescompleted, "daccCompleted");

//   template += `<div class='tab-pane fade' 
//                 id='decided' role='tabpanel'
//                 aria-labelledby='decidedTab'>
                
//                 </div>`;

//   template += `<div id='filePreview'>`;
//   if (
//     filescompleted.length !== 0 ||
//     filesinprogress.length !== 0 ||
//     filesincomplete.length !== 0 ||
//     filesdecided !== 0
//   ) {
//     template += `
//         <div class='row'>
//           <div id='boxFilePreview' class="col-8 preview-container"></div>
//           <div id='fileComments' class='col-4 mt-2'></div>
//         </div>

//         <div class='row card-body dacc-submit' id='sendtodaccButton' class="col-8" style="background-color:#f6f6f6; display:block">
//             <form>
//               <label for"message">Send to DACC</label>
//               <div class="input-group">
//                 <textarea id="message" name="message" rows="6" cols="50"></textarea>
//               </div>
//               <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
//                 <span class="buttonsubmit__text"> Send </span> </button>
//             </form>
//         </div>

//         <div class='row card-body dacc-override' id='daccOverride' class="col-6" style='display:none'>
//           <form>
//               <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
//                 <span class="buttonsubmit__text"> Move To Review Complete </span> 
//               </button>
//           </form>
//         </div>

//         <div id='finalChairDecision' class="card-body approvedeny" style="background-color:#f6f6f6; display:none">
//           <form>
//             <label for="message">Enter Message for submitter or the DACC</label>
//             <div class='text-muted small'>Submitter will only see the below comment after approve or deny. </div>
//             <label for="grade">Select recommendation: </label>
//           <select name="grade" id="grade2"></option>
//             <option value = "1"> 1 - Approved as submitted</option>
//             <option value = "2"> 2 - Approved, pending conditions/clarification of some issues </option>
//             <option value = "3"> 3 - Approved, but data release will be delayed </option>
//             <option value = "4"> 4 - Not approved </option>
//             <option value = "6"> 6 - Decision pending clarification of several issues</option>
//             <option value = "777"> 777 - Duplicate Proposal</option>
//             </select>
//           <br>
//             <div class="input-group">
//                 <textarea id="message" name="message" rows="6" cols="65"></textarea>
//             </div>
//             <button type="submit" class="buttonsubmit" value="approved" onclick="this.classList.toggle('buttonsubmit--loading')">
//               <span class="buttonsubmit__text"> Approve </span></button>
//             <button type="submit" class="buttonsubmit" value="rejected" onclick="this.classList.toggle('buttonsubmit--loading')">
//               <span class="buttonsubmit__text"> Deny </span></button>
//             <button type="submit" class="buttonsubmit" value="daccReview" onclick="this.classList.toggle('buttonsubmit--loading')">
//               <span class="buttonsubmit__text"> Return to DACC </span></button>  
//           </form>
//         </div>
//         `;
//   }
//   template += `
//       </div>
//     </div>
//     `;
//   //};

//   document.getElementById("chairFileView").innerHTML = template;
//   viewFinalDecisionFilesTemplate(filesdecided);
//   submitToDacc();
//   daccOverride();
//   commentApproveReject();
//   if (filesincomplete.length != 0) {
//     switchFiles("toBeCompleted");
//     showPreview(filesincomplete[0].id);
//     document.getElementById(
//       "toBeCompletedselectedDoc"
//     ).children[0].selected = true;
//     document.getElementById("boxFilePreview").classList.remove("col-8");
//     document.getElementById("fileComments").style.display = "none";
//   } else {
//     document.getElementById("filePreview").classList.remove("d-block");
//     document.getElementById("filePreview").classList.add("d-none");
//   }

//   //Switch Tabs
//   switchTabs(
//     "toBeCompleted",
//     ["inProgress", "daccCompleted", "decided"],
//     filesincomplete
//   );
//   switchTabs(
//     "inProgress",
//     ["toBeCompleted", "daccCompleted", "decided"],
//     filesinprogress
//   );
//   switchTabs(
//     "daccCompleted",
//     ["inProgress", "toBeCompleted", "decided"],
//     filescompleted
//   );
//   switchTabs(
//     "decided",
//     ["inProgress", "daccCompleted", "toBeCompleted"],
//     filesdecided
//   );

//   if (localStorage.getItem("currentTab")) {
//     const currTab = localStorage.getItem("currentTab");
//     if (document.getElementById(currTab) != null) {
//       document.getElementById(currTab).click();
//     }
//   }

//   hideAnimation();
// };

// export const submitToDacc = () => {
//   let submitDacc = async (e) => {
//     const btn = document.activeElement;
//     btn.disabled = true;
//     e.preventDefault();
//     let message = e.target[0].value;
//     //Send multiple files
//     const filesToSend = [];
//     const elements = document.querySelectorAll(
//       ".tab-content .active #toBeCompletedselectedDoc option"
//     );
//     for (let i = 0; i < elements.length; i++) {
//       if (elements[i].selected) {
//         filesToSend.push(elements[i].value);
//       }
//     }
//     for (const fileId of filesToSend) {
//       await createCompleteTask(fileId, message);
//       let tasklist = await getTaskList(fileId);
//       let tasktodacc = tasklist.entries[0].id;
//       for (
//         let i = 0, daccemaillength = emailforDACC.length;
//         i < daccemaillength;
//         i++
//       ) {
//         await assignTask(tasktodacc, emailforDACC[i]);
//       }
//       await createComment(fileId, message);
//       await moveFile(fileId, daccReviewFolder);
//     }

//     document.location.reload(true);
//   };
//   const sdform = document.querySelector(".dacc-submit");
//   if (sdform) {
//     sdform.addEventListener("submit", submitDacc);
//   }
// };
// export const daccOverride = () => {
//   let override = async (e) => {
//     e.preventDefault();
//     const btn = document.activeElement;
//     btn.disabled = true;

//     const filesToSend = [];
//     const elements = document.querySelectorAll(
//       ".tab-content .active #inProgressselectedDoc option"
//     );
//     for (let i = 0; i < elements.length; i++) {
//       if (elements[i].selected) {
//         filesToSend.push(elements[i].value);
//       }
//     }
//     for (const fileId of filesToSend) {
//       let tasklist = await getTaskList(fileId);
//       let entries = tasklist.entries;

//       if (entries.length !== 0) {
//         for (let item of entries) {
//           if (item.is_completed == false && item.action == "complete") {
//             deleteTask(item.id);
//           }
//         }
//         await moveFile(fileId, chairReviewFolder);
//         await createFileTask(fileId);
//         tasklist = await getTaskList(fileId);
//         entries = tasklist.entries;
//         for (let item of entries) {
//           if (item.is_completed == false) {
//             await assignTask(item.id, emailforChair[0]);
//           }
//         }
//       }
//     }
//     document.location.reload(true);
//   };
//   const overrideform = document.querySelector(".dacc-override");
//   if (overrideform) {
//     overrideform.addEventListener("submit", override);
//   }
// };

// export const commentApproveReject = () => {
//   let approveComment = async (e) => {
//     e.preventDefault();
//     const btn = document.activeElement;
//     btn.disabled = true;
//     // let taskId = btn.name;
//     let fileId = document.querySelector(
//       ".tab-content .active #daccCompletedselectedDoc"
//     ).value; //document.getElementById('selectedDoc').value;
//     // Send multiple files
//     const filesToSend = [];
//     const elements = document.querySelectorAll(
//       ".tab-content .active #daccCompletedselectedDoc option"
//     );
//     for (let i = 0; i < elements.length; i++) {
//       if (elements[i].selected) {
//         filesToSend.push(elements[i].value);
//       }
//     }
//     for (const fileId of filesToSend) {
//       let tasklist = await getTaskList(fileId);
//       let entries = tasklist.entries;
//       if (entries.length !== 0) {
//         for (let item of entries) {
//           if (item.is_completed == false && item.action == "review") {
//             for (let taskassignment of item.task_assignment_collection
//               .entries) {
//               if (
//                 taskassignment.assigned_to.login ==
//                 JSON.parse(localStorage.parms).login
//               ) {
//                 var taskId = taskassignment.id;
//               }
//             }
//           }
//         }
//       }
//       let decision = e.submitter.value;
//       let grade = e.target[0].value;
//       let comment = e.target[1].value;

//       let message = "Scoring: " + grade + "\nComment: " + comment;
//       if (decision !== "daccReview") {
//         await updateTaskAssignment(taskId, decision, message);
//       }
//       await createComment(fileId, message);
//       let fileInfo = await getFileInfo(fileId);
//       let uploaderName = fileInfo.created_by.login;
//       if (decision == "approved") {
//         await moveFile(fileId, acceptedFolder);
//       } else if (decision == "rejected") {
//         await moveFile(fileId, deniedFolder);
//       } else if (decision == "daccReview") {
//         // Delete review task assigned to chair
//         let tasklist = await getTaskList(fileId);
//         const taskEntries = tasklist.entries;
//         if (taskEntries.length !== 0) {
//           for (let entry of entries) {
//             if (entry.action === "review") {
//               if (entry.is_completed == false) {
//                 await deleteTask(entry.id);
//               }
//             }
//           }
//         }

//         //Create complete tasks for DACC
//         await createCompleteTask(fileId, message);
//         tasklist = await getTaskList(fileId);
//         let tasktodacc;
//         for (const entry of tasklist.entries) {
//           if (entry.is_completed == false) {
//             if (entry.action === "complete") {
//               tasktodacc = entry.id;
//             }
//           }
//         }
//         for (
//           let i = 0, daccemaillength = emailforDACC.length;
//           i < daccemaillength;
//           i++
//         ) {
//           await assignTask(tasktodacc, emailforDACC[i]);
//         }

//         //Move file to DACC Review (Resubmit) folder
//         await moveFile(fileId, daccReviewChairFolder);
//       }

//       if (decision != "daccReview") {
//         let folderItems = await getFolderItems(submitterFolder);
//         let folderEntries = folderItems.entries;
//         let folderID = "none";
//         for (let obj of folderEntries) {
//           if (obj.name == uploaderName) {
//             folderID = obj.id;
//           }
//         }
//         let cpFileId = "";
//         if (folderID == "none") {
//           const newFolder = await createFolder(submitterFolder, uploaderName);
//           await addNewCollaborator(
//             newFolder.id,
//             "folder",
//             uploaderName,
//             "viewer"
//           );
//           const cpFile = await copyFile(fileId, newFolder.id);
//           cpFileId = cpFile.id;
//         } else {
//           const cpFile = await copyFile(fileId, folderID);
//           cpFileId = cpFile.id;
//         }
//         await createComment(cpFileId, "This file was " + decision);
//         await createComment(cpFileId, message);
//       }
//     }
//     document.location.reload(true);
//   };

//   const form = document.querySelector(".approvedeny");
//   if (form) {
//     form.addEventListener("submit", approveComment);
//   }
// };

const viewFile = () => {
  var preview = new Box.Preview();
  preview.show(id, JSON.parse(localStorage.parms).access_token, {
    container: ".preview-container",
    showDownload: true,
  });
};

const addEventPreviewFile = () => {
  const btns = Array.from(document.querySelectorAll(".preview-file"));
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const header = document.getElementById("confluencePreviewerModalHeader");
      const body = document.getElementById("confluencePreviewerModalBody");
      header.innerHTML = `<h5 class="modal-title">File preview</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>`;
      const fileId = btn.dataset.fileId;
      filePreviewer(fileId, "#confluencePreviewerModalBody");
    });
  });
};

export const filePreviewer = (fileId, divId) => {
  const access_token = JSON.parse(localStorage.parms).access_token;
  const preview = new Box.Preview();
  preview.show(fileId, access_token, {
    container: divId,
  });
};

export const daccSection = (activeTab) => {
  let authChair =
    emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = "";
  if (authDacc && authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      //"Chair Menu",
      "DACC Menu"
    );
  } else if (authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      //"Chair Menu"
    );
  } else if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "DACC Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "View Submissions"
    );
  }
  let template = `
              <div class="general-bg body-min-height padding-bottom-1rem">
                  <div class="container">
                    ${navBarItems}
                  
              </div>
              `;
  template += `
              <div id="daccFileView" class="align-left"></div>
              </div>
              `;

  return template;
};

// export const getAllSubFiles = async (folder) => {
//   const response = await getFolderItems(folder);
//   for (let item of response.entries) {
//     if (item.type === "folder") {
//       getAllSubFiles(item.id);
//     }
//     else if (item.type === "file") {
//       outputarray.push(item.id)
//       console.log(item.id);
//     }
//   }
// }

export const daccFileView = async () => {
  const responseDACC = await getFolderItems(daccReviewFolder);
  let filearrayDACC = responseDACC.entries;
  const responseDACCChairReview = await getFolderItems(daccReviewChairFolder);
  let filearrayDACCChairReview = responseDACCChairReview.entries;

  // const responseChair = await getFolderItems(chairReviewFolder);
  // let filearrayChair = responseChair.entries;
  const responseAccepted = await getFolderItems(acceptedFolder);
  var filearrayAccepted = [];
  var filearrayDenied = [];
  const sortAllFiles = await getAllSubFiles(acceptedFolder, 'none');

  async function getAllSubFiles(folder, acceptedCheck) {
    const response = await getFolderItems(folder);
    for (let item of response.entries) {
      if (item.type === "folder") {
        if(item.name === "Accepted") {
          getAllSubFiles(item.id, true);
          console.log(item);
        }
        else if(item.name === "Denied") {
          getAllSubFiles(item.id, false);
        }
        else {
          getAllSubFiles(item.id, acceptedCheck)
        }
      }
      else if (item.type === "file") {
        if (acceptedCheck === true) {
          filearrayAccepted.push(item);
        }
        else if (acceptedCheck === false) {
          filearrayDenied.push(item);
        }
      }
    }
  }

  //let filearrayAccepted = responseAccepted.entries;
  //const responseDenied = await getFolderItems(deniedFolder);
  //let filearrayDenied = responseDenied.entries;
  let template = `
            <div class="general-bg padding-bottom-1rem">
            <div class="container body-min-height">
            <div class="main-summary-row">
                <div class="align-left">
                    <h1 class="page-header">DACC Access Only</h1>
                </div>
            </div>
            <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
            <ul class='nav nav-tabs mb-3' role='tablist'>
            <li class='nav-item' role='presentation'>
              <a class='nav-link active' id='dacctoBeCompletedTab' href='#dacctoBeCompleted' data-mdb-toggle="tab" role='tab' aria-controls='dacctoBeCompleted' aria-selected='true'> Review </a>
            </li>
            <li class='nav-item' role='presentation'>
              <a class='nav-link' id='daccReviewTab' href='#daccReview' data-mdb-toggle="tab" role='tab' aria-controls='daccReview' aria-selected='true'> Re-Review </a>
            </li>
            <li class='nav-item' role='presentation'>
              <a class='nav-link' id='decidedTab' href='#decided' data-mdb-toggle="tab" role='tab' aria-controls='decided' aria-selected='true'> DACC Decision </a>
            </li>
            <!--li class='nav-item' role='presentation'>
                <a class='nav-link' id='completedTab' href='#completed' data-mdb-toggle="tab" role='tab' aria-controls='completed' aria-selected='true'>Completed</a>
            </li-->


            </ul>`;
  const filesincomplete = [];
  const filesreviewed = [];
  let filescompleted = [];

//All For loops can be changed to forEach to parallelize the process
  for (let obj of filearrayDACC) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        if (items.is_completed == false && items.action == "complete") {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (
              itemtasks.status == "incomplete" &&
              itemtasks.assigned_to.login ==
                JSON.parse(localStorage.parms).login
            ) {
              filesincomplete.push(obj);
            } else if (
              itemtasks.status == "complete" &&
              itemtasks.assigned_to.login ==
                JSON.parse(localStorage.parms).login
            ) {
              filescompleted.push(obj);
            }
          }
        } else if (items.is_completed == true && items.action == "complete") {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (
              itemtasks.assigned_to.login ==
              JSON.parse(localStorage.parms).login
            ) {
              if (!filescompleted.includes(obj)) {
                filescompleted.push(obj);
              }
            }
          }
        }
      }
    }
  }

  for (let obj of filearrayAccepted) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        for (let itemtasks of items.task_assignment_collection.entries) {
          if (
            itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login
          ) {
            if (!filescompleted.includes(obj)) {
              filescompleted.push(obj);
            }
          }
        }
      }
    }
  }

  for (let obj of filearrayDenied) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        for (let itemtasks of items.task_assignment_collection.entries) {
          if (
            itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login
          ) {
            if (!filescompleted.includes(obj)) {
              filescompleted.push(obj);
            }
          }
        }
      }
    }
  }

  for (const obj of filearrayDACCChairReview) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        if (items.is_completed == false && items.action == "complete") {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (
              itemtasks.status == "incomplete" &&
              itemtasks.assigned_to.login ==
                JSON.parse(localStorage.parms).login
            ) {
              filesreviewed.push(obj);
            } else if (
              itemtasks.status == "complete" &&
              itemtasks.assigned_to.login ==
                JSON.parse(localStorage.parms).login
            ) {
              filescompleted.push(obj);
            }
          }
        } else if (items.is_completed == true && items.action == "complete") {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (
              itemtasks.assigned_to.login ==
              JSON.parse(localStorage.parms).login
            ) {
              if (!filescompleted.includes(obj)) {
                filescompleted.push(obj);
              }
            }
          }
        }
      }
    }
  }

  template += "<div class='tab-content' id='selectedTab'>";

  template += `<div class='tab-pane fade show active'
                id='dacctoBeCompleted' role='tabpanel'
              aria-labeledby='dacctoBeCompletedTab'>
              <!--<a href="mailto:${emailforChair[0]}" id='email' class='btn btn-dark'>Send Email to Chair</a>-->`;
  template += renderFilePreviewDropdown(filesincomplete, "dacctoBeCompleted");

  template += `<div class='tab-pane fade'
                id='daccReview' role='tabpanel'
                aria-labeledby='daccReviewTab'>
                <!--<a href="mailto:${emailforChair[0]}" id='email' class='btn btn-dark'>Send Email to Chair</a>-->`;
  template += renderFilePreviewDropdown(filesreviewed, "daccReview");

  template += `<div class='tab-pane fade' 
                id='decided' role='tabpanel'
                aria-labelledby='decidedTab'>
                
                </div>`;
  template += `<div id='filePreview'>`;

  if (
    filescompleted.length != 0 ||
    filesincomplete.length != 0 ||
    filesreviewed.length != 0
  ) {
    template += ` 
      <div class='row'>
        <div id='boxFilePreview' class="col-8 preview-container"></div>
        <div id='fileComments' class='col-4 mt-2'></div>
      </div>

      <div id="daccComment" class="card-body dacc-comment" style="padding-left: 10px;background-color:#f6f6f6;">
      <form>  
        <label for="grade">Select recommendation: </label>
          <select name="grade" id="grade"></option>
            <option value = "1"> 1 - Approve</option>
            <option value = "2"> 2 - Approve, pending additional information </option>
            <option value = "3"> 3 - Reject </option>
            </select>
          <br>
            <label for"message">Submit Comment:</label>
            <div class="input-group">
              <textarea id="message" name="message" rows="6" cols="65"></textarea>
            </div>
            <button type="submit" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
              <span class="buttonsubmit__text"> Submit & Complete </span> </button>
          </form>
      </div>`;
  }
  template += `
      <!--</div>-->
    </div>`;
  document.getElementById("daccFileView").innerHTML = template;

  //filescompleted = [...filearrayAccepted, ...filearrayDenied];
  viewFinalDecisionFilesTemplate([...filearrayAccepted, ...filearrayDenied]);
  if (filesincomplete.length != 0) {
    switchFiles("dacctoBeCompleted");
    showPreview(filesincomplete[0].id);
    showComments(filesincomplete[0].id);
  } else {
    document.getElementById("filePreview").classList.remove("d-block");
    document.getElementById("filePreview").classList.add("d-none");
  }

  submitToComment();

  //Switch Tabs
  switchTabs("dacctoBeCompleted", ["decided", "daccReview"], filesincomplete);
  switchTabs("decided", ["dacctoBeCompleted", "daccReview"], filescompleted);
  switchTabs("daccReview", ["dacctoBeCompleted", "decided"], filesreviewed);

  if (localStorage.getItem("currentTab")) {
    const currTab = localStorage.getItem("currentTab");
    if (document.getElementById(currTab) != null) {
      document.getElementById(currTab).click();
    }
  }
  hideAnimation();
};

export const submitToComment = () => {
  let submitComment = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;
    //let taskId = btn.name;
    let fileId =
      document.querySelector(
        ".tab-content .active #dacctoBeCompletedselectedDoc"
      ) !== null
        ? document.getElementById("dacctoBeCompletedselectedDoc").value
        : document.getElementById("daccReviewselectedDoc").value; //document.getElementById('selectedDoc').value;
    let grade = e.target[0].value;
    let comment = e.target[1].value;
    let message = "Rating: " + grade + "\nComment: " + comment;
    await createComment(fileId, message);
    let tasklist = await getTaskList(fileId);
    let entries = tasklist.entries;
    if (entries.length !== 0) {
      for (let item of entries) {
        if (item.is_completed == false) {
          for (let taskassignment of item.task_assignment_collection.entries) {
            if (
              taskassignment.assigned_to.login ==
              JSON.parse(localStorage.parms).login
            ) {
              var taskId = taskassignment.id;
              await updateTaskAssignment(taskId, "completed");
              item.is_completed = true;
            }
          }
        }
      }
    }
    var numCompletedTasks = 0;
    if (entries.length !== 0) {
      for (let item of entries) {
        if (item.is_completed == true) {
          numCompletedTasks += 1;
        }
      }
      if (numCompletedTasks == entries.length) {
        let comments = await listComments(fileId);
        let commentsResponse = JSON.parse(comments).entries;
        let scorelist = [];
        for (let comment of commentsResponse) {
          scorelist.push(comment.message[8]);
        }
        console.log(scorelist);
        const allEqual = scorelist => scorelist.every(val => val === scorelist[0]);
        if (allEqual && scorelist[0]==='1'){
          await moveFile(fileId, acceptedFolder);
          console.log("all equal 1");
        } else if (allEqual && scorelist[0]==='3') {
          await moveFile(fileId, deniedFolder);
          console.log("all equal 3");
        } else {
          await moveFile(fileId, daccReviewChairFolder)
          console.log("not equal 2");
          for (let dacc of emailforDACC) {
            let item = await createFileTask(fileId);
            console.log(item);
            await createCompleteTask(item.id, dacc);
            console.log("moved and assigned");
          }
        }
      }
    }

    document.location.reload(true);
  };
  const dcform = document.querySelector(".dacc-comment");
  if (dcform) {
    dcform.addEventListener("submit", submitComment);
  }
};

export const dataApproval = () => {
  let approveDoc = async (e) => {
    e.preventDefault();

    let fileId = 931127106406;
    let decision = e.submitter.value;
    let message = e.target[0].value;

    let taskList = await getTaskList(fileId);
    let taskAssignment =
      taskList.entries[0].task_assignment_collection.entries[0];
  };

  const form = document.querySelector(".data-approval");
  form.addEventListener("submit", approveDoc);
};

export const dataForm = async () => {
  let addDataBtns = document.querySelectorAll('[id$=addDataBtn]');
  let remDataBtns = document.querySelectorAll('[id$=remDataBtn]');
  const clickEvent = e => {
    let parent = e.target.parentElement.parentElement.parentElement;
    //const ele = document.getElementById(parent);
    console.log(parent);
    const eleAll = parent.getElementsByClassName('author_name');
    // let id = parent.id.slice(0,-4); //Remove 'Form' from id
    // //console.log(id);
    let num = eleAll.length + 1
    // if (num > 0 && document.getElementById(`${id}data_upload${num-1}`).value===''){
    //   return alert("Please attach file to additional data before adding more data");
    // }
    let idaddAttachment = document.getElementById(`investigators`)
    var newInput = document.createElement('div');
    newInput.className = 'input-group author_name'

    newInput.innerHTML = `
      <label for="investigators"><b>Requestor ${num}</b> <span class='required-label'>*</span></label>
        <input id="author_first${num}" name="author_info${num}" type="text" placeholder="First Name" style="width: 33%"/>
        <input id="author_last${num}" name="author_info${num}" type="text" placeholder="Last Name" style="width: 33%"/>
      <div class="input-group">
        <label for="institution${num}"><b>Institution Investigator ${num}</b><span class='required-label'>*</span></label>
        <input id="institution${num}" name="institution${num}" type="text" placeholder="Institution"/>
      </div>
      <div class="input-group">
        <label for="email${num}"><b>Contact Email Investigator ${num}</b><span class='required-label'>*</span></label>
        <input id="email${num}" name="email${num}" type="email" placeholder="Email"/>
      </div>
    `
    idaddAttachment.appendChild(newInput);
    idaddAttachment.classList.toggle("d-none", false);
    var remBtn = document.getElementById(`remDataBtn`);
    remBtn.parentElement.style.display = "inline";
  }
  const clickEventRem = e => {
    //console.log(e.target.id);
    var parId = e.target.id.replace('remDataBtn','investigators');
    //console.log(parId);
    var parDiv = document.getElementById(parId);
    //console.log(parDiv);
    parDiv.removeChild(parDiv.lastChild);
    if (parDiv.childElementCount < 2) {
      e.target.parentElement.style.display = "none";
    }
  }
  addDataBtns.forEach((item) => {
    item.addEventListener('click', clickEvent);
  })
  remDataBtns.forEach((item) => {
    item.addEventListener('click', clickEventRem);
  })

  let files = await getFolderItems(uploadFormFolder);
  const d = new Date();
  let filename =
    JSON.parse(localStorage.parms).login.split("@")[0] +
    "_" +
    d.getDate() +
    "_" +
    (d.getMonth() + 1) +
    "_" +
    d.getFullYear() +
    ".docx";

  // Find unique name
  let entries = files.entries;
  let i = 1;
  while (entries.includes(filename)) {
    let indexOfExtension = filename.indexOf(".");
    filename =
      filename.substring(0, indexOfExtension) +
      `(${i})` +
      filename.substring(indexOfExtension);
    i++;
  }
  const filesinfoldernames = [];
  const filesinfolderids = [];
  for (let i = 0; i < files.entries.length; i++) {
    filesinfoldernames.push(files.entries[i].name);
    filesinfolderids.push(files.entries[i].id);
  }

  async function handleFormDownload(eventtest) {
    const btn = document.activeElement;
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = true;
    eventtest.preventDefault();
    const form = document.querySelector(".contact-form form");
    const data = new FormData(form);
    const jsondata = Object.fromEntries(data.entries());
    jsondata.basevar = data.getAll("basevar");
    jsondata.ibcvar = data.getAll("ibcvar");
    jsondata.reqcoh = data.getAll("reqcoh");

    let parentEl = eventtest.target.parentElement;
    let blob;
    if (parentEl.id === "downloadWord") {
      const doc = new docx.Document({
        styles: {
          default: {
            heading1: {
              run: {
                size: 22,
                bold: true,
                color: "#000000",
                font: "Verdana",
              },
            },
            heading2: {
              run: {
                size: 18,
                bold: true,
                color: "#000000",
                font: "Verdana",
              },
            },
          },
        },
        sections: [
          {
            properties: {},
            headers: {
              default: new docx.Header({
                children: [
                  new docx.Paragraph({
                    text: "Breast Cancer Risk Prediction Project Analysis Proposal",
                    heading: docx.HeadingLevel.HEADING_1,
                    alignment: docx.AlignmentType.CENTER,
                  }),
                ],
              }),
            },
            children: [
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Date: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.date,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Project Title: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.projname,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Is this an amendment: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.amendment,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Amendment: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.conNum,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Contact Investigator(s): ",
                  }),
                  new docx.TextRun({
                    text: jsondata.investigators,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Institution(s): ",
                  }),
                  new docx.TextRun({
                    text: jsondata.institution,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Contact Email: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.email,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Are you a member of BCRPP ",
                  }),
                  new docx.TextRun({
                    text: jsondata.member,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "BCRPP Study Acronym(s) for the Contact Investigator: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.acro,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "All Investigators (and Institutions) who require access: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.investigators,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Background: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.background,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Aims: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.aims,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Analysis Plan: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.analyplan,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Core Variables: ",
                  }),
                  new docx.TextRun({
                    text: JSON.stringify(jsondata.basevar, null, 2)
                      .replace("[", "")
                      .replace("]", ""),
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "MMD Variables: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.mmdvarv,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "BRCA Variables: ",
                  }),
                  new docx.TextRun({
                    text: JSON.stringify(jsondata.ibcvar, null, 2)
                      .replace("[", "")
                      .replace("]", ""),
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Requested Cohorts: ",
                  }),
                  new docx.TextRun({
                    text: JSON.stringify(jsondata.reqcoh, null, 2)
                      .replace("[", "")
                      .replace("]", ""),
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Timeline: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.timeline,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Authorship: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.authorship,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
            ],
          },
        ],
      });

      blob = docx.Packer.toBlob(doc);
    }

    if (parentEl.id === "downloadJSON") {
      blob = new Blob([JSON.stringify(jsondata)], {
        type: "application/json",
      });
    }
    const downloadLink = URL.createObjectURL(blob);
    let filename = jsondata.projname;

    let a = document.createElement("a");

    a.href = downloadLink;
    a.download = filename;

    a.click();
    btn.classList.toggle("buttonsubmit--loading");
  }
  async function handleFormSubmit(eventtest) {
    const btn = document.activeElement;
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = true;
    eventtest.preventDefault();
    const data = new FormData(eventtest.target);

    const formJSON = Object.fromEntries(data.entries());
    const results = document.querySelector(".results pre");
    results.innerText = JSON.stringify(formJSON, null, 2);
    // fs.wrtieFile('test.json', formJSON);
    await generateWord(formJSON);
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = false;
  }

  async function assigntasktochair() {
    let files = await getFolderItems(uploadFormFolder);
    const filesinfoldernames = [];
    const filesinfolderids = [];
    for (let i = 0; i < files.entries.length; i++) {
      filesinfoldernames.push(files.entries[i].name);
      filesinfolderids.push(files.entries[i].id);
    }

    let fileId = filesinfolderids[filesinfoldernames.indexOf(filename)];
    await createMetadata(fileId);
  }

  async function generateWord(jsondata) {
    const doc = new docx.Document({
      styles: {
        default: {
          heading1: {
            run: {
              size: 22,
              bold: true,
              color: "#000000",
              font: "Verdana",
            },
          },
          heading2: {
            run: {
              size: 18,
              bold: true,
              color: "#000000",
              font: "Verdana",
            },
          },
        },
      },
      sections: [
        {
          properties: {},
          headers: {
            default: new docx.Header({
              children: [
                new docx.Paragraph({
                  text: "DCEG Data Platform Access Analysis Proposal",
                  heading: docx.HeadingLevel.HEADING_1,
                  alignment: docx.AlignmentType.CENTER,
                }),
              ],
            }),
          },
          children: [
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Date: ",
                }),
                new docx.TextRun({
                  text: jsondata.date,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Project Title: ",
                }),
                new docx.TextRun({
                  text: jsondata.projname,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Contact Investigator(s): ",
                }),
                new docx.TextRun({
                  text: jsondata.investigators,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Institution(s): ",
                }),
                new docx.TextRun({
                  text: jsondata.institution,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Contact Email: ",
                }),
                new docx.TextRun({
                  text: jsondata.email,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Requested Publication Data: ",
                }),
                new docx.TextRun({
                  text: jsondata.datatitle,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Requested Journal Data: ",
                }),
                new docx.TextRun({
                  text: jsondata.datajournal,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Requested Author Data: ",
                }),
                new docx.TextRun({
                  text: jsondata.dataauthor,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Background: ",
                }),
                new docx.TextRun({
                  text: jsondata.background,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Aims: ",
                }),
                new docx.TextRun({
                  text: jsondata.aims,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
          ],
        },
      ],
    });

    filename = jsondata.projname.substring(0, 10) + "_" + filename;
    let files = await getFolderItems(uploadFormFolder);
    const filesinfoldernames = [];
    const filesinfolderids = [];
    for (let i = 0; i < files.entries.length; i++) {
      filesinfoldernames.push(files.entries[i].name);
      filesinfolderids.push(files.entries[i].id);
    }

    await docx.Packer.toBlob(doc).then(async (blob) => {
      if (filesinfoldernames.includes(filename)) {
        const [name, extension] = filename.split(".");
        let i = 1;
        while (filesinfoldernames.includes(filename)) {
          if (filename.includes(")")) {
            const [name, version] = filename.split("(");
            filename = name + `(${i})` + version.substring(2);
          } else {
            filename = name + `(${i}).` + extension;
          }
          i++;
        }
        console.log(blob);
        let response = await uploadWordFile(blob, filename, uploadFormFolder);
        await assigntasktochair();
        let fileid = response.entries[0].id;
        //Modal code here
        document.getElementById("modalBody").innerHTML = `
          <p>File was successfully uploaded.</p>
          <p>Document ID: ${fileid}</p>`;
        $("#popUpModal").modal("show");
      } else {
        // Adding keywords
        console.log(blob);
        let response = await uploadWordFile(blob, filename, uploadFormFolder);
        if (response.status === 201) {
          //await assigntasktochair();
          let fileid = response.entries[0].id;
          //Modal code here
          document.getElementById("modalBody").innerHTML = `
        <p>File was successfully uploaded.</p>
        <p>Document ID: ${fileid}</p>`;
          $("#popUpModal").modal("show");
        } else {
        }
      }
    });
  }

  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", handleFormSubmit);

  const downloadJSON = document.getElementById("downloadJSON");
  downloadJSON.addEventListener("click", handleFormDownload);
};

const viewFiles = async (files) => {
  let template = ``;
  for (const id of files) {
    let fileinfo = await getFileInfo(id);
    template += `
            <div style="padding: 10px" aria-expanded="false" id="heading${id}">
              <div class = "row">
                <div class="col-md-4 card-title"><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></div>
                  <div class="col-md-1">
                      <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${id}">
                          <i class="fas fa-caret-down fa-2x"></i>
                      </button>
                  </div>
                </div>
              </div>
            `;
    template += `
            <div id="study${id}" class="collapse" aria-labelledby="heading${id}">
              <div class="card-body dacc-submit" style="padding-left: 10px;background-color:#f6f6f6;">
                <form>
                  <label for"message">Send to DACC</label>
                  <div class="input-group">
                    <textarea id="message" name="message" rows="10" cols="65"></textarea>
                  </div>
                  <button type="submit" value="${id}" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                    <span class="buttonsubmit__text"> Send </span> </button>
                </form>
              </div>
            </div>
            `;
  }
  return template;
};

const viewDACCCompletedFiles = async (files, taskids) => {
  let template = ``;
  var ival = 0;
  for (const id of files) {
    let fileinfo = await getFileInfo(id);
    let taskid = taskids[ival];
    template += `
            <div style="padding: 10px" aria-expanded="false" id="heading${id}">
              <div class = "row">
                <div class="col-md-4 card-title"><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></div>
                  <div class="col-md-1">
                      <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${id}">
                          <i class="fas fa-caret-down fa-2x"></i>
                      </button>
                  </div>
                </div>
              </div>
            `;
    template += `
            <div id="study${id}" class="collapse" aria-labelledby="heading${id}">
              <div class="card-body approvedeny" style="padding-left: 10px;background-color:#f6f6f6;">
                <form>
                  <label for="message">Enter Message for Submitter</label>
                  <div class="input-group">
                      <textarea id="message" name="message" rows="6" cols="65"></textarea>
                  </div>
                  <button type="submit" name="${taskid}" id="${id}" class="buttonsubmit" value="approved">
                    <span class="buttonsubmit__text"> Approve </span></button>
                  <button type="submit" name="${taskid}" id="${id}" class="buttonsubmit" value="rejected">
                    <span class="buttonsubmit__text"> Deny </span></button>
                </form>
              </div>
            </div>
            `;
    ival += 1;
  }
  return template;
};

const viewDACCFiles = async (files, taskids) => {
  let template = ``;
  var ival = 0;
  for (const id of files) {
    let fileinfo = await getFileInfo(id);
    let taskid = taskids[ival];
    template += `
            <div style="padding: 10px" aria-expanded="false" id="heading${id}">
              <div class = "row">
                <div class="col-md-4 card-title"><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></div>
                  <div class="col-md-1">
                      <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${id}">
                          <i class="fas fa-caret-down fa-2x"></i>
                      </button>
                  </div>
                </div>
              </div>
            `;
    template += `
            <div id="study${id}" class="collapse" aria-labelledby="heading${id}">
              <div class="card-body dacc-comment" style="padding-left: 10px;background-color:#f6f6f6;">
                <form>
                  <label for"message">Submit Comment</label>
                  <div class="input-group">
                    <textarea id="message" name="message" rows="6" cols="65"></textarea>
                  </div>
                  <button type="submit" name="${taskid}" value="${id}" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                    <span class="buttonsubmit__text"> Submit & Complete </span> </button>
                </form>
              </div>
            </div>
            `;
    ival += 1;
  }
  return template;
};

export async function viewFinalDecisionFilesTemplate(files) {
  let template = "";
  let filesInfo = [];
  for (const file of files) {
    const fileInfo = await getFileInfo(file.id);
    filesInfo.push(fileInfo);
  }
  console.log(filesInfo);
  if (filesInfo.length > 0) {
    template += `
    <div id='decidedFiles'>
    <div class='row'>
      <div class="col-xl-12 filter-column" id="summaryFilterSiderBar">
          <div class="div-border white-bg align-left p-2">
              <div class="main-summary-row">
                  <div class="col-xl-12 pl-1 pr-0">
                      <span class="font-size-17 font-bold">Filter</span>
                      <div id="filterData" class="align-left"></div>
                  </div>
                  <div class="col-xl-12 pl-1 pr-0">
                      <span class="font-size-10"> <h6 class="badge badge-pill badge-1">1</h6>: Approved as submitted 
                                                  <h6 class="badge badge-pill badge-2">2</h6>: Approved, pending conditions 
                                                  <h6 class="badge badge-pill badge-3">3</h6>: Not Approved </span>
                  </div>
              </div>
          </div>
      </div>
      </div>
      
      <div class='col-xl-12 pr-0'>`;

    template += viewFinalDecisionFilesColumns();

    template += '<div id="files"> </div>';

    template += `
    <div id='popUpModal' class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id='modalBody'>
            <div id="folderInput">
            </div>
          </div>
          <div class="modal-footer">
        
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;

  } else {
    template += `
              No files to show.            
    </div>
    </div>`;
  }

  document.getElementById("decided").innerHTML = template;

  if (filesInfo.length !== 0) {
    await viewFinalDecisionFiles(filesInfo);
    for (const file of filesInfo) {
      document
        .getElementById(`study${file.id}`)
        .addEventListener("click", showCommentsDCEG(file.id));
    }

    let btns = Array.from(document.querySelectorAll(".preview-file"));
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        btn.dataset.target = "#bcrppPreviewerModal";
        const header = document.getElementById("bcrppPreviewerModalHeader");
        const body = document.getElementById("bcrppPreviewerModalBody");
        header.innerHTML = `<h5 class="modal-title">File preview</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>`;
        const fileId = btn.dataset.fileId;
        $("#bcrppPreviewerModal").modal("show");
        showPreview(fileId, "bcrppPreviewerModalBody");
      });
    });
    //Filtering and Sorting
    const table = document.getElementById("decidedFiles");
    const headers = table.querySelector(`.div-sticky`);
    Array.from(headers.children).forEach((header, index) => {
      header.addEventListener("click", (e) => {
        const sortDirection = header.classList.contains("header-sort-asc");
        sortTableByColumn(table, index, !sortDirection);
      });
    });

    filterSection(filesInfo);
    Array.from(document.getElementsByClassName("filter-var")).forEach((el) => {
      el.addEventListener("click", () => {
        const headerCell =
          document.getElementsByClassName("header-sortable")[0];
        const tableElement =
          headerCell.parentElement.parentElement.parentElement;
        filterCheckBox(tableElement, filesInfo);
      });
    });
    const input = document.getElementById("searchDataDictionary");
    input.addEventListener("input", () => {
      const headerCell = document.getElementsByClassName("header-sortable")[0];
      const tableElement = headerCell.parentElement.parentElement.parentElement;
      filterCheckBox(tableElement, filesInfo);
    });
  }
}

export function viewFinalDecisionFilesColumns() {
  return `<div class="row m-0 pt-2 pb-2 align-left div-sticky" style="border-bottom: 1px solid rgb(0,0,0, 0.1); font-size: .8em">
    <div class="col-lg-1 text-center font-bold ws-nowrap text-wrap header-sortable">DTA</div>
    <div class="col-lg-1 text-center font-bold ws-nowrap text-wrap header-sortable">Share Data</div>
    <div class="col-lg-3 text-left font-bold ws-nowrap text-wrap header-sortable">Concept Name <button class="transparent-btn sort-column" data-column-name="Concept Name"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-2 text-left font-bold ws-nowrap text-wrap header-sortable">Primary Requestor <button class="transparent-btn sort-column" data-column-name="Author"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-1 text-center font-bold ws-nowrap text-wrap header-sortable">Submission Date <button class="transparent-btn sort-column" data-column-name="Submission Date"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-1 text-center font-bold ws-nowrap text-wrap header-sortable">Status <button class="transparent-btn sort-column" data-column-name="Status"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-1 text-center font-bold ws-nowrap text-wrap header-sortable">${nameofDACC[0]}<button class="transparent-btn sort-column" data-column-name="review0"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-1 text-center font-bold ws-nowrap text-wrap header-sortable">${nameofDACC[1]}<button class="transparent-btn sort-column" data-column-name="review1"><i class="fas fa-sort"></i></button></div>
    <div class="col-md-1 text-right font-bold ws-nowrap text-wrap header-sortable"></div>
  </div>`;
}

export async function viewFinalDecisionFiles(files) {
  let template = "";

  for (const fileInfo of files) {
    console.log(fileInfo);
    const fileId = fileInfo.id;
    let filename = fileInfo.name//.split("_").slice(0, -4).join(" ");
    const shortfilename =
      filename.length > 25 ? filename.substring(0, 24) + "..." : filename;
    //let completion_date = await getChairApprovalDate(fileId);
    let dtaSigned = false;
    template += `
<div class="card mt-1 mb-1 align-left" >
    <div style="padding: 10px" aria-expanded="false" id="file${fileId}" class='filedata'>
        <div class="row">
            <div class="col-lg-1 text-center font-bold ws-nowrap text-wrap header-sortable"><button class="uploadDTA" type="button" name="${shortfilename}_DTAUpload" value="${fileInfo.parent.id}"><i class="fa-solid fa-file-arrow-up"></i></button></br>--/--/--</div>
            <div class="col-lg-1 text-center font-bold ws-nowrap text-wrap header-sortable"><button class="shareBoxData" type="button" name="${shortfilename}" value="${fileInfo.created_by.login}" ${dtaSigned ? '' : 'disabled'}><i class="fa-solid fa-user-plus"></i></button></br>--/--/--</div>
            <div class="col-lg-3 text-left">${shortfilename}<button class="btn btn-lg custom-btn preview-file" title='Preview File' data-file-id="${fileId}" aria-label="Preview File"  data-keyboard="false" data-backdrop="static" data-toggle="modal" data-target="#bcrppPreviewerModal"><i class="fas fa-external-link-alt"></i></button></div>
            <div class="col-lg-2 text-left">${fileInfo.created_by.name}</div>
            <div class="col-lg-1 text-center">${new Date(fileInfo.created_at).toDateString().substring(4)}</div>
            <div class="col-lg-1 pl-6 text-center">${
              fileInfo.description.includes("Accepted")
                ? '<h6 class="badge badge-pill badge-success">Accepted</h6>'
                : fileInfo.description.includes("Denied")
                ? '<h6 class="badge badge-pill badge-danger">Denied</h6>'
                : '<h6 class="badge badge-pill badge-warning">In Review</h6>'
            }</div>
            <div class="col-lg-1 pl-6 text-center" id="review0${fileId}">--</div>
            <div class="col-lg-1 pl-6 text-center" id="review1${fileId}">--</div>
            <div class="col-md-1 text-right">
                <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${fileId}">
                    <i class="fas fa-caret-down fa-2x"></i>
                </button>
            </div>
        </div>
        <div id="study${fileId}" class="collapse" aria-labelledby="file${fileId}">
                    <div class="card-body" style="padding-left: 10px;background-color:#f6f6f6;">
                    <div class="row mb-1 m-0">
                    <div class="col-12 font-bold">
                    Concept: ${filename}
                    </div>
                    </div>
                    <div class="row mb-1 m-0">
                      <div id='file${fileId}Comments' class='col-12'></div>
                    </div>
        </div>
    </div>
    </div>
    </div>`;
  }

  template += `</div></div></div></div>`;
  if (document.getElementById("files") != null)
    document.getElementById("files").innerHTML = template;
    shareBoxDataFunction();
    uploadDTAFunction();
}

function filterSection(files) {
  //Get all possible values for filters (Submitted By and Decision)
  let template = "";
  // const decisionFilterButtons = [
  //   ...new Set([...files.map((fileInfo) => fileInfo.parent.name)]),
  // ];
  template += `
  <div class='row'>
    <div class='col-lg-7'>
      <div class="form-group" margin:0px>
          <div class="input-group ">
              <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="searchDataDictionary" aria-describedby="search-addon" />
              <span class="input-group-text border-0 search-input">
                  <i class="fas fa-search"></i>
              </span>
              
          </div>
          
      </div>
      
  </div>
  <div class='col-lg-5'>

   `;
  // if (decisionFilterButtons.length !== 0) {
  //   template += `
  //   <label class="filter-label font-size-17 font-bold" for="variableTypeList">Decision</label>
  //   <div class='row' id="decisionFilterList"></div>`;
  // }
  // let decisionFilterTemp = "";
  // decisionFilterButtons.forEach((decision, index) => {
  //   if (decision === "Chair Final Review") {
  //     decision = "Under Review";
  //   }
  //   decisionFilterTemp += `
  //  <li class="filter-list-item">
  //    <input type="checkbox" data-variable-type="${decision}" name='decision${decision}' id="decision${index}" value='${decision}' class="filter-var" style="margin-left: 1px !important;" data-variable-column='Decision'>
  //    <label for="label${decision}" class="sub-category px-1" title="${decision}">${decision}</label>
  //    `;
  // });
  document.getElementById("filterData").innerHTML = template;
  //document.getElementById("decisionFilterList").innerHTML = decisionFilterTemp;
}

export const formFunctions = () => {
  document.getElementById("basevarv").addEventListener("click", (e) => {
    const inputList = document
      .getElementById("basevarlist")
      .getElementsByTagName("input");

    if (e.target.checked) {
      for (const element of inputList) {
        element.checked = true;
      }
    } else {
      for (const element of inputList) {
        element.checked = false;
      }
    }
  });

  document.getElementById("ibcvarv").addEventListener("click", (e) => {
    const inputList = document
      .getElementById("ibcvarlist")
      .getElementsByTagName("input");

    if (e.target.checked) {
      for (const element of inputList) {
        element.checked = true;
      }
    } else {
      for (const element of inputList) {
        element.checked = false;
      }
    }
  });
  document.getElementById("reqcohv").addEventListener("click", (e) => {
    const inputList = document
      .getElementById("reqcohlist")
      .getElementsByTagName("input");

    if (e.target.checked) {
      for (const element of inputList) {
        element.checked = true;
      }
    } else {
      for (const element of inputList) {
        element.checked = false;
      }
    }
  });
};

const shareBoxDataFunction = () => {
  const btns = Array.from(document.querySelectorAll(".shareBoxData"));
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.value);
      console.log(btn.name);
      $("#popUpModal").modal("show");
      dataGovTest();
      // const header = document.getElementById("confluencePreviewerModalHeader");
      // const body = document.getElementById("confluencePreviewerModalBody");
      // header.innerHTML = `<h5 class="modal-title">File preview</h5>
      //                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      //                            <span aria-hidden="true">&times;</span>
      //                        </button>`;
      // const fileId = btn.dataset.fileId;
      // filePreviewer(fileId, "#confluencePreviewerModalBody");
    });
  });
};

const uploadDTAFunction = () => {
  const btns = Array.from(document.querySelectorAll(".uploadDTA"))
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.value);
      console.log(btn.name);
      $("#popUpModal").modal("show");
      uploadDTAModal(btn.value)
    })
  })
}

const uploadDTAModal = async (folderValue) => {
  console.log("testing function to upload DTA");
  console.log(folderValue);
  ///
  // const responseData = csv2Json(await getFile(boxUpdateFile)); // Get summary level data
  // const lastModified = (await getFileInfo(boxUpdateFile)).modified_at;
  // console.log(responseData.headers);
  // console.log(responseData.data);
  // console.log(lastModified);
  // ///
  // let val = '0';
  // if(document.getElementById('folderID')) {
  //   val = document.getElementById('folderID').value
  // } else {
  //   val = '239899508915'
  // }
  // //let val = '239899508915'
  // console.log(val);
  // const array = await getFolderInfo(val); //DCEG: 196554876811 BCRP: 145995765326, Confluence: 137304373658
  // if (!array) {
  //   document.getElementById("submitID").classList.toggle('buttonsubmit--loading');
  //   alert("Error: Please input a valid folder ID and check that you have the necessary permissions to access it.");
  //   return false;
  // }

  // let template =
  //   '<div class="card-body data-governance"><ul class="ul-list-style first-list-item collapsible-items p-0 m-0">';
  // const ID = array.id;
  // const consortiaName = array.name;
  // let type = array.type;
  // let liClass = type === "folder" ? "collapsible consortia-folder" : "";
  // let title = type === "folder" ? "Expand / Collapse" : "";
  // template += `<li class="collapsible-items">
  //           <button class="${liClass}" data-toggle="collapse" href="#toggle${ID}">
  //               <i title="${title}" data-type="${type}" data-id="${ID}" data-folder-name="${consortiaName}" data-status="pending" class="lazy-loading-spinner"></i>
  //           </button> ${consortiaName}
  //       </li>
  //       `;
  // template += `</ul></div></div>`;
  // document.getElementById("folderInput").innerHTML = template;
  // dataGovernanceLazyLoad();
  // dataGovernanceCollaboration();
  // document.getElementById("submitID").classList.toggle('buttonsubmit--loading');
  return false;
}