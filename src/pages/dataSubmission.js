import { getFolderItems, showCommentsDropDown, filterStudiesDataTypes, filterConsortiums, hideAnimation, checkDataSubmissionPermissionLevel, getCollaboration, getFile, tsv2Json, consortiumSelection, uploadFormFolder, daccReviewFolder, getFileInfo, daccReviewChairFolder, acceptedFolder, deniedFolder, chairReviewFolder } from "../shared.js";
import { uploadInStudy } from "../components/modal.js";

export const dataSubmissionTemplate = async () => {
    const response = await getFolderItems('145996351913'); //Should be 0 for those without access to this folder
    const studiesList = await getFile('910115863871')
    let studyIDs = [];
    if(studiesList) studyIDs = tsv2Json(studiesList).data.map(dt => dt['Folder ID'].trim());
    const studies = response.entries.filter(obj => studyIDs.includes(obj.id));
    const consortias = filterConsortiums(response.entries);
    const array = [...studies];//, ...consortias];
    console.log(array)
    let bool = false;
    for(let consortia of array){
        if(bool) continue;
        const permitted = checkDataSubmissionPermissionLevel(await getCollaboration(consortia.id, `${consortia.type}s`), JSON.parse(localStorage.parms).login);
        console.log('910115863871 '+permitted);
        if(permitted) bool = true;
    }
    if(array.length <= 0) {
        hideAnimation();
        return `<div class="general-bg padding-bottom-1rem">
                    <div class="container body-min-height">
                        <div class="main-summary-row">
                            <div class="align-left">
                                <h1 class="page-header">Data Submitted</h1>
                            </div>
                        </div>
                        <div class="data-submission div-border font-size-18" style="padding-left: 1rem;">
                            No folder found for Data Submission
                        </div>
                    </div>
                </div>`;
    };
    
    let template = '';
    
    template += `
        <div class="general-bg padding-bottom-1rem">
            <div class="container body-min-height font-size-18">
                <div class="main-summary-row">
                    <div class="align-left">
                        <h1 class="page-header">Data Submitted</h1>
                    </div>
                </div>
                ${bool ? `
                <div class="row create-study">
                    <div class="upload-in-study">
                        <button data-toggle="modal" id="uploadDataBtn" title="Submit data" data-target="#uploadInStudy" class="btn btn-light div-border">
                            <i class="fas fa-upload"></i> Submit data
                        </button>
                    </div>
                </div>
                `:``}`;

    template += await uploadInStudy('uploadInStudy');
    
    template += '<div class="data-submission div-border white-bg"><ul class="ul-list-style first-list-item collapsible-items mb-0">';

    for(let obj of array){
        const consortiaName = obj.name;
        let type = obj.type;
        let liClass = type === 'folder' ? 'collapsible consortia-folder' : '';
        let title = type === 'folder' ? 'Expand / Collapse' : '';
        template += `<li class="collapsible-items">
                        <button class="${liClass}" data-toggle="collapse" href="#toggle${obj.id}">
                            <i title="${title}" data-id="${obj.id}" data-folder-name="${consortiaName}" data-status="pending" class="lazy-loading-spinner"></i>
                        </button> 
                        ${consortiaName}
                        <a href="https://nih.app.box.com/${type === 'folder' ? 'folder' : 'file'}/${obj.id}" target="_blank" title="Open ${obj.type}"><i class="fas fa-external-link-alt"></i></a>
                    </li>`
    }

    template += '</ul></div></div></div>';
    return template;
};

export const lazyload = (element) => {
    let spinners = document.getElementsByClassName('lazy-loading-spinner');
    if(element) spinners = element.parentNode.querySelectorAll('.lazy-loading-spinner');
    Array.from(spinners).forEach(async element => {
        const id = element.dataset.id;
        const status = element.dataset.status;
        if(status !== 'pending') return;
        let allEntries = (await getFolderItems(id)).entries;
        if(allEntries.length === 0){
            element.classList = ['fas fa-exclamation-circle'];
            element.title = 'Empty folder'
        }
        allEntries = allEntries.filter(dt => dt.name !== 'Study Documents');
        element.dataset.status = 'complete';
        const entries = filterStudiesDataTypes(allEntries);
        const fileEntries = allEntries.filter(obj => obj.type === 'file');
        if (entries.length > 0){
            const ul = document.createElement('ul');
            ul.classList = ['ul-list-style collapse'];
            ul.id = `toggle${id}`

            for(const obj of entries){
                const li = document.createElement('li');
                li.classList = ['collapsible-items'];
                let type = obj.type;
                let liClass = type === 'folder' ? 'collapsible consortia-folder' : '';
                let title = type === 'folder' ? 'Expand / Collapse' : '';
                li.innerHTML = `<button class="${liClass}" data-toggle="collapse" href="#toggle${obj.id}">
                                    <i title="${title}" data-id="${obj.id}" data-folder-name="${obj.name}" data-status="pending" class="lazy-loading-spinner"></i>
                                </button> 
                                ${obj.name}
                                <a href="https://nih.app.box.com/${type === 'folder' ? 'folder' : 'file'}/${obj.id}" target="_blank" title="Open ${obj.type}"><i class="fas fa-external-link-alt"></i></a>`;
                ul.appendChild(li);
            }

            element.classList.remove('lazy-loading-spinner');
            element.classList.add('fas');
            element.classList.add('fa-folder-plus');
            element.parentNode.parentNode.appendChild(ul);
            dataSubmission(element.parentNode);
        }
        else if(fileEntries.length > 0) {
            const ul = document.createElement('ul');
            ul.classList = ['ul-list-style collapse'];
            ul.id = `toggle${id}`

            for(const obj of fileEntries){
                const li = document.createElement('li');
                li.classList = ['collapsible-items'];
                li.innerHTML = `<a><i title="files" data-id="${obj.id}" data-status="pending" class="fas fa-file-alt"></i></a> 
                                ${obj.name}
                                <a href="https://nih.app.box.com/${obj.type === 'folder' ? 'folder' : 'file'}/${obj.id}" target="_blank" title="Open ${obj.type}"><i class="fas fa-external-link-alt"></i></a>
                                `;
                ul.appendChild(li);
            }

            element.classList.remove('lazy-loading-spinner');
            element.classList.add('fas');
            element.classList.add('fa-folder-plus');
            element.parentNode.parentNode.appendChild(ul);
            dataSubmission(element.parentNode);
        }
    });
}

export const dataSubmission = (element) => {
    element.addEventListener('click', e => {
        e.preventDefault();
        if (element.getElementsByClassName('fa-folder-minus').length > 0 && element.getElementsByClassName('fa-folder-minus')[0].classList.contains('fa-folder-minus')){
            element.getElementsByClassName('fa-folder-minus')[0].classList.add('fa-folder-plus');
            element.getElementsByClassName('fa-folder-minus')[0].classList.remove('fa-folder-minus');
        } else {
            element.getElementsByClassName('fa-folder-plus')[0].classList.add('fa-folder-minus');
            element.getElementsByClassName('fa-folder-plus')[0].classList.remove('fa-folder-plus');
            if(document.getElementsByClassName('lazy-loading-spinner').length !== 0){
                lazyload(element);
            }
        }
    });
    
    // let consortiaFolder = document.getElementsByClassName('consortia-folder');
    // Array.from(consortiaFolder).forEach(element => {
    //     element.dispatchEvent(new Event('click'));
    // });
};

export const userSubmissionTemplate = async () => {
let template = '';

const uploads = await getFolderItems(uploadFormFolder);
const daccReview = await getFolderItems(daccReviewFolder);
const resubmit = await getFolderItems(daccReviewChairFolder);
const chairReview = await getFolderItems(chairReviewFolder);
const accepted = await getFolderItems(acceptedFolder);
const denied = await getFolderItems(deniedFolder);

const files = [];

for(const file of uploads.entries){
    const fileInfo = await getFileInfo(file.id);
    if(fileInfo.created_by.login === JSON.parse(localStorage.parms).login){
        files.push({'file': file, 'status' : 'Uploaded', decision: 'Pending'});
    }
}

for(const file of daccReview.entries){
    const fileInfo = await getFileInfo(file.id);
    if(fileInfo.created_by.login === JSON.parse(localStorage.parms).login){
        files.push({'file': file, 'status' : 'DACC Review', decision: 'Pending'});
    }
}

for(const file of resubmit.entries){
    const fileInfo = await getFileInfo(file.id);
    if(fileInfo.created_by.login === JSON.parse(localStorage.parms).login){
        files.push({'file': file, 'status' : 'Resubmitted to DACC', decision: 'Pending'});
    }
}

for(const file of chairReview.entries){
    const fileInfo = await getFileInfo(file.id);
    if(fileInfo.created_by.login === JSON.parse(localStorage.parms).login){
        files.push({'file': file, 'status' : 'Chair Review', decision: 'Pending'});
        }
}

for(const file of accepted.entries){
    const fileInfo = await getFileInfo(file.id);
    if(fileInfo.created_by.login === JSON.parse(localStorage.parms).login){
        files.push({'file': file, 'status' : 'Review Complete', decision: 'Accepted'});
        }
}

for(const file of denied.entries){
    const fileInfo = await getFileInfo(file.id);
    if(fileInfo.created_by.login === JSON.parse(localStorage.parms).login){
        files.push({'file': file, 'status' : 'Review Complete', decision: 'Denied'});
    }
}

if(files.length > 0) {
    template += `<div class="row m-0 pt-2 pb-2 align-left div-sticky" style="border-bottom: 1px solid rgb(0,0,0, 0.1);">
    <div class="col-md-4 text-center font-bold ws-nowrap pl-2">Concept Name <!--button class="transparent-btn sort-column" data-column-name="Cohort name"><i class="fas fa-sort"></i></button--></div>
    <div class="col-md-3 text-center font-bold ws-nowrap">Status <!--button class="transparent-btn sort-column" data-column-name="Population type"><i class="fas fa-sort"></i></button--></div>
    <div class="col-md-3 text-center font-bold ws-nowrap">Submission Date <!--button class="transparent-btn sort-column" data-column-name="Acronym"><i class="fas fa-sort"></i></button--></div>
    <div class="col-md-1 text-center font-bold ws-nowrap">Decision<!--button class="transparent-btn sort-column" data-column-name="Region"><i class="fas fa-sort"></i></button--></div>
</div>`;
  let i = 0;

  for(const element of files){
    const fileInfo = await getFileInfo(element.file.id);
    template += `<div class="card mt-1 mb-1 align-left" data-toggle="collapse" data-target="#study${element.file.id}">
    <div style="padding: 10px" aria-expanded="false" id="file${element.file.id}">
        <div class="row">
            <div class="col-md-4 text-center">${element.file.name}</div>
            <div class="col-md-3 text-center">${element.status}</div>
            <div class="col-md-3 text-center">${new Date(fileInfo.created_at).toDateString().substring(4,)}</div>
            <h6 class="badge badge-pill col-md-1">${element.decision}</h6>
            <div class="col-md-1 text-center">
                <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${element.file.id}">
                    <i class="fas fa-caret-down fa-2x"></i>
                </button>
            </div>
        </div>
        <div id="study${element.file.id}" class="collapse" aria-labelledby="file${element.file.id}">
                    <div class="card-body" style="padding-left: 10px;background-color:#f6f6f6;">
                    <div class="row mb-1 m-0">
                    <div class="col-md-2 font-bold">
                    Comments
                    </div>
                    </div>
                    <div class="row mb-1 m-0">
                      <div id='file${element.file.id}Comments' class='col-12'></div>
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


  document.getElementById('confluenceDiv').innerHTML = template;
    for(const element of files){
        document.getElementById(`file${element.file.id}`).addEventListener('click', showCommentsDropDown(element.file.id))
        }

return template;
}
