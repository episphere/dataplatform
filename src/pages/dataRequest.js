// import { createFileTask, assignTask, updateTaskAssignment } from '../shared.js';
import {
  createComment,
  createCompleteTask,
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
  chairReviewFolder,
  finalFolder,
  assignTask,
  createFileTask,
  getFileInfo,
  numberWithCommas,
  hideAnimation,
  getTask,
  consortiumSelection
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
// Require additional changes regarding data
//import * as docx from "../docx";

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
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', 'DACC Menu');
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
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

    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', "DACC Menu");
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
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

  // template += `
  //         <div align="center">
  //         <iframe src="https://nih.app.box.com/f/852124ef6a4f4ee4aa2f50cc34188f3e" height="800" width="1000"></iframe>
  //         </div>`

  return template
}

export const chairSection = (activeTab) => {
  let authChair = emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc = emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = '';
  if (authDacc && authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', "DACC Menu");
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
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
      // let check =  await getMetadata("937143456496");
      // console.log(check.entries["0"]);
      //await updateMetadata("934537789566", "BCRPP_uploading_complete", "changed");

      const response = await getFolderItems(uploadFormFolder);
      let filearray = response.entries;
      console.log(filearray);

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
         <a class='nav-link' id='approvedTab' href='#approved' data-mdb-toggle="tab" role='tab' aria-controls='approved' aria-selected='true'> Completed </a>
      </li>
      
    </ul>`;
      const filesincomplete = [];
      const filesinprogress = [];
      const filescompleted = [];
      const filesapproved = [];
      const taskApproveDeny = [];
      for (let obj of filearray) {
        let id = obj.id;
        //console.log(id);
        let metaArray = await getMetadata(id);
        let chairMetaValue = metaArray.entries["0"]["BCRPPchair"];
        let daccMetaValue = metaArray.entries["0"]["BCRPPdacc"];
        //console.log("Chair Value: "+chairMetaValue);
        //console.log("DACC Value: "+daccMetaValue);

        let tasks = await getTaskList(id);

        if (tasks.entries.length == 0) {
          filesincomplete.push(obj);
        }
        if (chairMetaValue == 2 && daccMetaValue != 0) {
          filesinprogress.push(obj);
        }
        if (chairMetaValue == 3 && daccMetaValue == 0) {
          filescompleted.push(obj);
          let tasklist = await getTaskList(id);
          console.log(tasklist.entries);
          let entries = tasklist.entries;
          for (let item of entries) {
            if (item.is_completed == false) {
              taskApproveDeny.push(item.id);
            }
          }
        }
        if (chairMetaValue == 0) {
          filesapproved.push(obj);
        }
      };


      template += "<div class='tab-content' id='selectedTab'>";

      template += `<div class='tab-pane fade show active' 
                  id='toBeCompleted' role='tabpanel' 
                  aria-labeledby='toBeCompletedTab'> `

      template += renderFilePreviewDropdown(filesincomplete);

      template += `<div class='tab-pane fade'
                 id='inProgress' role='tabpanel'
                 aria-labeledby='inProgressTab'> `
      template += renderFilePreviewDropdown(filesinprogress);

      template += `<div class='tab-pane fade'
                id='daccCompleted' role='tabpanel'
                aria-labelledby='daccCompletedTab'>`
      template += renderFilePreviewDropdown(filescompleted);

      template += `<div class='tab-pane fade' 
                id='approved' role='tabpanel'
                aria-labelledby='approvedTab'>`
      template += renderFilePreviewDropdown(filesapproved)

      if (filescompleted.length != 0 || filesinprogress.length != 0 ||
          filesincomplete.length != 0 || filesapproved.length != 0) {
         template += `<div id='filePreview'> 
                      <div id='boxFilePreview' class="preview-container"></div>
                        <div id='sendtodaccButton' class="card-body dacc-submit" style="padding-left: 10px; background-color:#f6f6f6; display:block">
                          <form>
                            <label for"message">Send to DACC</label>
                            <div class="input-group">
                              <textarea id="message" name="message" rows="6" cols="65"></textarea>
                            </div>
                            <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                              <span class="buttonsubmit__text"> Send </span> </button>
                          </form>
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
                          </form>
                        </div>
                      </div>
                    </div>
                  `
      }

      // if (filescompleted.length != 0 || filesinprogress.length != 0 ||
      //   filesincomplete.length != 0 || filesapproved.length != 0) {
      //   template += `<div id='filePreview'> <div id='boxFilePreview' class="preview-container"></div>
      //   <div id = class="card-body comment-submit" style="padding-left: 10px;background-color:#f6f6f6;">
      // <form>
      //   <label for"message">Enter Comments</label>
      //   <div class="input-group">
      //     <textarea id="message" name="message" rows="6" cols="65"></textarea>
      //   </div>
      //   <button class='btn btn-primary' type="submit" value="send">Send Comment</button>
      // </form>
      
      // </div>
      // </div>
      // </div>`;
      //   }

        //await console.log(await searchMetadata());

        document.getElementById('chairFileView').innerHTML = template;

        //   if (filesincomplete.length != 0) {
        //     document.getElementById('filePreview').innerHTML += `
        //                   <div id='boxFilePreview' class="preview-container"></div>
        //                     <div class="card-body dacc-submit" aria-labeledby='toBeCompletedTab' style="padding-left: 10px;background-color:#f6f6f6;">
        //                       <form>
        //                         <label for"message">Send to DACC</label>
        //                         <div class="input-group">
        //                           <textarea id="message" name="message" rows="6" cols="65"></textarea>
        //                         </div>
        //                         <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
        //                           <span class="buttonsubmit__text"> Send </span> </button>
        //                       </form>
        //                     </div>
        //                   </div>
        //                   `
        // }

        //console.log(document.getElementById('selectedDoc').value);
        //addEventPreviewFile();
        //addEventToggleCollapsePanelBtn();
        //viewFile();
        submitToDacc();
        commentApproveReject();
        if (filesincomplete.length != 0) {
          showPreview(filesincomplete[0].id);
        }

        //Switch Tabs
        switchTabs('toBeCompleted', ['inProgress', 'daccCompleted', 'approved'], filesincomplete);
        switchTabs('inProgress', ['toBeCompleted', 'daccCompleted', 'approved'], filesinprogress);
        switchTabs('daccCompleted', ['inProgress', 'toBeCompleted', 'approved'], filescompleted);
        switchTabs('approved', ['inProgress', 'daccCompleted', 'toBeCompleted'], filesapproved);

      }


export const submitToDacc = () => {
  let submitDacc = async (e) => {
    const btn = document.activeElement;
    btn.disabled=true;
    e.preventDefault();
    let fileId = document.getElementById('selectedDoc').value//e.submitter.value;
    let message = e.target[0].value;
    console.log(fileId);
    console.log(message);
    await createCompleteTask(fileId, message);
    let tasklist = await getTaskList(fileId);
    let tasktodacc = tasklist.entries[0].id;
    console.log(emailforDACC.length.toString());
    for (let i=0, daccemaillength=emailforDACC.length; i < daccemaillength; i++ ) {
      await assignTask(tasktodacc, emailforDACC[i]);
      console.log("Task assigned to "+ emailforDACC[i]);
    }
    await updateMetadata(fileId, "BCRPPchair", '2');
    await updateMetadata(fileId, "BCRPPdacc", emailforDACC.length.toString());
    console.log("Meta Data Updated");
    document.location.reload(true);
  }
  const sdform = document.querySelector('.dacc-submit');
  if (sdform) {
  sdform.addEventListener('submit', submitDacc);
  }
}

// export const commentSubmit = () => {
//   let approveComment = async (e) => {
//     e.preventDefault();
//     //let fileId = e.submitter.fileId;
//     let fileId = e.submitter.value;
//     let message = e.target[0].value;
//     console.log(e);
//     console.log(fileId);
//     console.log(message);
//     //console.log(fileId);

//     // let taskList = await getTaskList(fileId);
//     // console.log(taskList)
//     // let taskAssignment = taskList.entries[0].task_assignment_collection.entries[0];

//     // console.log(await updateTaskAssignment(taskAssignment.id, approval, message))
//   }

//   const form = document.querySelector('.approvedeny')
//   form.addEventListener('submit', approveComment)
// }

export const commentApproveReject = () => {
  let approveComment = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;
    //let taskId = btn.name;
    let fileId = document.getElementById('selectedDoc').value;
    let tasklist = await getTaskList(fileId);
    console.log(tasklist);
    let entries = tasklist.entries;
      if (entries.length !== 0) {
        for (let item of entries) {
          if (item.is_completed == false && item.action == 'review') {
            for (let taskassignment of item.task_assignment_collection.entries) {
              if (taskassignment.assigned_to.login == JSON.parse(localStorage.parms).login) {
                  var taskId = taskassignment.id;
                  console.log(taskId);
              }
            }
          }
        }
      }
    let approval = e.submitter.value;
    let message = e.target[0].value;
    console.log(approval);
    //let task = await getTask(taskId);
    //let taskAssignment = task.task_assignment_collection.entries[0].id;
    await updateTaskAssignment(taskId, approval, message);
    await updateMetadata(fileId, "BCRPPchair", "0");
    document.location.reload();
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
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu', "DACC Menu");
  } else if (authChair) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'Chair Menu');
  } else if (authDacc) {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form', 'DACC Menu');
  } else {
    navBarItems = pageNavBar('data_access', activeTab, 'Overview', 'Submission Form');
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
  const response = await getFolderItems(uploadFormFolder);
  let filearray = response.entries;
  console.log(filearray);

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
    <a class='nav-link' id='completedTab' href='#completed' data-mdb-toggle="tab" role='tab' aria-controls='completed' aria-selected='true'>Completed</a>
</li>


</ul>`;

  const filesincomplete = [];
  const filescompleted = [];
  const tasksincomplete = [];
  const taskscompleted = [];
  for (let obj of filearray) {
    let id = obj.id;
    //console.log(id);
    let metaArray = await getMetadata(id);
    let daccMetaValue = metaArray.entries["0"]["BCRPPdacc"];
    let chairMetaValue = metaArray.entries["0"]["BCRPPchair"];
    //console.log("DACC Value: "+daccMetaValue);

    if (daccMetaValue != 0 && chairMetaValue == 2) {
      let tasklist = await getTaskList(id);
      let entries = tasklist.entries;

      if (entries.length !== 0) {
        for (let item of entries) {
          if (item.is_completed == false) {
            for (let taskassignment of item.task_assignment_collection.entries) {
              if (taskassignment.status == 'incomplete' && taskassignment.assigned_to.login == JSON.parse(localStorage.parms).login) {
                console.log(taskassignment.assigned_at);
                if (!filesincomplete.includes(id)) {
                  filesincomplete.push(obj);
                  tasksincomplete.push(taskassignment.id);
                }
              } else if (taskassignment.status == 'completed' && taskassignment.assigned_to.login == JSON.parse(localStorage.parms).login) {
                if (!filesincomplete.includes(id) && !filescompleted.includes(id)) {
                  filescompleted.push(obj);
                  taskscompleted.push(taskassignment.id);
                }
              }
            }
          }
        }
      }
    }
    if (chairMetaValue == 3) {
      let tasklist = await getTaskList(id);
      let entries = tasklist.entries;

      if (entries.length !== 0) {
        for (let item of entries) {
          for (let taskassignment of item.task_assignment_collection.entries) {
            if (taskassignment.status == 'completed' && taskassignment.assigned_to.login == JSON.parse(localStorage.parms).login) {
              if (!filesincomplete.includes(id) && !filescompleted.includes(id)) {
                filescompleted.push(obj);
                taskscompleted.push(taskassignment.id);
              }
            }
          }
        }
      }
    }
  };

  console.log("incomplete: " + filesincomplete);
  console.log("complete: " + filescompleted);
  console.log("tasksincomplete: " + tasksincomplete);
  console.log("taskscompleted: " + taskscompleted);

  template += "<div class='tab-content'>";
  
  template += `<div class='tab-pane fade show active'
                id='dacctoBeCompleted' role='tabpanel'
              aria-labeledby='dacctoBeCompletedTab'>`;
  template += renderFilePreviewDropdown(filesincomplete);
  template += `<div class='tab-pane fade'
                id='completed' role='tabpanel'
                aria-labeledby='completedTab'> `
  template += renderFilePreviewDropdown(filescompleted);

  if (filescompleted.length != 0 || filesincomplete.length != 0) {
    template += `<div id='filePreview'> 
    <div id='boxFilePreview' class="preview-container"></div>
      <div id="daccComment" class="card-body dacc-comment" style="padding-left: 10px;background-color:#f6f6f6;">
        <form>
          <label for"message">Submit Comment</label>
          <div class="input-group">
            <textarea id="message" name="message" rows="6" cols="65"></textarea>
          </div>
          <button type="submit" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
            <span class="buttonsubmit__text"> Submit & Complete </span> </button>
        </form>
      </div>
    </div>
  </div>`;
  }
  document.getElementById('daccFileView').innerHTML = template;
  //console.log(filesincomplete[0].id);
  if (filesincomplete.length != 0) {
    showPreview(filesincomplete[0].id);
  }
  //addEventToggleCollapsePanelBtn();
  submitToComment();

  //Switch Tabs
  switchTabs('dacctoBeCompleted', ['completed'], filesincomplete);
  switchTabs('completed', ['dacctoBeCompleted'], filescompleted);

}

export const submitToComment = () => {
  let submitComment = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;
    //let taskId = btn.name;
    let fileId = document.getElementById('selectedDoc').value;
    let message = e.target[0].value;
    console.log(fileId);
    console.log(message);
    let metaArray = await getMetadata(fileId);
    let daccMetaValue = metaArray.entries["0"]["BCRPPdacc"];
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
            }
          }  
        }
      }
    }
    await updateTaskAssignment(taskId, "completed");
    console.log(daccMetaValue);
    if (daccMetaValue == 1) {
      await updateMetadata(fileId, "BCRPPchair", "3");
      console.log("New Chair Value: 3");
      await createFileTask(fileId);
      console.log("Chair Task Created");
      let tasklist = await getTaskList(fileId);
      let entries = tasklist.entries;
      console.log(entries);
      for (let item of entries) {
        if (item.is_completed == false) {
          await assignTask(item.id, emailforChair[0]);
          console.log("Chair Task Assigned");
        }
      }
    };
    let newDaccValue = parseInt(daccMetaValue) - 1;
    await updateMetadata(fileId, "BCRPPdacc", newDaccValue.toString());
    console.log("New DACC Value: " + newDaccValue);
    document.location.reload(true);
  }
  const dcform = document.querySelector('.dacc-comment');
  if (dcform) {
    dcform.addEventListener('submit', submitComment);
  }
}

export const dataApproval = () => {
  // let files = await getFolderItems(uploadFormFolder);
  // const filesinfoldernames = [];
  // const filesinfolderids = [];
  // for (let i = 0; i < files.entries.length; i++) {
  //   filesinfoldernames.push(files.entries[i].name);
  //   filesinfolderids.push(files.entries[i].id);
  // }

  // let fileId = filesinfolderids[filesinfoldernames.indexOf(filename)];

  let approveDoc = async (e) => {
    e.preventDefault();

    let fileId = 931127106406;
    let approval = e.submitter.value;
    let message = e.target[0].value;

    let taskList = await getTaskList(fileId);
    console.log(taskList)
    let taskAssignment = taskList.entries[0].task_assignment_collection.entries[0];

    console.log(await updateTaskAssignment(taskAssignment.id, approval, message))
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
  //console.log(filesinfolderids);

  // async function assigntasktochair() {
  //   let files = await getFolderItems(uploadFormFolder);
  //   const filesinfoldernames = [];
  //   const filesinfolderids = [];
  //   for (let i = 0; i < files.entries.length; i++) {
  //     filesinfoldernames.push(files.entries[i].name);
  //     filesinfolderids.push(files.entries[i].id);
  //   }

  //   let fileId = filesinfolderids[filesinfoldernames.indexOf(filename)];
  //   //console.log(fileId);
  //   await createFileTask(fileId);
  //   let tasklist = await getTaskList(fileId);
  //   console.log(tasklist.entries)
  //   let tasktochair = tasklist.entries[0].id;
  //   console.log(emailforChair[0]);
  //   await assignTask(tasktochair, emailforChair[0]);
  //   console.log("Chair has been notified: " +  tasktochair);
  // };

  async function handleFormSubmit(eventtest) {
    //const btn = document.getElementById("submitFormButton");
    const btn = document.activeElement;
    btn.disabled = true;
    //console.log(btn);
    //btn.classList.toggle("buttonsubmit--loading");
    //btn.class="lazy-loader-spinner";
    eventtest.preventDefault();

    const data = new FormData(eventtest.target);

    const formJSON = Object.fromEntries(data.entries());

    // for multi-selects, we need special handling
    //formJSON.snacks = data.getAll('snacks');

    const results = document.querySelector('.results pre');
    results.innerText = JSON.stringify(formJSON, null, 2);
    //const data2 = JSON.parse(JSON.stringify(formJSON));
    //console.log(data2)
    //console.log(formJSON.name)
    //uploadFile(formJSON, "BCRPPexample.json", uploadFormFolder)
    // let files = async () =>{
    //   await console.log(getFolderItems(uploadFormFolder));//149098174998);
    //  }
    // console.log(files.entries);
    await generateWord(formJSON);
    //await assigntasktochair();
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
    //console.log(fileId);
    // await createFileTask(fileId);
    // let tasklist = await getTaskList(fileId);
    // console.log(tasklist.entries)
    // let tasktochair = tasklist.entries[0].id;
    // console.log(emailforChair[0]);
    // await assignTask(tasktochair, emailforChair[0]);
    // console.log("Chair has been notified: " +  tasktochair);
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
          await uploadWordFileVersion(blob, fileidupdate);
          await assigntasktochair();
          document.getElementById('modalBody').innerHTML = 'File was successfully updated.';
          $('#popUpModal').modal('show');

        })();
      } else {
        console.log("Saving File to Box: " + filename + jsondata.keywords); // Adding keywords
        (async () => {
          await uploadWordFile(blob, filename, uploadFormFolder);
          await assigntasktochair();

          //Modal code here
          document.getElementById('modalBody').innerHTML = 'File was successfully uploaded.';
          $('#popUpModal').modal('show');
        })();
      }
    });
  }

  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', handleFormSubmit);
  //form.addEventListener('submit', assigntasktochair);
}

const viewFiles = async (files) => {
  let template = ``;
  for (const id of files) {
    // let check =  await getMetadata(id);
    // console.log(check);
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
                    <textarea id="message" name="message" rows="6" cols="65"></textarea>
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
    // let check =  await getMetadata(id);
    // console.log(check);
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
    // let check =  await getMetadata(id);
    // console.log(check);
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
