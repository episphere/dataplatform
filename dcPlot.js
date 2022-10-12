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
studyChart = new dc.PieChart('#studyPlot'),
sMenu = new dc.SelectMenu('#selectMenu'),
dataTable = new dc.DataTable('#data-table');
dataCount = new dc.DataCount('.data-count');

//Chart constants
let w = 640, h = 320;
// var chart = document.getElementById('dcPlot1');
//load the data

// d3.tsv('Simulated_data_doubled_rows_CPS2_3_NHS_1_2.txt', function(d) {
//     return {
//         height: +d.height,
//         weight: +d.weight,
//         age: +d.age,
//         fakeid: +d.fakeid,
//         race: +d.race,
//         ethnicity: +d.ethnicity
//     };
// }).then(function(data) {
//     console.log(data[0]);
// });
Promise.all([
d3.tsv('Simulated_data_doubled_rows_CPS2_3_NHS_1_2.txt', function(d) {
    return {
        height: +d.height,
        weight: +d.weight,
        age: +d.age,
        fakeid: +d.fakeid,
        race: d.race,
        ethnicity: +d.ethnicity,
        study: d.Study
    };
}),
d3.tsv('Simulated_data_doubled_rows_CPS2_3_NHS_1_2.txt', function(d) {
    return {
        height: +d.height,
        weight: +d.weight,
        age: +d.age,
        fakeid: +d.fakeid,
        race: d.race,
        ethnicity: +d.ethnicity,
        study: d.Study
    };
}),
d3.tsv('Simulated_data_doubled_rows_CPS2_3_NHS_1_2.txt', function(d) {
    return {
        height: +d.height,
        weight: +d.weight,
        age: +d.age,
        fakeid: +d.fakeid,
        race: d.race,
        ethnicity: +d.ethnicity,
        study: d.Study
    };
}),
d3.tsv('Simulated_data_doubled_rows_CPS2_3_NHS_1_2.txt', function(d) {
    return {
        height: +d.height,
        weight: +d.weight,
        age: +d.age,
        fakeid: +d.fakeid,
        race: d.race,
        ethnicity: +d.ethnicity,
        study: d.Study
    };
}),
// d3.tsv('Simulated_data_doubled_rows_CPS2_3_NHS_1_2.txt', function(d) {
//     return {
//         height: +d.height,
//         weight: +d.weight,
//         age: +d.age,
//         fakeid: +d.fakeid,
//         race: d.race,
//         ethnicity: +d.ethnicity,
//         study: d.Study
//     };
// }),
d3.tsv('NHS_simulated_20220120.txt', function(d) {
    return {
        height: +d.height,
        weight: +d.weight,
        age: +d.age,
        fakeid: +d.fakeid,
        race: d.race,
        ethnicity: +d.ethnicity,
        study: d.Study
    };
}),
d3.tsv('NHS2_simulated_20220120.txt', function(d) {
    return {
        height: +d.height,
        weight: +d.weight,
        age: +d.age,
        fakeid: +d.fakeid,
        race: d.race,
        ethnicity: +d.ethnicity,
        study: "NHS2"
    };
})
// d3.tsv('CPS2_simulated_doubled_rows_20220609.txt', function(d) {
//     return {
//         height: +d.height,
//         weight: +d.weight,
//         age: +d.age,
//         fakeid: +d.fakeid,
//         race: +d.race,
//         ethnicity: +d.ethnicity
//     };
// })
]).then( allData => {
//d3.tsv('CPS2_simulated_20220120.txt').then( data => {
//Format data
// let i = 0;
// data.forEach( d => {
//     d.height = +d.height;
 
//     d.weight = +d.weight;

//     d.age = +d.age;

//     d.fakeid = +d.fakeid;

//     d.race = +d.race;

//     d.ethnicity = +d.ethnicity;
// })

const chartLabels = {
    '1': 'White',
    '2': 'Black/African American',
    '3': 'Asian',
    '4': 'Native Hawaiin/ Pacific Islander',
    '5': 'American Indian/Alaska Native',
    '6': 'Other, including multiracial'
}

data = d3.merge(allData)
data = data.filter(d => {
    if(d.height === 888) return false;
    if(d.weight === 888) return false;
    if(d.age === 888) return false;
    if(d.race === '888') return false;
    if(d.race === '') return false;
    
    return true;
})



// data = data.map(d => {
//     if (d.race === 1) {
//         return 'white';
//     }
//     return d.race;
// });

//create crossfilters
// var testingdata = data.map(function(d) {
//     return {
//         height: d.height,
//         weight: d.weight,
//         age: d.age,
//         fakeid: d.fakeid,
//         race: d.race,
//         ethnicity: d.ethnicity
//     }
// });
//data = null;
//console.log(testingdata);
//console.log(data);
const crossdata = crossfilter(data);
const all = crossdata.groupAll();
//console.log(data);
// data.forEach(d => d.height === null ? console.log(d.height) : '');

const heightDimension = crossdata.dimension(d => d.height);
const groupByHeight = heightDimension.group();


//console.log(heightDimension.top(1)[0].height);
//console.log(d3.max(data, d => {return d.height}));
//Define chart attributes
bChart1.width(w)
.height(h)
.group(groupByHeight)
.dimension(heightDimension)
.x(d3.scaleLinear().domain([0,d3.max(data, d => d.height)]))
.margins({top: 10, right: 50, bottom: 30, left: 40})
.elasticY(true)
.elasticX(true)
.yAxisLabel("# of Subjects")
.xAxisLabel("Height (cm)")
.centerBar(true);


const weightDimension = crossdata.dimension(d => d.weight);
const groupByWeight = weightDimension.group();

//console.log(weightDimension.top(1)[0].weight);
//console.log(d3.max(data, d => {return d.weight}));

bChart2.width(w)
.height(h)
.group(groupByWeight)
.dimension(weightDimension)
.x(d3.scaleLinear().domain([0,d3.max(data, d => {return d.weight})]))
.margins({top: 10, right: 50, bottom: 30, left: 40})
.elasticY(true)
.elasticX(true)
.yAxisLabel("# of Subjects")
.xAxisLabel("Weight (kg)")
.centerBar(true);

const ageDimension = crossdata.dimension(d => d.age);
const groupByage = ageDimension.group();

const ageScaleX = d3.scaleLinear().domain([0,ageDimension.top(1)[0].age]).range([0,w]);
const ageScaleY = d3.scaleLinear().domain([0, groupByage.top(1)[0].value]).range([h,0]);

//console.log(ageDimension.top(1)[0].age);
//console.log(d3.max(data, d => {return d.age}));

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
.xAxisLabel('Age')

const studyDimension = crossdata.dimension(d => d.study);
const studyGroup = studyDimension.group();

studyChart.width(h)
.height(h)
.radius(h)
.dimension(studyDimension)
.group(studyGroup)

const raceDimension = crossdata.dimension(d => d.race);
const raceGroup = raceDimension.group();

sMenu.dimension(raceDimension)
.group(raceGroup)
.multiple(true)
.numberVisible(10)

bChart1.controlsUseVisibility(true);
bChart2.controlsUseVisibility(true);
bChart3.controlsUseVisibility(true);
studyChart.controlsUseVisibility(true);
sMenu.controlsUseVisibility(true);


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
.columns(['fakeid','study', 'height', 'weight', 'age', 'race'])
.sortBy(d => d.fakeid)
.size(10)
.showSections(false)
.order(d3.descending);



dc.renderAll();


});

