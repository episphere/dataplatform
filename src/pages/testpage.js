export const formSectiontest = async (activeTab, showDescripton) => {
    let authChair =
      emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
    let authDacc =
      emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  
    let navBarItems = "";
    if (authDacc && authChair) {
      navBarItems = pageNavBar(
        "data_access",
        activeTab,
        "Overview",
        "Project Concept Form",
        "View Submissions",
        "Chair Menu",
        "DACC Menu"
      );
    } else if (authChair) {
      navBarItems = pageNavBar(
        "data_access",
        activeTab,
        "Overview",
        "Project Concept Form",
        "View Submissions",
        "Chair Menu"
      );
    } else if (authDacc) {
      navBarItems = pageNavBar(
        "data_access",
        activeTab,
        "Overview",
        "Project Concept Form",
        "View Submissions",
        "DACC Menu"
      );
    } else {
      navBarItems = pageNavBar(
        "data_access",
        activeTab,
        "Overview",
        "Project Concept Form",
        "View Submissions"
      );
    }
    let template = `
        <div class="general-bg body-min-height padding-bottom-1rem">
            <div class="container">
              ${navBarItems}
            
        </div>
        `;
    const date = new Date();
    const today =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
  
    const dictionaryVars = localStorage.getItem("dictionaryVars");
    template += ` 
      <div class="general-bg padding-bottom-1rem">
        <div class="container body-min-height">
          <div class="main-summary-row">
              <div class="align-left">
  
                  <h1 class="page-header">Analysis Proposal Form</h1>
                  <button id='autofillJson' class='d-none'>AutoFill JSON</button>
  
              </div>
          </div>
          <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">             
            <section class="contact-form">
              <p>Please fill out the form below. This will be reviewed by the BCRPP Data Access Coordination Committee (DACC) 
              to ensure that proposal is consistent with BCRPP goals and individual cohorts’ consents. The DACC consists of 
              representatives from the BCRPP Steering Committee and representatives of individual cohorts. Proposals will be reviewed 
              once every four months. Data for approved concepts will be sent only to the Investigators listed below, 
              each of whose Institutions will need to sign the BCRPP DTA.</p>
              <form>
              <!---<div class='col-3 mb-3 input-group'>
                <input type='file' class='' id='uploadJSON' />
              </div>--->
                <div class="input-group">
                  <label for="date"><b>Date</b><span class='required-label'>*</span></label>
                  <input id="date" name="date" type="date" value='${today}' required/>
                </div>
  
                <div class="input-group">
                  <label for="projname"><b>Title of Proposed Project</b><span class='required-label'>*</span></label>
                  <input id="projname" name="projname" type="text" required/>
                </div>
  
                <div class="input-group">
                  <label for="amendment"> <b>Is this an amendment?</b><span class='required-label'>*</span> </label>      
                    <input id="amendmentyes" name="amendment" type="radio" value="Yes" required/>
                      <label class="inline" for="amendmentyes"> Yes </label>
                    <input id="amendmentno" name="amendment" type="radio" value="No" required/>
                      <label class="inline" for="amendmentno"> No </label>
                    <!--label for="ifamendmentyes"> If yes, provide Concept Number of original form </label>
                      <input type="text" id="conNum" name="conNum"/-->
                </div>
  
                <div class='input-group d-none' >
                  <select class='form-select' id='amendmentSelect'></select>
                </div>
  
                <div class="input-group">
                  <label for="investigators"><b>Contact Investigator(s)</b> <span class='required-label'>*</span></label>
                  <input id="investigators" name="investigators" type="text" required/>
                </div>
  
                <div class="input-group">
                  <label for="institution"><b>Institution(s)</b><span class='required-label'>*</span></label>
                  <input id="institution" name="institution" type="text" required/>
                </div>
                  
                <div class="input-group">
                  <label for="email"><b>Contact Email</b><span class='required-label'>*</span></label>
                  <input id="email" name="email" type="email" required/>
                </div>
  
                <div class="input-group">
                  <label for="member"> <b>Are you a member of BCRPP?</b> <span class='required-label'>*</span></label>
                    <input id="memberyes" name="member" type="radio" value="Yes" required/>
                      <label class="inline" for="memberyes"> Yes </label>
                    <input id="memberno" name="member" type="radio" value="No" required/>
                      <label class="inline" for="memberno"> No </label>
                </div>
  
                <div class="input-group">
                  <label for="acro"><b>BCRPP Study Acronym(s) for the Contact Investigator</b></span></label>
                  <textarea id="acro" name="acro" rows="2" cols="65"></textarea>
                </div>
  
                <div class="input-group">
                  <label for="allinvest"><b>ALL Investigators (and their institutions) who will require access to the data requested</b><span class='required-label'>*</span></label>
                  <textarea id="allinvest" name="allinvest" rows="2" cols="65" required></textarea>
                </div>
  
                <div class="input-group">
                  <label><input id="confirmation" name="confirmation" type="checkbox" value="Yes" required/><b> Please confirm that ALL the named investigators have read AND agreed to be named on this proposal?</b><span class='required-label'>*</span></label>
                </div>
  
                <br>
  
                <p><u><b>Project Description</b></u></p>
  
                <div class="input-group">
                <p>Please provide a concise description of Background, Aims, and Analysis Plan. Provide enough detail so contributing cohorts can assess whether Aims (i) align with participant consents and (ii) overlap with other cohort projects. Please list all planned analyses.</p>
              </div>
  
                <div class="input-group">
                  <label for="background"><b>Background</b><span class='required-label'>*</span></label>
                  <textarea id="background" name="background" rows="4" cols="65" required></textarea>
                </div>
  
                <div class="input-group">
                  <label for="aims"><b>Aims</b><span class='required-label'>*</span></label>
                  <textarea id="aims" name="aims" rows="4" cols="65" required> </textarea>
                </div>
  
                <div class="input-group">
                  <label for="analyplan"><b>Analysis Plan</b><span class='required-label'>*</span></label>
                  <textarea id="analyplan" name="analyplan" rows="4" cols="65" required> </textarea>
                </div>
  
                <br>
  
                <!---<p><u><b>Core Covariate, Mammography and Incident Breast Cancer Data Requested</b></u></p>
                  <button class='btn btn-primary btn-sm' type='button' id='importDictvars'>Import Variables</button>--->
  
                <div class="input-group">
                  <p>The <a href="#data_exploration/dictionary">BCRPP data dictionary</a> lists and describes variables shared by cohorts participating in the BCRPP. 
                  Data availability and descriptive statistics can be explored via the <a href="#data_exploration/summary">Explore Data</a> tool. If data from a particular category is requested,
                  all variables from that category will be provided.</p>
                </div>
                
                <div class="input-group">
                  <label for="basevar"><b>Baseline</b><span class='required-label'>*</span></label>
  
                  <label>
                    <input id="basevarv" name="basevarv" type="checkbox" value="basevarv"/>
                    Check All
                  </label>
                </div>
                
                <div class="input-group">
  
                  <ul class="form" id='basevarlist'>
                    <div class="inline-field">
                      <input id="alctob" name="basevar" type="checkbox" value="Alcohol and Tobacco"/>
                      <label class="container-ul" for="alctob">Alcohol and Tobacco</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="anthros" name="basevar" type="checkbox" value="Anthropometry"/>
                      <label class="container-ul" for="anthros">Anthropometry</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="demos" name="basevar" type="checkbox" value="Demographics"/>
                      <label class="container-ul" for="demos">Demographics</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="identdates" name="basevar" type="checkbox" value="Identification/Dates"/>
                      <label class="container-ul" for="identdates">Identification/Dates</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="pershist" name="basevar" type="checkbox" value="Personal and Family Health History"/>
                      <label class="container-ul" for="pershist">Personal and Family Health History</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="physact" name="basevar" type="checkbox" value="Physical Activity"/>
                      <label class="container-ul" for="physact">Physical Activity</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="reprohist" name="basevar" type="checkbox" value="Reproductive History"/>
                      <label class="container-ul" for="reprohist">Reproductive History</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="scrhist" name="basevar" type="checkbox" value="Screening History"/>
                      <label class="container-ul" for="scrhist">Screening History</label>
                    </div>
                  </ul>
                </div>
  
                <div class="input-group">
                  <label for="ibcvar"><b>Incident Breast Cancer</b><span class='required-label'>*</span></label>
                  <label>
                    <input id="ibcvarv" name="ibcvarv" type="checkbox" value="ibcvarv"/>
                    Check All
                  </label>
                </div>
  
                <div class="input-group">
                  <ul class="form" id='ibcvarlist'>
                    <div class="inline-field">
                      <input id="diag" name="ibcvar" type="checkbox" value="Diagnostic"/>
                      <label class="container-ul" for="diag">Diagnostic</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="path" name="ibcvar" type="checkbox" value="Pathology"/>
                      <label class="container-ul" for="path">Pathology</label>
                    </div>
                  </ul>
                </div>
  
                <div class="input-group">
                  <label for="mmdvar"><b>Mammographic Density</b><span class='required-label'>*</span></label>
                  <label>
                    <input id="mmdvarv" name="mmdvarv" type="checkbox" value="Mammographic Density"/>
                  </label>
                </div>
  
                <div class="input-group">
                  <p>Select cohorts from which data is being requested. Proposals only requesting data from a single cohort will not be approved. If you are interested in only analyzing data from a particular cohort, please contact that cohort directly. Information on cohorts can be found <a href="#about/description">here</a>.</p>
                  <label for="reqcoh"><b>Requested Cohorts</b><span class='required-label'>*</span></label>
                  <label>
                    <input id="reqcohv" name="reqcohv" type="checkbox" value="reqcohv"/>
                    Check All
                  </label>
                </div>
  
                <div class="input-group">
                  <ul class="form" id='reqcohlist'>
                    <div class="inline-field">
                      <input id="CSDLH" name="reqcoh" type="checkbox" value="CSDLH"/>
                      <label class="container-ul" for="CSDLH">CSDLH</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="BCFR" name="reqcoh" type="checkbox" value="BCFR"/>
                      <label class="container-ul" for="BCFR">BCFR</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="BWHS" name="reqcoh" type="checkbox" value="BWHS"/>
                      <label class="container-ul" for="BWHS">BWHS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="CARET" name="reqcoh" type="checkbox" value="CARET"/>
                      <label class="container-ul" for="CARET">CARET</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="CLUE-II" name="reqcoh" type="checkbox" value="CLUE-II"/>
                      <label class="container-ul" for="CLUE-II">CLUE-II</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="Connect" name="reqcoh" type="checkbox" value="Connect"/>
                      <label class="container-ul" for="Connect">Connect</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="CPS-2" name="reqcoh" type="checkbox" value="CPS-2"/>
                      <label class="container-ul" for="CPS-2">CPS-2</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="CPS-3" name="reqcoh" type="checkbox" value="CPS-3"/>
                      <label class="container-ul" for="CPS-3">CPS-3</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="CTS" name="reqcoh" type="checkbox" value="CTS"/>
                      <label class="container-ul" for="CTS">CTS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="EPIC" name="reqcoh" type="checkbox" value="EPIC"/>
                      <label class="container-ul" for="EPIC">EPIC</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="GS" name="reqcoh" type="checkbox" value="GS"/>
                      <label class="container-ul" for="GS">GS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="JANUS" name="reqcoh" type="checkbox" value="JANUS"/>
                      <label class="container-ul" for="JANUS">JANUS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="MAC" name="reqcoh" type="checkbox" value="MAC"/>
                      <label class="container-ul" for="MAC">MAC</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="MCCS" name="reqcoh" type="checkbox" value="MCCS"/>
                      <label class="container-ul" for="MCCS">MCCS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="MEC" name="reqcoh" type="checkbox" value="MEC"/>
                      <label class="container-ul" for="MEC">MEC</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="MMHS" name="reqcoh" type="checkbox" value="MMHS"/>
                      <label class="container-ul" for="MMHS">MMHS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="NHS" name="reqcoh" type="checkbox" value="NHS"/>
                      <label class="container-ul" for="NHS">NHS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="NHS-2" name="reqcoh" type="checkbox" value="NHS-2"/>
                      <label class="container-ul" for="NHS-2">NHS-2</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="NYUWHS" name="reqcoh" type="checkbox" value="NYUWHS"/>
                      <label class="container-ul" for="NYUWHS">NYUWHS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="PLCO" name="reqcoh" type="checkbox" value="PLCO"/>
                      <label class="container-ul" for="PLCO">PLCO</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="SISTER" name="reqcoh" type="checkbox" value="SISTER"/>
                      <label class="container-ul" for="SISTER">SISTER</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="SNM" name="reqcoh" type="checkbox" value="SNM"/>
                      <label class="container-ul" for="SNM">SNM</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="VITAL" name="reqcoh" type="checkbox" value="VITAL"/>
                      <label class="container-ul" for="VITAL">VITAL</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="WHI" name="reqcoh" type="checkbox" value="WHI"/>
                      <label class="container-ul" for="WHI">WHI</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="WHS" name="reqcoh" type="checkbox" value="WHS"/>
                      <label class="container-ul" for="WHS">WHS</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="WISDOM" name="reqcoh" type="checkbox" value="WISDOM"/>
                      <label class="container-ul" for="WISDOM">WISDOM</label>
                    </div>
  
                    <div class="inline-field">
                      <input id="WLH" name="reqcoh" type="checkbox" value="WLH"/>
                      <label class="container-ul" for="WLH">WLH</label>
                    </div>
                  </ul>
                </div>
  
                <br>
                <p><u><b>Timeline</b></u><span class='required-label'>*</span></p>
                  <div class="input-group">
                    <label for="timeline">Please indicate estimated time from receipt of data to completion of analysesand submission of paper; 
                    the expectation (per the BCRPP Recipient DTA) is that results will be published within one year after completion</label>
                    <textarea id="timeline" name="timeline" rows="4" cols="65" required></textarea>
                  </div>
  
                <br>
                <p><u><b>Authorship</b></u><span class='required-label'>*</span></p>
                  <div class="input-group">
                    <label for="authconf"><input id="authconf" name="authconf" type="checkbox" value="Yes" required/> Please confirm that you acknowledge the intention to include representatives of the 
                    contributing cohorts as co-authors and that you will provide contributing cohorts 30 days to review the draft manuscript 
                    before submission (per section 3.4 of the BCRPP Recipient DTA). </label>
                    
                    <label for="Authorship"><i>Please include any special considerations you would like to bring to the DACC’s attention.</i></label>
  
                    <textarea id="authorship" name="authorship" rows="4" cols="65"></textarea>
                  </div>
                  
                  <button type="submit" id="submitFormButton" class="buttonsubmit"> 
                    <span class="buttonsubmit__text"> Send Form </span>
                  </button>
                  <button type="button" id="downloadJSON" class="buttonsubmit"> 
                    <span class="buttonsubmit__text"> Download JSON </span>
                  </button>
                  <!--button type="button" id="downloadWord" class="buttonsubmit d-none"> 
                    <span class="buttonsubmit__text"> Download Word </span>
                  </button>
                  
                  <button type="submit" id="otherButton" class="buttonsubmit d-none"> 
                    <span class="buttonsubmit__text"> Something else </span>
                  </button-->
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
  };