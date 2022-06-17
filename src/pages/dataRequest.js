// import { createFileTask, assignTask, updateTaskAssignment } from '../shared.js';
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
  uploadFile,
  uploadWordFile,
  getFolderItems,
  uploadWordFileVersion,
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
  addNewCollaborator
} from '../shared.js';
import {
  addEventToggleCollapsePanelBtn
} from './description.js';
import {
  showPreview
} from '../components/boxPreview.js';
import {
  pageNavBar
} from '../components/navBarMenuItems.js';
import {
  renderFilePreviewDropdown
} from '../components/elements.js';
import {
  switchTabs
} from '../event.js';
import { template } from './dataGovernance.js';

export const dataAccessNotSignedIn = () => {
  let template = `
      <div class="general-bg padding-bottom-1rem">
          <div class="container body-min-height">
              <div class="main-summary-row">
                  <div class="align-left">
                      <h1 class="page-header">Data Access</h1>
                  </div>
              </div>
              <div class="data-submission div-border font-size-18" style="padding-left: 1rem;">
                  <div class="row m-0">
                      The Breast Cancer Risk Prediction Project is currently generating genotyping data and harmonizing risk factor and clinical data. Data is expected to be available for request in late 2022. Data access will be facilitated through this platform, in accordance to the data transfer agreements signed between participating studies (originator) and the BCRPP Data Coordinating Center (DCC) at the Division of Cancer Epidemiology and Genetics at the National Cancer Institute.
                  </div></br>
                  <div class="row m-0">
                      The following data access procedures are planned:
                  </div>
                  <div class="row m-0">
                      <ul>
                          <li>Researcher submits a study concept describing the project, including variables of interest, via the BCRPP Data Platform. This request will be sent via the platform to the relevant BCRPP data access coordinating committee (DACC) which governs the requested data.</li>
                          <li>After approval by the DACC, individual studies contributing data are notified and given a time period to opt-out their study from the approved project.</li>
                          <li>After the opt-out period has elapsed, the researcher's institution signs a data transfer agreement (DTA) for the study concept with the BCRPP DCC.</li>
                          <li>Upon DTA signatures, the DCC will provide access of the approved data to researchers. </li>
                      </ul>
                  </div>
                </div>
            </div>
        </div>
      `;

  return template;
}

export const dataAccess = (activeTab, showDescripton) => {

  let authChair = emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc = emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = '';
  if (authDacc && authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', 'DACC Menu');
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted','Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form' ,'Accepted');
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
                <div class="main-summary-row">
                    <div class="align-left">
                        <h1 class="page-header">Data Access</h1>
                    </div>
                </div>
                <div class="data-submission div-border font-size-18" style="padding-left: 1rem;">
                    <div class="row m-0">

                        The Breast Cancer Risk Prediction Project is currently harmonizing risk factor and clinical data from participating cohorts. Data is expected to be available for request in late 2022. Data access will be facilitated through this platform, in accordance to the data transfer agreements signed between participating studies (originator) and the BCRPP Data Coordinating Center (DCC) at the Division of Cancer Epidemiology and Genetics at the National Cancer Institute.

                    </div></br>
                    <div class="row m-0">
                        The following data access procedures are planned:
                    </div>
                    <div class="row m-0">
                        <ul>
                            <li>Researcher submits a study concept describing the project, including variables of interest, via the BCRPP Data Platform. This request will be sent via the platform to the BCRPP data access coordinating committee (DACC), which governs the requested data.</li>
                            <li>After approval by the DACC, individual studies contributing data are notified and given a time period to opt-out their study from the approved project.</li>
                            <li>After the opt-out period has elapsed, the researcher's institution signs a data transfer agreement (DTA) for the study concept with the BCRPP DCC.</li>
                            <li>Upon DTA signatures, the DCC will provide access of the approved data to researchers.</li>
                        </ul>
                    </div> `;
  template += `</div>
              </div>
            </div>
            `;

  return template
}

export const formSection = (activeTab, showDescripton) => {
  let authChair = emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc = emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = '';
  if (authDacc && authChair) {

    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', "DACC Menu");
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
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

                              <div class="main-summary-row">
                                  <div class="align-left">
                                      <h1 class="page-header">Form Submission</h1>
                                  </div>
                              </div>
                          <div class="data-submission div-border font-size-18" style="padding-left: 1rem;">             
                            <section class="contact-form">
                              <p>Please fill out the form below in order to get approval for access to data.</p>
                              <form>
                              <div class="input-group">
                                <label for="name"><b>Investigator(s)</b></label>
                                <input id="name" name="name" type="text"/>
                              </div>
                              
                              <div class="input-group">
                                <label for="email"><b>Contact Email</b></label>
                                <input id="email" name="email" type="email"/>
                              </div>

                              <div class="input-group">
                                <label for="keywords"><b>Keywords</b></label>
                                <input id="keywords" name="keywords" type="text"/>
                              </div>

                              <div class="input-group">
                                <label for="project"><b>Title of Proposed Project</b></label>
                                <input id="project" name="project" type="text"/>
                              </div>

                              <div class="input-group">
                                  <label for="amendment"> <b>Is this an amendment?</b> </label>

                                  <input id="amendmentyes" name="amendment" type="radio" value="Yes"/>
                                  <label class="inline" for="amendmentyes">Yes</label>
                              
                                  <input id="amendmentno" name="amendment" type="radio" value="No"/>
                                  <label class="inline" for="amendmentno">No</label>
                              </div>
                              
                              <div class="input-group">
                                <label for="institution"><b>Institution</b></label>
                                <input id="institution" name="institution" type="text"/>
                              </div>

                              <!---<div class="input-group">
                                <label for="dataplatform"><b>Data Platform</b></label>
                                <select id="dataplatform" name="dataplatform">
                                  <option>BCRPP</option>
                                  <option>Confluence</option>
                                </select>
                              </div>--->

                              <div class="input-group">
                                  <label for="cohort"><b>Cohort Data Requested: </b></label>
                                  <input id="nhs" name="cohort" type="checkbox" value="NHS"/>
                                  <label class="inline" for="cohort-nhs">NHS</label>
                                  <input id="nhs2" name="cohort" type="checkbox" value="NHS2"/>
                                  <label class="inline" for="cohort-nhs2">NHS2</label>
                                  <input id="cps2" name="cohort" type="checkbox" value="CPS2"/>
                                  <label class="inline" for="cohort-cps2">CPS2</label>
                                  <input id="cps3" name="cohort" type="checkbox" value="CPS3"/>
                                  <label class="inline" for="cohort-cps3">CPS3</label>
                              </div>
                              
                              <div class="input-group">
                                <label for="background"><b>Please provide a concise description of Background/Aims</b></label>
                                <textarea id="background" name="background" rows="4" cols="65"></textarea>
                              </div>

                              <div class="input-group">
                                <label for="additional"><b>Please provide any additional information</b></label>
                                <textarea id="additional" name="additional" rows="4" cols="65"></textarea>
                              </div>

                              <div class="input-group">
                                <label for="confirmation"><b>Have ALL named investigators have read AND agree to be named on this proposal?</b></label>
                                <select id="confirmation" name="confirmation">
                                  <option>No</option>
                                  <option>Yes</option>
                                </select>
                              </div>
                              
                              <button type="submit" id="submitFormButton" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                                <span class="buttonsubmit__text"> Send Form </span>
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
                          <div class="results">
                          <h2>Form Data</h2>
                          <pre></pre>
                          </div>
                        </div>
                      </div>
                    </div>`;
  return template;
}

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
                          </div>`

  return template
}

export const acceptedStudiesSection = (activeTab) => {
  let authChair = emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc = emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = '';
  if (authDacc && authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', "DACC Menu");
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
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

  return template
}

export const acceptedStudiesView = async () => {
  let template = `
    <div class="main-summary-row">
            <div class="row align-left w-100 m-0">
                <h1 class="col page-header pl-0 pt-2">Learn about BCRPP</h1>
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

        document.getElementById('acceptedStudiesView').innerHTML = template;

}

export const chairSection = (activeTab) => {
  let authChair = emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc = emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = '';
  if (authDacc && authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', "DACC Menu");
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
  }
  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
          
      </div>
      `;
  template += `
    <div id="chairFileView" class="align-left"></div>
  </div>
  `;

  return template
}

export const chairFileView = async () => {

      const responseUpload = await getFolderItems(uploadFormFolder);
      let filearrayUpload = responseUpload.entries;
      //console.log(filearrayUpload);

      const responseDACC = await getFolderItems(daccReviewFolder);
      let filearrayDACC = responseDACC.entries;
      //console.log(filearrayDACC)

      const responseChair = await getFolderItems(chairReviewFolder);
      let filearrayChair = responseChair.entries;
      //console.log(filearrayChair);

      // const responseFinal = await getFolderItems(finalFolder);
      // let filearrayFinal = responseFinal.entries;
      // console.log(filearrayFinal);

      const responseAccepted = await getFolderItems(acceptedFolder);
      let filearrayAccepted = responseAccepted.entries;
      //console.log(filearrayAccepted);

      const responseDenied = await getFolderItems(deniedFolder);
      let filearrayDenied = responseDenied.entries;
      //console.log(filearrayDenied);

  var template = `
    <div class="general-bg padding-bottom-1rem">
      <div class="container body-min-height">
        <div class="main-summary-row">
            <div class="align-left">
                <h1 class="page-header">Chair Access Only</h1>
            </div>
        </div>

  
    <div class="data-submission div-border font-size-18" style="padding-left: 1rem;">
    <ul class='nav nav-tabs mb-3' role='tablist'>
      <li class='nav-item' role='presentation'>
        <a class='nav-link active' id='toBeCompletedTab' href='#toBeCompleted' data-mdb-toggle="tab" role='tab' aria-controls='toBeCompleted' aria-selected='true'> To Be Completed </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='inProgressTab' href='#inProgress' data-mdb-toggle="tab" role='tab' aria-controls='inProgress' aria-selected='true'> In Progress </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='daccCompletedTab' href='#daccCompleted' data-mdb-toggle="tab" role='tab' aria-controls='daccCompleted' aria-selected='true'> DACC Completed </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='acceptedTab' href='#accepted' data-mdb-toggle="tab" role='tab' aria-controls='accepted' aria-selected='true'> Accepted </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='deniedTab' href='#denied' data-mdb-toggle="tab" role='tab' aria-controls='denied' aria-selected='true'> Denied </a>
      </li>
    </ul>`;

    const filesincomplete = [];
    const filesinprogress = [];
    const filescompleted = [];
    const filesaccepted = [];
    const filesdenied = [];
    for (let obj of filearrayUpload) {
      //let id = obj.id;
      filesincomplete.push(obj);
    };

    for (let obj of filearrayDACC) {
      filesinprogress.push(obj);
    }

    for (let obj of filearrayChair) {
      filescompleted.push(obj);
    }

    for (let obj of filearrayAccepted) {
      filesaccepted.push(obj);
    }

    for (let obj of filearrayDenied) {
      filesdenied.push(obj);
    }

  template += "<div class='tab-content' id='selectedTab'>";

  template += `<div class='tab-pane fade show active' 
                  id='toBeCompleted' role='tabpanel' 
                  aria-labeledby='toBeCompletedTab'> `
  template += renderFilePreviewDropdown(filesincomplete, 'toBeCompleted');

  template += `<div class='tab-pane fade'
                 id='inProgress' role='tabpanel'
                 aria-labeledby='inProgressTab'> `
  template += renderFilePreviewDropdown(filesinprogress, 'inProgress');

  template += `<div class='tab-pane fade'
                id='daccCompleted' role='tabpanel'
                aria-labelledby='daccCompletedTab'>`
  template += renderFilePreviewDropdown(filescompleted, 'daccCompleted');

  template += `<div class='tab-pane fade' 
                id='accepted' role='tabpanel'
                aria-labelledby='acceptedTab'>`
  template += renderFilePreviewDropdown(filesaccepted, 'accepted');

  template += `<div class='tab-pane fade' 
            id='denied' role='tabpanel'
            aria-labelledby='deniedTab'>`
  template += renderFilePreviewDropdown(filesdenied, 'denied');

  template += `<div id='filePreview'>`
  if (filescompleted.length !== 0 || filesinprogress.length !== 0 ||
      filesincomplete.length !== 0 || filesaccepted.length !== 0 || filesdenied.length !== 0) {
      template += `
        <div class='row'>
          <div id='boxFilePreview' class="col-8 preview-container"></div>
          <div id='fileComments' class='col-4 mt-2'></div>
        </div>

        <div class='row card-body dacc-submit'>
          <div id='sendtodaccButton' class="col-6">
            <form>
              <label for"message">Send to DACC</label>
              <div class="input-group">
                <textarea id="message" name="message" rows="6" cols="50"></textarea>
              </div>
              <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                <span class="buttonsubmit__text"> Send </span> </button>
            </form>
          </div>
        </div>

        <div id='finalChairDecision' class="card-body approvedeny" style="padding-left: 10px;background-color:#f6f6f6; display:none">
          <form>
            <label for="message">Enter Message for Submitter</label>
            <div class="input-group">
                <textarea id="message" name="message" rows="6" cols="65"></textarea>
            </div>
            <button type="submit" class="buttonsubmit" value="approved">
              <span class="buttonsubmit__text"> Approve </span></button>
            <button type="submit" class="buttonsubmit" value="rejected">
              <span class="buttonsubmit__text"> Deny </span></button>
            <button type="submit" class="buttonsubmit" value="daccReview">
              <span class="buttonsubmit__text"> Return to DACC </span></button>  
          </form>
        </div>
        `};
  template += `
      </div>
    </div>
    `
  //};

        document.getElementById('chairFileView').innerHTML = template;
        submitToDacc();
        commentApproveReject();
        if (filesincomplete.length != 0) {
          showPreview(filesincomplete[0].id);
          document.getElementById('boxFilePreview').classList.remove('col-8');
        }
        else {
          // if (typeof classList === 'undefined') {
          //   console.log('No files exist');
          // }
          // else {
            document.getElementById('filePreview').classList.remove('d-block');
            document.getElementById('filePreview').classList.add('d-none');
          //}
        }
        
        //Switch Tabs
        switchTabs('toBeCompleted', ['inProgress', 'daccCompleted', 'accepted', 'denied'], filesincomplete);
        switchTabs('inProgress', ['toBeCompleted', 'daccCompleted', 'accepted', 'denied'], filesinprogress);
        switchTabs('daccCompleted', ['inProgress', 'toBeCompleted', 'accepted', 'denied'], filescompleted);
        switchTabs('accepted', ['inProgress', 'daccCompleted', 'toBeCompleted', 'denied'], filesaccepted);
        switchTabs('denied', ['inProgress', 'daccCompleted', 'toBeCompleted', 'accepted'], filesdenied);
        
        
        hideAnimation();
      }

export const submitToDacc = () => {
  let submitDacc = async (e) => {
    const btn = document.activeElement;
    btn.disabled = true;
    e.preventDefault();
    let fileId = document.querySelector(".tab-content .active #toBeCompletedselectedDoc").value //document.getElementById('selectedDoc').value//e.submitter.value;
    let message = e.target[0].value;
    console.log(fileId);
    console.log(message);
    await createCompleteTask(fileId, message);
    let tasklist = await getTaskList(fileId);
    let tasktodacc = tasklist.entries[0].id;
    console.log(emailforDACC.length.toString());
    for (let i = 0, daccemaillength = emailforDACC.length; i < daccemaillength; i++) {
      await assignTask(tasktodacc, emailforDACC[i]);
      console.log("Task assigned to " + emailforDACC[i]);
    }
    await moveFile(fileId, daccReviewFolder);
    console.log('File moved to: ' + daccReviewFolder);
    document.location.reload(true);
  }
  const sdform = document.querySelector('.dacc-submit');
  if (sdform) {
    sdform.addEventListener('submit', submitDacc);
  }
}

export const commentApproveReject = () => {
  let approveComment = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;
    //let taskId = btn.name;
    let fileId = document.querySelector(".tab-content .active #daccCompletedselectedDoc").value //document.getElementById('selectedDoc').value;
    let tasklist = await getTaskList(fileId);
    //console.log(tasklist);
    let entries = tasklist.entries;
      if (entries.length !== 0) {
        for (let item of entries) {
          if (item.is_completed == false && item.action == 'review') {
            for (let taskassignment of item.task_assignment_collection.entries) {
              if (taskassignment.assigned_to.login == JSON.parse(localStorage.parms).login) {
                  var taskId = taskassignment.id;
                  //console.log(taskId);
              }
            }
          }
        }
      }
    let decision = e.submitter.value;
    let message = e.target[0].value;
    //console.log(approval);
    await updateTaskAssignment(taskId, decision, message);
    await createComment(fileId, message);
    let fileInfo = await getFileInfo(fileId);
    let uploaderName = fileInfo.created_by.login
    console.log(uploaderName);
    if (decision == 'approved') {
      await moveFile(fileId, acceptedFolder);
      console.log("File moved to approved folder");
    } else if (decision =='rejected') {
      await moveFile(fileId, deniedFolder);
      console.log("File moved to denied folder");
    } else if (decision =='daccReview') {
      await moveFile(fileId, daccReviewChairFolder);
      console.log('File moved to Dacc Review folder');
    }

    let folderItems = await getFolderItems(submitterFolder);
    //console.log(folderItems);
    let folderEntries = folderItems.entries;
    let folderID = 'none';
    console.log(folderEntries);
    for (let obj of folderEntries) {
      console.log(obj.name);
      if (obj.name == uploaderName) {
        folderID = obj.id
        console.log('Folder found: ' + folderID);
      }
    };
    console.log(folderID);
    let cpFileId = '';
    if (folderID == 'none') {
      console.log('No folder found');
      const newFolder = await createFolder(submitterFolder, uploaderName);
      //console.log(newFolder);
      console.log('New Folder created: ' + newFolder.id);
      await addNewCollaborator(newFolder.id, "folder", uploaderName, "viewer");
      const cpFile = await copyFile(fileId, newFolder.id);
      cpFileId = cpFile.id;
      console.log(cpFileId);
    } else {
      const cpFile = await copyFile(fileId, folderID);
      cpFileId = cpFile.id;
      //console.log(cpFileId);
      console.log('File copied to folder');
    };
    //console.log(cpFileId);
    await createComment(cpFileId, 'This file was ' + decision); 
    await createComment(cpFileId, message);
    // for(const comment of comments){
    //   const message = comment.message;
    //   // console.log(message);
    //   // console.log(cpFileId.id);
    //   await createComment(cpFileId, `DACC Member ${commentNum}: ${message}`);
    //   commentNum += 1;
    // }
    
    document.location.reload(true);
  }

  const form = document.querySelector('.approvedeny')
  if (form) {
    form.addEventListener('submit', approveComment)
  }
}

const viewFile = () => {
  var preview = new Box.Preview();
  preview.show(id, JSON.parse(localStorage.parms).access_token, {
    container: '.preview-container',
    showDownload: true
  });
}

const addEventPreviewFile = () => {
  const btns = Array.from(document.querySelectorAll('.preview-file'));
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const header = document.getElementById('confluencePreviewerModalHeader');
      const body = document.getElementById('confluencePreviewerModalBody');
      header.innerHTML = `<h5 class="modal-title">File preview</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>`;
      const fileId = btn.dataset.fileId;
      console.log(fileId);
      filePreviewer(fileId, '#confluencePreviewerModalBody');
    })
  })
}

export const filePreviewer = (fileId, divId) => {
  const access_token = JSON.parse(localStorage.parms).access_token;
  const preview = new Box.Preview();
  preview.show(fileId, access_token, {
    container: divId
  });
}

export const daccSection = (activeTab) => {
  let authChair = emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc = emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = '';
  if (authDacc && authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', "DACC Menu");
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
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

    return template
  }

export const daccFileView = async () => {

  const responseDACC = await getFolderItems(daccReviewFolder);
  let filearrayDACC = responseDACC.entries;
  //console.log(filearrayDACC)

  const responseChair = await getFolderItems(chairReviewFolder);
  let filearrayChair = responseChair.entries;
  //console.log(filearrayChair);

  // const responseFinal = await getFolderItems(finalFolder);
  // let filearrayFinal = responseFinal.entries;
  // console.log(filearrayFinal);

  const responseAccepted = await getFolderItems(acceptedFolder);
  let filearrayAccepted = responseAccepted.entries;
  //console.log(filearrayAccepted);

  const responseDenied = await getFolderItems(deniedFolder);
  let filearrayDenied = responseDenied.entries;
  //console.log(filearrayDenied);

  let template = `
            <div class="general-bg padding-bottom-1rem">
            <div class="container body-min-height">
            <div class="main-summary-row">
                <div class="align-left">
                    <h1 class="page-header">DACC Access Only</h1>
                </div>
            </div>
            <div class="data-submission div-border font-size-18" style="padding-left: 1rem;">
            <ul class='nav nav-tabs mb-3' role='tablist'>
            <li class='nav-item' role='presentation'>
              <a class='nav-link active' id='dacctoBeCompletedTab' href='#dacctoBeCompleted' data-mdb-toggle="tab" role='tab' aria-controls='dacctoBeCompleted' aria-selected='true'> To Be Completed </a>
            </li>
            <li class='nav-item' role='presentation'>
              <a class='nav-link' id='daccReviewTab' href='#daccReview' data-mdb-toggle="tab" role='tab' aria-controls='daccReview' aria-selected='true'>Review </a>
            </li>
            <li class='nav-item' role='presentation'>
                <a class='nav-link' id='completedTab' href='#completed' data-mdb-toggle="tab" role='tab' aria-controls='completed' aria-selected='true'>Completed</a>
            </li>


            </ul>`;

  const filesincomplete = [],
  filescompleted = [],
  filesreviewed = []
  ;
  for (let obj of filearrayDACC) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        if (items.is_completed == false && items.action == 'complete') {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (itemtasks.status == 'incomplete' && itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login) {
              filesincomplete.push(obj);
            } else if (itemtasks.status == 'complete' && itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login) {
              filescompleted.push(obj);
            }
          }
        } else if (items.is_completed == true && items.action == 'complete') {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login) {
              if (!filescompleted.includes(obj)) {
                filescompleted.push(obj);
              }
            }
          }
        }
      }
    }
  }

  for (let obj of filearrayChair) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        for (let itemtasks of items.task_assignment_collection.entries) {
          if (itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login) {
            if (!filescompleted.includes(obj)) {
              filescompleted.push(obj);
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
          if (itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login) {
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

    if (tasks.entries.length != 0){
      for (let items of tasks.entries) {
        for (let itemtasks of items.task_assignment_collection.entries) {
          if (itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login) {
            if (!filescompleted.includes(obj)) {
              filescompleted.push(obj);
            }
          }
        }
      }
    }
  }

  //console.log("incomplete: " + filesincomplete);
  //console.log("complete: " + filescompleted);

  template += "<div class='tab-content' id='selectedTab'>";

  template += `<div class='tab-pane fade show active'
                id='dacctoBeCompleted' role='tabpanel'
              aria-labeledby='dacctoBeCompletedTab'>`;
  template += renderFilePreviewDropdown(filesincomplete, 'dacctoBeCompleted');
  
  template += `<div class='tab-pane fade'
                id='daccReview' role='tabpanel'
                aria-labeledby='daccReviewTab'> `
  template += renderFilePreviewDropdown(filesreviewed, 'daccReview');

  template += `<div class='tab-pane fade'
                id='completed' role='tabpanel'
                aria-labeledby='completedTab'> `
  template += renderFilePreviewDropdown(filescompleted, 'completed');
  template += `<div id='filePreview'`;

  if (filescompleted.length != 0 || filesincomplete.length != 0) {
    template += ` 
      <div class='row'>
        <div id='boxFilePreview' class="col-8 preview-container"></div>
        <div id='fileComments' class='col-4 mt-2'></div>
      </div>

      <div id="daccComment" class="card-body dacc-comment" style="padding-left: 10px;background-color:#f6f6f6;">
          <form>
            <label for"message">Submit Comment</label>
            <div class="input-group">
              <textarea id="message" name="message" rows="6" cols="65"></textarea>
            </div>
            <button type="submit" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
              <span class="buttonsubmit__text"> Submit & Complete </span> </button>
          </form>
      </div>`
    }
    template += `
      </div>
    </div>
    </div>
    </div>`
  //}
  document.getElementById('daccFileView').innerHTML = template;
  if (filesincomplete.length != 0) {
    showPreview(filesincomplete[0].id);
    showComments(filesincomplete[0].id);
  } else {
    // if (typeof classList === 'undefined') {
    //   console.log('No files exist');
    // }
    // else {
      document.getElementById('filePreview').classList.remove('d-block');
      document.getElementById('filePreview').classList.add('d-none');
    //}
  };

  submitToComment();

  //Switch Tabs
  switchTabs('dacctoBeCompleted', ['completed', 'daccReview'], filesincomplete);
  switchTabs('completed', ['dacctoBeCompleted', 'daccReview'], filescompleted);
  switchTabs('daccReview', ['dacctoBeCompleted', 'completed'], filesreviewed);
  hideAnimation();
}

export const submitToComment = () => {
  let submitComment = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;
    //let taskId = btn.name;
    let fileId = document.querySelector(".tab-content .active #dacctoBeCompletedselectedDoc").value //document.getElementById('selectedDoc').value;
    let message = e.target[0].value;
    console.log(fileId);
    console.log(message);
    //let metaArray = await getMetadata(fileId);
    //let daccMetaValue = metaArray.entries["0"]["BCRPPdacc"];
    //let chairMetaValue = metaArray.entries["0"]["BCRPPchair"];
    await createComment(fileId, message);
    let tasklist = await getTaskList(fileId);
    let entries = tasklist.entries;
    if (entries.length !== 0) {
      for (let item of entries) {
        if (item.is_completed == false) {
          for (let taskassignment of item.task_assignment_collection.entries) {
            if (taskassignment.assigned_to.login == JSON.parse(localStorage.parms).login) {
              var taskId = taskassignment.id;
              console.log(taskId);
              await updateTaskAssignment(taskId, "completed");
              console.log('Task Updated as Completed')
            }
          }
        }
      }
    }
    //await updateTaskAssignment(taskId, "completed");
    //console.log(daccMetaValue);
    tasklist = await getTaskList(fileId);
    entries = tasklist.entries;
    var numCompletedTasks = 0
    if (entries.length !== 0) {
      for (let item of entries) {
        if (item.is_completed == true) {
          numCompletedTasks += 1;
        }
      }
      if (numCompletedTasks == entries.length) {
        await moveFile(fileId, chairReviewFolder);
        console.log('File moved to: ' + chairReviewFolder);
        await createFileTask(fileId);
        tasklist = await getTaskList(fileId);
        entries = tasklist.entries;
        console.log(entries);
        for (let item of entries) {
          if (item.is_completed == false) {
            await assignTask(item.id, emailforChair[0]);
            console.log("Chair Task Assigned");
          }
        }
      }
    };
    
    document.location.reload(true);
  }
  const dcform = document.querySelector('.dacc-comment');
  if (dcform) {
    dcform.addEventListener('submit', submitComment);
  }
}

export const dataApproval = () => {
  let approveDoc = async (e) => {
    e.preventDefault();

    let fileId = 931127106406;
    let decision = e.submitter.value;
    let message = e.target[0].value;

    let taskList = await getTaskList(fileId);
    console.log(taskList)
    let taskAssignment = taskList.entries[0].task_assignment_collection.entries[0];

    console.log(await updateTaskAssignment(taskAssignment.id, decision, message))
  }

  const form = document.querySelector('.data-approval')
  form.addEventListener('submit', approveDoc)
}

export const dataForm = async () => {
  let files = await getFolderItems(uploadFormFolder);
  const d = new Date();
  const filename = JSON.parse(localStorage.parms).login.split("@")[0] + "testing" + "_" + d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + ".docx";
  const filesinfoldernames = [];
  const filesinfolderids = [];
  for (let i = 0; i < files.entries.length; i++) {
    filesinfoldernames.push(files.entries[i].name);
    filesinfolderids.push(files.entries[i].id);
  }
  
  async function handleFormSubmit(eventtest) {
    const btn = document.activeElement;
    btn.disabled = true;
    eventtest.preventDefault();

    const data = new FormData(eventtest.target);

    const formJSON = Object.fromEntries(data.entries());

    const results = document.querySelector('.results pre');
    results.innerText = JSON.stringify(formJSON, null, 2);
    await generateWord(formJSON);
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = false;
  };

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
  };

  async function generateWord(jsondata) {
    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: [
          new docx.Paragraph({
            text: "BCRPP Data Access Submission",
            heading: docx.HeadingLevel.TITLE,
            alignment: docx.AlignmentType.CENTER
          }),
          new docx.Paragraph({
            text: "Investigator(s): ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: 500
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.name,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Keywords: ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: 500
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.keywords,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Contact Email: ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: 1440,
                  hanging: 980
                },
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.email,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Title of Proposed Project: ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: 1440,
                  hanging: 980
                },
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.project,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Is this an amendment? ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: 1440,
                  hanging: 980
                },
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.amendment,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Institution: ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: 1440,
                  hanging: 980
                },
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.institution,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Cohort Requested: ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: 1440,
                  hanging: 980
                },
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.cohort,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Background/Aims: ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: 1440,
                  hanging: 980
                },
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.background,
                bold: false,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Additional Information: ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: 1440,
                  hanging: 980
                },
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.additional,
                bold: false,
              }),
            ],
          }),
          new docx.Paragraph({
            text: "Agreement: ",
            heading: docx.HeadingLevel.HEADING_2
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: 1440,
                  hanging: 980
                },
              },
            },
            children: [
              new docx.TextRun({
                text: jsondata.confirmation,
                bold: true,
              }),
            ],
          }),
        ],
      }]
    });

    let files = await getFolderItems(uploadFormFolder);
    //console.log(files.entries)
    const filesinfoldernames = [];
    const filesinfolderids = [];
    for (let i = 0; i < files.entries.length; i++) {
      filesinfoldernames.push(files.entries[i].name);
      filesinfolderids.push(files.entries[i].id);
    }
    //console.log(filesinfoldernames);

    docx.Packer.toBlob(doc).then(blob => {
      console.log(blob);
      //saveAs(blob, "BCRPPexample.docx");
      console.log("Document created successfully");
      //let files = getFolderItems(uploadFormFolder);//149098174998);
      if (filesinfoldernames.includes(filename)) {
        console.log(filename + " Exists: Saving New Version");

        let fileidupdate = filesinfolderids[filesinfoldernames.indexOf(filename)];
        (async () => {
          // document.getElementById('modalBody').innerHTML = 'Would'
          let response = await uploadWordFileVersion(blob, fileidupdate);
          await assigntasktochair();
          document.getElementById('modalBody').innerHTML = `
          <p>File was successfully updated.</p>
          <p>Document ID: ${fileidupdate}</p>
          
          `;
          $('#popUpModal').modal('show');

        })();
      } else {
        console.log("Saving File to Box: " + filename + jsondata.keywords); // Adding keywords
        (async () => {
          let response = await uploadWordFile(blob, filename, uploadFormFolder);
          await assigntasktochair();
          let fileid = response.entries[0].id;
          //Modal code here
          document.getElementById('modalBody').innerHTML = `
          <p>File was successfully updated.</p>
          <p>Document ID: ${fileid}</p>`;
          $('#popUpModal').modal('show');
        })();
      }
    });
  }

  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', handleFormSubmit);
}

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
            `
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
            `
  };
  return (template);
}

const viewDACCCompletedFiles = async (files, taskids) => {
  let template = ``;
  var ival = 0;
  for (const id of files) {
    let fileinfo = await getFileInfo(id);
    let taskid = taskids[ival]
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
            `
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
            `
    ival += 1;
  };
  return (template);
}

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
            `
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
            `
    ival += 1;
  };
  return template;
}