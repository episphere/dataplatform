import { addEventFilterBarToggle } from "../event.js";
import {
  defaultPageSize,
  getFile,
  shortenText,
  tsv2Json,
  csv2Json
} from "./../shared.js";
import { downloadFiles } from "./dictionary.js";
let previousValue = "";

export const publication = (modified_at) => {
  let template = `
  <div class="main-summary-row">
         <div class="row align-left w-100 m-0">
              <h1 class="col page-header pl-0 pt-2">Study Description</h1>
                <div class="ml-auto allow-overflow mr-2" style="margin:1rem 0" id="pagesContainer"></div>
                <div class="ml-auto mt-3 mb-3 mr-2" id="pageSizeContainer"></div>
                <div class="ml-auto mt-3 mb-3" id="downloadContainer">
                    <div class="col-md-12 p-0 dropdown">
                        <div class="grid-elements ">
                            <button title="Download" class="transparent-btn form-control dropdown-toggle dropdown-btn" data-toggle="dropdown" id="downloadDictionary" style="color:#000000 !important">
                                Download <i class="fas fa-download" style="color:#000000 !important"></i>
                            </button>
                            <div class="dropdown-menu navbar-dropdown" aria-labelledby="downloadDictionary">
                                <button class="transparent-btn dropdown-item dropdown-menu-links" title="Download dictionary as csv" id="downloadDictionaryCSV">CSV</button>
                                <button class="transparent-btn dropdown-item dropdown-menu-links" title="Download dictionary as tsv" id="downloadDictionaryTSV">TSV</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-summary-row">
            <div class="col-xl-2 filter-column div-border white-bg align-left p-2" id="summaryFilterSiderBar">
                <div class="main-summary-row">
                    <div class="col-xl-12 pl-1 pr-0">
                        <span class="font-size-17 font-bold">Filter</span>
                        <div id="filterDataCatalogue" class="align-left"></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-10 padding-right-zero font-size-16" id="summaryStatsCharts">
                <button id="filterBarToggle"><i class="fas fa-lg fa-caret-left"></i></button>
                <!---<div class="main-summary-row pl-2" style="min-height: 10px;margin-bottom: 1rem;">
                    <div class="col white-bg div-border align-left font-size-17" style="padding: 0.5rem;" id="listFilters">
                        <span class="font-bold">Region:</span> All
                    </div>
                </div>--->
                <div class="main-summary-row pl-2">
                    <div class="col-xl-12 pb-2 pl-0 pr-0 white-bg div-border">
                        <div class="pt-0 pl-2 pb-2 pr-2 allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" id="descriptionBody"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-summary-row">
            <div class="offset-xl-2 col data-last-modified align-left mt-3 mb-0 pl-4" id="dataLastModified">
                Data last modified at - ${new Date(
                  modified_at
                ).toLocaleString()}
            </div>
        </div>
    `;
  document.getElementById("overview").innerHTML = template;
  getDescription();
};

const getDescription = async () => {
  const data = await (await fetch("./imports/DCEG_Publications.csv")).text();
  const tsv2json = csv2Json(data);
  const json = tsv2json.data;
  const headers = tsv2json.headers;
  let newJsons = {};
  let prevAcronym = "";
  // json.forEach((obj) => {
  //   if (obj["Cohort name"]) obj["Cohort name"] = obj["Cohort name"].trim();
  //   if (obj["Acronym"]) obj["Acronym"] = obj["Acronym"].trim();
  //   const consortium = obj["Cohort name"] ? obj["Cohort name"] : undefined;
  //   const studyAcronym = obj["Acronym"] ? obj["Acronym"] : undefined;
  //   if (studyAcronym && newJsons[`${consortium}${studyAcronym}`] === undefined)
  //     newJsons[`${consortium}${studyAcronym}`] = {};
  //   if (studyAcronym) {
  //     prevAcronym = `${consortium}${studyAcronym}`;
  //     newJsons[`${consortium}${studyAcronym}`] = obj;
  //   } else {
  //   }
  // });

  // const allCountries = [];
  // Object.values(newJsons).forEach((dt) => {
  //   if (dt["Region"] === undefined) return;
  //   dt["Region"].split(",").forEach((ctr) => {
  //     ctr.split(" and ").forEach((c) => {
  //       if (c.trim()) allCountries.push(c.trim());
  //     });
  //   });
  // });
  //const allConsortium = Object.values(newJsons).map((dt) => dt["Acronym"]);

  // const countries = allCountries
  //   .filter((d, i) => allCountries.indexOf(d) === i)
  //   .sort();
  // const uniqueConsortium = allConsortium
  //   .filter((d, i) => d && allConsortium.indexOf(d.trim()) === i)
  //   .sort();

  let filterTemplate = `
        <div class="main-summary-row">
            <div style="width: 100%;">
                <div class="form-group" margin:0px>
                    <div id="searchContainer"></div>
                </div>
            </div>
        </div>
        `;
  // filterTemplate += `
  //                   </ul>
  //               </div>
  //           </div>
  //       </div>
  //       <div class="main-summary-row">
  //           <div style="width: 100%;">
  //               <div class="form-group" margin:0px>
  //                   <label class="filter-label font-size-13" for="countriesList">Region</label>
  //                   <ul class="remove-padding-left font-size-15 filter-sub-div allow-overflow" id="countriesList">
  //                       `;
  // countries.forEach((region) => {
  //   filterTemplate += `
  //               <li class="filter-list-item">
  //                   <input type="checkbox" data-country="${region}" id="label${region}" class="select-country" style="margin-left: 1px !important;">
  //                   <label for="label${region}" class="country-name" title="${region}">${shortenText(
  //     region,
  //     15
  //   )}</label>
  //               </li>
  //           `;
  // });
  filterTemplate += `
                    </ul>
                </div>
            </div>
        </div>
    `;
  document.getElementById("filterDataCatalogue").innerHTML = filterTemplate;
  //const descriptions = Object.values(newJsons);
  const descriptions = Object.values(json);
  document.getElementById("searchContainer").innerHTML = `
    <div class="input-group">
        <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="searchDataCatalog" aria-describedby="search-addon" />
        <span class="input-group-text border-0 search-input">
            <i class="fas fa-search"></i>
        </span>
    </div>
    `;
  addEventFilterDataCatalogue(descriptions, headers);
  downloadFiles(descriptions, headers, "study_description", true);
  renderStudyDescription(descriptions, defaultPageSize, headers);
  paginationHandler(descriptions, defaultPageSize, headers);
  document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(
    descriptions,
    defaultPageSize
  );
  addEventPageSizeSelection(descriptions, headers);
  addEventFilterBarToggle();
};

const renderStudyDescription = (descriptions, pageSize, headers) => {
  let template = "";
  if (descriptions.length > 0) {
    template = `
        <div class="row m-0 pt-2 pb-2 align-left div-sticky" style="border-bottom: 1px solid rgb(0,0,0, 0.1);">
            <div class="col-md-3 font-bold ws-nowrap pl-2">Title of Publication <button class="transparent-btn sort-column" data-column-name="Title_of_Publication"><i class="fas fa-sort"></i></button></div>
            <div class="col-md-2 font-bold ws-nowrap">First Author <button class="transparent-btn sort-column" data-column-name="First_Author"><i class="fas fa-sort"></i></button></div>
            <div class="col-md-2 font-bold ws-nowrap">Year <button class="transparent-btn sort-column" data-column-name="Year"><i class="fas fa-sort"></i></button></div>
            <div class="col-md-3 font-bold ws-nowrap">Data Set PID <button class="transparent-btn sort-column" data-column-name="Dataset_ID"<i class="fas fa-sort"></i></button></div>
            <div class="col-md-1"></div>
        </div>`;
    descriptions.forEach((desc, index) => {
      if (index > pageSize) return;
      //console.log(desc);
      template += `
            <div class="card mt-1 mb-1 align-left">
                <div style="padding: 10px" aria-expanded="false" id="heading${desc["PMID"].replace(/(<b>)|(<\/b>)/g, "")}">
                    <div class="row">
                        <div class="col-md-3">${desc["Title_of_Publication"] ? desc["Title_of_Publication"] : ""}</div>
                        <div class="col-md-2">${desc["First_Author"] ? desc["First_Author"] : ""}</div>
                        <div class="col-md-2">${desc["Year"] ? desc["Year"] : ""}</div>
                        <div class="col-md-3"><a href="${desc["Dataset_URL"] ? desc["Dataset_URL"] : ""}" target="_blank">${desc["Dataset_ID"] ? desc["Dataset_ID"] : ""}</a></div>
                        <div class="col-md-1">
                            <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${desc["PMID"].replace(/(<b>)|(<\/b>)/g, "")}">
                                <i class="fas fa-caret-down fa-2x"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div id="study${desc["PMID"].replace(
                  /(<b>)|(<\/b>)/g,
                  ""
                )}" class="collapse" aria-labelledby="heading${desc["PMID"]}">
                    <div class="card-body" style="padding-left: 10px;background-color:#f6f6f6;">
                    ${
                      desc["Study"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 font-bold">Study</div><div class="col">${desc["Study"]}</div></div>`
                        : ``
                    }
                    ${
                      desc["Outcome"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 font-bold">Outcome</div><div class="col">${desc["Outcome"]}</div></div>`
                        : ``
                    }
                    ${
                      desc["Data_Dictionary_ID"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 font-bold">Data_Dictionary_ID</div><div class="col">${desc["Data_Dictionary_ID"]}</div></div>`
                        : ``
                    }
                    `;
      template += `
                    </div>
                </div>
            </div>`;
    });
  } else {
    template += "Data not found!";
  }
  document.getElementById("descriptionBody").innerHTML = template;
  addEventToggleCollapsePanelBtn();
  addEventSortColumn(descriptions, pageSize, headers);
};

const addEventSortColumn = (descriptions, pageSize, headers) => {
  const btns = document.getElementsByClassName("sort-column");
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", () => {
      const columnName = btn.dataset.columnName;
      descriptions = descriptions.sort((a, b) =>
        a[columnName] > b[columnName]? 1: b[columnName] > a[columnName] ? -1 : 0
      );
      renderStudyDescription(descriptions, pageSize, headers);
    });
  });
};

const addEventFilterDataCatalogue = (descriptions, headers) => {
  // const consortiumTypeSelection =
  //   document.getElementsByClassName("select-consortium");
  // Array.from(consortiumTypeSelection).forEach((ele) => {
  //   ele.addEventListener("click", () => {
  //     filterDataBasedOnSelection(descriptions, headers);
  //   });
  // });

  // const countrySelection = document.getElementsByClassName("select-country");
  // Array.from(countrySelection).forEach((ele) => {
  //   ele.addEventListener("click", () => {
  //     filterDataBasedOnSelection(descriptions, headers);
  //   });
  // });
  const input = document.getElementById("searchDataCatalog");
  input.addEventListener("input", () => {
    filterDataBasedOnSelection(descriptions, headers);
  });
};

export const addEventToggleCollapsePanelBtn = () => {
  const btns = document.getElementsByClassName("collapse-panel-btn");
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.querySelector(".fas.fa-2x").classList.contains("fa-caret-down")) {
        btn.querySelector(".fas.fa-2x").classList.remove("fa-caret-down");
        btn.querySelector(".fas.fa-2x").classList.add("fa-caret-up");
      } else {
        btn.querySelector(".fas.fa-2x").classList.remove("fa-caret-up");
        btn.querySelector(".fas.fa-2x").classList.add("fa-caret-down");
      }
    });
  });
};

const filterDataBasedOnSelection = (descriptions, headers) => {
  // const consortiumSelected = Array.from(
  //   document.getElementsByClassName("select-consortium")
  // )
  //   .filter((dt) => dt.checked)
  //   .map((dt) => dt.dataset.consortium);

  // const countrySelected = Array.from(
  //   document.getElementsByClassName("select-country")
  // )
  //   .filter((dt) => dt.checked)
  //   .map((dt) => dt.dataset.country);

  let filteredData = descriptions;

  // if (consortiumSelected.length > 0) {
  //   filteredData = filteredData.filter(
  //     (dt) => consortiumSelected.indexOf(dt["Acronym"]) !== -1
  //   );
  // }

  // if (countrySelected.length > 0) {
  //   filteredData = filteredData.filter((dt) => {
  //     let found = false;
  //     countrySelected.forEach((ctr) => {
  //       if (dt["Region"] === undefined) return;
  //       if (found) return;
  //       if (dt["Region"].match(new RegExp(ctr, "ig"))) found = true;
  //     });
  //     if (found) return dt;
  //   });
  // }

  // document.getElementById("listFilters").innerHTML = `
        
  //       ${
  //         countrySelected.length > 0
  //           ? `
  //           <span class="font-bold">Region: </span>${countrySelected[0]} ${
  //               countrySelected.length > 1
  //                 ? `and <span class="other-variable-count">${
  //                     countrySelected.length - 1
  //                   } other</span>`
  //                 : ``
  //             }
  //       `
  //           : `
  //           <span class="font-bold">Region:</span> All
  //       `
  //       }
  //   `;
  // if (countrySelected.length === 0) filteredData = descriptions;
  const input = document.getElementById("searchDataCatalog");
  const currentValue = input.value.trim().toLowerCase();

  if (
    currentValue.length <= 2 &&
    (previousValue.length > 2 || previousValue.length === 0)
  ) {
    document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(
      filteredData,
      defaultPageSize
    );
    renderStudyDescription(
      filteredData,
      document.getElementById("pageSizeSelector").value,
      headers
    );
    paginationHandler(
      filteredData,
      document.getElementById("pageSizeSelector").value,
      headers
    );
    addEventPageSizeSelection(filteredData, headers);
    return;
  }
  previousValue = currentValue;
  let searchedData = JSON.parse(JSON.stringify(filteredData));
  searchedData = searchedData.filter((dt) => {
    let found = false;
    if (dt["Title_of_Publication"] && dt["Title_of_Publication"].toLowerCase().includes(currentValue))
      found = true;
    if (dt["First_Author"].toLowerCase().includes(currentValue)) found = true;
    if (dt["Year"].toLowerCase().includes(currentValue)) found = true;
    if (dt["Dataset_ID"].toLowerCase().includes(currentValue))
      found = true;
    if (found) return dt;
  });
  searchedData = searchedData.map((dt) => {
    dt["Title_of_Publication"] = dt["Title_of_Publication"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    dt["First_Author"] = dt["First_Author"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    dt["Year"] = dt["Year"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    dt["Dataset_ID"] = dt["Dataset_ID"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    return dt;
  });

  document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(
    searchedData,
    defaultPageSize
  );
  renderStudyDescription(
    searchedData,
    document.getElementById("pageSizeSelector").value,
    headers
  );
  paginationHandler(
    searchedData,
    document.getElementById("pageSizeSelector").value,
    headers
  );
  addEventPageSizeSelection(searchedData, headers);
};

const paginationHandler = (data, pageSize, headers) => {
  const dataLength = data.length;
  const pages = Math.ceil(dataLength / pageSize);
  const array = [];

  for (let i = 0; i < pages; i++) {
    array.push(i + 1);
  }
  document.getElementById("pagesContainer").innerHTML =
    paginationTemplate(array);
  addEventPageBtns(pageSize, data, headers);
};

export const pageSizeTemplate = (array, startPageSize) => {
  const contentSize =
    Math.ceil(array.length / defaultPageSize) * defaultPageSize;
  let pageSizes = [];
  for (let i = startPageSize; i <= contentSize; i += defaultPageSize) {
    pageSizes.push(i);
  }
  let template = `
    <select class="form-control" id="pageSizeSelector">`;
  pageSizes.forEach((size) => {
    template += `<option value="${size}">${size}</option>`;
  });
  template += `</select>
    `;
  return template;
};

const addEventPageSizeSelection = (data, headers) => {
  const select = document.getElementById("pageSizeSelector");
  select.addEventListener("change", () => {
    const value = select.value;
    renderStudyDescription(data, value, headers);
    paginationHandler(data, value, headers);
  });
};

export const paginationTemplate = (array) => {
  let template = `
        <nav aria-label="Page navigation example">
            <ul class="pagination m-0">`;

  array.forEach((a, i) => {
    if (i === 0) {
      template += `<li class="page-item">
                            <button class="page-link transparent-btn" id="previousPage" data-previous="1" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                            </button>
                        </li>`;
    }
    template += `<li class="page-item"><button class="page-link transparent-btn ${
      i === 0 ? "active-page" : ""
    }" data-page=${a}>${a}</button></li>`;

    if (i === array.length - 1) {
      template += `
            <li class="page-item">
                <button class="page-link transparent-btn" id="nextPage" data-next="1" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
                </button>
            </li>`;
    }
  });
  template += `
            </ul>
        </nav>
    `;
  return template;
};

export const dataPagination = (start, end, data) => {
  const paginatedData = [];
  for (let i = start; i < end; i++) {
    if (data[i]) paginatedData.push(data[i]);
  }
  return paginatedData;
};

const addEventPageBtns = (pageSize, data, headers) => {
  const elements = document.getElementsByClassName("page-link");
  Array.from(elements).forEach((element) => {
    element.addEventListener("click", () => {
      let previous = parseInt(element.dataset.previous);
      let next = parseInt(element.dataset.next);
      if (previous && !isNaN(previous) && previous === 1)
        previous = document.querySelectorAll("[data-page]").length + 1;
      if (
        next &&
        !isNaN(next) &&
        next === document.querySelectorAll("[data-page]").length
      )
        next = 0;
      const pageNumber = !isNaN(previous)
        ? previous - 1
        : !isNaN(next)
        ? next + 1
        : element.dataset.page;
      if (pageNumber < 1 || pageNumber > Math.ceil(data.length / pageSize))
        return;

      if (!element.classList.contains("active-page")) {
        let start = (pageNumber - 1) * pageSize;
        let end = pageNumber * pageSize;
        document.getElementById("previousPage").dataset.previous = pageNumber;
        document.getElementById("nextPage").dataset.next = pageNumber;
        renderStudyDescription(
          dataPagination(start, end, data),
          document.getElementById("pageSizeSelector").value,
          headers
        );
        Array.from(elements).forEach((ele) =>
          ele.classList.remove("active-page")
        );
        document
          .querySelector(`button[data-page="${pageNumber}"]`)
          .classList.add("active-page");
      }
    });
  });
};


// import {
//   csv2Json,
// } from "./../shared.js";

// export const publicationModule = {
//   data: null,
//   searchTerm: '',
//   authorFilter: 'all',
//   studyFilter: 'all',
//   init: () => {
//     publicationModule.getData().then((data) => {
//       publicationModule.data = data;
//       publicationModule.renderContent();
//       publicationModule.bindEvents();
//     });
//   },
//   bindEvents: () => {
//     document
//       .getElementById("table-search-input")
//       .addEventListener("input", publicationModule.handleSearchInput.bind(publicationModule));

//     document
//       .querySelectorAll('.filter-selectbox')
//       .forEach((el) => {
//         el.addEventListener('change', publicationModule.handleFilter);
//       })
//   },
//   renderHTML: (target, html) => {
//     document.querySelector(target).innerHTML = html;
//   },
//   renderSidebar: (data) => {
//     const authors = data.pubdata.map(({ First_Author }) => ({
//       label: First_Author,
//       value: First_Author
//     }));
    
//     const studies = data.pubdata.map(({ Study }) => ({
//       label: Study,
//       value: Study
//     }));
    
//     return `
//       <div class="flex, flex-col" style="border: solid lightgray 1px; " >
//         ${publicationModule.renderSearchInput()}
  
//         ${publicationModule.renderSelectBox("Author", authors)}
  
//         ${publicationModule.renderSelectBox("Study", studies)}
//       </div>
//     `;
//   },
//   renderSearchInput: () => {
//     return `
//       <div class=" filter-column white-bg p-2 ">
//       <label for="table-search-input font-size-12 " class="d-block mb-1 font-bold"> 
//           Filter
//         </label>
//         <!-- <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search"
//           id="table-search-input"aria-describedby="search-addon" 
//         />
//         <i class="fas fa-search"></i>
//            -->
//            <div class="input-group">
//             <input type="search" class="form-control" style="font-size: 12px;" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="table-search-input" aria-describedby="search-addon" />
//             <span class="input-group-text border-0 search-input">
//                 <i class="fas fa-search"></i>
//             </span>
//            </div>
//       </div>
//     `;
//   },
//   handleSearchInput: (e) => {
//     publicationModule.searchTerm = e.target.value;
    
//     const newTableTemplate = publicationModule.renderTable();
//     publicationModule.renderHTML('.table-content-template', newTableTemplate);
//   },
//   handleFilter: (e) => {
//     const isAuthor = e.target.id.includes('Author');
//     const isStudy = e.target.id.includes('Study');
//     const value = e.target.value;
//     if (isAuthor) publicationModule.authorFilter = value; 
//     if (isStudy) publicationModule.studyFilter = value;
//     const newTableTemplate = publicationModule.renderTable();
//     publicationModule.renderHTML('.table-content-template', newTableTemplate);
//   },
//   renderTable: () => {
//     const search = (str, arr) => {
//       for (let i = 0; i < arr.length; i++) {
//         if (arr[i].toString().toLowerCase().match(str.toLowerCase())) return i;
//       }
//       return -1;
//     };

//     const headings = publicationModule.data.headers.map(heading => heading.replace(/_/g, ' '));
    
//     const values = publicationModule.data.pubdata
//       .filter((item) => {
//         if (!publicationModule.searchTerm.length) return true;
//         const vals = Object.values(item);
//         return search(publicationModule.searchTerm, vals) >= 0;
//       })
//       .filter(({ Study }) => {
//         if (publicationModule.studyFilter.toLowerCase() === 'all') return true;
//         return Study.toLowerCase().includes(publicationModule.studyFilter.toLowerCase());
//       })
//       .filter(({ First_Author }) => {
//         if (publicationModule.authorFilter.toLowerCase() === 'all') return true;
//         return First_Author.toLowerCase().includes(publicationModule.authorFilter.toLowerCase());
//       });
  
//     const renderHeadings = (titles) => {
//       return titles
//         .map((title) => `<th class="text-center font-bold" style="font-size: 14px;border: none;">${title}</th>`.trim())
//         .join("")
//     };
  
//     const renderRows = (rows) => {
//       return rows
//         .map((row) => {
//           const vals = Object.values(row);
  
//           return `
//             <tr>
//               ${vals.map(td => (`<td class="text-center px-2" style="font-size: 12px">${td}</td>`)).join('')}
//             </tr>
//           `.trim();
//         })
//         .join("");
//     };
  
//     return `
    
//         <div class="col-xl-12 pb-2 pr-0 pl-0 white-bg allow-overflow">
//             <!-- <div class="allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" -->
//       <div class="w-100">
//         <table class="border">
//           <tr>
//             ${renderHeadings(headings)}
//           </tr>
//           ${renderRows(values)}
//         </table>
//       </div>
//     `;
//   },
//   getData: async () => {
//     const publicationdata1 = await (
//       await fetch("./imports/DCEG_Publications.csv")
//     ).text();
//     const csvData = csv2Json(publicationdata1);
//     const pubdata = csvData.data;
//     const headers = csvData.headers;
//     return Promise.resolve({ pubdata, headers });
//   },
//   renderContent: () => {
//     const data = publicationModule.data;
//     const template = `

//       <div class="d-flex flex-row align-left">
//         <div class="w-25 d-flex flex-column" style="padding-right: 1rem">
//           ${publicationModule.renderSidebar(data)}
//         </div>
//         <div class="w-75 flex-grow table-content-template" >
//           ${publicationModule.renderTable()}
//         </div>
//       </div>
//     `;

//     publicationModule.renderHTML(".content-template", template);
//     return "";
//   },
//   renderSelectBox: (label, options) => {
//     return `

//       <div class="flex flex-col align-left p-2 white-bg">
//         <label
//           for="select-${label}"
//           class="mb-1 text-base block font-bold font-size-12"
//         >
//           ${label}
//         </label>
//         <select
//           id="select-${label}"
//           class="rounded-sm mb-2 border p-2 w-100 filter-selectbox"
//         >
//           <option value="all" selected>All</option>
//           ${options
//             .map(
//               ({ label, value }) => `
//               <option value="${value}">${label}</option>
//               `
//             )
//             .join(" ")}
//         </select>
//       </div>
//     `;
//   },
//   renderHeader: () => {
//     return `
//       <div class="container body-min-height">
//         <div class="main-summary-row">
//           <div class="align-left">
//             <div class="align-left">
//               <h1 class="page-header">Datasets from DCEG publications</h1>
//             </div>
//           </div>
//         </div>
//         <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;"><div>           
//         <br>
//         <div class="align-left">
//           Data from the following publications can be requested. Click the request data bottom for the publication of interest to goto the data request form. publicationModule will require logging in through a Box.com account for authentication and authorization. If you do not have a Box.com account, you can use <a href= "https://www.box.com/personal/">publicationModule link </a> to create a free account. After approval of the data request,datasets and data dictionaries can be accessed through their permanent identifiers (or uniform resource locators, URL)provided by Box.com.<br><br>
//         </div> 
//       </div>
//     `
//   }
// }

// export const publication = () => {
//   return `
//     <div class="general-bg padding-bottom-1rem">
//       ${publicationModule.renderHeader()}
//     </div>

//     <div>
//       <div class="general-bg content-template">
//         ${publicationModule.init()}
//       </div>
//     </div>
//   `;
// };
