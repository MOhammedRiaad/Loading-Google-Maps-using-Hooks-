import React, { Component } from "react"
import RestaurantData from "./restaurants.json"

class Restaurantlist extends Component {
  render() {
    return (
      <div>
        <h1>Restaurants</h1>
        {RestaurantData.map((RestaurantDetail, index) => {
          return (
            <div key={index}>
              <h3>{RestaurantDetail.restaurantName}</h3>
              <p>{RestaurantDetail.address}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Restaurantlist
