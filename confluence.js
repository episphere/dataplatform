import { template } from './src/components/navBarMenuItems.js';
import { template as homePage, homePageVisualization } from './src/pages/homePage.js';
import { template as dataSubmissionTemplate, lazyload } from './src/pages/dataSubmission.js';
import { template as dataSummary } from './src/pages/dataExploration.js';
import { template as dataRequestTemplate } from './src/pages/dataRequest.js';
import { footerTemplate } from './src/components/footer.js';
import { checkAccessTokenValidity, loginAppDev, loginAppProd, logOut } from './src/manageAuthentication.js';
import { storeAccessToken, removeActiveClass, showAnimation, getCurrentUser, inactivityTime, filterConsortiums, getFolderItems, filterProjects, amIViewer, getCollaboration, hideAnimation } from './src/shared.js';
import { addEventConsortiaSelect, addEventUploadStudyForm, addEventStudyRadioBtn, addEventDataGovernanceNavBar, addEventMyProjects } from './src/event.js';
import { dataAnalysisTemplate } from './src/pages/dataAnalysis.js';
import { getFileContent } from './src/visualization.js';

export const confluence = async () => {
    const confluenceDiv = document.getElementById('confluenceDiv');
    const navBarOptions = document.getElementById('navBarOptions');

    document.getElementById('loginBoxAppDev').addEventListener('click', loginAppDev);
    document.getElementById('loginBoxAppProd').addEventListener('click', loginAppProd);

    const footer = document.getElementById('footer');
    footer.innerHTML = footerTemplate();
    if (localStorage.parms === undefined) {
        window.location.hash = '#';
        confluenceDiv.innerHTML = homePage();
        await homePageVisualization();
        const loginBoxAppDev = document.getElementById('loginBoxAppDev');
        const loginBoxAppProd = document.getElementById('loginBoxAppProd');
        if (location.origin.match('localhost')) loginBoxAppDev.hidden = false;
        if (location.origin.match('episphere')) loginBoxAppProd.hidden = false;
        storeAccessToken();
    }
    if (localStorage.parms && JSON.parse(localStorage.parms).access_token) {
        const response = await getCurrentUser();

        if (response) {
            const lclStr = JSON.parse(localStorage.parms);
            // localStorage.parms = JSON.stringify({ ...lclStr, ...response });
            localStorage.parms = JSON.stringify(Object.assign(lclStr, response));
        }
        navBarOptions.innerHTML = template();
        document.getElementById('logOutBtn').addEventListener('click', logOut);

        const dataSubmissionElement = document.getElementById('dataSubmission');
        const dataSummaryElement = document.getElementById('dataSummary');
        const dataRequestElement = document.getElementById('dataRequest');
        const dataAnalysisElement = document.getElementById('dataAnalysis');

        dataSubmissionElement.addEventListener('click', async () => {
            if (dataSubmissionElement.classList.contains('navbar-active')) return;
            showAnimation();
            removeActiveClass('nav-menu-links', 'navbar-active');
            dataSubmissionElement.classList.add('navbar-active');
            confluenceDiv.innerHTML = await dataSubmissionTemplate();
            lazyload();
            addEventStudyRadioBtn();
            addEventConsortiaSelect();
            addEventUploadStudyForm();
            hideAnimation();
        });
        dataSummaryElement.addEventListener('click', () => {
            if (dataSummaryElement.classList.contains('navbar-active')) return;
            showAnimation();
            removeActiveClass('nav-menu-links', 'navbar-active');
            dataSummaryElement.classList.add('navbar-active');
            confluenceDiv.innerHTML = dataSummary();
            getFileContent();
        });
        dataRequestElement.addEventListener('click', () => {
            if (dataRequestElement.classList.contains('navbar-active')) return;
            showAnimation();
            removeActiveClass('nav-menu-links', 'navbar-active');
            dataRequestElement.classList.add('navbar-active');
            confluenceDiv.innerHTML = dataRequestTemplate();
            hideAnimation();
        });
        dataAnalysisElement.addEventListener('click', () => {
            if (dataAnalysisElement.classList.contains('navbar-active')) return;
            showAnimation();
            removeActiveClass('nav-menu-links', 'navbar-active');
            dataAnalysisElement.classList.add('navbar-active');
            confluenceDiv.innerHTML = dataAnalysisTemplate();
            hideAnimation();
        });

        const folders = await getFolderItems(0);
        const array = filterConsortiums(folders.entries);
        const projectArray = filterProjects(folders.entries);
        let showProjects = false;
        for (let obj of projectArray) {
            if (showProjects === false) {
                const bool = amIViewer(await getCollaboration(obj.id, `${obj.type}s`), JSON.parse(localStorage.parms).login);
                if (bool === true) showProjects = true;
            }
        }
        if (array.length > 0 && projectArray.length > 0 && showProjects === true) {
            document.getElementById('governanceNav').innerHTML = `
                
                <div class="nav-item  grid-elements">
                    <a class="nav-link nav-menu-links" href="#data_governance" title="Data Governance" id="dataGovernance"><i class="fas fa-database"></i> Data Governance</a>
                </div>
            `;
            document.getElementById('myProjectsNav').innerHTML = `
                
                <div class="nav-item  grid-elements">
                    <a class="nav-link nav-menu-links" href="#my_projects" title="My Projects" id="myProjects"><i class="fas fa-project-diagram"></i> My Projects</a>
                </div>
            `;
            addEventDataGovernanceNavBar(true);
            addEventMyProjects(projectArray);
        } else if (array.length > 0) {
            document.getElementById('governanceNav').innerHTML = `
                
                <div class="nav-item  grid-elements">
                    <a class="nav-link nav-menu-links" href="#data_governance" title="Data Governance" id="dataGovernance"><i class="fas fa-database"></i> Data Governance</a>
                </div>
            `;
            addEventDataGovernanceNavBar(true);
        } else if (projectArray.length > 0 && showProjects === true) {
            document.getElementById('myProjectsNav').innerHTML = `
                
                <div class="nav-item  grid-elements">
                    <a class="nav-link nav-menu-links" href="#my_projects" title="My Projects" id="myProjects"><i class="fas fa-project-diagram"></i> My Projects</a>
                </div>
            `;
            addEventMyProjects(projectArray);
        }
        manageHash();
    }
};

const manageHash = () => {
    const hash = decodeURIComponent(window.location.hash);
    if(hash === '' || hash === '#' || hash === '#data_exploration') {
        const element = document.getElementById('dataSummary');
        if(!element) return;
        if(element.classList.contains('navbar-active')) return;
        showAnimation();
        element.click();
    }
    else if (hash === '#data_analysis') {
        const element = document.getElementById('dataAnalysis');
        if(element.classList.contains('navbar-active')) return;
        showAnimation();
        element.click();
    }
    else if (hash === '#data_request') {
        const element = document.getElementById('dataRequest');
        if(element.classList.contains('navbar-active')) return;
        showAnimation();
        element.click();
    }
    else if (hash === '#data_submission') {
        const element = document.getElementById('dataSubmission');
        if(element.classList.contains('navbar-active')) return;
        showAnimation();
        element.click();
    }
    else if (hash === '#data_governance') {
        const element = document.getElementById('dataGovernance');
        if (element) {
            if(element.classList.contains('navbar-active')) return;
            showAnimation();
            element.click();
        }
        else window.location.hash = '#';
    }
    else if (hash === '#my_projects') {
        const element = document.getElementById('myProjects');
        if (element) {
            if (element.classList.contains('navbar-active')) return;
            showAnimation();
            element.click();
        } else window.location.hash = '#';
    } else if (hash === '#logout') {
        const element = document.getElementById('logOutBtn');
        element.click();
    } else window.location.hash = '#';
};

window.onload = async () => {
    const confluenceDiv = document.getElementById('confluenceDiv');
    confluenceDiv.innerHTML = '';
    if (localStorage.parms && JSON.parse(localStorage.parms).access_token) {
        await checkAccessTokenValidity();
        inactivityTime();
    }
    await confluence();
};

window.onhashchange = () => {
    manageHash();
};

window.onstorage = () => {
    if(localStorage.parms === undefined) logOut();
  };
