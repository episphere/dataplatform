//create chart objects
var bChart1 = dc.barChart('#dcPlot1'),
bChart2 = dc.barChart('#dcPlot2'),
bChart3 = dc.barChart('#dcPlot3'),
dataTable = new dc.DataTable('.data-table');
// var chart = document.getElementById('dcPlot1');
//load the data
d3.tsv('CPS2_simulated_20220120.txt').then( data => {




//create crossfilters

const crossdata = crossfilter(data);
const all = crossdata.groupAll();
console.log(data);


const heightDimension = crossdata.dimension(d => d.height);
const groupByHeight = heightDimension.group();

//Define chart attributes
bChart1.width(800)
.height(500)
.group(groupByHeight)
.x(d3.scaleLinear().domain([0,d3.max(data, d => d.height)]))
.margins({top: 10, right: 50, bottom: 30, left: 40})
.elasticY(true)
.dimension(heightDimension)
.centerBar(true);


const weightDimension = crossdata.dimension(d => d.weight);
const groupByWeight = weightDimension.group();

bChart2.width(800)
.height(500)
.group(groupByWeight)
.x(d3.scaleLinear().domain([0,d3.max(data, d => {return d.weight})]))
.margins({top: 10, right: 50, bottom: 30, left: 40})
.elasticY(true)
.dimension(weightDimension)
.centerBar(true);

const bmiDimension = crossdata.dimension(d => d.bmi);
const groupByBMI = bmiDimension.group();

bChart3.width(800)
.height(500)
.group(groupByBMI)
.x(d3.scaleLinear().domain([0,d3.max(data, d => {return d.bmi})]))
.dimension(bmiDimension)
.centerBar(true);


bChart1.turnOnControls(true);
bChart2.turnOnControls(true);
bChart3.turnOnControls(true);

dataTable
.dimension(weightDimension)
.columns(['fakeid', 'height', 'weight', 'bmi'])
.sortBy(d => d.fakeid)
.size(5)
.order(d3.descending);



dc.renderAll();


});




