export const instruction = () => {
  return `
        <div class="general-bg padding-bottom-1rem">
            <div class="container body-min-height">
                <div class="main-summary-row">
                    <div class="align-left">
                        <h1 class="page-header">Uploading Publication Data to the DCEG Publication Data Repository (PDR)</h1>
                    </div>
                </div>
                <div class="main-summary-row white-bg div-border">
                    <div class="col font-size-18 align-left">
                        </br>
                        <div><b>NOTE: Before you can upload data to the DCEG PDR you need to have an approved <a href="https://nih.sharepoint.com/sites/NCI-DCEG-myDCEG/SitePages/Data-Sharing-and-Management-(DSM)-Policy.aspx/" target="__blank"> data sharing and management (DSM)
                        </a> plan and an <a href="https://nih.sharepoint.com/sites/NCI-DCEG-myDCEG/SitePages/Data-Sharing-and-Management-(DSM)-Policy.aspx" target="__blank"> Institutional Certificate (IC)</a> for the data you are uploading. </b>
                        </br>
                        Questions about the DCEG PDR can be emailed to <a href="mailto:nci_dceg_pdr@mail.nih.gov">nci_dceg_pdr@mail.nih.gov</a>
                        <h2 class="page-header"> Data upload Process(PDR)</h2>
                        <ol>
                            </br>
                        <li><b> Log into the DCEG PDR</b>
                                <p>The PDR is accessible through the <a href="https://episphere.github.io/dataplatform/#home">DCEG Epidemiology Data Platforms website</a>. Select <b>(a)</b> "PDR Log in" to <b>(b)</b> enter your NIH Box log in credentials. <b>(c)</b> Select "Grant access to Box" when prompted. </p>
                                <b>(a)</b> <img src="static/images/logina.png" alt="Instruction step 1" height="400">
                            </br></br>
                                <b>(b)</b> <img src="static/images/loginb.png" alt="Instruction step 2" height="250">
                            </br></br>
                                <b>(c)</b> <img src="static/images/loginc.png" alt="Instruction step 3" height="400">
                        </li>
                            </br>
                        <li> Select “Upload new Data” under the DCEG Investigators drop-down menu.
                            </br>
                            <img src="static/images/uploadnewdata.png" alt="Instruction step 4">
                            </br>
                        </li>
                        </br>
                        
                        <li>Select the approved data management Sharing (DMS) plan for your data. This can either be a specific DMS for your publication data or a DMS for the study(ies) that generated the data you are uploading.
                            </br>
                            <img src="static/images/selectDMS.png" alt="Instruction step 5">
                            </br>
                        </li>

                        </br>
                        <li>Review the data use limitations and restrictions that are associated with the selected DMS plan, and then select “Next” once confirmed.
                            </br>
                        <img src="static/images/reviewDUL.png" alt="Instruction step 6">
                        </br>
                        </li>
                        </br>
                        <li>Provide information about your manuscript and the journal in which it is being published. Please provide the journal acronym that is used by the <a href="https://www.ncbi.nlm.nih.gov/nlmcatalog/journals/"> National Library of Medicine Catalog </a>. The information provided in this section will be used to create a Box folder that will store the data and metadata being uploaded to the PDR.
                        </br>
                        <img src="static/images/journal.png" alt="Instruction step 7">
                        </li>
                        </br>
                        <li>Select the data and metadata that is being uploaded to the PDR. Provide a file description for each of the files that are being uploaded. Note, the description will be viewable by all approved researchers that are given access to the data/metadata. 
                            </br>Data uploaded to the PDR should uploaded in non-proprietary file formats (e.g. CSV or TXT files, not SAS data files), and data dictionaries should be shared in machine-readable file formats (PDF files will not be allowed for sharing data dictionaries.
                            </br>
                            <img src="static/images/uploadData.png" alt="Instruction step 8">
                        </li>
                        </br>
                        <li>
                            Review that your data/metadata were properly uploaded to Box.
                            </br>
                            <img src="static/images/successUpload.png" alt="Instruction step 9">
                        </li>
                        </ol>
                    <div>
                <div>
            <div>
        <div>
    `;
}

