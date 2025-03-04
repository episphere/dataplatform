import { tsv2Json } from "./../shared.js";

export const testPage2 = () => {
  // let template = `
  //     <div class="general-bg padding-bottom-1rem">
  //          <div class="container body-min-height">
  //             <div class="main-summary-row">
  //               <div class="align-left">
  //                 <h1 
  //                   class="page-header">Data Platforms for DCEG Research Studies
  //                 </h1>
  //               </div>
  //             </div>
  //             <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
  //               <div class="row m-0">  
  //                 <span>
  //                   <!--<br><iframe title="Report Section" width="1024" height="800" src=https://app.powerbigov.us/view?r=eyJrIjoiNTlkMjUwMzUtYWRmZS00NGMyLWFlMzktOGFjZWJjMDgwMWEzIiwidCI6IjE0Yjc3NTc4LTk3NzMtNDJkNS04NTA3LTI1MWNhMmRjMmIwNiJ9&pageName=ReportSection400e38af4048821418ee frameborder="0" allowFullScreen="true"></iframe></br>-->
  //                   <br><a href= "https://aghealth.nih.gov/" target="__blank">Agricultural Health Study</a></br>
  //                   <br><a href= "http://dietandhealth.cancer.gov/" target="__blank">NIH-AARP Diet and Health Study</a></br>
  //                   <br><a href= "https://biometry.nci.nih.gov/cdas/plco/" target="__blank">The Prostate, Lung, Colorectal and Ovarian</a></br>
  //                   <br><a href= "https://dceg2.cancer.gov/gemshare/" target="__blank">GEMINI Shared Repoisitory</a></br>
  //                 </span> 
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //     `;

  // return template;
  let template = `
  <div class="general-bg padding-bottom-1rem">
    <div class="container body-min-height">
      <div class="main-summary-row">
        <div class="align-left">
          <h1 class="page-header">Websites for DCEG Cohorts - <span style="color:red;">UNDER DEVELOPMENT</span></h1>
        </div>
          <div class="main-summary-row">
            <div class="col-xl-12 padding-right-zero font-size-16" id="summaryStatsCharts">
              <div class="main-summary-row pl-2">
                  <div class="col-xl-12 pb-2 pl-0 pr-0 white-bg div-border">
                      <div class="pt-0 pl-2 pb-2 pr-2 allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" id="descriptionBody"></div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`
  //document.getElementById('overview').innerHTML = template;
  getStudies();
  return template;
};

const getStudies = async () => {
  const data = await (await fetch("https://raw.githubusercontent.com/episphere/dataplatform/production/DCEGcohortswithplatforms2.txt")).text();
  //const data = await (await fetch("./DCEGcohortswithplatforms2.tsv")).text()
  const tsv2json = tsv2Json(data);
  console.log(tsv2json);
  const json = tsv2json.data;
  const headers = tsv2json.headers;
  let newJsons = {};
  let prev= '';
  let template = "";

  json.forEach(obj => {
    if(obj['Study']) obj['Study'] = obj['Study'].trim();
    const study = obj['Study'] ? obj['Study'] : undefined;
    if(study && newJsons[`${study}`] === undefined) newJsons[`${study}`] = {}
    if(study) {
      prev = `${study}`;
      newJsons[`${study}`] = obj;
      if(newJsons[`${study}`].pis === undefined) newJsons[`${study}`].pis = [];
      newJsons[`${study}`].pis.push({PI: obj['PI']})
      delete newJsons[`${study}`]['PI']
    }
    else {
      newJsons[prev].pis.push({PI: obj['PI']})
    }
  })
  console.log(newJsons);
  const descriptions = Object.values(newJsons);
  if (json.length > 0) {
    // template += `
    //   <div class="row m-0 pt-2 pb-2 align-left div-sticky" style="border-bottom: 1px solid rgb(0,0,0, 0.1);">
    //     <div class="col-md-12 font-bold ws-nowrap pl-2">Studies <button class="transparent-btn sort-column" data-column-name="study"><i class="fas fa-sort"></i></button></div>
    //   </div>
    // `
    descriptions.forEach((desc, index) => {
      console.log(desc);
      template += `
      <div class="card mt-1 mb-1 align-left">
        <div style="padding: 10px" aria-expanded="false" id="heading${desc['Study'].replace(/\s/g, '').replace(/(<b>)|(<\/b>)/g, '').replaceAll(',','').trim()}">
            <div class="row">
                <div class="col-md-11">${desc['Study']}</div>
                <div class="col-md-1">
                  <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${desc['Study'].replace(/\s/g, '').replace(/(<b>)|(<\/b>)/g, '').replaceAll(',','').trim()}">
                      <i class="fas fa-caret-down fa-2x"></i>
                  </button>
                </div>
            </div>
        </div>
        <div id="study${desc['Study'].replace(/\s/g, '').replace(/(<b>)|(<\/b>)/g, '').replaceAll(',','').trim()}" class="collapse" aria-labelledby="heading${desc['Study'].replace(/\s/g, '').replace(/(<b>)|(<\/b>)/g, '').replaceAll(',','').trim()}">
          <div class="card-body" style="padding-left: 10px;background-color:#f6f6f6;">
              ${desc['Description'] ? `<div class="row mb-1"><div class="col-md-2 font-bold">Description</div><div class="col">${desc['Description']}</div></div>`: ``}
              ${desc['Link'] ? `<div class="row mb-1"><div class="col-md-2 font-bold">Link</div><div class="col"><a href="${desc['Link']}">${desc['Link']}</a></div></div>`: ``}
          `
          if(desc['pis'].length > 0) {
              desc['pis'].forEach(info => {
                  console.log(info);
                  template += `<div class="row"><div class="col-md-2 font-bold">PI</div><div class="col">${info['PI']}</div></div>`
              })
          }
          template +=`
          </div>
        </div>
      </div>
      `
    });
  }
  document.getElementById('descriptionBody').innerHTML = template;
  addEventToggleCollapsePanelBtn();
}

export const addEventToggleCollapsePanelBtn = () => {
  const btns = document.getElementsByClassName('collapse-panel-btn');
  Array.from(btns).forEach(btn => {
      btn.addEventListener('click', () => {
          if(btn.querySelector('.fas.fa-2x').classList.contains('fa-caret-down')) {
              btn.querySelector('.fas.fa-2x').classList.remove('fa-caret-down')
              btn.querySelector('.fas.fa-2x').classList.add('fa-caret-up')
          }
          else {
              btn.querySelector('.fas.fa-2x').classList.remove('fa-caret-up')
              btn.querySelector('.fas.fa-2x').classList.add('fa-caret-down')
          }
      })
  })
}
//   return `
//   <div class="general-bg padding-bottom-1rem">
//   <div class="container body-min-height">
//       <div class="main-summary-row">
//           <div class="align-left">
//          <h1
//          class="page-header">Data Platforms for DCEG Research Studies
//          </h1>
//          </div>
//       </div>
//     </div>
//       </span>
//       The following are studies with data platforms to provide researchers with information about the studies and a mechanism for requesting access to data from the study:
//       <div class="align-left">
//     <br> <a href= "https://aghealth.nih.gov/">Agricultural Health Study
//     </a><br>
//     <br><a href= "http://atbcstudy.cancer.gov/">Alpha-Tocopherol, Beta-Carotene Study
//     </a><br>

//       <br><a href= "http://dietandhealth.cancer.gov/">NIH-AARP Diet and Health Study
//       </a><br>
//       <br><a href= "https://biometry.nci.nih.gov/cdas/plco/">The Prostate, Lung, Colorectal and Ovarian (PLCO) </a><br>
//       <br><a href= "https://biometry.nci.nih.gov/cdas/plco/">Cancer Screening Trial  Study</a><br>
//       <br><a href= "http://radtechstudy.nci.nih.gov/">CRadiologic Technologists Study
//       </a><br>
//       <br><div class="home-page-stats font-size-18"><br>
//       <div>
//     `;
// };
