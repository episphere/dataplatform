
//create chart objects
ethnicityChart = dc.rowChart('#ethnicityChart'), 
    raceChart = dc.rowChart('#raceChart'),
    birthYearChart = dc.barChart('#birthYearChart')
;
// var chart = document.getElementById('dcPlot');
//load the data
const data = d3.csv('summaryStats.csv').then(data => {

//create crossfilters
const ndx = crossfilter(data);
console.log(data);
const all = ndx.groupAll();
console.log(all.value());

//Dimensions and groups
// const subjectsDim = ndx.dimension(d => d.TotalSubjects);
// const totalSubjectsGroup = subjectsDim.group();//.reduceSum(d => d.TotalSubjects / 100);

//Race dimension and group
const raceDim = ndx.dimension(d => d.race);
const raceGroup = raceDim.group();

//Birth Year dimension and group
const birthYearDim = ndx.dimension(d => {
    for( const [key, value] of Object.entries(d)) {
        if (key.startsWith('birth_year_'))
            return value;
    } 

});
const birthYearGroup = birthYearDim.group();

const ethnicityDim = ndx.dimension(d => d.ethnicity);
const ethnicityGroup = ethnicityDim.group(); 


//Define chart attributes

ethnicityChart
.dimension(ethnicityDim)
.group(ethnicityGroup);
// // .group(groupBySubjects)
// .x(d3.scaleLinear().domain([0,100]))
// .centerBar(true)
// .gap(2)

raceChart
.dimension(raceDim)
.group(raceGroup);

birthYearChart
.dimension(birthYearDim)
.group(birthYearGroup)
.x(d3.scaleLinear().domain([0,6]).range(['1900', '1999']))
;

dc.renderAll();
});

