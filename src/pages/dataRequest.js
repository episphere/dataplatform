// import { createFileTask, assignTask, updateTaskAssignment } from '../shared.js';
import { getTaskList, updateTaskAssignment, uploadFile, uploadWordFile, getFolderItems, uploadWordFileVersion, emailforChair, emailforDACC, uploadFormFolder, assignTask, createFileTask, getFileInfo, numberWithCommas, hideAnimation} from '../shared.js';

// Require additional changes regarding data
//import * as docx from "docx";

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
    let template = `
        <div class="general-bg body-min-height padding-bottom-1rem">
            <div class="container">
              <div class="main-summary-row white-bg div-border">
                 <div class="main-summary-row white-bg div-border">
                    <button class="sub-menu-btn"><a class="nav-link ${activeTab === 'overview' ? 'active': ''} black-font font-size-14" href="#data_access/overview"><strong>Overview</strong></a></button>
                    <button class="sub-menu-btn"><a class="nav-link ${activeTab === 'form' ? 'active': ''} black-font font-size-14" href="#data_access/form"> <strong>Submission Form</strong></a></button>
                    ${emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1 ? `<button class="sub-menu-btn"><a class="nav-link ${activeTab === 'chairView' ? 'active': ''} black-font font-size-14" href="#data_access/chairView"> <strong>Chair Menu</strong></a></button>`:``}
                    ${emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1 ? `<button class="sub-menu-btn"><a class="nav-link ${activeTab === 'daccView' ? 'active': ''} black-font font-size-14" href="#data_access/daccView"> <strong>DACC Menu</strong></a></button>`:``}
                  </div>
                <div id="overview"></div>
            </div>
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
                        The BCRPP Project is currently generating genotyping data and harmonizing risk factor and clinical data. Data is expected to be available for request in late 2022. Data access will be facilitated through this platform, in accordance to the data use agreements signed between participating studies (originator) and Data Coordinating Centers from Consortia participating in Confluence.
                    </div></br>
                    <div class="row m-0">
                        The following data access procedures are planned:
                    </div>
                    <div class="row m-0">
                        <ul>
                            <li>Researcher submits a study concept describing the project, including variables of interest, via the Confluence Data Platform. This request will be sent via the platform to the relevant consortia data access coordinating committees (DACCs) that govern the requested data.</li>
                            <li>After approval by the relevant consortia DACCs, individual studies contributing data are notified and given a time period to opt-out their study from the approved project.</li>
                            <li>After the opt-out period has elapsed, the researcher’s institution signs a data transfer agreement (DTA) for the study conceptwith each of the relevant consortium data coordinating center(s) governing the data.</li>
                            <li>Upon DTA signatures, the data coordinating center(s) will be able to provide access of the approved data to researchers through the Confluence Data Platform.</li>
                        </ul>
                    </div> `;
    template += `</div>
              </div>
            </div>
            `;
  
  return template
}

export const formSection = (activeTab, showDescripton) => {
    let template = `
                  <div class="general-bg body-min-height padding-bottom-1rem">
                      <div class="container">
                        <div class="main-summary-row white-bg div-border">
                          <div class="main-summary-row white-bg div-border">
                              <button class="sub-menu-btn"><a class="nav-link ${activeTab === 'overview' ? 'active': ''} black-font font-size-14" href="#data_access/overview"><strong>Overview</strong></a></button>
                              <button class="sub-menu-btn"><a class="nav-link ${activeTab === 'form' ? 'active': ''} black-font font-size-14" href="#data_access/form"> <strong>Submission Form</strong></a></button>
                              ${emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1 ? `<button class="sub-menu-btn"><a class="nav-link ${activeTab === 'chairView' ? 'active': ''} black-font font-size-14" href="#data_access/chairView"> <strong>Chair Menu</strong></a></button>`:``}
                              ${emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1 ? `<button class="sub-menu-btn"><a class="nav-link ${activeTab === 'daccView' ? 'active': ''} black-font font-size-14" href="#data_access/daccView"> <strong>DACC Menu</strong></a></button>`:``}
                            </div>
                          <div id="overview"></div>
                      </div>
                  </div>
                  `;
    template += ` 
                  <div class="general-bg padding-bottom-1rem">
                          <div class="container body-min-height">
                              <!---<div class="main-summary-row">
                                <div class="align-left">
                                  <h1 class="page-header">Submitted Forms</h1>
                                </div>
                              </div>--->

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
                              
                              <button type="submit">Send Form</button>
                            </form>
                          </section>
                          
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
      let template =  `
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
                                              <button type="submit" value="approved">Approve</button>
                                              <button type="submit" value="rejected">Reject</button>
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
  let template = `
  <div class="general-bg body-min-height padding-bottom-1rem">
      <div class="container">
        <div class="main-summary-row white-bg div-border">
          <div class="main-summary-row white-bg div-border">
              <button class="sub-menu-btn"><a class="nav-link ${activeTab === 'overview' ? 'active': ''} black-font font-size-14" href="#data_access/overview"><strong>Overview</strong></a></button>
              <button class="sub-menu-btn"><a class="nav-link ${activeTab === 'form' ? 'active': ''} black-font font-size-14" href="#data_access/form"> <strong>Submission Form</strong></a></button>
              ${emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1 ? `<button class="sub-menu-btn"><a class="nav-link ${activeTab === 'chairView' ? 'active': ''} black-font font-size-14" href="#data_access/chairView"> <strong>Chair Menu</strong></a></button>`:``}
              ${emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1 ? `<button class="sub-menu-btn"><a class="nav-link ${activeTab === 'daccView' ? 'active': ''} black-font font-size-14" href="#data_access/daccView"> <strong>DACC Menu</strong></a></button>`:``}
          </div>
          <div id="overview"></div>
        </div>
      </div>
    <div id="chairFileView" class="align-left"></div>
  </div>
  `;

  return template
}

export const chairFileView = async() => {
  const response = await getFolderItems('155292358576');
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
    <h2 class="page-header">To Be Completed</h2>
    <ul>
      `;
    const filesincomplete = [];
    const filescompleted = [];
    const filesapproved = [];
    for(let obj of filearray){
      let id = obj.id;
      //console.log(id);
      let tasklist = await getTaskList(id);
      let entries = tasklist.entries;
      //console.log(entries.length !== 0);
      if(entries.length !== 0) {
        for(let item of entries){
          if(item.is_completed == false){
            //console.log(item.task_assignment_collection);
            for(let taskassignment of item.task_assignment_collection.entries){
              if(taskassignment.status=='incomplete' && taskassignment.assigned_to.login==JSON.parse(localStorage.parms).login){
                console.log(taskassignment.assigned_at);
                if (!filesincomplete.includes(id)) {
                  filesincomplete.push(id);
                  //console.log("id pushed" + id);
                }
              }
            }
          }
          if(item.is_completed == true){
            for(let taskassignment of item.task_assignment_collection.entries){
              if(taskassignment.status=='approved'){
                  filesapproved.push(id);
              }
              else if (taskassignment.status=='completed') {
                filescompleted.push(id);
              }
            }
          } 
        }
      }
    };
  for (const id of filesincomplete){
    let fileinfo = await getFileInfo(id)
    template += `
                  <li><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></li>
                  `
  }
  template += `</ul>
  <h2 class="page-header">DACC Completed</h2>
  <ul>
  `
  for (const id of filescompleted){
    let fileinfo = await getFileInfo(id)
    template += `
                  <li><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></li>
                  `
  }

  template += `</ul>
  <h2 class="page-header">Approved</h2>
  <ul>
  `
  for (const id of filesapproved){
    let fileinfo = await getFileInfo(id)
    template += `
                  <li><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></li>
                  `
  }

  template += `
  </div></div></div>`;
  document.getElementById('chairFileView').innerHTML = template;
}

export const daccSection = (activeTab) => {
  let template = `
  <div class="general-bg body-min-height padding-bottom-1rem">
      <div class="container">
        <div class="main-summary-row white-bg div-border">
          <div class="main-summary-row white-bg div-border">
              <button class="sub-menu-btn"><a class="nav-link ${activeTab === 'overview' ? 'active': ''} black-font font-size-14" href="#data_access/overview"><strong>Overview</strong></a></button>
              <button class="sub-menu-btn"><a class="nav-link ${activeTab === 'form' ? 'active': ''} black-font font-size-14" href="#data_access/form"> <strong>Submission Form</strong></a></button>
              ${emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1 ? `<button class="sub-menu-btn"><a class="nav-link ${activeTab === 'chairView' ? 'active': ''} black-font font-size-14" href="#data_access/chairView"> <strong>Chair Menu</strong></a></button>`:``}
              ${emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1 ? `<button class="sub-menu-btn"><a class="nav-link ${activeTab === 'daccView' ? 'active': ''} black-font font-size-14" href="#data_access/daccView"> <strong>DACC Menu</strong></a></button>`:``}
          </div>
          <div id="overview"></div>
        </div>
      </div>
    <div id="daccFileView" class="align-left"></div>
  </div>
  `;

  return template
}

export const daccFileView = async() => {
  const response = await getFolderItems('155292358576');
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
    <h2 class="page-header">To Be Completed</h2>
    <ul>
      `;
    const filesincomplete = [];
    const filescompleted = [];
    for(let obj of filearray){
      let id = obj.id;
      //console.log(id);
      let tasklist = await getTaskList(id);
      let entries = tasklist.entries;
      //console.log(entries.length !== 0);
      if(entries.length !== 0) {
        for(let item of entries){
          if(item.is_completed == false){
            //console.log(item.task_assignment_collection);
            for(let taskassignment of item.task_assignment_collection.entries){
              if(taskassignment.status=='incomplete' && taskassignment.assigned_to.login==JSON.parse(localStorage.parms).login){
                console.log(taskassignment.assigned_at);
                if (!filesincomplete.includes(id)) {
                  filesincomplete.push(id);
                  //console.log("id pushed" + id);
                }
              }
              else if(taskassignment.status=='completed' && taskassignment.assigned_to.login==JSON.parse(localStorage.parms).login){
                if (!filesincomplete.includes(id) && !filescompleted.includes(id)) {
                  filescompleted.push(id);
                }
              }
            }
          }
          else if(item.is_completed == true){
            console.log(item.task_assignment_collection.entries);
            for(let taskassignment of item.task_assignment_collection.entries){
              if(taskassignment.status=='completed' && taskassignment.assigned_to.login==JSON.parse(localStorage.parms).login){
                if (!filesincomplete.includes(id) && !filescompleted.includes(id)) {
                  filescompleted.push(id);
                }
              }
            }
          }
        }
      }
    };
  for (const id of filesincomplete){
    let fileinfo = await getFileInfo(id)
    template += `
                  <li><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></li>
                  `
  }
  template += `</ul>
  <h2 class="page-header">Completed</h2>
  <ul>
  `
  for (const id of filescompleted){
    let fileinfo = await getFileInfo(id)
    template += `
                  <li><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></li>
                  `
  }

  template += `
  </div></div></div>`;
  document.getElementById('daccFileView').innerHTML = template;
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
  const filename = JSON.parse(localStorage.parms).login.split("@")[0] + "testing" + "_" + d.getDate() + "_" + d.getMonth() + "_" + d.getFullYear() + ".docx";
  //console.log(files.entries)
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
    await createFileTask(fileId);
    let tasklist = await getTaskList(fileId);
    console.log(tasklist.entries)
    let tasktochair = tasklist.entries[0].id;
    console.log(emailforChair[0]);
    await assignTask(tasktochair, emailforChair[0]);
    console.log("Chair has been notified: " +  tasktochair);
  };

  async function generateWord(jsondata) {
    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: [
          new docx.Paragraph({ text: "BCRPP Data Access Submission", heading: docx.HeadingLevel.TITLE, alignment: docx.AlignmentType.CENTER}),
          new docx.Paragraph({ text: "Investigator(s): ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: 500},},
            children: [
              new docx.TextRun({
                text: jsondata.name,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({ text: "Contact Email: ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: {left:1440, hanging: 980},},},
            children: [
              new docx.TextRun({
                text: jsondata.email,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({ text: "Title of Proposed Project: ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: {left:1440, hanging: 980},},},
            children: [
              new docx.TextRun({
                text: jsondata.project,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({ text: "Is this an amendment? ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: {left:1440, hanging: 980},},},
            children: [
              new docx.TextRun({
                text: jsondata.amendment,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({ text: "Institution: ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: {left:1440, hanging: 980},},},
            children: [
              new docx.TextRun({
                text: jsondata.institution,
                bold:true,
              }),
            ],
          }),
          new docx.Paragraph({ text: "Cohort Requested: ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: {left:1440, hanging: 980},},},
            children: [
              new docx.TextRun({
                text: jsondata.cohort,
                bold:true,
              }),
            ],
          }),
          new docx.Paragraph({ text: "Background/Aims: ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: {left:1440, hanging: 980},},},
            children: [
              new docx.TextRun({
                text: jsondata.background,
                bold:false,
              }),
            ],
          }),
          new docx.Paragraph({ text: "Additional Information: ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: {left:1440, hanging: 980},},},
            children: [
              new docx.TextRun({
                text: jsondata.additional,
                bold:false,
              }),
            ],
          }),
          new docx.Paragraph({ text: "Agreement: ", heading: docx.HeadingLevel.HEADING_2}),
          new docx.Paragraph({ alignment: docx.AlignmentType.START, style: { paragraph: { indent: {left:1440, hanging: 980},},},
            children: [
              new docx.TextRun({
                text: jsondata.confirmation,
                bold:true,
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
      if (filesinfoldernames.includes(filename)){
        console.log(filename + " Exists: Saving New Version");
        let fileidupdate = filesinfolderids[filesinfoldernames.indexOf(filename)];
        (async () => {
          await uploadWordFileVersion(blob, fileidupdate);
          await assigntasktochair();
        })();
      } else {
        console.log("Saving File to Box: " + filename);
        (async () => {
          await uploadWordFile(blob, filename, uploadFormFolder);
          await assigntasktochair();
        })();
      }
    });
  }

  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', handleFormSubmit);
  //form.addEventListener('submit', assigntasktochair);
}
