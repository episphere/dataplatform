import { hideAnimation, tsv2Json, } from './shared.js';



//create chart objects
bChart = dc.barChart('#dcPlot');
var chart = document.getElementById('dcPlot');
//load the data
const data = d3.csv('CPS2_simulated_20220120.txt');
//create crossfilters

const crossdata = crossfilter(data);
const all = crossdata.groupAll();
console.log(data);

const subjectsDimension = crossdata.dimension(d => d.TotalSubjects);
const groupBySubjects = subjectsDimension.group().reduceSum(d => d.TotalSubjects / 100);
const ethnicityDimension = crossdata.dimension(d => d.ethnicity);


//Define chart attributes
bChart.width(800)
.height(500)
.group(groupBySubjects)
.x(d3.scaleLinear().domain([0,10]))
.dimension(ethnicityDimension)
.centerBar(true)
.gap(2)
.yAxis().ticks(1000000);

bChart.turnOnControls(true);








dc.renderAll();

