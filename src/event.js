<<<<<<< HEAD
import { showAnimation, removeActiveClass, uploadFile, createFolder, getCollaboration, addNewCollaborator, removeBoxCollaborator, notificationTemplate, updateBoxCollaborator, getFolderItems, consortiumSelection, filterStudies, filterDataTypes, filterFiles, copyFile, hideAnimation, getFileAccessStats, uploadFileVersion, getFile, csv2Json, json2csv, publicDataFileId, summaryStatsFileId, getFileInfo, missingnessStatsFileId, assignNavbarActive, reSizePlots } from './shared.js';
import { renderDataSummary } from './pages/about.js';
import { variables } from './variables.js';
import { template as dataGovernanceTemplate, addFields, dataGovernanceLazyLoad, dataGovernanceCollaboration, dataGovernanceProjects } from './pages/dataGovernance.js';
import { myProjectsTemplate } from './pages/myProjects.js';
import { createProjectModal } from './components/modal.js';
import { getSelectedStudies, renderAllCharts, updateCounts } from './visualization.js';

=======
import {
    showAnimation,
    removeActiveClass,
    uploadFile,
    createFolder,
    getCollaboration,
    addNewCollaborator,
    removeBoxCollaborator,
    notificationTemplate,
    updateBoxCollaborator,
    getFolderItems,
    consortiumSelection,
    filterStudies,
    filterDataTypes,
    filterFiles,
    copyFile,
    hideAnimation,
    getFileAccessStats,
    uploadFileVersion,
    getFile,
    csv2Json,
    json2csv,
    publicDataFileId,
    summaryStatsFileId,
    getFileInfo,
    missingnessStatsFileId,
    assignNavbarActive,
    reSizePlots,
    showComments
} from './shared.js';
import {
    renderDataSummary
} from './pages/about.js';
import {
    variables
} from './variables.js';
import {
    template as dataGovernanceTemplate,
    addFields,
    dataGovernanceLazyLoad,
    dataGovernanceCollaboration,
    dataGovernanceProjects
} from './pages/dataGovernance.js';
import {
    myProjectsTemplate
} from './pages/myProjects.js';
import {
    createProjectModal
} from './components/modal.js';
import {
    getSelectedStudies,
    renderAllCasesCharts,
    renderAllCharts,
    updateCounts
} from './visualization.js';

import {
    showPreview
} from './components/boxPreview.js';
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
let top = 0;

export const addEventStudyRadioBtn = () => {
    const createStudyRadio = document.getElementsByName('createStudyRadio');
    Array.from(createStudyRadio).forEach(element => {
        element.addEventListener('click', () => {
<<<<<<< HEAD
            if(element.checked){
                if(element.value === 'no'){
=======
            if (element.checked) {
                if (element.value === 'no') {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                    const studyFormElements = document.getElementById('studyFormElements');
                    const selectConsortiaUIS = document.getElementById('selectConsortiaUIS');
                    studyFormElements.innerHTML = `
                        <div class="form-group">
<<<<<<< HEAD
                            <label for="selectStudyUIS">Select study</label> <span class="required">*</span>
=======
                            <label for="selectStudyUIS">Select folder</label> <span class="required">*</span>
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                            <select class="form-control" id="selectStudyUIS" name="selectedStudy" required></select>
                        </div>
                        <div class="form-group">
                            <label for="uploadDataUIS">Submit data</label> <span class="required">*</span>
                            <input type="file" class="form-control-file" id="uploadDataUIS" name="dataFile" required>
                        </div>
                    `;
<<<<<<< HEAD
                    if(selectConsortiaUIS.value) selectConsortiaUIS.dispatchEvent(new Event('change'));
                }
                else{
                    const studyFormElements = document.getElementById('studyFormElements');
                    studyFormElements.innerHTML = `
                        <div class="form-group">
                            <label for="newStudyName">Study Name</label> <span class="required">*</span>
                            <input type="text" id="newStudyName" autocomplete="off" required class="form-control" placeholder="Enter study name">
=======
                    if (selectConsortiaUIS.value) selectConsortiaUIS.dispatchEvent(new Event('change'));
                } else {
                    const studyFormElements = document.getElementById('studyFormElements');
                    studyFormElements.innerHTML = `
                        <div class="form-group">
                            <label for="newStudyName">Folder Name</label> <span class="required">*</span>
                            <input type="text" id="newStudyName" autocomplete="off" required class="form-control" placeholder="Enter folder name">
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                        </div>
                        <div class="form-group">
                            <label for="uploadDataUIS">Submit data</label> <span class="required">*</span>
                            <input type="file" class="form-control-file" id="uploadDataUIS" name="dataFile" required>
                        </div>
                    `;
                }
            }
        });
    });
}

export const addEventConsortiaSelect = () => {
    const element = document.getElementById('selectConsortiaUIS');
<<<<<<< HEAD
    if(!element) return
    element.addEventListener('change', async () => {
        const selectStudyUIS = document.getElementById('selectStudyUIS');
        if(!selectStudyUIS) return;
        const value = element.value;
        if(!value) {
=======
    if (!element) return
    element.addEventListener('change', async () => {
        const selectStudyUIS = document.getElementById('selectStudyUIS');
        if (!selectStudyUIS) return;
        const value = element.value;
        if (!value) {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            Array.from(selectStudyUIS.options).forEach(option => {
                selectStudyUIS.remove(option);
            })
            return;
        }
<<<<<<< HEAD
        
        let entries = (await getFolderItems(value)).entries;
        
        // check if study document exists
        const documentExists = entries.filter(dt => dt.name.trim().toLowerCase() === 'bcrp data from studies');
        if(documentExists.length === 1){
            entries = (await getFolderItems(documentExists[0].id)).entries;
        }
        
        selectStudyUIS.innerHTML = '';
        const firstOption = document.createElement('option');
        firstOption.value = '';
        firstOption.text = '-- Select study --'
        selectStudyUIS.appendChild(firstOption);
        entries = filterStudies(entries);
        for(let obj of entries){
=======

        let entries = (await getFolderItems(value)).entries;

        // check if study document exists
        const documentExists = entries.filter(dt => dt.name.trim().toLowerCase() === 'BCRPP data from studies');
        if (documentExists.length === 1) {
            entries = (await getFolderItems(documentExists[0].id)).entries;
        }

        selectStudyUIS.innerHTML = '';
        const firstOption = document.createElement('option');
        firstOption.value = '';
        firstOption.text = '-- Select folder --'
        selectStudyUIS.appendChild(firstOption);
        entries = filterStudies(entries);
        for (let obj of entries) {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            const option = document.createElement('option');
            option.value = obj.id;
            option.text = obj.name;
            selectStudyUIS.appendChild(option);
        };
    });
}

export const addEventUploadStudyForm = () => {
    const form = document.getElementById('uploadStudyForm');
<<<<<<< HEAD
    if(!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const file = document.getElementById('uploadDataUIS').files[0]; 
        const fileName = file.name;
        const fileType = fileName.slice(fileName.lastIndexOf('.')+1, fileName.length);
        if(fileType !== 'txt') {
=======
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const file = document.getElementById('uploadDataUIS').files[0];
        const fileName = file.name;
        const fileType = fileName.slice(fileName.lastIndexOf('.') + 1, fileName.length);
        if (fileType !== 'txt') {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            alert('File type not supported!');
            return;
        }
        const consortia = document.getElementById('selectConsortiaUIS');
        const consortiaText = consortia.options[consortia.selectedIndex].text;
        const study = document.getElementById('selectStudyUIS');
        const newStudyName = document.getElementById('newStudyName');
        const studyName = newStudyName ? newStudyName.value : study.options[study.selectedIndex].text;
        const r = confirm(`Upload ${fileName} in ${consortiaText} >> ${studyName}?`);
<<<<<<< HEAD
        if(r){
            document.getElementById('submitBtn').classList.add('btn-disbaled');
            document.getElementById('submitBtn').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Performing QAQC...`;
            
            let fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent){
                const textFromFileLoaded = fileLoadedEvent.target.result;
                
=======
        if (r) {
            document.getElementById('submitBtn').classList.add('btn-disbaled');
            //document.getElementById('submitBtn').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Performing QAQC...`;

            let fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                const textFromFileLoaded = fileLoadedEvent.target.result;

>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                performQAQC(textFromFileLoaded, fileName);
            };
            fileReader.readAsText(file, "UTF-8");
        }
    })
}

const separateData = async (qaqcFileName, textFromFileLoaded, fileName) => {
    const consortia = document.getElementById('selectConsortiaUIS');
    const consortiaId = consortia.value;
    const study = document.getElementById('selectStudyUIS');
    const newStudyName = document.getElementById('newStudyName');
    let studyId;
<<<<<<< HEAD
    if(study){
        studyId = study.value;
    }
    else if (newStudyName) {
        document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating new study...`;
        const entries = (await getFolderItems(consortiaId)).entries;
        const studyFolders = entries.filter(dt => dt.type === 'folder' && dt.name.trim().toLowerCase() === 'confluence data from studies');
        const response = await createFolder(`${studyFolders.length === 0 ? consortiaId : studyFolders[0].id}`, newStudyName.value);
        if(response.status !== 201 ) return
=======
    if (study) {
        studyId = study.value;
    } else if (newStudyName) {
        //document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating new folder...`;
        const entries = (await getFolderItems(consortiaId)).entries;
        const studyFolders = entries.filter(dt => dt.type === 'folder' && dt.name.trim().toLowerCase() === 'bcrpp data from studies');
        const response = await createFolder(`${studyFolders.length === 0 ? consortiaId : studyFolders[0].id}`, newStudyName.value);
        if (response.status !== 201) return
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        const data = await response.json();
        studyId = data.id;
    }
    const dataEntries = (await getFolderItems(studyId)).entries;
<<<<<<< HEAD
    document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Checking folders...`;
    let logFolderID = '', cDataFolderID = '', pDataFolderID = '', rfDataFolderID = '', stDataFolderID = '';
    logFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Submission_Logs');
    cDataFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Core Data');
    pDataFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Pathology Data');
    rfDataFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Risk Factor Data');
    stDataFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Survival and Treatment Data');
    document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Separating data...`;
    let rows = textFromFileLoaded.split(/\n/g).map(tx=>tx.split(/\t/g));
=======
    //document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Checking folders...`;
    let logFolderID = '',
        cDataFolderID = ''; //, pDataFolderID = '', rfDataFolderID = '', stDataFolderID = '';
    logFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Submission_Logs');
    cDataFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Core Data');
    //pDataFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Incident Breast Cancer Data');
    //rfDataFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Mammographic Density Data');
    //stDataFolderID = await existsOrCreateNewFolder(dataEntries, studyId, 'Summary Results');
    //document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Separating data...`;
    let rows = textFromFileLoaded.split(/\n/g).map(tx => tx.split(/\t/g));
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
    const headings = rows[0];
    rows.splice(0, 1);
    let obj = rows.map(el => {
        let obj = {};
        for (let i = 0; i < el.length; i++) {
<<<<<<< HEAD
        obj[headings[i].trim()] = el[i];
        }
        return obj;
    });
    
    const masterFile = variables.masterFile;
    const core = masterFile.core.map(att => att.toLowerCase());
    const pathology = masterFile.pathology.map(att => att.toLowerCase());
    const riskFactor = masterFile.riskFactor.map(att => att.toLowerCase());
    const survivalTreatment = masterFile.survivalAndTreatment.map(att => att.toLowerCase());
    
    let coreData = [];
    let pathologyData = [];
    let rfData = [];
    let stData = [];
    
    obj.forEach(data => {
        let cObj = {};
        let pObj = {};
        let rfObj = {};
        let stObj = {};

        for(const key in data){
            if(core.indexOf(key.toLowerCase()) !== -1){
                cObj[key] = data[key];
            }

            if(pathology.indexOf(key.toLowerCase()) !== -1){
                pObj[key] = data[key];
            }
            
            if(riskFactor.indexOf(key.toLowerCase()) !== -1){
                rfObj[key] = data[key];
            }

            if(survivalTreatment.indexOf(key.toLowerCase()) !== -1){
                stObj[key] = data[key];
            }
        }

        if(Object.keys(cObj).length > 0) coreData.push(cObj);
        if(Object.keys(pObj).length > 0) pathologyData.push(pObj);
        if(Object.keys(rfObj).length > 0) rfData.push(rfObj);
        if(Object.keys(stObj).length > 0) stData.push(stObj);
    });
    // Upload Data
    document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading data...`;
    const response1 = await uploadFile(coreData, `${fileName.slice(0, fileName.lastIndexOf('.'))}_Core_Data.json`, cDataFolderID);
    
    if(response1.status === 409) {
        const conflictFileId = response1.json.context_info.conflicts.id;
        document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading new version...`;
        await uploadFileVersion(coreData, conflictFileId, 'application/json');
    }
    const response2 = await uploadFile(pathologyData, `${fileName.slice(0, fileName.lastIndexOf('.'))}_Pathology_Data.json`, pDataFolderID);
    if(response2.status === 409) {
        const conflictFileId = response2.json.context_info.conflicts.id;
        document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading new version...`;
        await uploadFileVersion(pathologyData, conflictFileId, 'application/json');
    }
    const response3 = await uploadFile(rfData, `${fileName.slice(0, fileName.lastIndexOf('.'))}_Risk_Factor_Data.json`, rfDataFolderID);
    if(response3.status === 409) {
        const conflictFileId = response3.json.context_info.conflicts.id;
        document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading new version...`;
        await uploadFileVersion(rfData, conflictFileId, 'application/json');
    }
    const response4 = await uploadFile(stData, `${fileName.slice(0, fileName.lastIndexOf('.'))}_Survival_and_Treatment_Data.json`, stDataFolderID);
    if(response4.status === 409) {
        const conflictFileId = response4.json.context_info.conflicts.id;
        document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading new version...`;
        await uploadFileVersion(stData, conflictFileId, 'application/json');
    }

    // Upload Submission logs
    document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading QAQC report...`;
    const elHtml = document.getElementById('qaqcSubmissionReport').innerHTML;
    await uploadFile(elHtml, qaqcFileName, logFolderID, true)
    
=======
            obj[headings[i].trim()] = el[i];
        }
        return obj;
    });

    const masterFile = variables.masterFile;
    const core = masterFile.core.map(att => att.toLowerCase());
    //const pathology = masterFile.pathology.map(att => att.toLowerCase());
    //const riskFactor = masterFile.riskFactor.map(att => att.toLowerCase());
    //const survivalTreatment = masterFile.survivalAndTreatment.map(att => att.toLowerCase());

    let coreData = [];
    //let pathologyData = [];
    //let rfData = [];
    //let stData = [];

    obj.forEach(data => {
        let cObj = {};
        //let pObj = {};
        //let rfObj = {};
        //let stObj = {};

        for (const key in data) {
            if (core.indexOf(key.toLowerCase()) !== -1) {
                cObj[key] = data[key];
            }

            // if(pathology.indexOf(key.toLowerCase()) !== -1){
            //     pObj[key] = data[key];
            // }

            // if(riskFactor.indexOf(key.toLowerCase()) !== -1){
            //     rfObj[key] = data[key];
            // }

            // if(survivalTreatment.indexOf(key.toLowerCase()) !== -1){
            //     stObj[key] = data[key];
            // }
        }

        if (Object.keys(cObj).length > 0) coreData.push(cObj);
        // if(Object.keys(pObj).length > 0) pathologyData.push(pObj);
        // if(Object.keys(rfObj).length > 0) rfData.push(rfObj);
        // if(Object.keys(stObj).length > 0) stData.push(stObj);
    });
    // Upload Data
    //document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading data...`;
    const response1 = await uploadFile(coreData, `${fileName.slice(0, fileName.lastIndexOf('.'))}_Core_Data.json`, cDataFolderID);

    // if(response1.status === 409) {
    //     const conflictFileId = response1.json.context_info.conflicts.id;
    //     document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading new version...`;
    //     await uploadFileVersion(coreData, conflictFileId, 'application/json');
    // }
    // const response2 = await uploadFile(pathologyData, `${fileName.slice(0, fileName.lastIndexOf('.'))}_Pathology_Data.json`, pDataFolderID);
    // if(response2.status === 409) {
    //     const conflictFileId = response2.json.context_info.conflicts.id;
    //     document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading new version...`;
    //     await uploadFileVersion(pathologyData, conflictFileId, 'application/json');
    // }
    // const response3 = await uploadFile(rfData, `${fileName.slice(0, fileName.lastIndexOf('.'))}_Risk_Factor_Data.json`, rfDataFolderID);
    // if(response3.status === 409) {
    //     const conflictFileId = response3.json.context_info.conflicts.id;
    //     document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading new version...`;
    //     await uploadFileVersion(rfData, conflictFileId, 'application/json');
    // }
    // const response4 = await uploadFile(stData, `${fileName.slice(0, fileName.lastIndexOf('.'))}_Survival_and_Treatment_Data.json`, stDataFolderID);
    // if(response4.status === 409) {
    //     const conflictFileId = response4.json.context_info.conflicts.id;
    //     document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading new version...`;
    //     await uploadFileVersion(stData, conflictFileId, 'application/json');
    // }

    // Upload Submission logs
    //document.getElementById('continueSubmission').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading QAQC report...`;
    //const elHtml = document.getElementById('qaqcSubmissionReport').innerHTML;
    //await uploadFile(elHtml, qaqcFileName, logFolderID, true)

>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
    location.reload();
}

const existsOrCreateNewFolder = async (dataEntries, studyId, folderName) => {
    const folderExists = dataEntries.filter(dt => dt.type === "folder" && dt.name === folderName);
    let ID = '';
<<<<<<< HEAD
    if(folderExists.length === 0) {
        ID = (await (await createFolder(studyId, folderName)).json()).id;
    }
    else {
=======
    if (folderExists.length === 0) {
        ID = (await (await createFolder(studyId, folderName)).json()).id;
    } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        ID = folderExists[0].id;
    }
    return ID;
}

const performQAQC = async (textFromFileLoaded, fileName) => {
<<<<<<< HEAD
    document.getElementById('uploadErrorReport').innerHTML = `
        <div id="qaqcSubmissionReport" class="qaqc-submission-report">
            ${runQAQC(dataForQAQC(textFromFileLoaded))}
        </div>
    `;
    
    const submitBtn = document.getElementById('submitBtn');
    
    const newBtn = document.createElement('button');
    newBtn.id = "continueSubmission";
    newBtn.classList = ["btn btn-light"];
    newBtn.title = "Continue Submission";
    newBtn.innerHTML = 'Submit';
    newBtn.type = "button";

    const downloadAndClose = document.createElement('button');
    downloadAndClose.classList = ['btn btn-dark'];
    downloadAndClose.id = 'downloadQAQCReport';
    downloadAndClose.title = 'Download Report and Close';
    downloadAndClose.innerHTML = 'Download Report and Close';
    newBtn.type = 'button';

    const closeBtn = submitBtn.parentNode.querySelectorAll('[data-dismiss="modal"]')[0];
    closeBtn.parentNode.replaceChild(downloadAndClose, closeBtn)
    submitBtn.parentNode.replaceChild(newBtn, submitBtn);
    
    const fileNameQAQC = `${fileName.substr(0, fileName.lastIndexOf('.'))}_qaqc_${new Date().toISOString()}.html`
    addEventDownloadQAQCReport(fileNameQAQC);
=======
    // document.getElementById('uploadErrorReport').innerHTML = `
    //     <div id="qaqcSubmissionReport" class="qaqc-submission-report">
    //         ${runQAQC(dataForQAQC(textFromFileLoaded))}
    //     </div>
    // `;

    // const submitBtn = document.getElementById('submitBtn');

    // const newBtn = document.createElement('button');
    // newBtn.id = "continueSubmission";
    // newBtn.classList = ["btn btn-light"];
    // newBtn.title = "Continue Submission";
    // newBtn.innerHTML = 'Submit';
    // newBtn.type = "button";

    // const downloadAndClose = document.createElement('button');
    // downloadAndClose.classList = ['btn btn-dark'];
    // downloadAndClose.id = 'downloadQAQCReport';
    // downloadAndClose.title = 'Download Report and Close';
    // downloadAndClose.innerHTML = 'Download Report and Close';
    // newBtn.type = 'button';

    //const closeBtn = submitBtn.parentNode.querySelectorAll('[data-dismiss="modal"]')[0];
    //closeBtn.parentNode.replaceChild(downloadAndClose, closeBtn)
    //submitBtn.parentNode.replaceChild(newBtn, submitBtn);

    const fileNameQAQC = `${fileName.substr(0, fileName.lastIndexOf('.'))}_qaqc_${new Date().toISOString()}.html`
    //addEventDownloadQAQCReport(fileNameQAQC);
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
    addEventContinueSubmission(fileNameQAQC, textFromFileLoaded, fileName);
}

const addEventDownloadQAQCReport = (fileName) => {
    const element = document.getElementById('downloadQAQCReport');
    element.addEventListener('click', () => {
        const elHtml = document.getElementById('qaqcSubmissionReport').innerHTML;
        const link = document.createElement('a');
        const mimeType = 'text/html';

        link.setAttribute('download', fileName);
<<<<<<< HEAD
        link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
=======
        link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        link.click();

        replaceBtns();
        document.getElementById('uploadInStudy').querySelectorAll('.close.modal-close-btn')[0].click();
    });
}

const replaceBtns = () => {
    const element = document.getElementById('downloadQAQCReport');
    const closeBtn = document.createElement('button');
    closeBtn.classList = ['btn btn-dark'];
    closeBtn.title = 'Close';
    closeBtn.innerHTML = 'Close';
    closeBtn.type = 'button';
    closeBtn.dataset.dismiss = 'modal';

    element.parentNode.replaceChild(closeBtn, element);

    const continueBtn = document.getElementById('continueSubmission');
    const submitBtn = document.createElement('button');
    submitBtn.classList = ['btn btn-light'];
    submitBtn.id = 'submitBtn';
    submitBtn.title = 'Submit';
    submitBtn.innerHTML = 'run QAQC';
    submitBtn.type = 'Submit';

    continueBtn.parentNode.replaceChild(submitBtn, continueBtn);
}

const addEventContinueSubmission = (qaqcFileName, textFromFileLoaded, fileName) => {
    const element = document.getElementById('continueSubmission');
<<<<<<< HEAD
    element.addEventListener('click', async () => {
        element.classList.add('btn-disbaled');
        separateData(qaqcFileName, textFromFileLoaded, fileName);
    });
=======
    // element.addEventListener('click', async () => {
    //     element.classList.add('btn-disbaled');
    separateData(qaqcFileName, textFromFileLoaded, fileName);
    //});
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
}

const dataForQAQC = (txt) => {
    let data = {};
<<<<<<< HEAD
    if(txt.slice(0,1)=='['){txt='{'+txt+'}'}
    if(txt.slice(0,1)=='{'){
        data = JSON.parse(txt);
        return data
    }else{
        let arr =txt.split(/[\r\n]+/g).map(row=>{  // data array
            //if(row[0]=='    '){row='undefined   '+row}
            return row.replace(/"/g, '').split(/[,\t]/g) // split csv and tsv alike
        })
        if(arr.slice(-1).toLocaleString()==""){arr.pop()}
=======
    if (txt.slice(0, 1) == '[') {
        txt = '{' + txt + '}'
    }
    if (txt.slice(0, 1) == '{') {
        data = JSON.parse(txt);
        return data
    } else {
        let arr = txt.split(/[\r\n]+/g).map(row => { // data array
            //if(row[0]=='    '){row='undefined   '+row}
            return row.replace(/"/g, '').split(/[,\t]/g) // split csv and tsv alike
        })
        if (arr.slice(-1).toLocaleString() == "") {
            arr.pop()
        }
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        const labels = arr[0]
        labels.forEach((label) => {
            data[label] = []
        })
<<<<<<< HEAD
        arr.slice(1).forEach((row,i) => {
            labels.forEach((label,j) => {
                data[label][i]=row[j]
=======
        arr.slice(1).forEach((row, i) => {
            labels.forEach((label, j) => {
                data[label][i] = row[j]
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            })
        })
        labels.forEach(label => {
            data[label] = numberType(data[label])
        })
        return data;
    }
}

const numberType = aa => { // try to fit numeric typing
<<<<<<< HEAD
    let tp='number'
    aa.forEach(a=>{
        if(!((a==parseFloat(a))||(a=='undefined')||(a==''))){
            tp='string'
        }
    })
    if(tp=='number'){
        aa=aa.map(a=>{
            if(a=='undefined'||a==''){
                a=undefined
            }else{
                a=parseFloat(a)
=======
    let tp = 'number'
    aa.forEach(a => {
        if (!((a == parseFloat(a)) || (a == 'undefined') || (a == ''))) {
            tp = 'string'
        }
    })
    if (tp == 'number') {
        aa = aa.map(a => {
            if (a == 'undefined' || a == '') {
                a = undefined
            } else {
                a = parseFloat(a)
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            }
            return a
        })
    }
    return aa
}

export const addEventShowAllCollaborator = () => {
    const btn1 = document.getElementById('addNewCollaborators');
    const btn2 = document.getElementById('listCollaborators');
    const folderToShare = document.getElementById('folderToShare');
    btn2.addEventListener('click', async () => {
<<<<<<< HEAD
        if(btn2.classList.contains('active-tab')) return;
=======
        if (btn2.classList.contains('active-tab')) return;
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        const ID = folderToShare.dataset.folderId;
        const folderName = folderToShare.dataset.folderName;
        const type = folderToShare.dataset.objectType;
        btn2.classList.add('active-tab');
        btn1.classList.remove('active-tab');
        const collaboratorModalBody = document.getElementById('collaboratorModalBody');
        collaboratorModalBody.innerHTML = ``;
<<<<<<< HEAD
        const response = await getCollaboration(ID,`${type}s`);
        const userPermission = checkPermissionLevel(response);
        let table = '';
        let allEntries = [];
        if(response && response.entries.length > 0){
            let entries = response.entries;
            
=======
        const response = await getCollaboration(ID, `${type}s`);
        const userPermission = checkPermissionLevel(response);
        let table = '';
        let allEntries = [];
        if (response && response.entries.length > 0) {
            let entries = response.entries;

>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            entries.forEach(entry => {
                const name = !entry.invite_email ? entry.accessible_by.name : '';
                const email = !entry.invite_email ? entry.accessible_by.login : entry.invite_email;
                const role = entry.role;
                const status = entry.status;
                const id = entry.id;
                // const folderName = entry.item.name;
                const addedBy = `${entry.created_by.name}`;
                const addedAt = (new Date(entry.created_at)).toLocaleString();
<<<<<<< HEAD
                allEntries.push({name, email, role, status, addedBy, addedAt, id, folderName});
=======
                allEntries.push({
                    name,
                    email,
                    role,
                    status,
                    addedBy,
                    addedAt,
                    id,
                    folderName
                });
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            });
            allEntries = allEntries.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));

            table += `
                <div class="row mb-3">
                    <div class="col"><strong>${folderName}</strong></div>
                    <div class="col">
                        <div class="input-group">
                            <input type="search" class="form-control rounded pt-0 pb-0" style="font-size:0.75rem" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="searchCollaborators" aria-describedby="search-addon">
                            <span class="input-group-text border-0 search-input-collaborator">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <table id="collaboratorsList" class="table table-borderless table-striped collaborator-table"></table>
            `;
<<<<<<< HEAD
        }
        else{
=======
        } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            table = 'Collaborators not found!'
        }
        collaboratorModalBody.innerHTML = `
            <div class="modal-body allow-overflow">${table}</div>
            <div class="modal-footer">
                <button type="button" title="Close" class="btn btn-dark" data-dismiss="modal">Close</button>
            </div>
        `;
        renderCollaboratorsList(allEntries, userPermission);
        addEventSearchCollaborators(allEntries, userPermission);
    });
};

const renderCollaboratorsList = (allEntries, userPermission) => {
<<<<<<< HEAD
    if(allEntries.length === 0 ) {
        document.getElementById('collaboratorsList').innerHTML = 'Collaborators not found!';
        return;
    }
    if(!document.getElementById('collaboratorsList')) return;
=======
    if (allEntries.length === 0) {
        document.getElementById('collaboratorsList').innerHTML = 'Collaborators not found!';
        return;
    }
    if (!document.getElementById('collaboratorsList')) return;
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
    let table = `
        <thead>
            <tr>
                <th>Name <button class="transparent-btn sort-column" data-column-name="name" data-order-by="asc"><i class="fas fa-sort"></i></button></th>
                <th>Email <button class="transparent-btn sort-column" data-column-name="email" data-order-by="asc"><i class="fas fa-sort"></i></button></th>
                <th>Role <button class="transparent-btn sort-column" data-column-name="role" data-order-by="asc"><i class="fas fa-sort"></i></button></th>
                <th>Added by <button class="transparent-btn sort-column" data-column-name="addedBy" data-order-by="asc"><i class="fas fa-sort"></i></button></th>
                <th>Added at <button class="transparent-btn sort-column" data-column-name="addedAt" data-order-by="asc"><i class="fas fa-sort"></i></button></th>
                <th></th>
            </tr>
        </thead>
        <tbody id="tBodyCollaboratorList"></tbody>
    `;
    document.getElementById('collaboratorsList').innerHTML = table;
    renderCollaboratorListTBody(allEntries, userPermission);
    addEventSortTable(allEntries, userPermission);
}

const renderCollaboratorListTBody = (allEntries, userPermission) => {
    let tbody = '';
    allEntries.forEach(entry => {
<<<<<<< HEAD
        const { name, email, role, addedBy, addedAt, id, folderName} = entry;
=======
        const {
            name,
            email,
            role,
            addedBy,
            addedAt,
            id,
            folderName
        } = entry;
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        const userName = JSON.parse(localStorage.parms).name
        tbody += `<tr>
                    <td title="${name}">${name.length > 20 ? `${name.slice(0, 20)}...` : `${name}`}</td>
                    <td title="${email}">${email.length > 20 ? `${email.slice(0, 20)}...` : `${email}`}</td>
                    <td>${email !== JSON.parse(localStorage.parms).login && userPermission && updatePermissionsOptions(userPermission, role) && userName === addedBy ? `
                    <select title="Update permission" data-collaborator-id="${id}" data-previous-permission="${role}" data-collaborator-name="${name}" data-collaborator-login="${email}" class="form-control updateCollaboratorRole">${updatePermissionsOptions(userPermission, role)}</select>
                ` : `${role}`}</td>
                    <td title="${addedBy}">${addedBy.length > 20 ? `${addedBy.slice(0, 20)}...` : `${addedBy}`}</td>
                    <td title="${new Date(addedAt).toLocaleString()}">${new Date(addedAt).toDateString()}</td>
                    <td>${addedBy === userName ? `<button class="removeCollaborator" title="Remove collaborator" data-collaborator-id="${id}" data-email="${email}" data-collaborator-name="${name}" data-folder-name="${folderName}"><i class="fas fa-user-minus"></i></button>` : ``}</td>
                </tr>`
    });
    document.getElementById('tBodyCollaboratorList').innerHTML = tbody;
    addEventRemoveCollaborator();
    addEventUpdateCollaborator();
}

const addEventSortTable = (allEntries, userPermission) => {
    const elements = Array.from(document.getElementsByClassName('sort-column'));
    elements.forEach(element => {
        element.addEventListener('click', () => {
            const columnName = element.dataset.columnName;
            const orderBy = element.dataset.orderBy;
<<<<<<< HEAD
            if(orderBy === 'desc') {
                element.dataset.orderBy = 'asc';
                renderCollaboratorListTBody(allEntries.sort((a,b) => (a[columnName] < b[columnName]) ? 1 : ((b[columnName] < a[columnName]) ? -1 : 0)), userPermission)
            }
            else{
                element.dataset.orderBy = 'desc';
                renderCollaboratorListTBody(allEntries.sort((a,b) => (a[columnName] > b[columnName]) ? 1 : ((b[columnName] > a[columnName]) ? -1 : 0)), userPermission)
=======
            if (orderBy === 'desc') {
                element.dataset.orderBy = 'asc';
                renderCollaboratorListTBody(allEntries.sort((a, b) => (a[columnName] < b[columnName]) ? 1 : ((b[columnName] < a[columnName]) ? -1 : 0)), userPermission)
            } else {
                element.dataset.orderBy = 'desc';
                renderCollaboratorListTBody(allEntries.sort((a, b) => (a[columnName] > b[columnName]) ? 1 : ((b[columnName] > a[columnName]) ? -1 : 0)), userPermission)
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            }
        })
    })
}

const addEventSearchCollaborators = (allEntries, userPermission) => {
    const search = document.getElementById('searchCollaborators');
    let filteredEntries = allEntries;
    search.addEventListener('input', () => {
        const searchValue = search.value.trim().toLowerCase();
<<<<<<< HEAD
        if(searchValue.length < 3) {
=======
        if (searchValue.length < 3) {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            filteredEntries = allEntries;
            filteredEntries = filteredEntries.map(dt => {
                dt['name'] = dt['name'].replace(/(<b>)|(<\/b>)/g, '');
                dt['email'] = dt['email'].replace(/(<b>)|(<\/b>)/g, '')
                return dt;
            })
            renderCollaboratorsList(filteredEntries, userPermission);
            return;
        }
        filteredEntries = allEntries.filter(dt => dt.name.toLowerCase().replace(/(<b>)|(<\/b>)/g, '').includes(searchValue) || dt.email.toLowerCase().replace(/(<b>)|(<\/b>)/g, '').includes(searchValue));
        filteredEntries = filteredEntries.map(dt => {
            dt['name'] = dt['name'].replace(/(<b>)|(<\/b>)/g, '').replace(new RegExp(searchValue, 'gi'), '<b>$&</b>');
            dt['email'] = dt['email'].replace(/(<b>)|(<\/b>)/g, '').replace(new RegExp(searchValue, 'gi'), '<b>$&</b>');
            return dt;
        })
        renderCollaboratorsList(filteredEntries, userPermission)
    })
}

const updatePermissionsOptions = (userPermission, role) => {
<<<<<<< HEAD
    if ( userPermission === 'owner') return `<option ${role === 'co-owner' ? `selected` : ``} value="co-owner">co-owner</option><option ${role === 'editor' ? `selected` : ``} value="editor">editor</option><option ${role === 'viewer' ? `selected` : ``} value="viewer">viewer</option><option ${role === 'uploader' ? `selected` : ``} value="uploader">uploader</option>`
    else if ( userPermission === 'co-owner') return `<option ${role === 'co-owner' ? `selected` : ``} value="co-owner">co-owner</option><option ${role === 'editor' ? `selected` : ``} value="editor">editor</option><option ${role === 'viewer' ? `selected` : ``} value="viewer">viewer</option><option ${role === 'uploader' ? `selected` : ``} value="uploader">uploader</option>`
    else if ( userPermission === 'editor' && role !== 'co-owner' && role !== 'owner') return `<option ${role === 'editor' ? `selected` : ``} value="editor">editor</option><option ${role === 'viewer' ? `selected` : ``} value="viewer">viewer</option><option ${role === 'uploader' ? `selected` : ``} value="uploader">uploader</option>`;
=======
    if (userPermission === 'owner') return `<option ${role === 'co-owner' ? `selected` : ``} value="co-owner">co-owner</option><option ${role === 'editor' ? `selected` : ``} value="editor">editor</option><option ${role === 'viewer' ? `selected` : ``} value="viewer">viewer</option><option ${role === 'uploader' ? `selected` : ``} value="uploader">uploader</option>`
    else if (userPermission === 'co-owner') return `<option ${role === 'co-owner' ? `selected` : ``} value="co-owner">co-owner</option><option ${role === 'editor' ? `selected` : ``} value="editor">editor</option><option ${role === 'viewer' ? `selected` : ``} value="viewer">viewer</option><option ${role === 'uploader' ? `selected` : ``} value="uploader">uploader</option>`
    else if (userPermission === 'editor' && role !== 'co-owner' && role !== 'owner') return `<option ${role === 'editor' ? `selected` : ``} value="editor">editor</option><option ${role === 'viewer' ? `selected` : ``} value="viewer">viewer</option><option ${role === 'uploader' ? `selected` : ``} value="uploader">uploader</option>`;
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
    else return null;
}

const addEventUpdateCollaborator = () => {
    const updateCollaboratorRole = document.getElementsByClassName('updateCollaboratorRole');
    const showNotification = document.getElementById('showNotification');
    Array.from(updateCollaboratorRole).forEach(element => {
        element.addEventListener('change', async () => {
            const newRole = element.value;
            const prevRole = element.dataset.previousPermission;
            const id = element.dataset.collaboratorId;
            const name = element.dataset.collaboratorName;
            const login = element.dataset.collaboratorLogin;
            const r = confirm(`Update Collaborator ${name || login} Role as ${newRole}?`);
<<<<<<< HEAD
            if(r){
                const response = await updateBoxCollaborator(id, newRole);
                if(response.status === 200) {
                    top = top+2;
                    let template = notificationTemplate(top, `<span class="successMsg">Collaborator Updated</span>`, `Collaborator ${ name || login} role updated as ${newRole} successfully!`);
                    showNotification.innerHTML = template;
                    addEventHideNotification();
                }
                else{
                    element.value = prevRole;    
                }
            }
            else{
=======
            if (r) {
                const response = await updateBoxCollaborator(id, newRole);
                if (response.status === 200) {
                    top = top + 2;
                    let template = notificationTemplate(top, `<span class="successMsg">Collaborator Updated</span>`, `Collaborator ${ name || login} role updated as ${newRole} successfully!`);
                    showNotification.innerHTML = template;
                    addEventHideNotification();
                } else {
                    element.value = prevRole;
                }
            } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                element.value = prevRole;
            }
        })
    })
}

const addEventRemoveCollaborator = () => {
    const removeCollaborator = document.getElementsByClassName('removeCollaborator');
    const showNotification = document.getElementById('showNotification');
    Array.from(removeCollaborator).forEach(element => {
        element.addEventListener('click', async () => {
            const id = element.dataset.collaboratorId;
            const folderName = element.dataset.folderName;
            const email = element.dataset.email;
            const name = element.dataset.collaboratorName;
            const r = confirm(`Remove Collaborator ${ name || email} from ${folderName}?`);
<<<<<<< HEAD
            if(r){
                const response = await removeBoxCollaborator(id);
                if(response.status === 204){
                    top = top+2;
=======
            if (r) {
                const response = await removeBoxCollaborator(id);
                if (response.status === 204) {
                    top = top + 2;
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                    let template = notificationTemplate(top, `<span class="successMsg">Collaborator Removed</span>`, `Collaborator ${ name || email} removed from ${folderName} successfully!`);
                    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
                    showNotification.innerHTML = template;
                    addEventHideNotification();
                }
            }
        });
    });
}

const checkPermissionLevel = (data) => {
<<<<<<< HEAD
    if(data.entries.length === 0) return null;
    const login = localStorage.parms && JSON.parse(localStorage.parms).login ? JSON.parse(localStorage.parms).login : undefined;
    const array = data.entries.filter(d => d.accessible_by && d.accessible_by.login === login);
    if(array.length === 0){
        const newArray = data.entries.filter(d => d.created_by && d.created_by.login === login);
        if(newArray.length > 0) return 'owner';
    }
    else {
=======
    if (data.entries.length === 0) return null;
    const login = localStorage.parms && JSON.parse(localStorage.parms).login ? JSON.parse(localStorage.parms).login : undefined;
    const array = data.entries.filter(d => d.accessible_by && d.accessible_by.login === login);
    if (array.length === 0) {
        const newArray = data.entries.filter(d => d.created_by && d.created_by.login === login);
        if (newArray.length > 0) return 'owner';
    } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        return array[0].role;
    }
    return null;
}

export const addEventAddNewCollaborator = () => {
    const btn1 = document.getElementById('addNewCollaborators');
    const btn2 = document.getElementById('listCollaborators');
    const folderToShare = document.getElementById('folderToShare');
    btn1.addEventListener('click', () => {
        const ID = folderToShare.dataset.folderId;
        const name = folderToShare.dataset.folderName;
        const type = folderToShare.dataset.objectType;
        btn1.classList.add('active-tab');
        btn2.classList.remove('active-tab');
        const collaboratorModalBody = document.getElementById('collaboratorModalBody');
        collaboratorModalBody.innerHTML = `
            <form id="addCollaborationForm" method="POST">
                <div class="modal-body allow-overflow">
                    <div><h5 class="modal-title">Share <strong>${name}</strong></h5></div>
                    <br>
                    <div class="row" id="collaboratorEmails">
                        ${addFields(1)}
                    </div>
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-light" type="button" title="Add more collaborators" id="addMoreEmail" data-counter=1><i class="fas fa-plus"></i> Add</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" title="Submit" class="btn btn-light">Submit</button>
                    <button type="button" title="Close" class="btn btn-dark" data-dismiss="modal">Close</button>
                </div>
            </form>
        `;

        const addMoreEmail = document.getElementById('addMoreEmail');
        addMoreEmail.addEventListener('click', () => {
<<<<<<< HEAD
            const counter = parseInt(addMoreEmail.dataset.counter)+1;
            addMoreEmail.dataset.counter = counter;
            document.getElementById('collaboratorEmails').insertAdjacentHTML("beforeend", addFields(counter));
            if(counter === 5) addMoreEmail.disabled = true;
=======
            const counter = parseInt(addMoreEmail.dataset.counter) + 1;
            addMoreEmail.dataset.counter = counter;
            document.getElementById('collaboratorEmails').insertAdjacentHTML("beforeend", addFields(counter));
            if (counter === 5) addMoreEmail.disabled = true;
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        });

        addEventCollaboratorForm(ID, type, name);
    });
}

const addEventCollaboratorForm = (ID, type, name) => {
    const form = document.getElementById('addCollaborationForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const showNotification = document.getElementById('showNotification');
        let template = '';
<<<<<<< HEAD
        for(let i = 1; i <= 5; i++){
            const email = document.getElementById(`shareFolderEmail${i}`);
            const role = document.getElementById(`folderRole${i}`);
            if(email && role){
                const emails = email.value.split(',');
                for(let index = 0; index < emails.length; index++){
                    const login = emails[index].trim();
                    const response = await addNewCollaborator(ID, type, login, role.value.toLowerCase());
                    top = top+2;
                    if(response.status === 200 || response.status === 201) {
                        template += notificationTemplate(top, `<span class="successMsg">Added new collaborator</span>`, `${login} added to ${name} as ${role.value} successfully!`)
                    }else{
=======
        for (let i = 1; i <= 5; i++) {
            const email = document.getElementById(`shareFolderEmail${i}`);
            const role = document.getElementById(`folderRole${i}`);
            if (email && role) {
                const emails = email.value.split(',');
                for (let index = 0; index < emails.length; index++) {
                    const login = emails[index].trim();
                    const response = await addNewCollaborator(ID, type, login, role.value.toLowerCase());
                    top = top + 2;
                    if (response.status === 200 || response.status === 201) {
                        template += notificationTemplate(top, `<span class="successMsg">Added new collaborator</span>`, `${login} added to ${name} as ${role.value} successfully!`)
                    } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                        template += notificationTemplate(top, `<span class="errorMsg">Error!</span>`, `Could not add ${login} to ${name} as ${role.value}, <span class="errorMsg">${(await response.json()).message}</span>!!`);
                    }
                }
            }
        }
        showNotification.innerHTML = template;
        addEventHideNotification();
    });
}

const addEventHideNotification = () => {
    const hideNotification = document.getElementsByClassName('hideNotification');
    Array.from(hideNotification).forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
<<<<<<< HEAD
            if(top >= 2) top = top-2;
        });
        setTimeout(() => { btn.dispatchEvent(new Event('click')) }, 8000);
=======
            if (top >= 2) top = top - 2;
        });
        setTimeout(() => {
            btn.dispatchEvent(new Event('click'))
        }, 8000);
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
    });
}

export const addEventDataGovernanceNavBar = (bool) => {
    const dataGovernanceElement = document.getElementById('dataGovernance');
<<<<<<< HEAD
    if(!dataGovernanceElement) return;
    dataGovernanceElement.addEventListener('click', async () => {
        // if(dataGovernanceElement.classList.contains('navbar-active')) return;
        showAnimation();
        assignNavbarActive(dataGovernanceElement, 2 );
        document.title = 'BCRP - Data Governance';
        const confluenceDiv = document.getElementById('confluenceDiv');
        // if(bool){
            confluenceDiv.classList.add('general-bg');

            const containerDiv = document.createElement('div');
            containerDiv.classList = ['container padding-bottom-1rem'];

            const headerDiv = document.createElement('div');
            headerDiv.classList = ['main-summary-row'];
            headerDiv.innerHTML = `<div class="align-left">
=======
    if (!dataGovernanceElement) return;
    dataGovernanceElement.addEventListener('click', async () => {
        // if(dataGovernanceElement.classList.contains('navbar-active')) return;
        showAnimation();
        assignNavbarActive(dataGovernanceElement, 2);
        document.title = 'BCRPP - Data Governance';
        const confluenceDiv = document.getElementById('confluenceDiv');
        // if(bool){
        confluenceDiv.classList.add('general-bg');

        const containerDiv = document.createElement('div');
        containerDiv.classList = ['container padding-bottom-1rem'];

        const headerDiv = document.createElement('div');
        headerDiv.classList = ['main-summary-row'];
        headerDiv.innerHTML = `<div class="align-left">
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                                        <h1 class="page-header">Data Governance</h1>
                                    </div>`

        //     const btnDiv = document.createElement('div');
        //     btnDiv.classList = ['align-left create-project-btn'];
        //     btnDiv.innerHTML = `<button id="createProjectBtn" title="Create project" data-toggle="modal" data-target="#createProjectModal" class="btn btn-light">
        //                             <i class="fas fa-project-diagram"></i> Create project
        //                         </button>
        //                         ${createProjectModal()}`;

<<<<<<< HEAD
            const divRow = document.createElement('div');
            divRow.classList = ['main-summary-row white-bg div-border'];
            divRow.id = 'dataGovernanceMain'
            
            const div1 = document.createElement('div');
            div1.classList = ['col-lg-6 align-left'];
            div1.innerHTML = await dataGovernanceTemplate();
            hideAnimation();
            divRow.appendChild(div1);

            // const div2 = document.createElement('div');
            // div2.classList = ['col-lg-6 align-left'];
            // div2.id = 'dataGovernanceProjects';
            // divRow.appendChild(div2);

            confluenceDiv.innerHTML = ``;
            containerDiv.appendChild(headerDiv)
            // containerDiv.appendChild(btnDiv)
            containerDiv.appendChild(divRow)
            confluenceDiv.appendChild(containerDiv);
        //     dataGovernanceProjects();
            dataGovernanceLazyLoad();
        // }
        // else{
            // confluenceDiv.innerHTML = ``;

            // const btnDiv = document.createElement('div');
            // btnDiv.classList = ['align-left create-project-btn'];
            // btnDiv.innerHTML = `<button id="createProjectBtn" title="Create project" data-toggle="modal" data-target="#createProjectModal" class="btn btn-light">
            //                         <i class="fas fa-project-diagram"></i> Create project
            //                     </button>
            //                     ${createProjectModal()}`;
            
            // const div = document.createElement('div');
            // div.classList = ['align-left'];
            // div.innerHTML = await dataGovernanceTemplate();
            // hideAnimation();
            // confluenceDiv.appendChild(btnDiv);
            // confluenceDiv.appendChild(div);
            // dataGovernanceLazyLoad();
        // }
        
=======
        const divRow = document.createElement('div');
        divRow.classList = ['main-summary-row white-bg div-border'];
        divRow.id = 'dataGovernanceMain'

        const div1 = document.createElement('div');
        div1.classList = ['col-lg-6 align-left'];
        div1.innerHTML = await dataGovernanceTemplate();
        hideAnimation();
        divRow.appendChild(div1);

        // const div2 = document.createElement('div');
        // div2.classList = ['col-lg-6 align-left'];
        // div2.id = 'dataGovernanceProjects';
        // divRow.appendChild(div2);

        confluenceDiv.innerHTML = ``;
        containerDiv.appendChild(headerDiv)
        // containerDiv.appendChild(btnDiv)
        containerDiv.appendChild(divRow)
        confluenceDiv.appendChild(containerDiv);
        //     dataGovernanceProjects();
        dataGovernanceLazyLoad();
        // }
        // else{
        // confluenceDiv.innerHTML = ``;

        // const btnDiv = document.createElement('div');
        // btnDiv.classList = ['align-left create-project-btn'];
        // btnDiv.innerHTML = `<button id="createProjectBtn" title="Create project" data-toggle="modal" data-target="#createProjectModal" class="btn btn-light">
        //                         <i class="fas fa-project-diagram"></i> Create project
        //                     </button>
        //                     ${createProjectModal()}`;

        // const div = document.createElement('div');
        // div.classList = ['align-left'];
        // div.innerHTML = await dataGovernanceTemplate();
        // hideAnimation();
        // confluenceDiv.appendChild(btnDiv);
        // confluenceDiv.appendChild(div);
        // dataGovernanceLazyLoad();
        // }

>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        // addEventCreateProjectBtn();
        dataGovernanceCollaboration();
    });
};

const addEventCreateProjectBtn = () => {
    const btn = document.getElementById('createProjectBtn');
    btn.addEventListener('click', async () => {
        const body = document.getElementById('createProjectModalBody');
        body.innerHTML = `
        <form id="createProjectForm" method="POST">
            <label><strong>Project Name</strong> <span class="required">*</span>
                <div class="form-group">
                    <input type="text" class="form-control" id="newProjectName" placeholder="Enter project name" required>
                </div>
            </label>
            
            <div class="form-group" id="consortiumSelection">${await consortiumSelection()}</div>
            <div class="form-group" id="studySelection"></div>
            <div class="form-group" id="dataTypeSelection"></div>
            <div class="form-group" id="fileSelection"></div>

            <div class="form-group">
                <strong>Add collaborator(s)</strong> <span class="required">*</span>
                <div class="row" id="collaboratorEmails">
                    ${addFields(1, true)}
                </div>
            </div>
                
            <div class="row">
                <div class="col"><button title="Add more collaborators" type="button" class="btn btn-light" id="addMoreEmail" data-counter=1><i class="fas fa-plus"></i> Add</button></div>
            </div>
            </br>
        </div>
        <div class="modal-footer">
            <button type="submit" title="Submit" class="btn btn-light">Submit</button>
            <button type="button" title="Close" class="btn btn-dark" data-dismiss="modal">Close</button>
        </form>
        `
        const addMoreEmail = document.getElementById('addMoreEmail');
        addMoreEmail.addEventListener('click', () => {
<<<<<<< HEAD
            const counter = parseInt(addMoreEmail.dataset.counter)+1;
            addMoreEmail.dataset.counter = counter;
            document.getElementById('collaboratorEmails').insertAdjacentHTML("beforeend", addFields(counter));
            if(counter === 5) addMoreEmail.disabled = true;
=======
            const counter = parseInt(addMoreEmail.dataset.counter) + 1;
            addMoreEmail.dataset.counter = counter;
            document.getElementById('collaboratorEmails').insertAdjacentHTML("beforeend", addFields(counter));
            if (counter === 5) addMoreEmail.disabled = true;
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        });
        addEventCPCSelect();
        addEventcreateProjectForm();
    });
}

const addEventcreateProjectForm = () => {
    const form = document.getElementById('createProjectForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
<<<<<<< HEAD
        const projectName = 'Confluence_'+document.getElementById('newProjectName').value+'_Project';
        const fileId = document.getElementById('CPFSelect').value;
        
        const showNotification = document.getElementById('showNotification');
        let template = '';
        const folder = await createFolder(0, projectName)
        if(folder.status === 201) {
            const parent = await folder.json();
            const copied = await copyFile(fileId, parent.id);
            if(copied.status === 201) {
                for(let i = 1; i <= 5; i++){
                    const email = document.getElementById(`shareFolderEmail${i}`);
                    const role = document.getElementById(`folderRole${i}`);
                    if(email && role){
                        const emails = email.value.split(',');
                        for(let index = 0; index < emails.length; index++){
                            const login = emails[index].trim();
                            const response = await addNewCollaborator(parent.id, 'folder', login, role.value.toLowerCase());
                            top = top+2;
                            if(response.status === 200 || response.status === 201) {
                                template += notificationTemplate(top, `<span class="successMsg">Added new collaborator</span>`, `${login} added to ${projectName} as ${role.value} successfully!`);
                                dataGovernanceProjects();
                            }else{
                                template += notificationTemplate(top, `<span class="errorMsg">Error!</span>`, `Could not add ${login} to ${projectName} as ${role.value}, <span class="errorMsg">${(await response.json()).message}</span>!!`);
                            }
                            
                        }
                    }
                }        
            }else{
                template += notificationTemplate(top, `<span class="errorMsg">Error!</span>`, `Could not copy file to ${projectName}, <span class="errorMsg">${(await copied.json()).message}</span>!!`);
            }
        }
        else{
=======
        const projectName = 'Confluence_' + document.getElementById('newProjectName').value + '_Project';
        const fileId = document.getElementById('CPFSelect').value;

        const showNotification = document.getElementById('showNotification');
        let template = '';
        const folder = await createFolder(0, projectName)
        if (folder.status === 201) {
            const parent = await folder.json();
            const copied = await copyFile(fileId, parent.id);
            if (copied.status === 201) {
                for (let i = 1; i <= 5; i++) {
                    const email = document.getElementById(`shareFolderEmail${i}`);
                    const role = document.getElementById(`folderRole${i}`);
                    if (email && role) {
                        const emails = email.value.split(',');
                        for (let index = 0; index < emails.length; index++) {
                            const login = emails[index].trim();
                            const response = await addNewCollaborator(parent.id, 'folder', login, role.value.toLowerCase());
                            top = top + 2;
                            if (response.status === 200 || response.status === 201) {
                                template += notificationTemplate(top, `<span class="successMsg">Added new collaborator</span>`, `${login} added to ${projectName} as ${role.value} successfully!`);
                                dataGovernanceProjects();
                            } else {
                                template += notificationTemplate(top, `<span class="errorMsg">Error!</span>`, `Could not add ${login} to ${projectName} as ${role.value}, <span class="errorMsg">${(await response.json()).message}</span>!!`);
                            }

                        }
                    }
                }
            } else {
                template += notificationTemplate(top, `<span class="errorMsg">Error!</span>`, `Could not copy file to ${projectName}, <span class="errorMsg">${(await copied.json()).message}</span>!!`);
            }
        } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            template += notificationTemplate(top, `<span class="errorMsg">Error!</span>`, `Could not create ${projectName}, <span class="errorMsg">${(await folder.json()).message}</span>!!`);
        }
        showNotification.innerHTML = template;
        addEventHideNotification();
    });
};

const addEventCPCSelect = () => {
    const select = document.getElementById('CPCSelect');
    select.addEventListener('change', async () => {
        document.getElementById('studySelection').innerHTML = '';
        document.getElementById('dataTypeSelection').innerHTML = '';
        document.getElementById('fileSelection').innerHTML = '';
<<<<<<< HEAD
        if(select.value === "") return;
        const ID = select.value;
        let response = await getFolderItems(ID);
        if(response.entries.length === 0) return;
        // check if study document exists
        const documentExists = response.entries.filter(dt => dt.name.trim().toLowerCase() === 'confluence data from studies');
        if(documentExists.length === 1){
            response = (await getFolderItems(documentExists[0].id));
        }
        const array = filterStudies(response.entries);
        if(array.length === 0) return '';
        let template = '';
        template += '<strong>Select study</strong> <span class="required">*</span><select id="CPSSelect" class="form-control" required>'
        array.forEach((obj, index) => {
            if(index === 0) template += '<option value=""> -- Select study -- </option>'
=======
        if (select.value === "") return;
        const ID = select.value;
        let response = await getFolderItems(ID);
        if (response.entries.length === 0) return;
        // check if study document exists
        const documentExists = response.entries.filter(dt => dt.name.trim().toLowerCase() === 'BCRPP data from studies');
        if (documentExists.length === 1) {
            response = (await getFolderItems(documentExists[0].id));
        }
        const array = filterStudies(response.entries);
        if (array.length === 0) return '';
        let template = '';
        template += '<strong>Select study</strong> <span class="required">*</span><select id="CPSSelect" class="form-control" required>'
        array.forEach((obj, index) => {
            if (index === 0) template += '<option value=""> -- Select study -- </option>'
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            template += `<option value="${obj.id}">${obj.name}</option>`;
        });
        template += '</select>';
        document.getElementById('studySelection').innerHTML = template;
        addEventCPSSelect();
<<<<<<< HEAD
        
=======

>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
    });
}

const addEventCPSSelect = () => {
    const select = document.getElementById('CPSSelect');
    select.addEventListener('change', async () => {
        document.getElementById('dataTypeSelection').innerHTML = '';
        document.getElementById('fileSelection').innerHTML = '';
<<<<<<< HEAD
        if(select.value === "") return;
        const ID = select.value;
        const response = await getFolderItems(ID);
        if(response.entries.length === 0) return;
        const array = filterDataTypes(response.entries);
        if(array.length === 0) return '';
        let template = '';
        template += '<strong>Select data type</strong> <span class="required">*</span><select id="CPDTSelect" class="form-control" required>'
        array.forEach((obj, index) => {
            if(index === 0) template += '<option value=""> -- Select data type -- </option>'
=======
        if (select.value === "") return;
        const ID = select.value;
        const response = await getFolderItems(ID);
        if (response.entries.length === 0) return;
        const array = filterDataTypes(response.entries);
        if (array.length === 0) return '';
        let template = '';
        template += '<strong>Select data type</strong> <span class="required">*</span><select id="CPDTSelect" class="form-control" required>'
        array.forEach((obj, index) => {
            if (index === 0) template += '<option value=""> -- Select data type -- </option>'
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            template += `<option value="${obj.id}">${obj.name}</option>`;
        });
        template += '</select>';
        document.getElementById('dataTypeSelection').innerHTML = template;
        addEventCPDTSelect();
    });
}

const addEventCPDTSelect = () => {
    const select = document.getElementById('CPDTSelect');
    select.addEventListener('change', async () => {
        document.getElementById('fileSelection').innerHTML = '';
<<<<<<< HEAD
        if(select.value === "") return;
        
        const ID = select.value;
        const response = await getFolderItems(ID);
        if(response.entries.length === 0) return;
        const array = filterFiles(response.entries);
        if(array.length === 0) return '';
        let template = '';
        template += '<strong>Select file</strong> <span class="required">*</span><select id="CPFSelect" class="form-control" required>'
        array.forEach((obj, index) => {
            if(index === 0) template += '<option value=""> -- Select file -- </option>'
=======
        if (select.value === "") return;

        const ID = select.value;
        const response = await getFolderItems(ID);
        if (response.entries.length === 0) return;
        const array = filterFiles(response.entries);
        if (array.length === 0) return '';
        let template = '';
        template += '<strong>Select file</strong> <span class="required">*</span><select id="CPFSelect" class="form-control" required>'
        array.forEach((obj, index) => {
            if (index === 0) template += '<option value=""> -- Select file -- </option>'
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            template += `<option value="${obj.id}">${obj.name}</option>`;
        });
        template += '</select>';
        document.getElementById('fileSelection').innerHTML = template;
        addEventCPDTSelect();
    });
}

export const addEventMyProjects = () => {
    const myProjects = document.getElementById('myProjects');
    myProjects.addEventListener('click', async () => {
<<<<<<< HEAD
        if(myProjects.classList.contains('navbar-active')) return;
        showAnimation();
        assignNavbarActive(myProjects, 2);
        document.title = 'BCRP - My Projects';
=======
        if (myProjects.classList.contains('navbar-active')) return;
        showAnimation();
        assignNavbarActive(myProjects, 2);
        document.title = 'BCRPP - My Projects';
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        myProjectsTemplate();
    });
}

export const addEventCopyToClipboard = () => {
    const copyFileApi = document.getElementsByClassName('copy-file-api');
    Array.from(copyFileApi).forEach(elem => {
        elem.addEventListener('click', () => {
            const fileId = elem.dataset.fileId;
            const versionId = elem.dataset.versionId;
            const data = fileId && !versionId ? fileId : versionId;
            if (!navigator.clipboard) {
                const textArea = document.createElement("textarea");
                textArea.value = data;
<<<<<<< HEAD
                textArea.style.position="fixed";  //avoid scrolling to bottom
=======
                textArea.style.position = "fixed"; //avoid scrolling to bottom
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const copied = document.execCommand('copy');
<<<<<<< HEAD
                if(copied){
                    elem.innerHTML = `<i class="fas fa-check"></i>`;
                    setTimeout(()=> {elem.innerHTML = `<i class="far fa-copy">`}, 5000);
                }
                document.body.removeChild(textArea);
            }
            else {
                navigator.clipboard.writeText(data).then(function() {
                    elem.innerHTML = `<i class="fas fa-check"></i>`;
                    setTimeout(()=> {elem.innerHTML = `<i class="far fa-copy">`}, 5000);
                }, function(err) {
=======
                if (copied) {
                    elem.innerHTML = `<i class="fas fa-check"></i>`;
                    setTimeout(() => {
                        elem.innerHTML = `<i class="far fa-copy">`
                    }, 5000);
                }
                document.body.removeChild(textArea);
            } else {
                navigator.clipboard.writeText(data).then(function () {
                    elem.innerHTML = `<i class="fas fa-check"></i>`;
                    setTimeout(() => {
                        elem.innerHTML = `<i class="far fa-copy">`
                    }, 5000);
                }, function (err) {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                    console.error('Async: Could not copy text: ', err);
                });
            }
        });
    });
}

export const addEventFileStats = (element) => {
    element.addEventListener('click', async () => {
        const ID = element.dataset.fileId;
        const name = element.dataset.fileName;
        document.getElementById('modalFileStatsBody').innerHTML = '';
        document.getElementById('modalFileStatsHeader').innerHTML = `
            <h5 class="modal-title">${name}</h5>
            <button type="button" title="Close" class="close modal-close-btn" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;
        const response = await getFileAccessStats(ID);
        document.getElementById('modalFileStatsBody').innerHTML = `
            <div class="row file-stats-row">
                <div class="col" title="File download count">
                    <span class="file-stats-heading">Download count</span></br>
                    <i class="fas fa-4x fa-download file-stats-icon"></i> <span class="fa-3x"> ${response.download_count}</span>
                </div>
                <div class="col" title="File edit count">
                    <span class="file-stats-heading">Edit count</span></br>
                    <i class="fas fa-4x fa-edit file-stats-icon"></i> <span class="fa-3x"> ${response.edit_count}</span>
                </div>
            </div>
            <div class="row file-stats-row">
                <div class="col" title="File preview count">
                    <span class="file-stats-heading">Preview count</span></br>
                    <i class="fas fa-4x fa-file-alt file-stats-icon"></i> <span class="fa-3x"> ${response.preview_count}</span>
                </div>
                <div class="col" title="File comment count">
                    <span class="file-stats-heading">Comment count</span></br>
                    <i class="fas fa-4x fa-comments file-stats-icon"></i> <span class="fa-3x"> ${response.comment_count}</span>
                </div>
            </div>
        `
    });
};

export const addEventVariableDefinitions = () => {
    const elements = document.getElementsByClassName('variable-definition');
    Array.from(elements).forEach(element => {
        element.addEventListener('click', () => {
            const variable = element.dataset.variable;
            let variableName = '';
            let definition = '';
<<<<<<< HEAD
            if(variable === 'studyDesign') {
                variableName = 'Study design'; 
                definition = "Study type classified as ‘population based’ or ‘non-population based’";
            }
            if(variable === 'status') {
                variableName = 'Case-control status'; 
                definition = "Number of subjects with a reported diagnosis of invasive breast cancer or in situ breast cancer and number of subjects without a breast cancer diagnosis";
            }
            if(variable === 'ethnicityClass') {
                variableName = 'Ancestry'; 
                definition = "Ethnic descent";
            }
            if(variable === 'ageInt') {
                variableName = 'Age'; 
                definition = "Age at interview/questionnaire for controls and cases";
            }
            if(variable === 'famHist') {
                variableName = 'Family history'; 
                definition = "Family history of breast cancer in a first degree relative";
            }
            if(variable === 'ER_statusIndex') {
                variableName = 'ER status'; 
                definition = "Estrogen receptor status of breast cancer tumor";
            }
            if(variable === 'chip') {
                variableName = 'Genotyping chip'; 
                definition = "Filter data according to subjects genotyped by the confluence chips or other genotyping chips";
            }
            if(variable === 'subsetStatistics') {
                variableName = 'Subset statistics'; 
                definition = "This plot shows the number of subjects with data available on variables selected on the bottom left panel. You can filter the numbers shown by case-control status and study by selecting filters on the top left panel.";
            }
            if(variable === 'allSubjects') {
                variableName = 'All Subjects'; 
                definition = "All subjects in the set with data on any of the selected variables.";
            }
            if(variable === 'completeSet') {
                variableName = 'Complete set'; 
                definition = "Number of subjects with data on all selected variables.";
            }
            if(variable === 'midsetTopBars') {
                variableName = 'Top bars'; 
                definition = "Number of subjects with data on each of the selected variable (irrespective of the others).";
            }
            if(variable === 'midsetSideBars') {
                variableName = 'Side bars'; 
=======
            if (variable === 'studyDesign') {
                variableName = 'Study design';
                definition = "Study type classified as ‘population based’ or ‘non-population based’";
            }
            if (variable === 'status') {
                variableName = 'Case-control status';
                definition = "Number of subjects with a reported diagnosis of invasive breast cancer or in situ breast cancer and number of subjects without a breast cancer diagnosis";
            }
            if (variable === 'ethnicity') {
                variableName = 'Ethnicity';
                definition = "Ethnic descent";
            }
            if (variable === 'race') {
                variableName = 'race';
                definition = "Race";
            }
            if (variable === 'study') {
                variableName = 'Study';
                definition = "Study";
            }
            if (variable === 'ageInt') {
                variableName = 'Age';
                definition = "Age at interview/questionnaire for controls and cases";
            }
            if (variable === 'famHist') {
                variableName = 'Family history';
                definition = "Family history of breast cancer in a first degree relative";
            }
            if (variable === 'ER_statusIndex') {
                variableName = 'ER status';
                definition = "Estrogen receptor status of breast cancer tumor";
            }
            if (variable === 'chip') {
                variableName = 'Genotyping chip';
                definition = "Filter data according to subjects genotyped by the confluence chips or other genotyping chips";
            }
            if (variable === 'subsetStatistics') {
                variableName = 'Subset statistics';
                definition = "This plot shows the number of subjects with data available on variables selected on the bottom left panel. You can filter the numbers shown by case-control status and study by selecting filters on the top left panel.";
            }
            if (variable === 'allSubjects') {
                variableName = 'All Subjects';
                definition = "All subjects in the set with data on any of the selected variables.";
            }
            if (variable === 'completeSet') {
                variableName = 'Complete set';
                definition = "Number of subjects with data on all selected variables.";
            }
            if (variable === 'midsetTopBars') {
                variableName = 'Top bars';
                definition = "Number of subjects with data on each of the selected variable (irrespective of the others).";
            }
            if (variable === 'midsetSideBars') {
                variableName = 'Side bars';
                definition = "Number of subjects with data on a combination 2 or more selected variables.";
            }
            if (variable === 'midsetSideBars') {
                variableName = 'Side bars';
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                definition = "Number of subjects with data on a combination 2 or more selected variables.";
            }

            const header = document.getElementById('confluenceModalHeader');
            const body = document.getElementById('confluenceModalBody');
<<<<<<< HEAD
            
=======

>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            header.innerHTML = `<h5 class="modal-title">${variableName}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>`;
            body.innerHTML = `<span>${definition}</span>`;
        });
    });
}

export const addEventUpdateSummaryStatsData = () => {
    const btn = document.getElementById('updateSummaryStatsData');
<<<<<<< HEAD
    if(!btn) return;
    btn.addEventListener('click', async () => {
        const header = document.getElementById('confluenceModalHeader');
        const body = document.getElementById('confluenceModalBody');
        
=======
    if (!btn) return;
    btn.addEventListener('click', async () => {
        const header = document.getElementById('confluenceModalHeader');
        const body = document.getElementById('confluenceModalBody');

>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        header.innerHTML = `<h5 class="modal-title">Update data</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>`;

        let template = '<form id="updateSummaryStatsForm">';
        template += `<label>Select data type</label></br> <div style="padding-left:40px"><input type="radio" required value="summary" name="summarydataType"> Summary data</div><div style="padding-left:40px"><input value="missingness" required type="radio" name="summarydataType"> Missingness data</div>`
        template += '</br><div id="summaryDataFolderList"></div>'
<<<<<<< HEAD
        
=======

>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        template += '<div class="modal-footer"><button type="submit" class="btn btn-outline-primary">Update data</button></div>'
        template += '</form>';
        body.innerHTML = template;
        addEventDataTypeRadio();
        addEventUpdateSummaryStatsForm();
    });
}

const addEventDataTypeRadio = () => {
    const radios = document.getElementsByName('summarydataType');
    Array.from(radios).forEach(radio => {
        radio.addEventListener('click', async () => {
            const dataType = Array.from(document.getElementsByName('summarydataType')).filter(ele => ele.checked === true)[0].value;
            let template = '';
            const response = await getFolderItems(106289683820);
            let summaryFolder = [];
<<<<<<< HEAD
            if(dataType === 'summary') {
                summaryFolder = response.entries.filter(dt => dt.type === 'folder' && /_summary_statistics/i.test(dt.name) === true);
            }
            else {
=======
            if (dataType === 'summary') {
                summaryFolder = response.entries.filter(dt => dt.type === 'folder' && /_summary_statistics/i.test(dt.name) === true);
            } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                summaryFolder = response.entries.filter(dt => dt.type === 'folder' && /_missingness_statistics/i.test(dt.name) === true);
            }
            template += `Select data folder(s)`
            template += `<ul>`;
            summaryFolder.forEach(folder => {
                template += `<li class="filter-list-item">
                <button type="button" class="filter-btn collapsible-items update-summary-stats-btn filter-midset-data-btn" data-folder-id="${folder.id}">
                <div class="variable-name">${folder.name}</div>
                </button>
                </li>`;
            });
            template += `</ul>`;

            document.getElementById('summaryDataFolderList').innerHTML = template;
            addEventSummaryFolderSelection();
        })
    })
}

const addEventSummaryFolderSelection = () => {
    const elements = document.getElementsByClassName('update-summary-stats-btn');
    Array.from(elements).forEach(element => {
        element.addEventListener('click', () => {
<<<<<<< HEAD
            if(element.classList.contains('active-filter')) element.classList.remove('active-filter');
=======
            if (element.classList.contains('active-filter')) element.classList.remove('active-filter');
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            else element.classList.add('active-filter');
        })
    })
}

const addEventUpdateSummaryStatsForm = () => {
    const form = document.getElementById('updateSummaryStatsForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const dataType = Array.from(document.getElementsByName('summarydataType')).filter(ele => ele.checked === true)[0].value;
        form.querySelectorAll('[type="submit"]')[0].classList.add('disabled');
        form.querySelectorAll('[type="submit"]')[0].innerHTML = 'Updating...';
        const selectedBtn = form.querySelectorAll('.active-filter');
        const folderIds = Array.from(selectedBtn).map(btn => parseInt(btn.dataset.folderId));
<<<<<<< HEAD
        if(folderIds.length === 0) return;
        let masterArray = [];
        let publicDataObj = {};
        let allHeaders = [];
        for(let id of folderIds){
            const response = await getFolderItems(id);
            let file = [];
            if(dataType === 'summary') file = response.entries.filter(dt => dt.type === 'file' && /_summary_statistics.csv/i.test(dt.name) === true);
            else file = response.entries.filter(dt => dt.type === 'file' && /_missingness_statistics.csv/i.test(dt.name) === true);
            if(file.length === 0) return;
=======
        if (folderIds.length === 0) return;
        let masterArray = [];
        let publicDataObj = {};
        let allHeaders = [];
        for (let id of folderIds) {
            const response = await getFolderItems(id);
            let file = [];
            if (dataType === 'summary') file = response.entries.filter(dt => dt.type === 'file' && /_summary_statistics.csv/i.test(dt.name) === true);
            else file = response.entries.filter(dt => dt.type === 'file' && /_missingness_statistics.csv/i.test(dt.name) === true);
            if (file.length === 0) return;
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            form.querySelectorAll('[type="submit"]')[0].innerHTML = `Processing ${file[0].name}...`;
            const csv = await getFile(file[0].id);
            const responseData = csv2Json(csv);
            const jsonArray = responseData.data;
            allHeaders = allHeaders.concat(responseData.headers)
<<<<<<< HEAD
            if(dataType === 'summary') {
                const uniqueStudies = [];
                jsonArray.forEach(obj => {
                    const consortium = obj.consortium === 'NCI' ? 'NCI-DCEG' : obj.consortium;
                    if(publicDataObj[consortium] === undefined) {
=======
            if (dataType === 'summary') {
                const uniqueStudies = [];
                jsonArray.forEach(obj => {
                    const consortium = obj.consortium === 'NCI' ? 'NCI-DCEG' : obj.consortium;
                    if (publicDataObj[consortium] === undefined) {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                        publicDataObj[consortium] = {};
                        publicDataObj[consortium].name = consortium;
                        publicDataObj[consortium].studies = 0;
                        publicDataObj[consortium].cases = 0;
                        publicDataObj[consortium].controls = 0;
<<<<<<< HEAD
                        publicDataObj[consortium].BRCA1 = 0;
                        publicDataObj[consortium].BRCA2 = 0;
                    }
                    if(uniqueStudies.indexOf(obj.study) === -1) {
                        uniqueStudies.push(obj.study);
                        publicDataObj[consortium].studies += 1;
                    }
                    if(obj.status === 'case') publicDataObj[consortium].cases += parseInt(obj.statusTotal);
                    if(obj.status === 'control') publicDataObj[consortium].controls += parseInt(obj.statusTotal);
                    if(obj['Carrier_status'] && obj['Carrier_status'] === 'BRCA1') publicDataObj[consortium].BRCA1 += parseInt(obj.statusTotal);
                    if(obj['Carrier_status'] && obj['Carrier_status'] === 'BRCA2') publicDataObj[consortium].BRCA2 += parseInt(obj.statusTotal);
=======
                    }
                    if (uniqueStudies.indexOf(obj.study) === -1) {
                        uniqueStudies.push(obj.study);
                        publicDataObj[consortium].studies += 1;
                    }
                    if (obj.status === 'case') publicDataObj[consortium].cases += parseInt(obj.statusTotal);
                    if (obj.status === 'control') publicDataObj[consortium].controls += parseInt(obj.statusTotal);
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
                })
            }
            masterArray = masterArray.concat(jsonArray);
        }
        const finalHeaders = allHeaders.filter((item, pos) => allHeaders.indexOf(item) === pos);
        const masterCSV = json2csv(masterArray, finalHeaders);
<<<<<<< HEAD
        if(dataType === 'summary') {
=======
        if (dataType === 'summary') {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            publicDataObj['dataModifiedAt'] = new Date().toISOString();
            await uploadFileVersion(masterCSV, summaryStatsFileId, 'text/csv');
            // await uploadFileVersion(publicDataObj, publicDataFileId, 'application/json');
            // form.querySelectorAll('[type="submit"]')[0].classList.remove('disabled');
            form.innerHTML = JSON.stringify(publicDataObj, null, 2);
            await getFile(summaryStatsFileId);
            await getFileInfo(summaryStatsFileId);
<<<<<<< HEAD
        }
        else {
=======
        } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            await uploadFileVersion(masterCSV, missingnessStatsFileId, 'text/csv');
            form.querySelectorAll('[type="submit"]')[0].classList.remove('disabled');
            await getFile(missingnessStatsFileId);
            await getFileInfo(missingnessStatsFileId);
        }
        // form.querySelectorAll('[type="submit"]')[0].innerHTML = 'Update data';
        removeActiveClass('update-summary-stats-btn', 'active-filter');
        let template = notificationTemplate(top, `<span class="successMsg">Data updated</span>`, `Data successfully updated, please reload to see updated data.`);
        document.getElementById('showNotification').innerHTML = template;
        addEventHideNotification();
    })
}

export const addEventFilterBarToggle = () => {
    const button = document.getElementById('filterBarToggle');
    button.addEventListener('click', () => {
        const child = Array.from(button.childNodes)[0];
<<<<<<< HEAD
        if(child.classList.contains('fa-caret-left')) {
=======
        if (child.classList.contains('fa-caret-left')) {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            reSizePlots();
            child.classList.remove('fa-caret-left');
            child.classList.add('fa-caret-right');
            document.getElementById('summaryFilterSiderBar').classList.remove('col-xl-2');
            document.getElementById('summaryFilterSiderBar').classList.add('d-none');
            document.getElementById('summaryStatsCharts').classList.remove('col-xl-10');
            document.getElementById('summaryStatsCharts').classList.add('col-xl-12');
            document.getElementById('dataLastModified').classList.remove('offset-xl-2')
            document.getElementById('dataLastModified').classList.remove('padding-left-20')
<<<<<<< HEAD
        }
        else {
=======
        } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            reSizePlots();
            child.classList.remove('fa-caret-right');
            child.classList.add('fa-caret-left');
            document.getElementById('summaryFilterSiderBar').classList.add('col-xl-2');
            document.getElementById('summaryFilterSiderBar').classList.remove('d-none');
            document.getElementById('summaryStatsCharts').classList.add('col-xl-10');
            document.getElementById('summaryStatsCharts').classList.remove('col-xl-12');
            document.getElementById('dataLastModified').classList.add('offset-xl-2')
            document.getElementById('dataLastModified').classList.add('padding-left-20')
        }
    })
}

export const addEventMissingnessFilterBarToggle = () => {
    const button = document.getElementById('filterBarToggle');
    button.addEventListener('click', () => {
        const child = button.querySelector('.fas');
<<<<<<< HEAD
        if(child.classList.contains('fa-caret-left')) {
=======
        if (child.classList.contains('fa-caret-left')) {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            reSizePlots();
            child.classList.remove('fa-caret-left');
            child.classList.add('fa-caret-right');
            document.getElementById('missingnessFilter').classList = ['d-none'];
            document.getElementById('missingnessTable').parentNode.classList = ['col-xl-12 padding-right-zero padding-left-zero'];
            document.getElementById('dataLastModified').classList.remove('offset-xl-2');
            document.getElementById('dataLastModified').classList.remove('pl-4');
<<<<<<< HEAD
        }
        else {
=======
        } else {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            reSizePlots();
            child.classList.remove('fa-caret-right');
            child.classList.add('fa-caret-left');
            document.getElementById('missingnessFilter').classList = ['col-xl-2 filter-column'];
            document.getElementById('missingnessTable').parentNode.classList = ['col-xl-10 padding-right-zero'];
            document.getElementById('dataLastModified').classList.add('offset-xl-2');
            document.getElementById('dataLastModified').classList.add('pl-4');
        }
    })
}

export const addEventSummaryStatsFilterForm = (jsonData, headers) => {

<<<<<<< HEAD
    const consortiumTypeSelection = document.getElementById('consortiumTypeSelection');
    if(consortiumTypeSelection) {
        consortiumTypeSelection.addEventListener('change', () => {
            filterData(jsonData, headers);
        });
    }

    const genderSelection = document.getElementById('genderSelection');
    genderSelection.addEventListener('change', () => {
        filterData(jsonData, headers);
    });

    const chipSelection = document.getElementById('genotypingChipSelection');
    chipSelection.addEventListener('change', () => {
=======
    // const consortiumTypeSelection = document.getElementById('consortiumTypeSelection');
    // if(consortiumTypeSelection) {
    //     consortiumTypeSelection.addEventListener('change', () => {
    //         filterData(jsonData, headers);
    //     });
    // }

    // const genderSelection = document.getElementById('genderSelection');
    // genderSelection.addEventListener('change', () => {
    //     filterData(jsonData, headers);
    // });

    // const chipSelection = document.getElementById('genotypingChipSelection');
    // chipSelection.addEventListener('change', () => {
    //     filterData(jsonData, headers);
    // });

    const ethnicitySelection = document.getElementById('ethnicitySelection');
    ethnicitySelection.addEventListener('change', () => {
        filterData(jsonData, headers);
    });

    const raceSelection = document.getElementById('raceSelection');
    raceSelection.addEventListener('change', () => {
        filterData(jsonData, headers);
    });

    const studySelection = document.getElementById('studySelection');
    studySelection.addEventListener('change', () => {
        filterData(jsonData, headers);
    });

    const subcasesSelection = document.getElementById('subcasesSelection');
    subcasesSelection.addEventListener('change', () => {
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
        filterData(jsonData, headers);
    });

    const elements = document.getElementsByClassName('select-consortium');
<<<<<<< HEAD
    Array.from(elements).forEach((el,index) => {
        el.addEventListener('click', () => {
            if(el.checked){
                Array.from(el.parentNode.parentNode.querySelectorAll('.select-study')).forEach(btns => btns.checked = true);
            }
            else {
                Array.from(el.parentNode.parentNode.querySelectorAll('.select-study')).forEach(btns => btns.checked =  false);
=======
    Array.from(elements).forEach((el, index) => {
        el.addEventListener('click', () => {
            if (el.checked) {
                Array.from(el.parentNode.parentNode.querySelectorAll('.select-study')).forEach(btns => btns.checked = true);
            } else {
                Array.from(el.parentNode.parentNode.querySelectorAll('.select-study')).forEach(btns => btns.checked = false);
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            }
            filterData(jsonData, headers);
        })
    })

    const studyElements = document.getElementsByClassName('select-study');
    Array.from(studyElements).forEach(ele => {
        ele.addEventListener('click', () => {
            filterData(jsonData, headers)
        })
    });
};

const filterData = (jsonData, headers) => {
<<<<<<< HEAD
    const gender = document.getElementById('genderSelection').value;
    const chip = document.getElementById('genotypingChipSelection').value;
    const genderFilter = Array.from(document.getElementById('genderSelection').options).filter(op => op.selected)[0].textContent;
    const chipFilter = Array.from(document.getElementById('genotypingChipSelection').options).filter(op => op.selected)[0].textContent;
    let finalData = jsonData;
    let onlyCIMBA = false;
    
    const consortiumTypeSelection = document.getElementById('consortiumTypeSelection');
    if(consortiumTypeSelection.value === 'cimba') {
        Array.from(document.getElementsByClassName('consortium-ul')).forEach(ele => {
            if(ele.dataset.consortium === 'CIMBA') ele.style.display = 'block';
            else {
                Array.from(ele.querySelectorAll('input:checked.select-study')).forEach(e => e.checked = false);
                ele.style.display = 'none';
            }
        });
        onlyCIMBA = true;
        finalData = finalData.filter(dt => dt.consortium === 'CIMBA');
    }
    else {
        Array.from(document.getElementsByClassName('consortium-ul')).forEach(ele => {
            if(ele.dataset.consortium === 'CIMBA') {
                Array.from(ele.querySelectorAll('input:checked.select-study')).forEach(e => e.checked = false);
                ele.style.display = 'none';
            }
            else ele.style.display = 'block';
        })
        finalData = finalData.filter(dt => dt.consortium !== 'CIMBA');
    }

    let selectedConsortia = [];
    Array.from(document.getElementsByClassName('select-consortium')).forEach(dt => {
        if(dt.checked) selectedConsortia.push(dt.dataset.consortia);
    });
    const array = getSelectedStudies();
    
    if(gender !== 'all') {
        finalData = finalData.filter(dt => dt['sex'] === gender);
    }
    if(chip !== 'all') {
        finalData = finalData.filter(dt => dt['chip'] === chip);
    }
    updateCounts(finalData);
    if(array.length > 0){
        finalData = finalData.filter(dt => array.indexOf(`${dt.consortium}@#$${dt.study}`) !== -1);
    }
    const selectedStudies = array.map(s => s.split('@#$')[1]);
    document.getElementById('listFilters').innerHTML = `
        <span class="font-bold">Gender: </span>${genderFilter}<span class="vertical-line"></span>
        <span class="font-bold">Genotyping chip: </span>${chipFilter}${selectedStudies.length > 0 ? `
        <span class="vertical-line"></span><span class="font-bold">Study: </span>${selectedStudies[0]} ${selectedStudies.length > 1 ? `and <span class="other-variable-count">${selectedStudies.length-1} other</span>`:``}
    `:``}`
    renderAllCharts(finalData, headers, onlyCIMBA);
=======
    //const gender = document.getElementById('genderSelection').value;
    //const chip = document.getElementById('genotypingChipSelection').value;
    const ethnicity = document.getElementById('ethnicitySelection').value;
    const study = document.getElementById('studySelection').value;
    const race = document.getElementById('raceSelection').value;
    const subCases = document.getElementById('subcasesSelection').value;
    //const genderFilter = Array.from(document.getElementById('genderSelection').options).filter(op => op.selected)[0].textContent;
    //const chipFilter = Array.from(document.getElementById('genotypingChipSelection').options).filter(op => op.selected)[0].textContent;
    const ethnicityFilter = Array.from(document.getElementById('ethnicitySelection').options).filter(op => op.selected)[0].textContent;
    const studyFilter = Array.from(document.getElementById('studySelection').options).filter(op => op.selected)[0].textContent;
    const raceFilter = Array.from(document.getElementById('raceSelection').options).filter(op => op.selected)[0].textContent;
    const subCasesFilter = Array.from(document.getElementById('subcasesSelection').options).filter(op => op.selected)[0].textContent;
    let finalData = jsonData;
    let onlyCIMBA = false;

    // const consortiumTypeSelection = document.getElementById('consortiumTypeSelection');
    // if(consortiumTypeSelection.value === 'cimba') {
    //     Array.from(document.getElementsByClassName('consortium-ul')).forEach(ele => {
    //         if(ele.dataset.consortium === 'CIMBA') ele.style.display = 'block';
    //         else {
    //             Array.from(ele.querySelectorAll('input:checked.select-study')).forEach(e => e.checked = false);
    //             ele.style.display = 'none';
    //         }
    //     });
    //     onlyCIMBA = true;
    //     finalData = finalData.filter(dt => dt.consortium === 'CIMBA');
    // }
    // else {
    //     Array.from(document.getElementsByClassName('consortium-ul')).forEach(ele => {
    //         if(ele.dataset.consortium === 'CIMBA') {
    //             Array.from(ele.querySelectorAll('input:checked.select-study')).forEach(e => e.checked = false);
    //             ele.style.display = 'none';
    //         }
    //         else ele.style.display = 'block';
    //     })
    //     finalData = finalData.filter(dt => dt.consortium !== 'CIMBA');
    // }

    let selectedConsortia = [];
    Array.from(document.getElementsByClassName('select-consortium')).forEach(dt => {
        if (dt.checked) selectedConsortia.push(dt.dataset.consortia);
    });
    const array = getSelectedStudies();

    // if(gender !== 'all') {
    //     finalData = finalData.filter(dt => dt['sex'] === gender);
    // }
    // if(chip !== 'all') {
    //     finalData = finalData.filter(dt => dt['chip'] === chip);
    // }
    if (ethnicity !== 'all') {
        finalData = finalData.filter(dt => dt['ethnicity'] === ethnicity);
    }
    if (study !== 'all') {
        finalData = finalData.filter(dt => dt['study'] === study);
    }
    if (race !== 'all') {
        finalData = finalData.filter(dt => dt['race'] === race);
    }

    updateCounts(finalData);

    if (array.length > 0) {
        finalData = finalData.filter(dt => array.indexOf(`${dt.consortium}@#$${dt.study}`) !== -1);
    }
    const selectedStudies = array.map(s => s.split('@#$')[1]);
    // document.getElementById('listFilters').innerHTML = `
    //     <span class="font-bold">Ethnicity: </span>${ethnicityFilter}<span class="vertical-line"></span>
    //     <span class="font-bold">Genotyping chip: </span>${chipFilter}${selectedStudies.length > 0 ? `
    //     <span class="vertical-line"></span><span class="font-bold">Study: </span>${selectedStudies[0]} ${selectedStudies.length > 1 ? `and <span class="other-variable-count">${selectedStudies.length-1} other</span>`:``}
    // `:``}`
    if (subCases == 'all') {
        renderAllCharts(finalData);
    } else renderAllCasesCharts(finalData);
    //renderAllCharts(finalData);
    //renderAllCasesCharts(finalData);
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
}

export const addEventConsortiaFilter = (d) => {
    const checkboxs = document.getElementsByClassName('checkbox-consortia');
    Array.from(checkboxs).forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            const selectedConsortium = Array.from(checkboxs).filter(dt => dt.checked).map(dt => dt.dataset.consortia);
            let data = JSON.parse(JSON.stringify(d))
            delete data['dataModifiedAt'];
<<<<<<< HEAD
            if(selectedConsortium.length > 0) {
                const newData = Object.values(data).filter(dt => selectedConsortium.includes(dt.name));
                let totalConsortia = 0, totalCases = 0, totalControls = 0, totalStudies = 0, totalBRCA1 = 0, totalBRCA2 = 0;
                newData.forEach(obj => {
                    totalConsortia++;
                    totalStudies += obj.studies;
                    totalCases += obj.cases;
                    totalControls += obj.controls;
                    if(obj.BRCA1) totalBRCA1 += obj.BRCA1;
                    if(obj.BRCA2) totalBRCA2 += obj.BRCA2;
                });
                renderDataSummary({totalConsortia, totalStudies, totalCases, totalControls, totalBRCA1, totalBRCA2}, true);
            }
            else {
                delete data['CIMBA']
                let totalConsortia = 0, totalCases = 0, totalControls = 0, totalStudies = 0, totalBRCA1 = 0, totalBRCA2 = 0;
                Object.values(data).forEach(obj => {
                    totalConsortia++;
                    totalStudies += obj.studies;
                    totalCases += obj.cases;
                    totalControls += obj.controls;
                    if(obj.BRCA1) totalBRCA1 += obj.BRCA1;
                    if(obj.BRCA2) totalBRCA2 += obj.BRCA2;
                });
                renderDataSummary({totalConsortia, totalStudies, totalCases, totalControls, totalBRCA1, totalBRCA2}, true);
=======
            if (selectedConsortium.length > 0) {
                const newData = Object.values(data).filter(dt => selectedConsortium.includes(dt.name));
                let totalConsortia = 0,
                    totalWomen = 0,
                    totalPatients = 0;
                newData.forEach(obj => {
                    totalConsortia++;
                    totalPatients += obj.numPatients;
                    totalWomen += obj.numWomen;
                });
                renderDataSummary({
                    totalConsortia,
                    totalPatients,
                    totalWomen
                }, true);
            } else {
                let totalConsortia = 0,
                    totalWomen = 0,
                    totalPatients = 0;
                Object.values(data).forEach(obj => {
                    totalConsortia++;
                    totalPatients += obj.numPatients;
                    totalWomen += obj.numWomen;
                });
                renderDataSummary({
                    totalConsortia,
                    totalPatients,
                    totalWomen
                }, true);
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
            }
        })
    })
}
<<<<<<< HEAD
=======


export function switchTabs(show, hide, files) {
    try {
        if (!Array.isArray(hide)) {
            console.log('tabs not in an array');
            return;
        } else if (!Array.isArray(files)) {
            console.log('files not in an array');
            return;
        } else {
            const boxPreview = document.getElementById('filePreview');
            document.getElementById(show + 'Tab').addEventListener('click', (e) => {
                e.preventDefault();
                console.log(show, 'Tab clicked');
                if (boxPreview !== null) {
                    if (files.length != 0) {

                        if (!boxPreview.classList.contains('d-block')) {
                            boxPreview.classList.add('d-block');
                        }
                        switchFiles(show);
                        document.getElementById(show + 'selectedDoc').value = files[0].id;
                        showPreview(files[0].id);
//<<<<<<< comments
                        console.log(show);
                        const tabsChair = ['toBeCompleted', 'inProgress', 'daccCompleted', 'approved'];
                        if (tabsChair.includes(show)){
                        showComments(files[0].id)
                        };
                        // let response = async () => { let test = await listComments('945509107663');//files[0].id);
                        //     console.log(test);
                        //     }
//=======
//                       const $select = document.querySelector('.tab-content .active #selectedDoc');
//                        if ($select) {
//                        $select.selectedIndex = 0;
//                        }
//                        //document.getElementById('selectedDoc').selectedIndex = 0;
//                        //console.log(document.getElementById('selectedDoc').selectedIndex);
//>>>>>>> master
                        if (show == 'toBeCompleted'){
                            document.getElementById('sendtodaccButton').style.display="block";
                            document.getElementById('finalChairDecision').style.display="none";
                            
                            // document.getElementById('fileComments').innerHTML = listComments(files[0].id);
                        }  
                        if (show == 'inProgress'){
                            document.getElementById('sendtodaccButton').style.display="none";
                            document.getElementById('finalChairDecision').style.display="none";
                            }
                        if (show == 'daccCompleted'){
                            document.getElementById('sendtodaccButton').style.display="none";
                            document.getElementById('finalChairDecision').style.display="block";
                            }
                        if (show == 'approved'){
                            document.getElementById('sendtodaccButton').style.display="none";
                            document.getElementById('finalChairDecision').style.display="none";
                            }
                        if (show == 'dacctoBeCompleted'){
                            document.getElementById('daccComment').style.display="block";
                        }
                        if (show == 'completed'){
                            document.getElementById('daccComment').style.display="none";
                        }
                    } else {
                        boxPreview.classList.remove('d-block');
                        boxPreview.classList.add('d-none');
                    }
                }

                for (const tab of hide) {
                    //console.log(tab + 'Tab');
                    document.getElementById(tab + 'Tab').classList.remove('active');
                    document.getElementById(tab).classList.remove('show', 'active');
                }
                document.getElementById(show + 'Tab').classList.add('active');
                document.getElementById(show).classList.add('show', 'active');
                return;
            })
        }
    } catch (err) {
        console.log(err);
        return;
    }
}

export function switchFiles(tab) {
    document.getElementById(`${tab}selectedDoc`).addEventListener('change', (e) => {
        const file_id = e.target.value
        showPreview(file_id);
        const tabsChair = ['toBeCompleted', 'inProgress', 'daccCompleted', 'approved'];
        if (tabsChair.includes(tab)){
            showComments(file_id)
        };
      });
}
>>>>>>> df8652ba0de17b240c6db0b0c288b31c7efabce0
