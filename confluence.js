import { navBarMenutemplate } from "./src/components/navBarMenuItems.js";
import { infoDeck, infoDeckAfterLoggedIn } from "./src/pages/homePage.js";
import { testPage2 } from "./src/pages/researchStudies.js";
import { publication, publicationNoSign, publicationAdmin } from "./src/pages/publicationpage.js";
import { myDCEGpublication } from "./src/pages/myDCEG.js";
import { instruction } from "./src/pages/uploadinstruction.js";
import { dataSubmissionTemplate,
  lazyload,
  userSubmissionsView,
  userSubmissionTemplate,
} from "./src/pages/dataSubmission.js";
import {
  dataSummary,
  dataSummaryMissingTemplate,
  dataSummaryStatisticsTemplate,
} from "./src/pages/dataExploration.js";
import {
  dataAccess as dataRequestTemplate,
  dataAccessNotSignedIn,
  dataForm,
  dataApproval,
  formSection,
  approveRejectSection,
  daccSection,
  daccFileView,
  formSectionOther,
  formFunctions,
  importDictVars,
  amendFormSelect,
  populateAmendSelect,
} from "./src/pages/dataRequest.js";
import {
  dataAccessHowTo,
  approvedData
} from "./src/pages/dataAccess.js";
import {
  checkAccessTokenValidity,
  loginAppDev,
  loginObs,
  loginAppEpisphere,
  logOut,
  loginAppProd,
} from "./src/manageAuthentication.js";
import {
  storeAccessToken,
  removeActiveClass,
  showAnimation,
  getCurrentUser,
  inactivityTime,
  filterConsortiums,
  getFolderItems,
  filterProjects,
  amIViewer,
  getCollaboration,
  hideAnimation,
  assignNavbarActive,
  getFileInfo,
  handleRangeRequests,
  applicationURLs,
  checkDataSubmissionPermissionLevel,
  uploadFormFolder,
  uploadFile,
  uploadWordFile,
  getFile,
  storeAccessTokenERa,
  getCurrentUserERa,
  getFolderInfo,
  checkMyPermissionLevel
} from "./src/shared.js";
import {
  addEventConsortiaSelect,
  addEventUploadStudyForm,
  addEventStudyRadioBtn,
  addEventDataGovernanceNavBar,
  addEventMyProjects,
  addEventUpdateSummaryStatsData,
} from "./src/event.js";
import { dataAnalysisTemplate } from "./src/pages/dataAnalysis.js";
import { getFileContent, getFileContentCases } from "./src/visualization.js";
import { aboutConfluence, renderOverView } from "./src/pages/about.js";
import { confluenceResources } from "./src/pages/join.js";
import { confluenceContactPage } from "./src/pages/contact.js";
import { footerTemplate } from "./src/components/footer.js";
import { renderDescription } from "./src/pages/description.js";
import { dataDictionaryTemplate } from "./src/pages/dictionary.js";
import { showPreview } from "./src/components/boxPreview.js";
import { uploadData, dataUploadForm, approvedFormSelect, populateApprovedSelect, showTab, addStudiesInput } from "./src/pages/uploaddata.js";
import { config } from "./src/config.js";

/**
 * 1. add Scientifix comitte to menu
 * 2. add corresponsing page
 * 3.
 */

export const confluence = async () => {
  if(window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations()
    .then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
        console.log("Service worker removed.")
      }
    });
  }
  const confluenceDiv = document.getElementById("confluenceDiv");
  const navBarOptions = document.getElementById("navBarOptions");
  document
    .getElementById("loginBoxAppDev")
    .addEventListener("click", loginAppDev);
  document
    .getElementById("loginBoxAppStage")
    .addEventListener("click", loginObs);
  document
    .getElementById("loginBoxAppEpisphere")
    .addEventListener("click", loginAppEpisphere);
  document
    .getElementById("loginBoxAppProd")
    .addEventListener("click", loginAppProd);

  if (localStorage.parms === undefined) {
    const loginBoxAppDev = document.getElementById("loginBoxAppDev");
    const loginBoxAppEpisphere = document.getElementById("loginBoxAppEpisphere");
    const loginBoxAppProd = document.getElementById("loginBoxAppProd");
    const loginBoxAppStage = document.getElementById("loginBoxAppStage");
    if (location.origin.match("localhost")) {
      loginBoxAppDev.hidden = false;
      document.getElementById("loginBoxDropDown").addEventListener("click", loginAppDev);
    };
    if (location.origin.match(applicationURLs.stage)) {
      loginBoxAppStage.hidden = false;
      document.getElementById("loginBoxDropDown").addEventListener("click", loginObs);
    };
    if (location.origin.match(applicationURLs.prod)) {
      loginBoxAppProd.hidden = false;
      document.getElementById("loginBoxDropDown").addEventListener("click", loginAppEpisphere);
    };
    if (location.origin.match("episphere")) {
      loginBoxAppEpisphere.hidden = false;
      document.getElementById("loginBoxDropDown").addEventListener("click", loginAppProd);
    };
    await storeAccessToken();
    manageRouter();
  }
  if (localStorage.parmsERa === undefined) {
    await storeAccessTokenERa();
    manageRouter();
  }
  if (localStorage.parms && JSON.parse(localStorage.parms).access_token) {
    const response = await getCurrentUser();
    showAnimation();
    if (response) {
      const lclStr = JSON.parse(localStorage.parms);
      localStorage.parms = JSON.stringify({
        ...lclStr,
        ...response,
      });
    }
    if (localStorage.parmsERa && JSON.parse(localStorage.parmsERa).access_token) {
      const responseERa = await getCurrentUserERa();
      console.log(responseERa);
      showAnimation();
      if (responseERa) {
        const lclStrERa = JSON.parse(localStorage.parmsERa);
        localStorage.parmsERa = JSON.stringify({
          ...lclStrERa,
          ...responseERa,
        });
      }
    }

    // Check if access to submit
    let folderCheck = 249771633109//249771633108 //249771633109
    try {
      var accessFolderInfo = await getFolderInfo(folderCheck);
      localStorage.setItem("accessFolderInfo", true);
    } catch (error) {
      var accessFolderInfo = false;
    };
    if (accessFolderInfo === false) {
      localStorage.setItem("accessFolderInfo", false);
      const header = document.getElementById("dcegPreviewerModalHeader");
      const body = document.getElementById("dcegPreviewerModalBody");
      header.innerHTML = `<h5 class="modal-title">Data Request Access Required</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>`;
      body.innerHTML = `<div>
                          Welcome to the DCEG PDR. It appears you don't currently have access to request data. 
                          To gain access, please send an email by using this 
                          <a href = 
                            "mailto:nci_dceg_pdr@nih.gov?subject=PDR Request Access For ${localStorage.parms ? JSON.parse(localStorage.parms).login : 'Unknown'}&body=**Please send this email as is. Do not change the subject line or body of this email or your request may be denied.**%0D%0ARequest to grant access to ${localStorage.parms ? JSON.parse(localStorage.parms).login : 'Unknown'} allowing for request form submission.">
                            link.
                          </a>
                          <br>
                          Please do not change the subject line or body of the email or your request may be denied. 
                          You may close this box to explore the PDR and to continue with Data Request Access please go to the Data Access Process tab or refresh browser.
                        </div>`
      $("#dcegPreviewerModal").modal("show");
    }
    // const bool = await checkMyPermissionLevel(
    //     await getCollaboration(
    //       folderCheck,
    //       `folders`
    //     ),
    //     JSON.parse(localStorage.parms).login
    //   );

    // const getCollaborators = await getCollaboration(
    //   folderCheck,
    //   "folders"
    // );
    //
    navBarOptions.innerHTML = navBarMenutemplate();
    document.getElementById("logOutBtn").addEventListener("click", logOut);
    const viewUserSubmissionElement =
      document.getElementById("userSubmissions");

    const dataSubmissionElement = document.getElementById("dataSubmission");
    const dataSummaryElement = document.getElementById("dataSummary");
    const dataSummarySubsetElement = document.getElementById("dataSummarySubset");
    const dataDictionaryElement = document.getElementById("dataDictionary");
    const dataRequestElement = document.getElementById("dataRequest");
    const dataFormElement = document.getElementById("dataForm");
    const studyAcceptedElement = document.getElementById("studyAccepted");
    const chairViewElement = document.getElementById("chairView");
    const daccViewElement = document.getElementById("daccView");
    const ConsortiaPageElement = document.getElementById("data2");
    const dataAccessElement = document.getElementById("dataAccessHowTo");
    const dataApprovedElement = document.getElementById("approvedData");
    const PublicationPageElement = document.getElementById("publicationID");
    const MyDCEGPageElement = document.getElementById("myDCEGID");
    const MyDCEGPageElement_upload = document.getElementById("myDCEGID_upload");
    const uploadInstructionElement = document.getElementById("instructionID");
    const dataGovernance = document.getElementById("dataGovernance");
    const adminDataPage = document.getElementById("adminpublicationID")

    // const platformTutorialElement = document.getElementById('platformTutorial');
    // const dataAnalysisElement = document.getElementById('dataAnalysis');

    // dataSubmissionElement.addEventListener("click", async () => {
    //   if (dataSubmissionElement.classList.contains("navbar-active")) return;
    //   showAnimation();
    //   assignNavbarActive(dataSubmissionElement, 1);
    //   document.title = "BCRPP - Data Submit";
    //   confluenceDiv.innerHTML = await dataSubmissionTemplate();
    //   lazyload();
    //   addEventStudyRadioBtn();
    //   addEventConsortiaSelect();
    //   addEventUploadStudyForm();
    //   hideAnimation();
    // });
    // dataSummaryElement.addEventListener("click", async () => {
    //   if (dataSummaryElement.classList.contains("navbar-active")) return;
    //   showAnimation();
    //   assignNavbarActive(dataSummaryElement, 1);
    //   document.title = "BCRPP - Summary Statistics";
    //   confluenceDiv.innerHTML = dataSummary(
    //     "Summary Statistics",
    //     false,
    //     true,
    //     true
    //   );
      // await addEventUpdateSummaryStatsData();
      // await dataSummaryStatisticsTemplate();
      // if(document.getElementById('dataSummaryFilter')) document.getElementById('dataSummaryFilter').addEventListener('click', e => {
      //     e.preventDefault();
      //     const header = document.getElementById('confluenceModalHeader');
      //     const body = document.getElementById('confluenceModalBody');
      //     header.innerHTML = `<h5 class="modal-title">Filter summary data</h5>
      //                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      //                             <span aria-hidden="true">&times;</span>
      //                         </button>`;
      //     body.innerHTML = `<span>Select Consortia or Studies to Display</span>`;
      // })
    //   await getFileContent();
    //   const subcasesSelection = document.getElementById("subcasesSelection");
    //   subcasesSelection.addEventListener("change", function (event) {
    //     if (event.target.value == "all") getFileContent();
    //     if (event.target.value == "cases") getFileContentCases();
    //   });
    // });

    if (dataSummarySubsetElement) {
      dataSummarySubsetElement.addEventListener("click", () => {
        if (dataSummarySubsetElement.classList.contains("navbar-active"))
          return;
        const confluenceDiv = document.getElementById("confluenceDiv");
        showAnimation();
        assignNavbarActive(dataSummarySubsetElement, 1);
        document.title = "DCEG - Subset Statistics";
        confluenceDiv.innerHTML = dataSummary(
          "Subset Statistics",
          false,
          true,
          true
        );
        addEventUpdateSummaryStatsData();
        removeActiveClass("nav-link", "active");
        document
          .querySelectorAll('[href="#data_exploration/subset"]')
          .classList.add("active");
        dataSummaryMissingTemplate();
        hideAnimation();
      });
    }
    if (viewUserSubmissionElement) {
      viewUserSubmissionElement.addEventListener("click", async () => {
        if (viewUserSubmissionElement.classList.contains("navbar-active"))
          return;
        showAnimation();
        assignNavbarActive(viewUserSubmissionElement);
        document.title = "DCEG - Your Submissions";
        await userSubmissionTemplate("Your Submissions", "User Submissions");
        hideAnimation();
      });
    }
    if (dataDictionaryElement) {
      dataDictionaryElement.addEventListener("click", () => {
        if (dataDictionaryElement.classList.contains("navbar-active")) return;
        const confluenceDiv = document.getElementById("confluenceDiv");
        showAnimation();
        assignNavbarActive(dataDictionaryElement);
        document.title = "DCEG - Studies";
        confluenceDiv.innerHTML = dataSummary(
          "DCEG Studies",
          true,
          false,
          false
        );
        addEventUpdateSummaryStatsData();
        removeActiveClass("nav-link", "active");
        document
          .querySelectorAll('[href="#data_exploration/dictionary"]')
          .classList.add("active");
        dataDictionaryTemplate();
      });
    }
    if (dataFormElement) {
      dataFormElement.addEventListener("click", async () => {
        if (dataFormElement.classList.contains("navbar-active")) return;
        const element = document.getElementById("dataForm");
        showAnimation();
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "DCEG - Data Form";
        assignNavbarActive(element);
        //dataForm();
        const getCollaborators = await getCollaboration(
          uploadFormFolder,
          "folders"
        ); //144028521583, 155292358576
        let getMyPermissionLevel = false;
        if (getCollaborators)
          getMyPermissionLevel = checkDataSubmissionPermissionLevel(
            getCollaborators,
            JSON.parse(localStorage.parms).login
          );
        let eraLogin = false;
        if (localStorage.parmsERa) eraLogin = true
        if (getMyPermissionLevel) {
          confluenceDiv.innerHTML = await formSection("form");
          //populateAmendSelect();
          // document
          //   .getElementById("amendmentyes")
          //   .addEventListener("click", amendFormSelect);
          // document
          //   .getElementById("amendmentno")
          //   .addEventListener("click", amendFormSelect);
          // if (!eraLogin) {
          //   document.getElementById("logineRA").addEventListener("click", async function () {
          //     location.href = `https://stsstg.nih.gov/auth/oauth/v2/authorize?response_type=code&client_id=ff775e46-ec74-46a3-b19f-ee2c60e8cf11&redirect_uri=https://episphere.github.io/dataplatform/&scope=openid+company+email+profile`
          //   });
          // }
          //let eraLogin = true;
          if (eraLogin) {
            await dataForm();
          } else {
            document.getElementById("logineRA").addEventListener("click", async function () {
              localStorage.setItem('lastURL', '#data_access/form');
              if(location.origin.match("localhost")) {
                location.href = `https://stsstg.nih.gov/auth/oauth/v2/authorize?response_type=code&client_id=ff775e46-ec74-46a3-b19f-ee2c60e8cf11&redirect_uri=https://episphere.github.io/dataplatform/&scope=openid+company+email+profile`
              } else if (location.origin.match(applicationURLs.epi)) {
                location.href = `https://stsstg.nih.gov/auth/oauth/v2/authorize?response_type=code&client_id=ff775e46-ec74-46a3-b19f-ee2c60e8cf11&redirect_uri=https://episphere.github.io/dataplatform/&scope=openid+company+email+profile`
              }
                else if (location.origin.match(applicationURLs.stage)) {
                location.href = `https://stsstg.nih.gov/auth/oauth/v2/authorize?response_type=code&client_id=d9c1a537-fe1d-437f-a1c4-62a6e481aaeb&redirect_uri=https://epidataplatforms.cancer.gov/&scope=openid+email+profile`
              } else if (location.origin.match(applicationURLs.prod)) {
                  location.href = `https://sts.nih.gov/auth/oauth/v2/authorize?response_type=code&client_id=d9c1a537-fe1d-437f-a1c4-62a6e481aaeb&redirect_uri=https://epidataplatforms.cancer.gov/&scope=openid+email+profile`
                }
            });
          }
        } else {
          //confluenceDiv.innerHTML = await formSectionOther("form");
          $("#dcegPreviewerModal").modal("show");
          hideAnimation();
        }
        //formFunctions();
        hideAnimation();
      });
    }
    if (studyAcceptedElement) {
      studyAcceptedElement.addEventListener("click", () => {
        if (studyAcceptedElement.classList.contains("navbar-active")) return;
        const element = document.getElementById("acceptedStudiesView");
        showAnimation();
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "DCEG - Accepted Studies";
        assignNavbarActive(element);
        confluenceDiv.innerHTML = acceptedStudiesSection("acceptedStudies");
        acceptedStudiesView();
        hideAnimation();
      });
    }
    if (daccViewElement) {
      daccViewElement.addEventListener("click", () => {
        if (daccViewElement.classList.contains("navbar-active")) return;
        const element = document.getElementById("daccView");
        showAnimation();
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "DCEG - DACC View";
        assignNavbarActive(element);
        confluenceDiv.innerHTML = daccSection("daccView");
        daccFileView();
      });
    }
    if (dataRequestElement) {
      dataRequestElement.addEventListener("click", () => {
        if (dataRequestElement.classList.contains("navbar-active")) return;
        const element = document.getElementById("dataRequest");
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "DCEG - Consortia";
        assignNavbarActive(element);
        confluenceDiv.innerHTML = dataRequestTemplate("overview");
        hideAnimation();
      });
    }
    if (dataAccessElement) {
      dataAccessElement.addEventListener("click", () => {
        if (dataAccessElement.classList.contains("navbar-active")) return;
        const element = document.getElementById("dataAccessHowTo");
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "Data Access How To";
        assignNavbarActive(element);
        confluenceDiv.innerHTML = dataAccessHowTo();
        hideAnimation();
      });
    }
    if (dataApprovedElement) {
      dataApprovedElement.addEventListener("click", () => {
        if (dataApprovedElement.classList.contains("navbar-active")) return;
        const element = document.getElementById("approvedData");
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "Approved Data Requests";
        assignNavbarActive(element);
        confluenceDiv.innerHTML = approvedData();
        hideAnimation();
      })
    }
    if (ConsortiaPageElement) {
      ConsortiaPageElement.addEventListener("click", () => {
        if (ConsortiaPageElement.classList.contains("navbar-active")) return;
        const element = document.getElementById("data2");
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "DCEG Studies";
        assignNavbarActive(element);
        confluenceDiv.innerHTML = testPage2();
        hideAnimation();
      });
    }
    PublicationPageElement.addEventListener("click", () => {
      if (PublicationPageElement.classList.contains("navbar-active")) return;
      const element = document.getElementById("publicationID");
      if (!element) return;
      if (element.classList.contains("navbar-active")) return;
      document.title = "DCEG - Publication";
      assignNavbarActive(element);
      console.log('publication');
      aboutConfluence("overview");
      publication();
      //addEventUpdateSummaryStatsData();
      hideAnimation();
    });
    if (adminDataPage) {
      adminDataPage.addEventListener("click", () => {
        if (adminDataPage.classList.contains("navbar-active")) return;
        const element = document.getElementById("adminpublicationID");
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "ADMIN DCEG - Publication";
        assignNavbarActive(element);
        console.log('publicationAdmin');
        aboutConfluence("overview");
        publicationAdmin();
        addEventUpdateSummaryStatsData();
        hideAnimation();     
    })};
    if (MyDCEGPageElement){
    MyDCEGPageElement.addEventListener("click", () => {
      if (MyDCEGPageElement.classList.contains("navbar-active")) return;
      const element = document.getElementById("myDCEGID");
      if (!element) return;
      if (element.classList.contains("navbar-active")) return;
      document.title = "DCEG - My DCEG Publication Data";
      assignNavbarActive(element);
      confluenceDiv.innerHTML = myDCEGpublication();
      hideAnimation();
    })};
    if (uploadInstructionElement){
    uploadInstructionElement.addEventListener("click", () => {
      if (uploadInstructionElement.classList.contains("navbar-active")) return;
      const element = document.getElementById("instructionID");
      if (!element) return;
      if (element.classList.contains("navbar-active")) return;
      document.title = "DCEG - instructionID";
      assignNavbarActive(uploadInstructionElement, 1);
      confluenceDiv.innerHTML = instruction();
      hideAnimation();
    })};
    if (MyDCEGPageElement_upload){
    MyDCEGPageElement_upload.addEventListener("click", () => {
      if (MyDCEGPageElement_upload.classList.contains("navbar-active")) return;
      const element = document.getElementById("myDCEGID_upload");
      if (!element) return;
      if (element.classList.contains("navbar-active")) return;
      document.title = "Upload - My DCEG Publication Data";
      assignNavbarActive(MyDCEGPageElement_upload, 1);
      confluenceDiv.innerHTML = uploadData();
      dataUploadForm();
      //populateApprovedSelect();
      hideAnimation();
    })};
    if (dataGovernance){
      dataGovernance.addEventListener("click", () => {
        if (dataGovernance.classList.contains("navbar-active")) return;
        const element = document.getElementById("dataGovernance");
        if (!element) return;
        if (element.classList.contains("navbar-active")) return;
        document.title = "See my uploaded data";
        console.log("testing governance");
        //assignNavbarActive(dataGovernance, 1);
        addEventDataGovernanceNavBar(true);
        //addEventMyProjects();
        // confluenceDiv.innerHTML = uploadData();
        // dataUploadForm();
        //populateApprovedSelect();
        hideAnimation();
      })};

    // const folders = await getFolderItems(0);
    // const array = filterConsortiums(folders.entries);
    // const projectArray = filterProjects(folders.entries);
    //const getCollaborators = await getCollaboration(145995765326, "folders");
    // let getMyPermissionLevel = true;
    // if (getCollaborators)
    //   getMyPermissionLevel = checkDataSubmissionPermissionLevel(
    //     getCollaborators,
    //     JSON.parse(localStorage.parms).login
    //   );
    // let showProjects = true;
    // console.log(array.length);
    // console.log(projectArray.length);
    // console.log(showProjects);
    // if (array.length > 0 && projectArray.length > 0 && showProjects === true) {
    //   document.getElementById("governanceNav").innerHTML = `
    //             ${
    //               getMyPermissionLevel
    //                 ? `
    //                 <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links navbar-active" href="#data_governance" title="Data Governance" id="dataGovernance">
    //                     Data Governance
    //                 </a>
    //             `
    //                 : ``
    //             }
    //         `;
    //   document.getElementById("myProjectsNav").innerHTML = `
    //             <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links" href="#my_projects" title="My Projects" id="myProjects">
    //                 My Projects
    //             </a>
    //         `;
    //   addEventDataGovernanceNavBar(true);
    //   addEventMyProjects();
    // } else if (array.length > 0 && getMyPermissionLevel) {
    //   document.getElementById("governanceNav").innerHTML = `
    //             <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links navbar-active" href="#data_governance" title="Data Governance" id="dataGovernance">
    //                 Data Governance
    //             </a>
    //         `;
    //   addEventDataGovernanceNavBar(true);
    // } else if (projectArray.length > 0 && showProjects === true) {
    //   document.getElementById("myProjectsNav").innerHTML = `
    //             <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links" href="#my_projects" title="My Projects" id="myProjects">
    //                 My Projects
    //             </a>
    //         `;
    //   addEventMyProjects();
    // // } else if (getMyPermissionLevel) {
    // //   document.getElementById("governanceNav").innerHTML = `
    // //             <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links navbar-active" href="#data_governance" title="Data Governance" id="dataGovernance">
    // //                 Data Governance
    // //             </a>
    // //         `;
    // //   addEventDataGovernanceNavBar(true);
    // }
    if (JSON.parse(localStorage.parms).login.split('@')[1].includes('deloitte.com') || JSON.parse(localStorage.parms).login.split('@')[1].includes('nih.gov')){
      document.getElementById("governanceNav").innerHTML = `
                  <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links navbar-active" href="#data_governance" title="Data Governance" id="dataGovernance">
                      Data Governance
                  </a>
              `;
      addEventDataGovernanceNavBar(true);
    }
    manageHash();
  }
};

const manageRouter = async () => {
  document.querySelector("[role='contentinfo']").innerHTML = footerTemplate();
  if (localStorage.parms !== undefined) return;
  const hash = decodeURIComponent(window.location.hash);
  if (
    !document.getElementById("navBarBtn").classList.contains("collapsed") &&
    document.getElementById("navbarToggler").classList.contains("show")
  )
    document.getElementById("navBarBtn").click();
  if (hash === "#home") {
    const element = document.getElementById("homePage");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "DCEG Data Platform";
    assignNavbarActive(element);
    infoDeck();
    hideAnimation();
  } else if (hash === "#about/overview") {
    const element = document.getElementById("aboutDCEG");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "DCEG - Overview";
    assignNavbarActive(element);
    aboutConfluence("overview");
    renderOverView();
  } else if (hash === "#join") {
    const element = document.getElementById("resourcesBCRPP");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "DCEG - Resources";
    assignNavbarActive(element);
    confluenceResources();
  }
  // else if (hash === "#contact") {
  //   const element = document.getElementById("contactBCRPP");
  //   if (!element) return;
  //   if (element.classList.contains("navbar-active")) return;
  //   document.title = "BCRPP - Contact";
  //   assignNavbarActive(element, 1);
  //   confluenceDiv.innerHTML = confluenceContactPage();
  // }
  else if (hash === "#data_access/overview") {
    console.log('dataRequest')
    const element = document.getElementById("dataRequest");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "DCEG - Consortia";
    assignNavbarActive(element);
    confluenceDiv.innerHTML = dataAccessNotSignedIn();
  } else if (hash === "#researchStudies") {
    const element = document.getElementById("data2");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "DCEG - researchStudies";
    assignNavbarActive(element);
    confluenceDiv.innerHTML = testPage2();
  } else if(hash === "#dataAccessHowTo") {
    const element = document.getElementById("dataAccessHowTo");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "Data Access How To";
    assignNavbarActive(element);
    confluenceDiv.innerHTML = dataAccessHowTo();
  } else if(hash === "#approvedData") {
    const element = document.getElementById("approvedData");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "Approved Data Requests";
    assignNavbarActive(element);
    confluenceDiv.innerHTML = approvedData();
  } else if (hash === "#publicationpage") {
    const element = document.getElementById("publicationID");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "DCEG - publicationpage";
    assignNavbarActive(element);
    aboutConfluence("overview");
    publicationNoSign();
  } else if (hash === "#myDCEG") {
    const element = document.getElementById("myDCEGID");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "DCEG - My DCEG Publication Data";
    assignNavbarActive(element);
    confluenceDiv.innerHTML = myDCEGpublication();
  }
  else if (hash === "#uploadinstruction") {
    const element = document.getElementById("instructionID");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "BCRPP - Instruction";
    assignNavbarActive(element);
    confluenceDiv.innerHTML = myDCEGpublication();
  } else if (hash === "#myDCEG/upload") {
    const element = document.getElementById("myDCEGID_upload");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    document.title = "DCEG - Publication Data Upload";
    assignNavbarActive(element);
    confluenceDiv.innerHTML = await uploadData();
    dataUploadForm();
  } else if (hash === "#data_access/form") {
    const dataFormElement = document.getElementById("dataForm");
    if (!dataFormElement) return;
    if (dataFormElement.classList.contains("navbar-active")) return;
    showAnimation();
    assignNavbarActive(dataFormElement);
    document.title = "DCEG - Data Form";
    confluenceDiv.innerHTML = await formSection("form");
    removeActiveClass("nav-link", "active");
    hideAnimation();
    //formFunctions();
  } else if (hash === "#data_access/acceptedStudies") {
    const acceptedStudiesElement = document.getElementById(
      "acceptedStudiesView"
    );
    if (!acceptedStudiesElement) return;
    if (acceptedStudiesElement.classList.contains("navbar-active")) return;
    showAnimation();
    assignNavbarActive(acceptedStudiesElement);
    document.title = "DCEG - Accepted Studies";
    confluenceDiv.innerHTML = acceptedStudiesSection();
    removeActiveClass("nav-link", "active");
  } else if (hash === "#data_access/daccView") {
    const daccViewElement = document.getElementById("daccView");
    showAnimation();
    if (!daccViewElement) return;
    if (daccViewElement.classList.contains("navbar-active")) return;
    assignNavbarActive(daccViewElement);
    document.title = "DCEG - DACC View";
    confluenceDiv.innerHTML = daccSection();
    removeActiveClass("nav-link", "active");
  } else if (hash === "#data_exploration/dictionary") {
    const dataDictionaryElement = document.getElementById("dataDictionary");
    if (
      !dataDictionaryElement ||
      dataDictionaryElement.classList.contains("navbar-active")
    )
      return;
    showAnimation();
    assignNavbarActive(dataDictionaryElement);
    document.title = "DCEG - Studies";
    confluenceDiv.innerHTML = dataSummary(
      "DCEG Studies",
      true,
      false,
      false,
      true
    );
    removeActiveClass("nav-link", "active");
    document
      .querySelectorAll('[href="#data_exploration/dictionary"]')[1]
      .classList.add("active");
    dataDictionaryTemplate();
  } else if (hash === "#userSubmissions") {
    const viewUserSubmissionElement =
      document.getElementById("userSubmissions");
    if (
      !viewUserSubmissionElement ||
      viewUserSubmissionElement.classList.contains("navbar-active")
    )
      return;
    showAnimation();
    assignNavbarActive(viewUserSubmissionElement);
    document.title = "DCEG - Your Submissions";
    userSubmissionTemplate("Your Submissions", "User Submissions");
    hideAnimation();
  } else window.location.hash = "#home";
};

const manageHash = async () => {
  document.querySelector("[role='contentinfo']").innerHTML = footerTemplate();
  if (localStorage.parms === undefined) return;
  let hash = decodeURIComponent(window.location.hash);
  if(localStorage.lastURL){
    hash = localStorage.lastURL;
  }
  if (
    !document.getElementById("navBarBtn").classList.contains("collapsed") &&
    document.getElementById("navbarToggler").classList.contains("show")
  )
    document.getElementById("navBarBtn").click();
  if (hash === "#data_exploration/summary") {
    const element = document.getElementById("dataSummary");
    if (!element) return;
    element.click();
  } else if (
    hash === "#data_exploration/subset" &&
    !location.origin.match(applicationURLs.prod)
  ) {
    const element = document.getElementById("dataSummarySubset");
    if (!element) return;
    element.click();
  } else if (hash === "#data_exploration/dictionary") {
    const element = document.getElementById("dataDictionary");
    if (!element) return;
    element.click();
  } else if (hash === "#userSubmissions") {
    const element = document.getElementById("userSubmissions");
    if (!element) return;
    element.click();
  } else if (hash === "#data_access/overview") {
    const element = document.getElementById("dataRequest");
    element.click();
  } else if (hash === "#researchStudies") {
    const element = document.getElementById("data2");
    element.click();
  } else if (hash ==="#dataAccessHowTo") {
    const element = document.getElementById("dataAccessHowTo");
    element.click();
  } else if (hash === "#approvedData") {
    const element = document.getElementById("approvedData");
    element.click();
  } else if (hash === "#publicationpage") {
    const element = document.getElementById("publicationID");
    element.click();
  } else if (hash === "#adminpublicationpage") {
    const element = document.getElementById("adminpublicationID");
    element.click();
  } else if (hash === "#myDCEG") {
    const element = document.getElementById("myDCEGID");
    element.click();
  } else if (hash === "#uploadinstruction") {
    const element = document.getElementById("instructionID");
    element.click();
  } else if (hash === "#myDCEG/upload") {
    const element = document.getElementById("myDCEGID_upload");
    element.click();
  } else if (hash === "#data_access/form") {
    const element = document.getElementById("dataForm");
    if(localStorage.lastURL){
      localStorage.removeItem('lastURL');
    }
    if (!element) return;
    element.click();
  } else if (hash === "#data_access/acceptedStudies") {
    const element = document.getElementById("acceptedStudies");
    if (!element) return;
    element.click();
  } else if (hash === "#data_access/chairView") {
    const element = document.getElementById("chairView");
    if (!element) return;
    element.click();
  } else if (hash === "#data_access/daccView") {
    const element = document.getElementById("daccView");
    if (!element) return;
    element.click();
  } else if (hash === "#data_submission") {
    const element = document.getElementById("dataSubmission");
    element.click();
  } else if (hash === "#data_governance") {
    const element = document.getElementById("dataGovernance");
    if (element) {
      element.click();
    } else window.location.hash = "#";
  } else if (hash === "#my_projects") {
    const element = document.getElementById("myProjects");
    if (element) {
      element.click();
    } else window.location.hash = "#";
  } else if (hash === "#logout") {
    const element = document.getElementById("logOutBtn");
    element.click();
  } else if (hash === "#home") {
    const element = document.getElementById("homePage");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    assignNavbarActive(element);
    document.title = "DCEG Data Platform";
    infoDeckAfterLoggedIn();
    hideAnimation();
  } else if (hash === "#about/overview") {
    const element = document.getElementById("aboutDCEG");
    if (!element) return;
    assignNavbarActive(element);
    document.title = "DCEG - Overview";

    //const fileInfo = await getFileInfo(904897189551);
    //aboutConfluence("overview", fileInfo ? true : false);
    aboutConfluence("overview");
    renderOverView();
    hideAnimation();
  // } else if (hash === "#about/contact") {
  //   const element = document.getElementById("aboutBCRPP");
  //   console.log({ element });
  //   if (!element) return;
  //   assignNavbarActive(element);
  //   document.title = "BCRP - Scientific Committe";
  //   // const fileInfo = await getFileInfo(904897189551);
  //   // console.log({ fileInfo });
  //   //aboutConfluence("contact", fileInfo ? true : false);
  //   //aboutConfluence("contact");
  //   confluenceContactPage();
  //   hideAnimation();
  } else if (hash === "#about/description") {
    const element = document.getElementById("aboutDCEG");
    if (!element) return;
    assignNavbarActive(element);
    document.title = "BCRP - Study Description";
    showAnimation();
    const fileInfo = await getFileInfo(904897189551); //new: 904897189551; original: 881144462693
    aboutConfluence("description", fileInfo ? true : false);
    renderDescription(fileInfo["content_modified_at"]);
    hideAnimation();
  } else if (hash === "#join") {
    const element = document.getElementById("resourcesBCRPP");
    if (!element) return;
    if (element.classList.contains("navbar-active")) return;
    assignNavbarActive(element);
    document.title = "DCEG - Resources";
    confluenceResources();
    hideAnimation();
  }
  // else if (hash === "#contact") {
  //   const element = document.getElementById("contactBCRPP");
  //   if (!element) return;
  //   if (element.classList.contains("navbar-active")) return;
  //   assignNavbarActive(element, 1);
  //   document.title = "BCRP - Committee";
  //   confluenceDiv.innerHTML = confluenceContactPage();
  //   hideAnimation();
  // }
  else window.location.hash = "#home";
};

window.onload = async () => {
  const confluenceDiv = document.getElementById("confluenceDiv");
  confluenceDiv.innerHTML = "";
  if (localStorage.parms && JSON.parse(localStorage.parms).access_token) {
    await checkAccessTokenValidity();
    inactivityTime();
  }
  await confluence();
};

window.onhashchange = () => {
  manageHash();
  manageRouter();
};

window.onstorage = () => {
  if (localStorage.parms === undefined) logOut();
  else {
    confluence();
    document.getElementById("loginBoxAppDev").hidden = true;
    document.getElementById("loginBoxAppStage").hidden = true;
    document.getElementById("loginBoxAppEpisphere").hidden = true;
    document.getElementById("loginBoxAppProd").hidden = true;
  }
};

window.addEventListener("beforeinstallprompt", (e) => {
  e.userChoice.then((choiceResult) => {
    gtag("send", "event", "A2H", choiceResult.outcome);
  });
});
