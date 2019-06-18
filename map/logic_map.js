// Create maps and layers
var layers = {
  Cats: new L.LayerGroup(),
  Dogs: new L.LayerGroup()
};

var myMap = L.map("map", {
  center: [41.7159834,-87.6681192],
  zoom: 10,
  layers: [
    layers.Cats,
    layers.Dogs
  ]
});

var overlay = {
  'Cats For Adoption': layers.Cats,
  'Dogs For Adoption': layers.Dogs
};
L.control.layers(null, overlay, {collapsed:false}).addTo(myMap);

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: MAPBOX_API_KEY
}).addTo(myMap);

// scale the marker size based on number of occurences
var x = d3.scaleLinear().domain([0, 200]).range([10, 25]);

// Computes the cat counts at each location (total, private, rescue)
var total_counts = catdata.reduce(function (r, data) {
  if(!r[data.location]){
    r[data.location] = {...data, total: 0, private:0, rescue: 0 }
  } 
  r[data.location].total = ++r[data.location].total || 1;
  
  if(data.rescue == 'Private Owner'){
    r[data.location].private = ++r[data.location].private || 1; 
    r[data.location].rescue = r[data.location].rescue || 0;
  } else {
    r[data.location].rescue = ++r[data.location].rescue || 1;
    r[data.location].private = r[data.location].private || 0; 
  }
  return r;
}, {});
var coordinates = catdata.reduce(function (r, data) {
  r[data.location] = data.coord;
  return r;
}, {});
var cat_counts_by_location = Object.keys(total_counts).map(function (key) {
  return {  location: key, 
            total: total_counts[key].total, 
            private: total_counts[key].private,
            rescue: total_counts[key].rescue,
            coord: coordinates[key] };
});
//console.log(cat_counts_by_location);

// Add markers to Cats layer
for (var i = 0; i < cat_counts_by_location.length; i++) {
  var marker = cat_counts_by_location[i];
  var marker_item = L.circleMarker(marker.coord, {
    opacity: 0,
    fillColor: "blue",
    fillOpacity: 0.75,
    radius: x(marker.total) 
  }).bindPopup("<b>" + marker.location + "</b><br>" + "<hr>" 
        + "<b>" + "Total Cat(s): " + marker.total + "</b><br>"
        + "Rescues: " + marker.rescue + "<br>"
        + "Private Owners: " + marker.private + "<br>" );  
  marker_item.addTo(layers['Cats']);
}

// Computes the dog counts at each location (total, private, rescue)
var total_counts = dogdata.reduce(function (r, data) {
  if(!r[data.location]){
    r[data.location] = {...data, total: 0, private:0, rescue: 0 }
  } 
  r[data.location].total = ++r[data.location].total || 1;
  
  if(data.rescue == 'Private Owner'){
    r[data.location].private = ++r[data.location].private || 1; 
    r[data.location].rescue = r[data.location].rescue || 0;
  } else {
    r[data.location].rescue = ++r[data.location].rescue || 1;
    r[data.location].private = r[data.location].private || 0; 
  }
  return r;
}, {});
var coordinates = dogdata.reduce(function (r, data) {
  r[data.location] = data.coord;
  return r;
}, {});
var dog_counts_by_location = Object.keys(total_counts).map(function (key) {
  return {  location: key, 
            total: total_counts[key].total, 
            private: total_counts[key].private,
            rescue: total_counts[key].rescue,
            coord: coordinates[key] };
});
//console.log(dog_counts_by_location);

// Add markers to Dogs layer
for (var i = 0; i < dog_counts_by_location.length; i++) {
  var marker = dog_counts_by_location[i];
  var marker_item = L.circleMarker(marker.coord, {
    opacity: 0,
    fillColor: "green",
    fillOpacity: 0.75,
    radius: x(marker.total) 
  }).bindPopup("<b>" + marker.location + "</b><br>" + "<hr>" 
        + "<b>" + "Total Dog(s): " + marker.total + "</b><br>"
        + "Rescues: " + marker.rescue + "<br>"
        + "Private Owners: " + marker.private + "<br>" );  
  marker_item.addTo(layers['Dogs']);
}

// For Testing Purposes:
// groups pets by location using d3 nest
// var pets_by_location = d3.nest()
//   .key(function(d) { return d.location; })
//   .entries(petdata);
// console.log(pets_by_location);

// counts pets by location using d3 nest and rollup
// var counts_by_location_data = d3.nest()
//   .key(function(d) { return d.location; })
//   .key(function(d) { 
//       if( d.rescue == 'Private Owner'){
//         return d.rescue; 
//       } else {
//         return 'Rescue';
//       }})
//   .rollup(function(v) { return {
//       counts: v.length,
//   } })
//   .entries(catdata)
// console.log(counts_by_location_data);