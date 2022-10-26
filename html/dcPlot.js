import {tsv2Json, tsv2Json2, csvJSON, getFile} from '../src/shared.js';

const txtid = '908521040771';


const data = await getFile(txtid);
const tsv2json = tsv2Json2(data);
const json = tsv2json.data;
const headers = tsv2json.headers;
const gsel = ['Interval Bar Chart','Ordinal Bar Chart']

//const data = await (await fetch('../NHS2_simulated_20220120.csv')).text();
//const {jsonData, headers} = csvJSON(data);
//console.log(headers);

const variables0 = (headers) => {
    var theDiv = document.getElementById("graph0sel");
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
    var theDiv = document.getElementById("graph1sel")
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
    var theDiv = document.getElementById("graph2sel")
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

const graphSel0 = (gsel) => {
    var theDiv = document.getElementById("graph0sel");
    var selectList = document.createElement("select");
    selectList.id = "selectType0";
    theDiv.appendChild(selectList);

    for (var i = 0; i < gsel.length; i++) {
        var option = document.createElement("option");
        option.value = gsel[i];
        option.text = gsel[i];
        selectList.appendChild(option);
    }
}

const graphSel1 = (gsel) => {
    var theDiv = document.getElementById("graph1sel");
    var selectList = document.createElement("select");
    selectList.id = "selectType1";
    theDiv.appendChild(selectList);

    for (var i = 0; i < gsel.length; i++) {
        var option = document.createElement("option");
        option.value = gsel[i];
        option.text = gsel[i];
        selectList.appendChild(option);
    }
}

const graphSel2 = (gsel) => {
    var theDiv = document.getElementById("graph2sel");
    var selectList = document.createElement("select");
    selectList.id = "selectType2";
    theDiv.appendChild(selectList);

    for (var i = 0; i < gsel.length; i++) {
        var option = document.createElement("option");
        option.value = gsel[i];
        option.text = gsel[i];
        selectList.appendChild(option);
    }
}

variables0(headers);
variables1(headers);
variables2(headers);
graphSel0(gsel);
graphSel1(gsel);
graphSel2(gsel);

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
        var keys = [out0, out1, out2, 'race', 'study'];
        var gsel0 = document.querySelector('#selectType0').value;
        var gsel1 = document.querySelector('#selectType1').value;
        var gsel2 = document.querySelector('#selectType2').value;
        console.log(out0);
        console.log(out1);
        console.log(out2);

        let data = json.map(element => Object.assign({}, ...keys.map(key => ({[key]: element[key]}))))
        data.forEach(function(d) {
            d[out0] = +d[out0],
            d[out1] = +d[out1],
            d[out2] = +d[out2],
            d['study'] = 'NHS2'
        });

        for(const obj of data) {
            if(obj.race === '1'){
                obj.race = 'White';
            }
            if(obj.race ==='2'){
                obj.race = 'Black/African American';
            }
            if(obj.race ==='3'){
                obj.race = 'Asian';
            }
            if(obj.race ==='4'){
                obj.race = 'Native Hawaiian/Pacific Islander';
            }
            if(obj.race ==='5'){
                obj.race = 'American Indian/Alaska Native';
            }
            if(obj.race ==='6'){
                obj.race = 'Other, including multiracial';
            }

        };

        console.log("race updated");


        console.log(data);

        console.log('All data');

        var graph0 = dc.barChart('#graph0in');
        var graph1 = dc.barChart('#graph1');
        var graph2 = dc.barChart('#graph2');
        var sMenu = new dc.SelectMenu('#sMenu');
        var dataCount = new dc.DataCount('.data-count');
        //var chart = new dc.DataTable("#test");

        //var data = d3.merge(allData);
        data = data.filter(d => {
            if(d[out0] === 888) return false;
            if(d[out0] === 777) return false;
            if(d[out1] === 888) return false;
            if(d[out0] === 777) return false;
            if(d[out2] === 888) return false;
            if(d[out0] === 777) return false;
            if(d.race === '888') return false;
            if(d.race === '') return false;
            return true;
        })
        console.log(data);
        const crossdata = crossfilter(data);
        const all = crossdata.groupAll();
        console.log("Filter Complete.")

        const out0Dimension = crossdata.dimension(d => d[out0]);
        const groupByout0 = out0Dimension.group();

        const out1Dimension = crossdata.dimension(d => d[out1]);
        const groupByout1 = out1Dimension.group();

        const out2Dimension = crossdata.dimension(d => d[out2]);
        const groupByout2 = out2Dimension.group();

        const raceDimension = crossdata.dimension(d => d.race);
        const raceGroup = raceDimension.group();

        // var avgGroup0 = out0Dimension.group().reduce(
        //     function (p,v) {
        //         ++p.number;
        //         p.total += v[out0];
        //         p.avg = Math.round(p.total / p.number);
        //         return p;
        //     }
        // )

        // chart
        //     .width(768)
        //     .height(480)
        //     .showSections(false)
        //     .dimension(avgGroup0)
        //     .columns([function (d) {return d.value.number},
        //             function (d) {return d.value.avg}])
        //     .sortBy(function (d) { return d.value.avg})
        //     .order(d3.descending)

        console.log('Creating Charts...');
        let w = 640, h = 320;

        // console.log(gsel0);
        // console.log(gsel1);
        // console.log(gsel2);


        if (gsel0 === 'Interval Bar Chart') {
            console.log('Bar Chart 0');
            dcBarChart(graph0, out0Dimension, groupByout0, w, h, true, d3.scaleLinear().domain([0,d3.max(data, d => {return d[out0]})]), '# of Subjects', out0);
        } else {
            dcBarChartOrdinal(graph0, out0Dimension, groupByout0, w, h, '# of Subjects', out0);
        }
        if (gsel1 === 'Interval Bar Chart') {
            console.log('Bar Chart 1');
            dcBarChart(graph1, out1Dimension, groupByout1, w, h, true, d3.scaleLinear().domain([0,d3.max(data, d => {return d[out1]})]), '# of Subjects', out1);
        } else {
            dcBarChartOrdinal(graph1, out1Dimension, groupByout1, w, h, '# of Subjects', out1);
        }
        if (gsel2 === 'Interval Bar Chart') {
            console.log('Bar Chart 2');
            dcBarChart(graph2, out2Dimension, groupByout2, w, h, true, d3.scaleLinear().domain([0,d3.max(data, d => {return d[out2]})]), '# of Subjects', out2);
        } else {
            dcBarChartOrdinal(graph2, out2Dimension, groupByout2, w, h, '# of Subjects', out2);
        }

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

        document.getElementById("raceTitle").removeAttribute('hidden')

        dc.renderAll();
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

const dcBarChartOrdinal = (chartname, dim, group, width, height, yaxis, xaxis) => {
    chartname.width(width)
    .height(height)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .elasticX(true)
    .yAxisLabel(yaxis)
    .xAxisLabel(xaxis)
    .brushOn(false)
    .barPadding(0.1)
    .outerPadding(0.05)
    .dimension(dim)
    .group(group)
}
