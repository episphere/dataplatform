
//create chart objects
var bChart1 = dc.barChart('#heightPlot'),
bChart2 = dc.barChart('#weightPlot'),
bChart3 = dc.barChart('#bmiPlot'),
dataTable = new dc.DataTable('#data-table');
dataCount = new dc.DataCount('.data-count');

//Chart constants
let w = 1280, h = 480;
// var chart = document.getElementById('dcPlot1');
//load the data
d3.tsv('CPS2_simulated_20220120.txt').then( data => {

//Format data
let i = 0;
data.forEach( d => {
    d.height = +d.height;
 
    d.weight = +d.weight;

    d.bmi = +d.bmi;

    d.fakeid = +d.fakeid;
})

data = data.filter(d => {
    if(d.height === 888) return false;
    if(d.weight === 888) return false;
    if(d.bmi === 888) return false;
    
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

const bmiDimension = crossdata.dimension(d => d.bmi);
const groupByBMI = bmiDimension.group();

const bmiScaleX = d3.scaleLinear().domain([0,bmiDimension.top(1)[0].bmi]).range([0,w]);
const bmiScaleY = d3.scaleLinear().domain([0, groupByBMI.top(1)[0].value]).range([h,0]);

console.log(bmiDimension.top(1)[0].bmi);
console.log(d3.max(data, d => {return d.bmi}));

bChart3.width(w)
.height(h)
.group(groupByBMI)
.dimension(bmiDimension)
.centerBar(true)
.x(d3.scaleLinear().domain([0,d3.max(data, d => {return d.bmi})]))
.margins({top: 10, right: 50, bottom: 30, left: 40})
.elasticY(true)
.elasticX(true)
.yAxisLabel('# of Subjects')
.xAxisLabel('BMI')
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
.columns(['fakeid', 'height', 'weight', 'bmi'])
.sortBy(d => d.fakeid)
.size(10)
.showSections(false)
.order(d3.descending);



dc.renderAll();


});

