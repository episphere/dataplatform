export const dataAccessHowTo = () => {
    return `
        <div class="general-bg padding-bottom-1rem">
            <div class="container body-min-height">
                <div class="main-summary-row">
                    <div class="align-left">
                        <h1 class="page-header">Data Access Process</h1>
                    </div>
                </div>
                <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
                    Data posted to the DCEG Publication Data Repository (PDR) is made accessible to the research community 
                    in accordance with the consent provided by the study participants and in compliance with the 
                    <a href="https://dceg.cancer.gov/tools/data-sharing" target="_blank">DCEG</a> and 
                    <a href="https://sharing.nih.gov/data-management-and-sharing-policy" target="_blank">NIH</a> data sharing policy. Data on the PDR is governed by the DCEG PDR data access coordinating committee 
                    (DAC; provide link to DAC guidelines). Requests for access to data are reviewed by the DCEG PDR DAC to 
                    ensure that the proposed research is consistent with the data use and limitations as defined by the 
                    consent provided by study participants.
                    
                    <br><br>

                    To request access to data on the PDR, the requestor must have an 
                    <a href="https://public.era.nih.gov/commonsplus/public/login.era?TARGET=https%3A%2F%2Fpublic.era.nih.gov%3A443%2Fcommons" target="_blank">eRA Commons account</a> and perform the 
                    steps outlined below. The following link provides screenshots of these steps: (enter link to PDF of 
                    screen shots – to be created once PDR Box account created)
                    
                    <br><br>
                    ${!localStorage.parms?
                    `<b>1) Create a Box Account</b>
                    <ul>
                        <li>Box.com login credentials are required to log into the DCEG PDR. If you have a Box.com 
                        account through your institution, you can utilize those credentials. Otherwise, a free Box.com 
                        account can be created at this web page: <a href="https://www.box.com/pricing/individual" target="_blank">https://www.box.com/pricing/individual</a>.
                        </li>
                    </ul>

                    <b>2) Initial login PDR to request permission to submit requests for data access</b>
                    <ul>
                        <li>Select “PDR Login” and enter use your Box.com credentials where indicated. </li>
                        <li>Grant access to the EpisphereDev app, which facilitates material sharing between the PDR and your Box account. </li>
                        <li>Once logged into the PDR, navigate to the DCEG Publications drop-down menu and select 
                        “Request permission to submit requests for access to data”. This action will open your 
                        default email client with an autogenerated email that contains your Box account username. 
                        Send this email to <a href = 
                        "mailto:nci_dceg_pdr@nih.gov?subject=PDR Request Access For ${localStorage.parms ? JSON.parse(localStorage.parms).login : 'Unknown'}&body=**Please do not change the subject line or body of this email or your request may be denied.**%0D%0ARequest to grant access to ${localStorage.parms ? JSON.parse(localStorage.parms).login : 'Unknown'} allowing for request form submission.">
                        here
                      </a> without any modifications. Access for submitting 
                        data requests using the credentials provided in the autogenerated email will be granted within 
                        2 business days of sending the email (excluding weekends). </li>
                    </ul>`
                    :``
                }

                    <b>${!localStorage.parms?`3)`:`1)`} Request access to data</b>
                    <ul>
                        <li>Log into the PDR using your Box.com credentials, which have been granted access for submitting data requests. </li>
                        <li>Visit the "DCEG PDR" page to review datasets available for request.</li>
                        <li>Select “Request Data” next to the dataset that you want access.</li>
                        <li>Select the “Login eRA” to provide your eRA credentials</li>
                        <li>After logging into eRA, your name, Institution, and email will be prepopulated onto the data access request 
                        form, along with information about the data to which you are requesting access.</li>
                        <li>Complete the data access request form and select “Send Form” to submit it to the DCEG PDR DAC.</li>
                        <li>The DCEG DAC will review the request to ensure that the proposed research is consistent with the data 
                        use limitations associated with the requested data (refer to the DCEG PDR DAC Charter for more information)</li>
                    </ul>

                    <b>${!localStorage.parms?`4)`:`2)`} How to access data </b>
                    <ul>
                        <li>Once your request for data access is granted by the DCEG PDR DAC and your institution has 
                        signed the data transfer agreement, you will receive an email from the NCI DCEG PDR notifying 
                        you that access to the data stored in a Box.com folder has been granted. </li>
                        <li>The Box.com folder will contain the requested data along with associated metadata. </li>
                        <li>DCEG strongly encourages users not to download the data from Box in order to avoid unnecessary 
                        data duplications. We recommend using packages such as boxr (https://github.com/r-box/boxr) to 
                        access the data from RStudio. </li>

                    </ul>

                    <!--<ol>
                        <li>Copy the File ID. This will be used in the R boxr package</li>
                        <li>In Rstudio, run the following commands:</li>
                        <li>install.packages(c("boxr", "base", "usethis"))</li>
                        <li>library(boxr)</li>
                        <li>box_auth()</li>
                        <li>The console will then ask for credentials as shown below</li>
                        <li>enter the following information:<ul>
                            <li>Client ID: <strong>627lww8un9twnoa8f9rjvldf7kb56q1m</strong></li>
                            <li>Client Secret: <strong>gSKdYKLd65aQpZGrq9x4QVUNnn5C8qqm</strong></li>
                        </ul></li>
                        <li>Copy the file ID from <strong>My Projects</strong> tab</li>
                        <li>x = box_read(<strong>"file ID from previous step"</strong>)</li>
                        <li>Run analysis on the file</li>
                        <li>hist(x$bYear)</li>
                    </ol>-->
                </div>
            </div>
        </div>
    `;
}

export const approvedData = () => {
    return `
    <div class="general-bg padding-bottom-1rem">
        <div class="container body-min-height">
            <div class="main-summary-row">
                <div class="align-left">
                    <h1 class="page-header">Approved Data Requests</h1>
                </div>
            </div>
            <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
                Testing
            </div>
        </div>
    </div>
    `
}