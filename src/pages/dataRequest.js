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
  showCommentsDropDown
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
  switchTabs,
  switchFiles
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
              <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
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
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', 'DACC Menu');
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
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
                <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
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
export const formSectionOther = async (activeTab, showDescripton) => {
  let authChair = emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc = emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;

  let navBarItems = '';
  if (authDacc && authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', 'DACC Menu');
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
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
                                      <h1 class="page-header">Analysis Proposal Form</h1>
                                  </div>
                              </div>

                              <div class="main-summary-row confluence-resources white-bg div-border font-size-18">
                                <div class="col">
                                  <span>You currently do not have access to submit a data request form.</span></br>
                                  <span>For access, please contact <a href="mailto:thomas.ahearn@nih.gov">Thomas Ahearn</a></span>
                          </div>
                  </div>
                `
  return template;
}

export const formSection = async (activeTab, showDescripton) => {
  let authChair = emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc = emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;

  let navBarItems = '';
  if (authDacc && authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', 'DACC Menu');
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
  }
  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
          
      </div>
      `;
      const date = new Date();
      const today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  template += ` 
                  <div class="general-bg padding-bottom-1rem">
                          <div class="container body-min-height">

                              <div class="main-summary-row">
                                  <div class="align-left">
                                      <h1 class="page-header">Analysis Proposal Form</h1>
                                  </div>
                              </div>
                          <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">             
                            <section class="contact-form">
                              <p>Please fill out the form below. This will be reviewed by the BCRPP Data Access Coordination Committee (DACC) 
                              to ensure that proposal is consistent with BCRPP goals and individual cohorts’ consents. The DACC consists of 
                              representatives from the BCRPP Steering Committee and representatives of individual cohorts. Proposals will be reviewed 
                              once every four months. Data for approved concepts will be sent only to the Investigators listed below (field marked with an A), 
                              each of whose Institutions will need to sign the BCRPP DTA.</p>
                              <form>

                              <div class="input-group">
                              <label for="date"><b>Date</b></label>
                              <input id="date" name="date" type="date" value='${today}' required/>
                            </div>

                            <div class="input-group">
                              <label for="projname"><b>Title of Proposed Project</b></label>
                              <input id="projname" name="projname" type="text" required/>
                            </div>

                            <div class="input-group">
                                <label for="amendment"> <b>Is this an amendment?</b> </label>
                                    
                                    <input id="amendmentyes" name="amendment" type="radio" value="Yes" required/>
                                        <label class="inline" for="amendmentyes">Yes</label>
                                    <input id="amendmentno" name="amendment" type="radio" value="No" required/>
                                        <label class="inline" for="amendmentno">No</label>
                                <label for="ifamendmentyes"> If yes, provide Concept Number of original form </label>
                                    <input type="text" id="conNum" name="conNum"/>
                            </div>

                            <div class="input-group">
                            <label for="investigators"><b>Contact Investigator(s)</b></label>
                            <input id="investigators" name="investigators" type="text" required/>
                          </div>

                          <div class="input-group">
                              <label for="institution"><b>Institution(s)</b></label>
                              <input id="institution" name="institution" type="text" required/>
                            </div>
                              
                              <div class="input-group">
                                <label for="email"><b>Contact Email</b></label>
                                <input id="email" name="email" type="email" required/>
                              </div>

                            <div class="input-group">
                                <label for="member"> <b>Are you a member of BCRPP?</b> </label>
                                    
                                    <input id="memberyes" name="member" type="radio" value="Yes" required/>
                                        <label class="inline" for="memberyes"> Yes </label>
                                    <input id="memberno" name="member" type="radio" value="No" required/>
                                        <label class="inline" for="memberno"> No </label>
                            </div>

                            <div class="input-group">
                              <label for="acro"><b>BCRPP Study Acronym(s) for the Contact Investigator</b></label>
                              <textarea id="acro" name="acro" rows="2" cols="65" required></textarea>
                            </div>

                              <div class="input-group">
                                <label for="allinvest"><b>ALL Investigators (and their institutions) who will require access to the data requested</b></label>
                                <textarea id="allinvest" name="allinvest" rows="2" cols="65" required></textarea>
                            </div>

                            <div class="input-group">
                              <label><input id="confirmation" name="confirmation" type="checkbox" value="Yes" required/><b> Please confirm that ALL the named investigators have read AND agreed to be named on this proposal?</b></label>
                            </div>

                            <div class="input-group">
                              <label for="background"><b>Proposal Description</b> <i>Please provide a concise description of Background, Aims, and Analysis Plan (max. two pages).</i></label>
                              <textarea id="background" name="background" rows="4" cols="65" placeholder="Provide enough detail so contributing cohorts can assess whether Aims (i) align with participant consents and (ii) overlap with other cohort projects. Please list all planned analyses." required></textarea>
                            </div>

                            <br>

                            <p><u><b>Core Covariate, Mammography and Incident Breast Cancer Data Requested</b></u></p>
                            <div class="input-group">
                                <p>The <a href="#data_exploration/dictionary">BCRPP data dictionary</a> lists and describes variables requested from BCRPP, broken down into three domains (tabs on the data dictionary): 
                                CORE covariates and risk factors (currently available only at cohort baseline), MMD mammographic density, and BRCA incident breast cancer data.
                                Data availability and descriptive statistics can be explored via the <a href="#data_exploration/subset">Data menu </a> on the BCRPP portal. If data from a particular domain are requested,
                                all variables from that domain will be provided. Please list the variables to be included in analyses (along with a brief justification) in the following boxes.</p>
                            </div>
                           
                            <div class="input-group">
                                <label for="corevar"><b>Core Variables</b></label>
                                <textarea id="corevar" name="corevar" rows="2" cols="65"></textarea>
                            </div>

                            <div class="input-group">
                                <label for="mmdvar"><b>MMD Variables</b></label>
                                <textarea id="mmdvar" name="mmdvar" rows="2" cols="65"></textarea>
                            </div>

                            <div class="input-group">
                              <label for="brcavar"><b>BRCA Variables</b></label>
                              <textarea id="brcavar" name="brcavar" rows="2" cols="65"></textarea>
                            </div>

                            <div class="input-group">
                                <p>By default, data from all participating cohorts will be requested. If you wish to only select data from a subset of cohorts, 
                                please list them here with a justification for the restriction. Proposals only requesting data from a single cohort will not be approved. 
                                If you are interested in only analyzing data froma particular cohort, please contact that cohort directly.</p>
                            </div>

                            <div class="input-group">
                              <label for="reqcoh"><b>Requested Cohorts</b></label>
                              <textarea id="reqcoh" name="reqcoh" rows="2" cols="65"></textarea>
                            </div>

                            <br>
                            <p><u><b>Timeline</b></u></p>
                              <div class="input-group">
                                <label for="timeline">Please indicate estimated time from receipt of data to completion of analysesand submission of paper; 
                                the expectation (per the BCRPP Recipient DTA) is that results will be published within one year after completion</label>
                                <textarea id="timeline" name="timeline" rows="4" cols="65" required></textarea>
                              </div>

                            <br>
                            <p><u><b>Authorship</b></u></p>
                              <div class="input-group">
                                <label for="authorship">Please confirm that you acknowledge the intention to include representatives of the 
                                contributing cohorts as co-authors and that you will provide contributing cohorts 30 days to review the draft manuscript 
                                before submission (per section 3.4 of the BCRPP Recipient DTA). Please include any special considerations you would like to bring to the DACC’s attention.</label>
                                <textarea id="authorship" name="authorship" rows="4" cols="65" required></textarea>
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
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', 'DACC Menu');
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
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
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', 'DACC Menu');
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
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

  const responseDACCChairReview = await getFolderItems(daccReviewChairFolder);
  let filearrayDACCChairReview = responseDACCChairReview.entries;

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

  
    <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
    <ul class='nav nav-tabs mb-3' role='tablist'>
      <li class='nav-item' role='presentation'>
        <a class='nav-link active' id='toBeCompletedTab' href='#toBeCompleted' data-mdb-toggle="tab" role='tab' aria-controls='toBeCompleted' aria-selected='true'> New Submissions </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='inProgressTab' href='#inProgress' data-mdb-toggle="tab" role='tab' aria-controls='inProgress' aria-selected='true'> Under Review </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='daccCompletedTab' href='#daccCompleted' data-mdb-toggle="tab" role='tab' aria-controls='daccCompleted' aria-selected='true'> Review Completed </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='decidedTab' href='#decided' data-mdb-toggle="tab" role='tab' aria-controls='decided' aria-selected='true'> Accepted/Denied </a>
      </li>
      <!--li class='nav-item' role='presentation'>
         <a class='nav-link' id='deniedTab' href='#denied' data-mdb-toggle="tab" role='tab' aria-controls='denied' aria-selected='true'> Denied </a>
      </li-->
    </ul>`;

  const filesincomplete = [];
  const filesinprogress = [];
  const filescompleted = [];
  const filesdecided = [];
  // const filesaccepted = [];
  // const filesdenied = [];
  for (let obj of filearrayUpload) {
    //let id = obj.id;
    filesincomplete.push(obj);
  };

  for (let obj of filearrayDACC) {
    filesinprogress.push(obj);
  }

  for (let obj of filearrayDACCChairReview) {
    filesinprogress.push(obj);
  }

  for (let obj of filearrayChair) {
    filescompleted.push(obj);
  }


  for (let obj of filearrayAccepted) {
    filesdecided.push(obj);
  }

  for (let obj of filearrayDenied) {
    filesdecided.push(obj);
  }
  console.log(filesincomplete[0]);
  template += "<div class='tab-content' id='selectedTab'>";

  template += `<div class='tab-pane fade show active' 
                  id='toBeCompleted' role='tabpanel' 
                  aria-labeledby='toBeCompletedTab'> `
  template += renderFilePreviewDropdown(filesincomplete, 'toBeCompleted');

  template += `<div class='tab-pane fade'
                 id='inProgress' role='tabpanel'
                 aria-labeledby='inProgressTab'>`
  template += renderFilePreviewDropdown(filesinprogress, 'inProgress');
 
  template += `<div class='tab-pane fade'
                id='daccCompleted' role='tabpanel'
                aria-labelledby='daccCompletedTab'>
               <a href="mailto:${emailforDACC.join("; ")}" id='email' class='btn btn-dark'>Send Email to DACC</a>`
  template += renderFilePreviewDropdown(filescompleted, 'daccCompleted');

  template += `<div class='tab-pane fade' 
                id='decided' role='tabpanel'
                aria-labelledby='decidedTab'>
                
                </div>`
  // template += renderFilePreviewDropdown(filesdecided, 'decided');
  // template += viewFinalDecisionFiles(filesdecided);
  // template += `<div class='tab-pane fade' 
  //           id='denied' role='tabpanel'
  //           aria-labelledby='deniedTab'>`
  // template += renderFilePreviewDropdown(filesdenied, 'denied');

  template += `<div id='filePreview'>`
  if (filescompleted.length !== 0 || filesinprogress.length !== 0 ||
    filesincomplete.length !== 0 || filesdecided !== 0) {
    template += `
        <div class='row'>
          <div id='boxFilePreview' class="col-8 preview-container"></div>
          <div id='fileComments' class='col-4 mt-2'></div>
        </div>

        <div class='row card-body dacc-submit' id='sendtodaccButton' class="col-8" style="background-color:#f6f6f6; display:block">
            <form>
              <label for"message">Send to DACC</label>
              <div class="input-group">
                <textarea id="message" name="message" rows="6" cols="50"></textarea>
              </div>
              <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                <span class="buttonsubmit__text"> Send </span> </button>
            </form>
        </div>

        <div class='row card-body dacc-override' id='daccOverride' class="col-6" style='display:none'>
          <form>
              <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                <span class="buttonsubmit__text"> Override DACC </span> 
              </button>
              <div class='text-muted small'>Select to move form to Review Completed </div>
          </form>
        </div>

        <div id='finalChairDecision' class="card-body approvedeny" style="background-color:#f6f6f6; display:none">
          <form>
            <label for="message">Enter Message for Submitter</label>
            <div class='text-muted small'>Submitter will only see the below comment after approve or deny. </div>
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
        `
  };
  template += `
      </div>
    </div>
    `
  //};

  document.getElementById('chairFileView').innerHTML = template;
  viewFinalDecisionFiles(filesdecided);
  submitToDacc();
  daccOverride();
  commentApproveReject();
  if (filesincomplete.length != 0) {
    switchFiles('toBeCompleted');
    showPreview(filesincomplete[0].id);
    document.getElementById('toBeCompletedselectedDoc').children[0].selected = true;
    document.getElementById('boxFilePreview').classList.remove('col-8');
  } else {
    // if (typeof classList === 'undefined') {
    //   console.log('No files exist');
    // }
    // else {
    document.getElementById('filePreview').classList.remove('d-block');
    document.getElementById('filePreview').classList.add('d-none');
    //}
  }

  if(filescompleted.length == 0) {
    document.getElementById('email').style.display = 'none';
  }

  //Switch Tabs
  switchTabs('toBeCompleted', ['inProgress', 'daccCompleted', 'decided'], filesincomplete);
  switchTabs('inProgress', ['toBeCompleted', 'daccCompleted', 'decided'], filesinprogress);
  switchTabs('daccCompleted', ['inProgress', 'toBeCompleted', 'decided'], filescompleted);
  switchTabs('decided', ['inProgress', 'daccCompleted', 'toBeCompleted'], filesdecided);
  // switchTabs('accepted', ['inProgress', 'daccCompleted', 'toBeCompleted', 'denied'], filesaccepted);
  // switchTabs('denied', ['inProgress', 'daccCompleted', 'toBeCompleted', 'accepted'], filesdenied);

  //Accepted/Deny listeners
  
  hideAnimation();
}

export const submitToDacc = () => {
  let submitDacc = async (e) => {
    const btn = document.activeElement;
    btn.disabled = true;
    e.preventDefault();
    let message = e.target[0].value;
    console.log(message);

    //Send multiple files
    const filesToSend = [];
    const elements = document.querySelectorAll(".tab-content .active #toBeCompletedselectedDoc option");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected) {
        filesToSend.push(elements[i].value)
      }

    }
    console.log('Files selected on submit', filesToSend);
    for (const fileId of filesToSend) {
      await createCompleteTask(fileId, message);
      let tasklist = await getTaskList(fileId);
      let tasktodacc = tasklist.entries[0].id;
      console.log(emailforDACC.length.toString());
      for (let i = 0, daccemaillength = emailforDACC.length; i < daccemaillength; i++) {
        await assignTask(tasktodacc, emailforDACC[i]);
        console.log("Task assigned to " + emailforDACC[i]);
      }
      await createComment(fileId, message);
      await moveFile(fileId, daccReviewFolder);
      console.log('File moved to: ' + daccReviewFolder);
    }
    document.location.reload(true);
  }
  const sdform = document.querySelector('.dacc-submit');
  if (sdform) {
    sdform.addEventListener('submit', submitDacc);
  }
}

export const daccOverride = () => {
  let override = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;

    const filesToSend = [];
    const elements = document.querySelectorAll(".tab-content .active #inProgressselectedDoc option");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected) {
        filesToSend.push(elements[i].value)
      }

    }
    console.log('Files selected on submit', filesToSend);
    for (const fileId of filesToSend) {
      let tasklist = await getTaskList(fileId);
      //console.log(tasklist);
      let entries = tasklist.entries;

      if (entries.length !== 0) {
        for (let item of entries) {
          if (item.is_completed == false && item.action == 'complete') {
            for (let taskassignment of item.task_assignment_collection.entries) {
              updateTaskAssignment(taskassignment.id, 'completed')
            }

          }
        }
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
    }
    document.location.reload(true);
  }
  const overrideform = document.querySelector('.dacc-override');
  if (overrideform) {
    overrideform.addEventListener('submit', override);
  }
}

export const commentApproveReject = () => {
  let approveComment = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;
    //let taskId = btn.name;
    // let fileId = document.querySelector(".tab-content .active #daccCompletedselectedDoc").value //document.getElementById('selectedDoc').value;
    //Send multiple files
    const filesToSend = [];
    const elements = document.querySelectorAll(".tab-content .active #daccCompletedselectedDoc option");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected) {
        filesToSend.push(elements[i].value)
      }

    }
    console.log('Files selected on submit', filesToSend);
    for (const fileId of filesToSend) {
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

      if (decision !== 'daccReview') {
        await updateTaskAssignment(taskId, decision, message);
      }
      await createComment(fileId, message);
      let fileInfo = await getFileInfo(fileId);
      let uploaderName = fileInfo.created_by.login
      console.log(uploaderName);
      if (decision == 'approved') {
        await moveFile(fileId, acceptedFolder);
        console.log("File moved to approved folder");
      } else if (decision == 'rejected') {
        await moveFile(fileId, deniedFolder);
        console.log("File moved to denied folder");
      } else if (decision == 'daccReview') {
        // Delete review task assigned to chair
        let tasklist = await getTaskList(fileId);
        const taskEntries = tasklist.entries;

        console.log(taskEntries);
        if (taskEntries.length !== 0) {
          for (let entry of entries) {
            if (entry.action === 'review') {
              console.log(entry);
              if (entry.is_completed == false) {
                // for (let taskassignment of entry.task_assignment_collection.entries) {
                //   if (taskassignment.resolution_state === 'incomplete') {
                //     if (taskassignment.assigned_to.login === JSON.parse(localStorage.parms).login) {
                //       var taskId = taskassignment.id;
                console.log(entry.id);
                await deleteTask(entry.id);
              }
              //   }
              // }
              // }
            }
          }
        }

        //Create complete tasks for DACC
        await createCompleteTask(fileId, message);
        tasklist = await getTaskList(fileId);
        let tasktodacc;
        for (const entry of tasklist.entries) {
          if (entry.is_completed == false) {
            if (entry.action === 'complete') {
              tasktodacc = entry.id;
            }
          }
        }
        console.log('Tasks for DACC', tasklist.entries);
        console.log(emailforDACC.length.toString());
        for (let i = 0, daccemaillength = emailforDACC.length; i < daccemaillength; i++) {
          await assignTask(tasktodacc, emailforDACC[i]);
          console.log("Task assigned to " + emailforDACC[i]);
        }

        //Move file to DACC Review (Resubmit) folder
        await moveFile(fileId, daccReviewChairFolder);
        console.log('File moved to Dacc Review folder');


      }

      if (decision != 'daccReview') {

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
      }
    }
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
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu', 'DACC Menu');
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
    // navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Accepted');
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

  const responseDACCChairReview = await getFolderItems(daccReviewChairFolder);
  let filearrayDACCChairReview = responseDACCChairReview.entries;

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
            <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
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
    filesreviewed = [];
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

  for (const obj of filearrayDACCChairReview) {
    filesreviewed.push(obj);
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
  template += `<div id='filePreview'>`;

  if (filescompleted.length != 0 || filesincomplete.length != 0 || filesreviewed.length != 0) {
    template += ` 
      <div class='row'>
        <div id='boxFilePreview' class="col-8 preview-container"></div>
        <div id='fileComments' class='col-4 mt-2'></div>
      </div>

      <div id="daccComment" class="card-body dacc-comment" style="padding-left: 10px;background-color:#f6f6f6;">
      <form>  
        <label for="grade">Select recommendation: </label>
          <select name="grade" id="grade"></option>
            <option value = "1"> 1 - Approved as submitted</option>
            <option value = "2"> 2 - Approved, pending conditions/clarification of some issues </option>
            <option value = "3"> 3 - Approved, but data release will be delayed </option>
            <option value = "4"> 4 - Not approved </option>
            <option value = "6"> 6 - Decision pending clarification of several issues</option>
            <option value = "777"> 777 - Duplicate Proposal</option>
            </select>
          <br>
            <label for"message">Submit Comment:</label>
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
    </div>`
  //}
  document.getElementById('daccFileView').innerHTML = template;
  if (filesincomplete.length != 0) {
    switchFiles('dacctoBeCompleted');
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
    let fileId = (document.querySelector(".tab-content .active #dacctoBeCompletedselectedDoc") !== null) ? document.getElementById('dacctoBeCompletedselectedDoc').value : document.getElementById('daccReviewselectedDoc').value //document.getElementById('selectedDoc').value;
    let grade = e.target[0].value;
    let comment = e.target[1].value;
    console.log(grade);
    console.log(fileId);
    let message = "Rating: " + grade + "\nComment: " + comment;
    console.log(message);
    //let metaArray = await getMetadata(fileId);
    //let daccMetaValue = metaArray.entries["0"]["BCRPPdacc"];
    //let chairMetaValue = metaArray.entries["0"]["BCRPPchair"];
    await createComment(fileId, message);
    let tasklist = await getTaskList(fileId);
    let entries = tasklist.entries;
    console.log('Dacc tasklist', entries);
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
  let filename = JSON.parse(localStorage.parms).login.split("@")[0] + "_" + d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + ".docx";
  
  // Find unique name
  let entries = files.entries;
  let i = 1;
  while(entries.includes(filename)){
    console.log('Chaning file name')
    let indexOfExtension = filename.indexOf('.');
    filename = filename.substring(0, indexOfExtension) + `(${i})` + filename.substring(indexOfExtension);
    console.log('File name changed', filename);
    i++;

  }
  
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
    console.log('generatewordcomplete');
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
      styles: {
        default: {
          heading1: {
            run: {
              size: 26,
              bold: true,
              color: "#000000",
            },
          },
          heading2: {
            run: {
              size: 22,
              bold: true,
              color: "#000000",
            },
          },
        },
      },
      sections: [{
        properties: {},
        headers: {
          default: new docx.Header({
            children: [new docx.Paragraph({
              text: "Breast Cancer Risk Prediction Project Analysis Proposal",
              heading: docx.HeadingLevel.HEADING_1,
              alignment: docx.AlignmentType.CENTER,
            }),
          ],
          }),
        },
        children: [
          // new docx.Paragraph({
          //   text: "Breast Cancer Risk Prediction Project Analysis Proposal",
          //   heading: docx.HeadingLevel.HEADING_1,
          //   alignment: docx.AlignmentType.CENTER
          // }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Date: "}), new docx.TextRun({text: jsondata.date, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Project Title: "}), new docx.TextRun({text: jsondata.projname, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Is this an amendment: "}), new docx.TextRun({text: jsondata.amendment, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Amendment: "}), new docx.TextRun({text: jsondata.conNum, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Contact Investigator(s): "}), new docx.TextRun({text: jsondata.investigators, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Institution(s): "}), new docx.TextRun({text: jsondata.institution, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Contact Email: "}), new docx.TextRun({text: jsondata.email, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Are you a member of BCRPP "}), new docx.TextRun({text: jsondata.member, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "BCRPP Study Acronym(s) for the Contact Investigator: "}), new docx.TextRun({text: jsondata.acro, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "All Investigators (and Institutions) who require access: "}), new docx.TextRun({text: jsondata.investigators, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Proposal Description: "}), new docx.TextRun({text: jsondata.background, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Core Variables: "}), new docx.TextRun({text: jsondata.corevar, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "MMD Variables: "}), new docx.TextRun({text: jsondata.mmdvar, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "BRCA Variables: "}), new docx.TextRun({text: jsondata.brcavar, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Requested Cohorts: "}), new docx.TextRun({text: jsondata.reqcoh, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Timeline: "}), new docx.TextRun({text: jsondata.timeline, bold: false})],
            spacing: {after: 150},
          }),
          new docx.Paragraph({
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.START,
            children: [new docx.TextRun({text: "Authorship: "}), new docx.TextRun({text: jsondata.authorship, bold: false})],
            spacing: {after: 150},
          }),
          // new docx.Paragraph({
          //   text: "Project Title: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: 500
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.projname,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Is this an amendment: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.amendment,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Contact Investigator(s): ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.investigators,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Institution(s): ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.amendment,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Contact Email: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.email,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Are you a member of BCRPP: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.member,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "BCRPP Study Acronym(s) for the Contact Investigator: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.acro,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "ALL Investigators (and their institutions) who will require access: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.allinvest,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Proposal Description: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.background,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Core Variables: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.corevar,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "MMD Variables: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.mmdvar,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "BRCA Variables: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.brcavar,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Requested Cohorts: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.reqcoh,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Timeline: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.timeline,
          //       bold: false,
          //     }),
          //   ],
          // }),
          // new docx.Paragraph({
          //   text: "Authorship: ",
          //   heading: docx.HeadingLevel.HEADING_2
          // }),
          // new docx.Paragraph({
          //   alignment: docx.AlignmentType.START,
          //   style: {
          //     paragraph: {
          //       indent: {
          //         left: 1440,
          //         hanging: 980
          //       },
          //     },
          //   },
          //   children: [
          //     new docx.TextRun({
          //       text: jsondata.authorship,
          //       bold: false,
          //     }),
          //   ],
          // }),
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

    await docx.Packer.toBlob(doc).then(async blob => {
      console.log(blob);
      //saveAs(blob, "BCRPPexample.docx");
      console.log("Document created successfully");
      //let files = getFolderItems(uploadFormFolder);//149098174998);
      if (filesinfoldernames.includes(filename)) {
        console.log(filename + " Exists: Saving New Version");
        const [name, extension] = filename.split('.');
        let i = 1;
        console.log(name);
        
        while(filesinfoldernames.includes(filename)){

          if(filename.includes(')')){

            const [name, version] = filename.split('(');
            filename = name + `(${i})` + version.substring(2,);
          }
          else {
          filename = name + `(${i}).` + extension;
          }
          console.log('New name', filename);
          i++; 
        }
          let response = await uploadWordFile(blob, filename, uploadFormFolder);
          await assigntasktochair();
          let fileid = response.entries[0].id;
          //Modal code here
          document.getElementById('modalBody').innerHTML = `
          <p>File was successfully uploaded.</p>
          <p>Document ID: ${fileid}</p>`;
          $('#popUpModal').modal('show');
          console.log('popup');
        
      } else {
        console.log("Saving File to Box: " + filename + " " + jsondata.projname); // Adding keywords
        let response = await uploadWordFile(blob, filename, uploadFormFolder);
        await assigntasktochair();
        let fileid = response.entries[0].id;
        //Modal code here
        document.getElementById('modalBody').innerHTML = `
        <p>File was successfully uploaded.</p>
        <p>Document ID: ${fileid}</p>`;
        $('#popUpModal').modal('show');
        console.log('popup');
      }
    });
  }

  const form = await document.querySelector('.contact-form');
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
// const chairFileViews = async () => {
// }
const viewFinalDecisionFiles = async (files) => {
  let template = '';

  if(files.length > 0) {
    template += `<div class="row m-0 pt-2 pb-2 align-left div-sticky" style="border-bottom: 1px solid rgb(0,0,0, 0.1);">
    <div class="col-md-4 text-center font-bold ws-nowrap pl-2">Concept Name <!--button class="transparent-btn sort-column" data-column-name="Cohort name"><i class="fas fa-sort"></i></button--></div>
    <div class="col-md-3 text-center font-bold ws-nowrap">Submission Date <!--button class="transparent-btn sort-column" data-column-name="Acronym"><i class="fas fa-sort"></i></button--></div>
    <div class="col-md-1 text-center font-bold ws-nowrap">Decision<!--button class="transparent-btn sort-column" data-column-name="Region"><i class="fas fa-sort"></i></button--></div>
    <div class="col-md-3 text-center font-bold ws-nowrap">Submitted By <!--button class="transparent-btn sort-column" data-column-name="Population type"><i class="fas fa-sort"></i></button--></div>
</div>`;
  let i = 0;
  const fileInfo = await getFileInfo('986462009982');
  for(const file of files){
    const fileInfo = await getFileInfo(file.id);
    console.log(file.id, fileInfo)
    // let response = await listComments(file.id);
    // let comments = JSON.parse(response).entries;
    // console.log(response, comments);
    template += `<div class="card mt-1 mb-1 align-left" data-toggle="collapse" data-target="#study${file.id}">
    <div style="padding: 10px" aria-expanded="false" id="file${file.id}">
        <div class="row">
            <div class="col-md-4 text-center">${file.name}</div>
            <div class="col-md-3 text-center">${new Date(fileInfo.created_at).toDateString().substring(4,)}</div>
            ${i%2 == 0 ? '<h6 class="badge badge-pill badge-success col-md-1"><span>Approved</span></h6>' : '<h6 class="badge badge-pill badge-danger col-md-1">Denied</h6>'}
            <div class="col-md-3 text-center">${fileInfo.created_by.name}</div>
            <div class="col-md-1 text-center">
                <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${file.id}">
                    <i class="fas fa-caret-down fa-2x"></i>
                </button>
            </div>
        </div>
        <div id="study${file.id}" class="collapse" aria-labelledby="file${file.id}">
                    <div class="card-body" style="padding-left: 10px;background-color:#f6f6f6;">
                    <div class="row mb-1 m-0">
                    <div class="col-md-2 font-bold">
                    Comments
                    </div>
                    </div>
                    <div class="row mb-1 m-0">
                      <div id='file${file.id}Comments' class='col-12'></div>
                    </div>

        </div>
    </div>
    </div>
    </div>
  `;
  i++;

};
  }
  // template += '</div>';


  document.getElementById('decided').innerHTML = template;
  for(const file of files){
    document.getElementById(`study${file.id}`).addEventListener('click', showCommentsDropDown(file.id))
    }
}