import {tsv2Json, csvJSON} from '../src/shared.js';

const data = await (await fetch('../NHS2_simulated_20220120.csv')).text();
const {jsonData, headers} = csvJSON(data);
console.log(headers);

const variables0 = (headers) => {
    var theDiv = document.getElementById("graph0");
    var selectList = document.createElement("select");
    selectList.id = "select0";
    theDiv.appendChild(selectList);

    for (var i = 0; i < headers.length; i++) {
        var option = document.createElement("option");
        option.value = headers[i];
        option.text = headers[i];
        selectList.appendChild(option);
    }
}

const variables1 = (headers) => {
    var theDiv = document.getElementById("graph1")
    var selectList = document.createElement("select");
    selectList.id = "select1";
    document.body.appendChild(selectList);
    theDiv.appendChild(selectList);

    for (var i = 0; i < headers.length; i++) {
        var option = document.createElement("option");
        option.value = headers[i];
        option.text = headers[i];
        selectList.appendChild(option);
    }
}

const variables2 = (headers) => {
    var theDiv = document.getElementById("graph2")
    var selectList = document.createElement("select");
    selectList.id = "select2";
    document.body.appendChild(selectList);
    theDiv.appendChild(selectList);

    for (var i = 0; i < headers.length; i++) {
        var option = document.createElement("option");
        option.value = headers[i];
        option.text = headers[i];
        selectList.appendChild(option);
    }
}

variables0(headers);
variables1(headers);
variables2(headers);

// var bChart1 = dc.barChart('#heightPlot'),
// bChart2 = dc.barChart('#weightPlot'),
// bChart3 = dc.barChart('#agePlot'),
// studyChart = new dc.PieChart('#studyPlot'),
//var sMenu = new dc.SelectMenu('#selectMenu');
//dataTable = new dc.DataTable('#data-table');
//var dataCount = new dc.DataCount('.data-count');

const button = () => {
    var theDiv = document.getElementById("createGraphs")
    let btn = document.createElement("button");
    btn.innerHTML = "Create Graphs";
    btn.onclick = async () => {
        var var0 = document.querySelector('#select0');
        var var1 = document.querySelector('#select1');
        var var2 = document.querySelector('#select2');
        var out0 = var0.value;
        var out1 = var1.value;
        var out2 = var2.value;
        console.log(out0);
        console.log(out1);
        console.log(out2);
        //alert("Selection 1: " + out0 + " Selection 2: " + out1 + " Selection 3: " + out2);
        
        Promise.all([
            d3.tsv('../NHS2_simulated_20220120.txt', function(d) {
                return {
                    var0: +d[out0],
                    var1: +d[out1],
                    var2: +d[out2],
                    race: d.race,
                    study: "NHS2"
                };
            })
            ]).then( allData => {
            console.log('All data');

            var graph0 = dc.barChart('#graph0');
            var graph1 = dc.barChart('#graph1');
            var graph2 = dc.barChart('#graph2');
            var sMenu = new dc.SelectMenu('#sMenu');
            var dataCount = new dc.DataCount('.data-count');

            var data = d3.merge(allData)
            data = data.filter(d => {
                if(d.var0 === 888) return false;
                if(d.var0 === 777) return false;
                if(d.var1 === 888) return false;
                if(d.var0 === 777) return false;
                if(d.var2 === 888) return false;
                if(d.var0 === 777) return false;
                if(d.race === '888') return false;
                if(d.race === '') return false;
                return true;
            })
            console.log(data);
            const crossdata = crossfilter(data);
            const all = crossdata.groupAll();
            console.log("Filter Complete.")

            const out0Dimension = crossdata.dimension(d => d.var0);
            const groupByout0 = out0Dimension.group();

            const out1Dimension = crossdata.dimension(d => d.var1);
            const groupByout1 = out1Dimension.group();

            const out2Dimension = crossdata.dimension(d => d.var2);
            const groupByout2 = out2Dimension.group();

            const raceDimension = crossdata.dimension(d => d.race);
            const raceGroup = raceDimension.group();

            console.log('Creating Charts...');
            let w = 640, h = 320;
            dcBarChart(graph0, out0Dimension, groupByout0, w, h, true, d3.scaleLinear().domain([0,d3.max(data, d => {return d.var0})]), '# of Subjects', out0);
            dcBarChart(graph1, out1Dimension, groupByout1, w, h, true, d3.scaleLinear().domain([0,d3.max(data, d => {return d.var1})]), '# of Subjects', out1);
            dcBarChart(graph2, out2Dimension, groupByout2, w, h, true, d3.scaleLinear().domain([0,d3.max(data, d => {return d.var2})]), '# of Subjects', out2);

            console.log('Smenu');
            sMenu
                .dimension(raceDimension)
                .group(raceGroup)
                .multiple(true)
                .numberVisible(10)

            graph0.controlsUseVisibility(true);
            graph1.controlsUseVisibility(true);
            graph2.controlsUseVisibility(true);
            sMenu.controlsUseVisibility(true);

            dataCount
                .crossfilter(crossdata)
                .groupAll(all)
                .html({
                some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
                all: 'All records selected. Please click on the graph to apply filters.'
                });

            // document.getElementById('graph0').innerHTML += 
            // `<div class='reset' style='visibility: hidden;'> Current filter: <span class='filter'></span>
            //     <a class='reset' href='javascript:graph0.filterAll();dc.redrawAll();' style='visibility: hidden;'>reset</a> 
            // </div>` 

            document.getElementById('sMenu').innerHTML += 
            `<p class="text-center text-bold">Race</p> ` 

            dc.renderAll();
        });
    };
    theDiv.appendChild(btn);
}

button();

//Chart constants
//let w = 640, h = 320;
// var chart = document.getElementById('dcPlot1');
//load the data

// Promise.all([
// // d3.tsv('Simulated_data_doubled_rows_CPS2_3_NHS_1_2.txt', function(d) {
// //     return {
// //         height: +d.height,
// //         weight: +d.weight,
// //         age: +d.age,
// //         fakeid: +d.fakeid,
// //         race: d.race,
// //         ethnicity: +d.ethnicity,
// //         study: d.Study
// //     };
// // }),
// d3.tsv('NHS2_simulated_20220120.txt', function(d) {
//     return {
//         height: +d.height,
//         weight: +d.weight,
//         age: +d.age,
//         fakeid: +d.fakeid,
//         race: d.race,
//         ethnicity: +d.ethnicity,
//         study: "NHS2"
//     };
// })
// ]).then( allData => {

// var data = d3.merge(allData)
// data = data.filter(d => {
//     if(d.height === 888) return false;
//     if(d.weight === 888) return false;
//     if(d.age === 888) return false;
//     if(d.race === '888') return false;
//     if(d.race === '') return false;
    
//     return true;
// })

// const crossdata = crossfilter(data);
// const all = crossdata.groupAll();

// // const heightDimension = crossdata.dimension(d => d.height);
// // const groupByHeight = heightDimension.group();

// // bChart1.width(w)
// // .height(h)
// // .group(groupByHeight)
// // .dimension(heightDimension)
// // .x(d3.scaleLinear().domain([0,d3.max(data, d => d.height)]))
// // .margins({top: 10, right: 50, bottom: 30, left: 40})
// // .elasticY(true)
// // .elasticX(true)
// // .yAxisLabel("# of Subjects")
// // .xAxisLabel("Height (cm)")
// // .centerBar(true);

// // const weightDimension = crossdata.dimension(d => d.weight);
// // const groupByWeight = weightDimension.group();

// // bChart2.width(w)
// // .height(h)
// // .group(groupByWeight)
// // .dimension(weightDimension)
// // .x(d3.scaleLinear().domain([0,d3.max(data, d => {return d.weight})]))
// // .margins({top: 10, right: 50, bottom: 30, left: 40})
// // .elasticY(true)
// // .elasticX(true)
// // .yAxisLabel("# of Subjects")
// // .xAxisLabel("Weight (kg)")
// // .centerBar(true);

// // const ageDimension = crossdata.dimension(d => d.age);
// // const groupByage = ageDimension.group();

// // dcBarChart(bChart3, ageDimension, groupByage, w, h, true, d3.scaleLinear().domain([0,d3.max(data, d => {return d.age})]), '# of Subjects', 'Age')

// // bChart3.width(w)
// // .height(h)
// // .group(groupByage)
// // .dimension(ageDimension)
// // .centerBar(true)
// // .x(d3.scaleLinear().domain([0,d3.max(data, d => {return d.age})]))
// // .margins({top: 10, right: 50, bottom: 30, left: 40})
// // .elasticY(true)
// // .elasticX(true)
// // .yAxisLabel('# of Subjects')
// // .xAxisLabel('Age')



// // const studyDimension = crossdata.dimension(d => d.study);
// // const studyGroup = studyDimension.group();

// // studyChart.width(h)
// // .height(h)
// // .radius(h)
// // .dimension(studyDimension)
// // .group(studyGroup)

// const raceDimension = crossdata.dimension(d => d.race);
// const raceGroup = raceDimension.group();

// sMenu.dimension(raceDimension)
// .group(raceGroup)
// .multiple(true)
// .numberVisible(10)

// // bChart1.controlsUseVisibility(true);
// // bChart2.controlsUseVisibility(true);
// // bChart3.controlsUseVisibility(true);
// // studyChart.controlsUseVisibility(true);
// sMenu.controlsUseVisibility(true);

// // dataCount
// // .crossfilter(crossdata)
// // .groupAll(all)
// // .html({
// //     some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
// //         ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
// //     all: 'All records selected. Please click on the graph to apply filters.'
// // });

// // dataTable
// // .dimension(weightDimension)
// // .columns(['fakeid','study', 'height', 'weight', 'age', 'race'])
// // .sortBy(d => d.fakeid)
// // .size(10)
// // .showSections(false)
// // .order(d3.descending);

// dc.renderAll();

// });

const dcBarChart = (chartname, dim, group, width, height, cenbar, xinput, yaxis, xaxis) => {
    chartname.width(width)
    .height(height)
    .group(group)
    .dimension(dim)
    .centerBar(cenbar)
    .x(xinput)
    .margins({top: 10, right: 50, bottom: 30, left: 40})
    .elasticY(true)
    .elasticX(true)
    .yAxisLabel(yaxis)
    .xAxisLabel(xaxis)
}
