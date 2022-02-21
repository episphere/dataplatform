// import { createFileTask, assignTask, updateTaskAssignment } from '../shared.js';
import { getTaskList, updateTaskAssignment } from '../shared.js';

// Require additional changes regarding data
//import * as docx from "docx";

export const template = () => {
    return `
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
                    <div class="row m-0 align-center">
                    <!---<iframe src="https://nih.app.box.com/embed/s/8hdxyo7j029mij9l8w7thl19p82w9vad?sortColumn=date&view=list" width="800" height="550" frameborder="0" allowfullscreen webkitallowfullscreen msallowfullscreen></iframe>--->
                    <!---<iframe src="https://nih.app.box.com/embed/s/fprwackyc0yn49pe15yctgsc2mflky9v?sortColumn=date&view=list" width="500" height="400" frameborder="0" allowfullscreen webkitallowfullscreen msallowfullscreen></iframe>--->
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
                    </div>
<section class="contact-form">
    <h1>Data Access Form</h1>
    <p>Please fill out the form below in order to get approval for access to data. A <a href="https://www.box.com/pricing/individual">Box Account</a> is required to submit a form.</p>
  
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
                            src="https://nih.app.box.com/embed/s/01c2pxqx0emwixd68wwarkw1ndymm3ov?sortColumn=date&view=list"
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
        </div>

        <section class="contact-form">
            <h1>Send Me a Message</h1>
            <p>Use this handy contact form to get in touch with me.</p>
            
            <form>
                <div class="input-group">
                <input id="salutation-mr" name="salutation" type="radio" value="Mr."/>
                <label class="inline" for="salutation-mr">Mr.</label>
                
                <input id="salutation-mrs" name="salutation" type="radio" value="Mrs."/>
                <label class="inline" for="salutation-mrs">Mrs.</label>
                
                <input id="salutation-ms" name="salutation" type="radio" value="Ms."/>
                <label class="inline" for="salutation-ms">Ms.</label>
                </div>
                
                <div class="input-group">
                <label for="name">Full Name</label>
                <input id="name" name="name" type="text"/>
                </div>
                
                <div class="input-group">
                <label for="email">Email Address</label>
                <input id="email" name="email" type="email"/>
                </div>
                
                <div class="input-group">
                <label for="subject">How can I help you?</label>
                <select id="subject" name="subject">
                    <option>I have a problem.</option>
                    <option>I have a general question.</option>
                </select>
                </div>
                
                <div class="input-group">
                <label for="message">Enter a Message</label>
                <textarea id="message" name="message" rows="6" cols="65"></textarea>
                </div>
                
                <div class="input-group">
                <p class="group-label">Please send me:</p>
                <input id="snacks-pizza" name="snacks" type="checkbox" value="pizza"/>
                <label class="inline" for="snacks-pizza">Pizza</label>
                <input id="snacks-cake" name="snacks" type="checkbox" value="cake"/>
                <label class="inline" for="snacks-cake">Cake</label>
                </div>
                <input name="secret" type="hidden" value="1b3a9374-1a8e-434e-90ab-21aa7b9b80e7"/>
                <button type="submit">Send It!</button>
            </form>
            </section>

            <div class="results">
            <h2>Form Data</h2>
            <pre></pre>
            </div>

</div>
</div>
</div>

<div class="results">
    <h2>Form Data</h2>
    <pre></pre>
</div>

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
                            src="https://nih.app.box.com/embed/s/01c2pxqx0emwixd68wwarkw1ndymm3ov?sortColumn=date&view=list"
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
        </div>
    `;
}

export const dataApproval = () => {
    let approveDoc = async (e) => {
        e.preventDefault();

        let fileId = "913453324112";
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

export const generateForm = () => {
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        
        const formJSON = Object.fromEntries(data.entries());
    
        // for multi-selects, we need special handling
        // formJSON.snacks = data.getAll('snacks');
        
        const results = document.querySelector('.results pre');
        results.innerText = JSON.stringify(formJSON, null, 2);
    }
  
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', handleFormSubmit);
}

export const dataForm = () => {
  function handleFormSubmit(eventtest) {
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
      generate(formJSON);
  };

  function generate(jsondata) {
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

    docx.Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "BCRPPexample.docx");
      console.log("Document created successfully");
    });
  }

  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', handleFormSubmit);
}

// export const createDoc = () =>{
//   function generate() {
//     const doc = new docx.Document({
//       sections: [{
//         properties: {},
//         children: [
//           new docx.Paragraph({
//             children: [
//               new docx.TextRun("Hello World"),
//               new docx.TextRun({
//                 text: "Foo Bar",
//                 bold: true,
//               }),
//               new docx.TextRun({
//                 text: "\tGithub is the best",
//                 bold: true,
//               }),
//             ],
//           }),
//         ],
//       }]
//     });

//     docx.Packer.toBlob(doc).then(blob => {
//       console.log(blob);
//       saveAs(blob, "example.docx");
//       console.log("Document created successfully");
//     });
//   }
// }
