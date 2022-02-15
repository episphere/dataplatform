// Require additional changes regarding data

export const template = () => {
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

    <div class="input-group">
      <label for="dataplatform"><b>Data Platform</b></label>
      <select id="dataplatform" name="dataplatform">
        <option>BCRPP</option>
        <option>Confluence</option>
      </select>
    </div>

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
      <label for="message"><b>Please provide a concise description of Background/Aims</b></label>
      <textarea id="message" name="message" rows="4" cols="65"></textarea>
    </div>

    <div class="input-group">
      <label for="message"><b>Please provide any additional information</b></label>
      <textarea id="message" name="message" rows="4" cols="65"></textarea>
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
</div>
</div>
</div>`

// function handleFormSubmit(event) {
//     event.preventDefault();
  
//     const data = new FormData(event.target);
  
//     const formJSON = Object.fromEntries(data.entries());
  
//     // for multi-selects, we need special handling
//     //formJSON.snacks = data.getAll('snacks');
  
//     const results = document.querySelector('.results pre');
//     results.innerText = JSON.stringify(formJSON, null, 2);
//   }

// const form = document.querySelector('.contact-form');
// form.addEventListener('submitform', handleFormSubmit);

template += `<div class="results">
    <h2>Form Data</h2>
    <pre></pre>
</div>
    `;
    return template
}

// function handleFormSubmit(event) {
//     event.preventDefault();
  
//     const data = new FormData(event.target);
  
//     const formJSON = Object.fromEntries(data.entries());
  
//     // for multi-selects, we need special handling
//     formJSON.snacks = data.getAll('snacks');
  
//     const results = document.querySelector('.results pre');
//     results.innerText = JSON.stringify(formJSON, null, 2);
//   }
  
// export const form = document.querySelector('.contact-form');
//     form.addEventListener('submit', handleFormSubmit);


export const dataForm = () => {
    function handleFormSubmit(eventtest) {
        eventtest.preventDefault();
    
        const data = new FormData(eventtest.target);
    
        const formJSON = Object.fromEntries(data.entries());
    
        // for multi-selects, we need special handling
        //formJSON.snacks = data.getAll('snacks');
    
        const results = document.querySelector('.results pre');
        results.innerText = JSON.stringify(formJSON, null, 2);
    }
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', handleFormSubmit);
}