import { functions, isEqual, omit } from 'lodash'

import React, { useState, useEffect, useRef } from 'react'

// define the map component with the required props to work with 
/**
 * 
 * @param {options} // for loading the map data  
 * @param {onMount} // for functions will run after the componanet is mounted 
 * @param {className} // if you want to pass any styles to the componenet 
 * @param {onMountProps} // what data to pass after the component data mount
 */

function Map({ options, onMount, className, onMountProps }) {
  
  // the new react hook ref  for map reference 
  const ref = useRef()
  // adding the map to state to control and update 
  const [map, setMap] = useState()
    // controlling map state render with use effect .
  useEffect(() => {
    let loading = true
    // The Google Maps API modifies the options object passed to
    // the Map constructor in place by adding a mapTypeId with default
    // value 'roadmap'. { ...options } prevents this by creating a copy.
    const onLoad = () =>
    
      setMap(new window.google.maps.Map(ref.current, { ...options }))
      if (!window.google && loading) {
        loading =false
      // adding the google maps script to the window .
      const script = document.createElement(`script`)
      script.src =
      `https://maps.googleapis.com/maps/api/js?key=${Key}`
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [options])
  // making sure that you are passing a function to the onmount state  then passing the props to this function
  if (map && typeof onMount === `function`) onMount(map, onMountProps)
  return (
    <div
      style={{ height: `100vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref, className }}
    />
  )
}
// function to make sure that the map is not re rendring each time ony render when map options chage due to user giolocation
function shouldNotUpdate(props, nextProps) {
  const [funcs, nextFuncs] = [functions(props), functions(nextProps)]
  const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs))
  const noFuncChange =
    funcs.length === nextFuncs.length &&
    funcs.every(fn => props[fn].toString() === nextProps[fn].toString())
  return noPropChange && noFuncChange
}
export default React.memo(Map, shouldNotUpdate)

// adding fallback to the map component if the userbrowser is not having Giolocation ,
Map.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
  },
}