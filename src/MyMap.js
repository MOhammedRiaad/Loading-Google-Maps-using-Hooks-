import React, { useState, useEffect } from "react"
import GoogleMapReact from "google-map-react"

const MyMap = (props) => {
  let userPosition
  const [state, setState] = useState({
    zoom: 10,
    center: { lat: null, lng: null }
  })

  const AnyReactComponent = ({ text }) => <div>{text}</div>
  useEffect(() => {
    userPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        })
      }
    }
  }, [userPosition])

  return (
    <div className="MyMap" style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "KEY" }}
        defaultCenter={state.center}
        defaultZoom={state.zoom}
      >
        <AnyReactComponent coordinates={userPosition} text="YOU ARE HERE" />
      </GoogleMapReact>
    </div>
  )
}

export default MyMap
