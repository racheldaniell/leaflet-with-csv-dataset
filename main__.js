// for our main.js file for CSV data we can use several code blocks from our GeoJSON map OR write code from scratch
// we NEED Lat and Long columns in our CSV!


const map = L.map('map', {
    center: [40.7968362004517, -73.95190469677475],
    zoom: 16,
    scrollWheelZoom: true
})

const legend = L.control.layers( null, null, {
    position: "topleft",
    collapsed: false
}).addTo(map)

// define let variables as holders
let markers1 = [];
let markers2 = [];
let marker1;
let marker2;
let data1 = [];
let data2 = [];
let layer1;
let layer2;
let popupContent;


// display basemap tiles 

const basemapStamenTerrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
})
.addTo(map)
;
// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

// read data from data files

$.get('../data/data.csv', function(
    csvString) {
        data1 = Papa.parse(
            csvString, {header: true, dynamicTyping: true}).data.filter(
                function(row)  {return row.Shift === "AM"}
            )
        data2 = Papa.parse(csvString, {header: true, dynamicTyping: true}).data.filter(
                function(row) { return row.Shift === "PM"}
            );

        console.log(data1)
        console.log(data2)

    for (var i in data1) {
        var row1 = data1[i];

        popupContent = "<div class=popup"+'<p>'+'Age: '+row1.Age+"<p>"+"Type :"+row1.Title+"</p>"+"</div>";

        marker1 = L.circleMarker([row1.Latitude, row1.Longitude], {
            radius: 7,
            fillColor: "orange",
            color: "yellow",
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.6
        })
        .bindPopup(popupContent);

        marker1.addTo(map);

        markers1.push(marker1);

    }

    layer1 = L.layerGroup(markers1).addTo(map);
    legend.addOverlay(layer1,'Squirrels in the AM <span style="font-size:20px; color: orange; opacity: .8">&#9679;</span>')


    for (var i in data2) {
        var row2 = data2[i];

        popupContent = "<div class=popup"+'<p>'+'Age: '+row2.Age+"<p>"+"Type :"+row2.Title+"</p>"+"</div>";

        marker2 = L.circleMarker([row2.Latitude, row2.Longitude], {
            radius: 7,
            fillColor: "aqua",
            color: "blue",
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.6
        })
        .bindPopup(popupContent);

        marker2.addTo(map);

        markers2.push(marker2);
    }

    layer2 = L.layerGroup(markers2).addTo(map);
    legend.addOverlay(layer2,'Squirrels in the PM <span style="font-size:20px; color: aqua; opacity: .8">&#9679;</span>')


    }
    );


