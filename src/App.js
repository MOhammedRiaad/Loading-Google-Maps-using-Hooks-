import React, { useState } from "react"
import "./App.css"
//import MyMap from "./MyMap"
import Maps from "./Maps"
import Restaurantlist from "./Restaurantlist"
import listofres from './restaurants.json'

function App() {

  // you mani app state with some initial values 
  const [state, setState] = useState ({
    zoom: 5,
    center: { lat: 48, lng: 8 }
  })
  
// function to load the map markers and infowindow 
  function addMarkers(map, links) {

    // initiate the infowindow for each restaurant  
    var infowindow = new window.google.maps.InfoWindow()

     links.forEach((link, index) => {
       // create object of coords to pass to position 
       let coords = {lat : link.lat , lng : link.long}
       // creating the map markers bassed on your restaurant list 
      const marker = new window.google.maps.Marker({
        map,
        position: coords  ,
        label: `${index + 1}`,
        title: link.restaurantName,
      })
      // add event click on each marker to show his info window .

      marker.addListener(`click`, () => {
        // passing data to the info window content 
        infowindow.setContent(`${link.address}`)
        //telling info window to open and adjust to above the pressed marker 
        infowindow.open(map, marker)
      })
    })
  }

  // your userposition function to locate the user position 
  const userPosition =( () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  })()
// creating the required props to pass to map component 
  const mapProps = {
    // main options for postition 
    options: {
      center: state,
      zoom: 4,
    },
    // events to add after the map mount like sending the addmarker function we created 
    onMount: addMarkers, 
    // sending the list of restaurant json file as marker props to map component 
    onMountProps: listofres, 
  }

  return (
    <div className="App">
      <div className="map-wrapper">
        {/* Passing my map component with the list of props  */}
        <Maps {...mapProps} />
      </div>
      <div className="restaurant-wrapper">
        <Restaurantlist />
      </div>
    </div>
  )
}

export default App
