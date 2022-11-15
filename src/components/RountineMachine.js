import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "../assets/img/lite_ride/fullscooter.png";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";

const createRoutineMachineLayer = (props) => {
  var scooterID = props.scooterID;
  var location = props.location;
  var startLocation = location.start;
  var currentLocation = location.current;
  var batteryLife = props.batteryLife;

  

  var icon = L.icon({
    iconUrl: 
  //    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    require("../assets/img/lite_ride/fullscooter.png"),
    
    iconSize: [50, 50]
  })
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(startLocation.lat, startLocation.lng),
      L.latLng(currentLocation.lat, currentLocation.lng)
    ],
   
    lineOptions: {
      styles: [{ color: "red", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,    
    createMarker: function (i, start, n){
      console.log("i: ", i);
      var marker_icon = null
      var lat, lng = null
      var myBatteryLife = null
      if (i == 0) {
          // This is the first marker, indicating start
          marker_icon = icon
          lat = startLocation.lat
          lng = startLocation.lng
          myBatteryLife = batteryLife.startBatteryLife
      } else if (i == n -1) {
          //This is the last marker indicating destination
          marker_icon =icon
          lat = currentLocation.lat
          lng = currentLocation.lng
          myBatteryLife = batteryLife.currentBatteryLife
      }
      var marker = L.marker (start.latLng, {
                  draggable: true,
                  bounceOnAdd: false,
                  bounceOnAddOptions: {
                      duration: 1000,
                      height: 800, 
                      // function(){
                      //     (bindPopup("myPopup").openOn(map))
                      // }
                  },
                  icon: marker_icon
      })
      var myPopup = scooterID + "<br/>" + lat + ", " + lng + "<br/>" + myBatteryLife;
      return marker.bindPopup(myPopup)
    },
    
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
