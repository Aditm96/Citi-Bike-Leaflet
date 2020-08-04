d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(response => {
  var Stations = response.data.stations;
  
  var Bike = [];
  
  Stations.forEach(stations => {
    name = stations.name;
    capacity = stations.capacity;
    coords = [stations.lat, stations.lon];
    var BikeMarker = L.marker(coords);
    
    BikeMarker.bindPopup(`<h3> ${name} </h3><hr><h4>Capacity: ${capacity}</h4>`);
    Bike.push(BikeMarker);
  });

  Bike_Stations = L.layerGroup(BikeMarker);

  var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var baseMaps = {
      "Light Map": light
    };
    
  var overlayMaps = {
    "Bike Stations": Bike_Stations
  };
  
  var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12, 
    layers: [light, bikeStations]
  });
  
     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(map);
});