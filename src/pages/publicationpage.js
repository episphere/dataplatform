
import {
  csv2Json,
} from "./../shared.js";

export const publicationModule = {
  data: null,
  searchTerm: '',
  authorFilter: 'all',
  studyFilter: 'all',
  init: () => {
    publicationModule.getData().then((data) => {
      publicationModule.data = data;
      publicationModule.renderContent();
      publicationModule.bindEvents();
    });
  },
  bindEvents: () => {
    document
      .getElementById("table-search-input")
      .addEventListener("input", publicationModule.handleSearchInput.bind(publicationModule));

    document
      .querySelectorAll('.filter-selectbox')
      .forEach((el) => {
        el.addEventListener('change', publicationModule.handleFilter);
      })
  },
  renderHTML: (target, html) => {
    document.querySelector(target).innerHTML = html;
  },
  renderSidebar: (data) => {
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
        ${publicationModule.renderSearchInput()}
  
        ${publicationModule.renderSelectBox("Author", authors)}
  
        ${publicationModule.renderSelectBox("Study", studies)}
      </div>
    `;
  },
  renderSearchInput: () => {
    return `
      <div class="w-100">
        <label for="table-search-input" class="d-block mb-1">
          Filter
        </label>
        <input
          placeholder="Search"
          class="p-2 border mb-2 w-100"
          id="table-search-input"
        />
      </div>
    `;
  },
  handleSearchInput: (e) => {
    publicationModule.searchTerm = e.target.value;
    
    const newTableTemplate = publicationModule.renderTable();
    publicationModule.renderHTML('.table-content-template', newTableTemplate);
  },
  handleFilter: (e) => {
    const isAuthor = e.target.id.includes('Author');
    const isStudy = e.target.id.includes('Study');
    const value = e.target.value;
    if (isAuthor) publicationModule.authorFilter = value; 
    if (isStudy) publicationModule.studyFilter = value;
    const newTableTemplate = publicationModule.renderTable();
    publicationModule.renderHTML('.table-content-template', newTableTemplate);
  },
  renderTable: () => {
    const search = (str, arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].toString().toLowerCase().match(str.toLowerCase())) return i;
      }
      return -1;
    };

    const headings = publicationModule.data.headers.map(heading => heading.replace(/_/g, ' '));
    
    const values = publicationModule.data.pubdata
      .filter((item) => {
        if (!publicationModule.searchTerm.length) return true;
        const vals = Object.values(item);
        return search(publicationModule.searchTerm, vals) >= 0;
      })
      .filter(({ Study }) => {
        if (publicationModule.studyFilter.toLowerCase() === 'all') return true;
        return Study.toLowerCase().includes(publicationModule.studyFilter.toLowerCase());
      })
      .filter(({ First_Author }) => {
        if (publicationModule.authorFilter.toLowerCase() === 'all') return true;
        return First_Author.toLowerCase().includes(publicationModule.authorFilter.toLowerCase());
      });
  
    const renderHeadings = (titles) => {
      return titles
        .map((title) => `<th class="text-center">${title}</th>`.trim())
        .join("")
    };
  
    const renderRows = (rows) => {
      return rows
        .map((row) => {
          const vals = Object.values(row);
  
          return `
            <tr>
              ${vals.map(td => (`<td class="text-center px-2" style="font-size: 12px">${td}</td>`)).join('')}
            </tr>
          `.trim();
        })
        .join("");
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
  },
  getData: async () => {
    const publicationdata1 = await (
      await fetch("./imports/DCEG_Publications.csv")
    ).text();
    const csvData = csv2Json(publicationdata1);
    const pubdata = csvData.data;
    const headers = csvData.headers;
    return Promise.resolve({ pubdata, headers });
  },
  renderContent: () => {
    const data = publicationModule.data;
    const template = `
      <div class="d-flex flex-row">
        <div class="w-25 d-flex flex-column">
          ${publicationModule.renderSidebar(data)}
        </div>
        <div class="w-75 flex-grow table-content-template">
          ${publicationModule.renderTable()}
        </div>
      </div>
    `;

    publicationModule.renderHTML(".content-template", template);
    return "";
  },
  renderSelectBox: (label, options) => {
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
          class="rounded-sm mb-2 border p-2 w-100 filter-selectbox"
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
  },
  renderHeader: () => {
    return `
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
          Data from the following publications can be requested. Click the request data bottom for the publication of interest to goto the data request form. publicationModule will require logging in through a Box.com account for authentication and authorization. If you do not have a Box.com account, you can use <a href= "https://www.box.com/personal/">publicationModule link </a><br> to create a free account. After approval of the data request,datasets and data dictionaries can be accessed through their permanent identifiers (or uniform resource locators, URL)provided by Box.com.
        </div> 
      </div>
    `
  }
}

export const publication = () => {
  return `
    <div class="general-bg padding-bottom-1rem">
      ${publicationModule.renderHeader()}
    </div>

    <div>
      <div class="general-bg content-template">
        ${publicationModule.init()}
      </div>
    </div>
  `;
};
