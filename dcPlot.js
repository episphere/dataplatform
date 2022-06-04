
// chart constants
const margin = {top: 20, right: 10, bottom: 20, left: 10};
const width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
const g = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//create chart objects
const birthYearChart = dc.barChart('#birthYearChart');

//Birth Year array
const birthYears = [
    // 'birth_year_LT1900', 
    'birth_year_1900_1909',
    'birth_year_1910_1919',
    'birth_year_1920_1929',
    'birth_year_1930_1939',
    'birth_year_1940_1949',
    'birth_year_1950_1959',
    'birth_year_1960_1969',
    'birth_year_1970_1979',
    'birth_year_1980_1989',
    'birth_year_1990_1999',
    // 'birth_year_GE2000',
    // 'birth_year_DK',
];
//load the data

// Get birthYeardata
var birthYear = [];



d3.csv('summaryStats.csv').then(data => {
console.log(data);
birthYears.forEach(year => {
            
            data.map(d => {
                const temp = {};
                temp['year'] = year.split('_')[2];
                console.log(year, d[year] );
                temp['value'] = d[year];
                birthYear.push(temp);
                console.log(birthYear);
            })
});
// birthYears.forEach(year => {
//     let temp = {};

    // const filteredData = data.map(d => parseInt(d[year])).filter(dt => isNaN(dt) === false);
    // if (filteredData.length > 0) {
    //     temp[year] = filteredData.reduce((a, b) => a + b);
    //     birthYear.push(temp);
    
    // }
    // else { 
    // temp[year] = 0;
    // birthYear.push(temp);;
    // }

// });

birthYear.forEach(d => {
    d.value = +d.value;
    d.year = new Date(d.year, 1, 1);
  });
console.log(birthYear);


//Create crossfilter
const ndx = crossfilter(birthYear);
console.log(data);
const all = ndx.groupAll();
console.log(all.value());

const birthYearDim = ndx.dimension(d => d.year.getFullYear());
const birthYearSumGroup = birthYearDim.group().reduceSum(d => d.value);

const x = d3.scaleLinear().domain([1900, 1999]).range([0, width]);
let xAxis = d3.axisBottom(x);
birthYearChart
.dimension(birthYearDim)
.group(birthYearSumGroup)
.y(d3.scaleLinear().domain([0, 200000]))//d3.max(birthYear, d => {
    // return d.value
// })]))
.x(d3.scaleTime().domain(([d3.min(birthYear, d => d.year.getFullYear()), d3.max(birthYear, d => d.year.getFullYear())])))
.xAxisLabel("Year")
.yAxisLabel("Total Participants")
.elasticX(true)
.brushOn(true)
.height(800)
.width(1200)
.turnOnControls(true)
;


dc.renderAll();
});
/*
  
//format data
// data.forEach(d => {
//     d['birthYear'] = [];   
//     for( let [key, value] of Object.entries(d)) {
//         if (key.startsWith('birth_year_')){
//             let temp = {};
//             d['birthYear'][key] = parseInt(d[key]);
//             delete d[key];
//         }
//     } 
// })

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
let birthYears = [
    'birth_year_LT1900', 
    'birth_year_1900_1909',
    'birth_year_1910_1919',
    'birth_year_1920_1929',
    'birth_year_1930_1939',
    'birth_year_1940_1949',
    'birth_year_1950_1959',
    'birth_year_1960_1969',
    'birth_year_1970_1979',
    'birth_year_1980_1989',
    'birth_year_1990_1999',
    'birth_year_GE2000',
    'birth_year_DK',
];
// const birthYearDim = ndx.dimension(d => d.birthYear['DK']);

const birthYearDim = ndx.dimension(d => {
    for(const year of birthYears) {
        console.log(d,year);
        //look at each birth year
        const birthYear = d[year];
        console.log(birthYear);
        //parse int out of the birth year
        const value = parseInt(birthYear);
        console.log(value);
        //sum all of the same birth years to get value (ex. all births from 1990-1999)
        if(isNaN(value) === false){
            return value;
        }
        else {
            return 0;
        }
           }
    
});
const birthYearGroup = birthYearDim.group();

console.log(birthYearGroup.all());

//Ethnicity dimension and group
const ethnicityDim = ndx.dimension(d => d.ethnicity);
const ethnicityGroup = ethnicityDim.group(); 


//Define chart attributes

// ethnicityChart
// .dimension(ethnicityDim)
// .elasticX(true)
// .group(ethnicityGroup);
// // .group(groupBySubjects)
// .x(d3.scaleLinear().domain([0,100]))
// .centerBar(true)
// .gap(2)

// raceChart
// .dimension(raceDim)
// .group(raceGroup)
// .elasticX(true);




const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(1);
const y = d3.scaleLinear().range([d3.max(data.map(d => d.birthYear))])

// x.domain(data.map(d => d.birthYear));
// y.domain([0, d3.max(data, d => d.birthYear.)])

birthYearChart
.dimension(birthYearDim)
.group(birthYearGroup)
// .x(d3.scaleLinear().domain([1900, 2000]).range([2000, 1900]))
// .elasticX(true)
;

dc.renderAll();
});*/

