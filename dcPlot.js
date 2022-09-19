//import { hideAnimation, getFile, csvJSON, numberWithCommas, summaryStatsFileId, getFileInfo, mapReduce, summaryStatsCasesFileId, reSizePlots } from './src/shared.js';

// export const getFileContentVis = async () => {
//     const {jsonData, headers} = csvJSON(await getFile(fileid)); // Get summary level data
//     const lastModified = (await getFileInfo(fileid)).modified_at;
//     document.getElementById('dataLastModified').innerHTML = `Data last modified at - ${new Date(lastModified).toLocaleString()}`;
//     hideAnimation();
//     if(jsonData.length === 0) {
//         document.getElementById('confluenceDiv').innerHTML = `You don't have access to summary level data, please contact NCI for the access.`
//         return;
//     };
// };

//import { getFile } from "./src/shared";

//create chart objects
//const fileid = '956943662666';
//const test = csvJSON(await getFile(fileid));
//console.log(test);


var bChart1 = dc.barChart('#heightPlot'),
bChart2 = dc.barChart('#weightPlot'),
bChart3 = dc.barChart('#agePlot'),
dataTable = new dc.DataTable('#data-table');
dataCount = new dc.DataCount('.data-count');

//Chart constants
let w = 1280, h = 480;
// var chart = document.getElementById('dcPlot1');
//load the data

d3.tsv('test.txt').then( data => {

//Format data
let i = 0;
data.forEach( d => {
    d.height = +d.height;
 
    d.weight = +d.weight;

    d.age = +d.age;

    d.fakeid = +d.fakeid;
})

data = data.filter(d => {
    if(d.height === 888) return false;
    if(d.weight === 888) return false;
    if(d.age === 888) return false;
    
    return true;
})
//create crossfilters

const crossdata = crossfilter(data);
const all = crossdata.groupAll();
console.log(data);
// data.forEach(d => d.height === null ? console.log(d.height) : '');

const heightDimension = crossdata.dimension(d => d.height/2.54);
const groupByHeight = heightDimension.group();


console.log(heightDimension.top(1)[0].height/2.54);
console.log(d3.max(data, d => {return d.height/2.54}));
//Define chart attributes
bChart1.width(w)
.height(h)
.group(groupByHeight)
.dimension(heightDimension)
.x(d3.scaleLinear().domain([0,d3.max(data, d => d.height/2.54)]))
.margins({top: 10, right: 50, bottom: 30, left: 40})
.elasticY(true)
.elasticX(true)
.yAxisLabel("# of Subjects")
.xAxisLabel("Height (inches)")
.centerBar(true);


const weightDimension = crossdata.dimension(d => d.weight * 2.2);
const groupByWeight = weightDimension.group();

console.log(weightDimension.top(1)[0].weight*2.2);
console.log(d3.max(data, d => {return d.weight * 2.2}));

bChart2.width(w)
.height(h)
.group(groupByWeight)
.dimension(weightDimension)
.x(d3.scaleLinear().domain([0,d3.max(data, d => {return d.weight*2.2})]))
.margins({top: 10, right: 50, bottom: 30, left: 40})
.elasticY(true)
.elasticX(true)
.yAxisLabel("# of Subjects")
.xAxisLabel("Weight (lbs)")
.centerBar(true);

const ageDimension = crossdata.dimension(d => d.age);
const groupByage = ageDimension.group();

const ageScaleX = d3.scaleLinear().domain([0,ageDimension.top(1)[0].age]).range([0,w]);
const ageScaleY = d3.scaleLinear().domain([0, groupByage.top(1)[0].value]).range([h,0]);

console.log(ageDimension.top(1)[0].age);
console.log(d3.max(data, d => {return d.age}));

bChart3.width(w)
.height(h)
.group(groupByage)
.dimension(ageDimension)
.centerBar(true)
.x(d3.scaleLinear().domain([0,d3.max(data, d => {return d.age})]))
.margins({top: 10, right: 50, bottom: 30, left: 40})
.elasticY(true)
.elasticX(true)
.yAxisLabel('# of Subjects')
.xAxisLabel('AGE')
// .title('Chart Title')
// .shareTitle(true);
// .text('Chart Title')
;
// bChart3.width(w)
// .height(h)
// .group(groupByBMI)
// .x(bmiScaleX)
// // .y(bmiScaleY)
// .dimension(bmiDimension)
// .centerBar(true);


bChart1.controlsUseVisibility(true);
bChart2.controlsUseVisibility(true);
bChart3.controlsUseVisibility(true);


dataCount
.crossfilter(crossdata)
.groupAll(all)
.html({
    some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
        ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
    all: 'All records selected. Please click on the graph to apply filters.'
});

dataTable
.dimension(weightDimension)
.columns(['fakeid', 'height', 'weight', 'age'])
.sortBy(d => d.fakeid)
.size(10)
.showSections(false)
.order(d3.descending);



dc.renderAll();


});

var textFile = null;
function makeJsonFile(text) {
    var data = new Blob([text], {type: 'application/json'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return data;
    // return textFile;
  };

  var obj = {
    "date": "2022-09-02",
    "projname": "Testing1233",
    "amendment": "No",
    "investigators": "Navado Wray",
    "institution": "NCI DCEG",
    "email": "wraynr@nih.gov",
    "member": "Yes",
    "acro": "test",
    "allinvest": "test",
    "confirmation": "Yes",
    "background": "test",
    "aims": " test",
    "analyplan": " test",
    "basevar": [
        "Identification/Dates",
        "Physical Activity"
    ],
    "mmdvarv": "Mammographic Density",
    "reqcoh": [
        "BWHS"
    ],
    "timeline": "test",
    "authconf": "Yes",
    "authorship": "",
    "ibcvar": []
};
document.getElementById('create').addEventListener('click', (obj) => {
    let blob = makeJsonFile(obj);
    console.log(blob);
    uploadWordFile(blob, 'testing.json', uploadFormFolder);
})

