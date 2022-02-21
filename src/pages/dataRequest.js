// import { createFileTask, assignTask, updateTaskAssignment } from '../shared.js';
import { getTaskList, updateTaskAssignment } from '../shared.js';

// Require additional changes regarding data
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
                        The BCRPP Project is currently generating genotyping data and harmonizing risk factor and clinical data. Data is expected to be available for request in late 2022.Data access will be facilitated through this platform, in accordance to the data use agreements signed between participating studies (originator) and Data Coordinating Centers from Consortia participating in Confluence.
                    </div></br>
                    <!---<div class="row m-0 align-center">
                        <img src="./static/images/data_request.PNG" alt="Overview of data sharing and access in Confluence" style="margin:auto">
                    </div></br>--->
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
                </div>
            </div>
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