// const getData = async () => {
//   try {
//     const d = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await d.json();
//     console.log(data);
//   } catch (e) {
//     console.log(e);
//   }
// };
import {
  getFile,
  hideAnimation,
  shortenText,
  tsv2Json,
  json2other,
  csv2Json,
} from "./../shared.js";

export const publicationPageTemplate = async () => {
  const publicationdata1 = await (
    await fetch("./imports/DCEG_Publications.csv")
  ).text();
  const csvData = csv2Json(publicationdata1);
  const pubdata = csvData.data;
  const headers = csvData.headers;
  return { pubdata, headers };
};

const renderHTML = (target, html) => {
  document.querySelector(target).innerHTML = html;
};

const addEventListeners = () => {
  document
    .getElementById("table-search-input")
    .addEventListener("input", handleSearchInput);
};

const handleSearchInput = (e) => {
  renderTable();
};

const renderSidebar = (data) => {
  const authors = data.pubdata.map(({ First_Author }) => ({
    label: First_Author,
    value: First_Author
  }));
  
  const studies = data.pubdata.map(({ Study }) => ({
    label: Study,
    value: Study
  }));
  
  return `
    <div class="p-2 flex flex-col">
      ${renderSearchInput()}

      ${renderSelectBox("Author", authors)}

      ${renderSelectBox("Study", studies)}
    </div>
  `;
};

const renderSearchInput = () => {
  return `
    <input
      placeholder="Search"
      class="p-2 border mb-2 w-100"
      id="table-search-input"
    />
  `;
};

const renderTable = (data) => {
  const searchTerm = document.getElementById('table-search-input')?.value?.trim() || '';
  const headings = data.headers.map(heading => heading.replace(/_/g, ' '));
  
  const values = data.pubdata.filter(({ Title_of_Publication }) => Title_of_Publication.includes(searchTerm));

  console.log({ values});

  const renderHeadings = (titles) => {
    return titles
      .map((title) => `<th class="text-center">${title}</th>`)
      .join(" ");
  };

  const renderRows = (rows) => {
    console.log(rows);
    return rows
      .map((row) => {
        const vals = Object.values(row);

        return `
          <tr>
            ${vals.map(td => (`<td class="text-center px-2" style="font-size: 12px">${td}</td>`))}
          </tr>
        `;
      })
      .join(" ");
  };

  return `
    <div class="w-100">
      <table class="border">
        <tr>
          ${renderHeadings(headings)}
        </tr>
        ${renderRows(values)}
      </table>
    </div>
  `;
};

const renderSelectBox = (label, options) => {
  return `
    <div class="flex flex-col">
      <label
        for="select-${label}"
        class="mb-1 text-base block font-bold"
      >
        ${label}
      </label>
      <select
        id="select-${label}"
        class="rounded-sm mb-2 border p-2 w-100"
      >
        <option value="all" selected>All</option>
        ${options
          .map(
            ({ label, value }) => `
            <option value="${value}">${label}</option>
            `
          )
          .join(" ")}
      </select>
    </div>
  `;
};

const renderContent = () => {
  publicationPageTemplate().then((data) => {
    console.log(data);
    const template = `
    <div class="d-flex flex-row">
      <div class="w-25 d-flex flex-column">
        ${renderSidebar(data)}
      </div>
      <div class="w-75 flex-grow">
        ${renderTable(data)}
      </div>
    </div>
    `;

    renderHTML(".content-template", template);
    addEventListeners();
  });
  return "";
};

const renderHeader = () => `
  <div class="container body-min-height">
    <div class="main-summary-row">
      <div class="align-left">
        <div class="align-left">
          <h1 class="page-header">Datasets from DCEG publications</h1>
        </div>
      </div>
    </div>
    <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;"><div>           
    <br>
    <div class="align-left">
      Data from the following publications can be requested. Click the request data bottom for the publication of interest to goto the data request form. This will require logging in through a Box.com account for authentication and authorization. If you do not have a Box.com account, you can use <a href= "https://www.box.com/personal/">this link </a><br> to create a free account. After approval of the data request,datasets and data dictionaries can be accessed through their permanent identifiers (or uniform resource locators, URL)provided by Box.com.
    </div> 
  </div>
`;

export const publication = () => {
  return `
    <div class="general-bg padding-bottom-1rem">
      ${renderHeader()}

      <div class="content-template">
        ${renderContent()}
      </div>

    </div>
  `;
};
