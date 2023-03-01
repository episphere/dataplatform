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
  console.log(publicationdata1);
  const csvData = csv2Json(publicationdata1);
  const pubdata = csvData.data;
  const headers = csvData.headers;
  console.log(pubdata);
};
export const publication = () => {
  console.log("testing");
  return `
      <div class="publication">
      <div class="align-left">
           <h1 
           class="page-header">Datasets from DCEG publications
           </h1>
      </div> 
      </div>
        </span>
        <div class="align-left">
        Data from the following publications can be requested. Click the request data button for the publication of 
        interest to go to the data request form. This will require logging in through a Box.com account for 
        authentication and authorization. If you do not have a Box.com account, you can use 
        <a href= "https://www.box.com/personal/">this link </a> to create a free account. 
        After approval of the data request,datasets and data dictionaries can be accessed through 
        their permanent identifiers (or uniform resource locators, URL) provided by Box.com. 
        </div> 
      <div>
      `;
};
