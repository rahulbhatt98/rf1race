import axios from "axios";

export function fetchEventApi(eventId){
    return new Promise((resolve, reject) =>
      axios
        .get(`${process.env.REACT_APP_API_STAGING_URL}/get-all-track/${eventId}`,{},{
          headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(function (response) {
          localStorage.setItem("eventById", JSON.stringify(response.data));
          resolve(response);
        })
        .catch(function (error) {
          console.error(error);
        })
    )
}

export function fetchVehicleApi(vehicleId){
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-vehicle-list-offline/${vehicleId}`)
      .then(function (response) {
        localStorage.setItem("vehicleById", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}


export function fetchEventSessionApi(eventId){
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-track-all-sessions/${eventId}`,{},{
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(function (response) {
        localStorage.setItem("eventSessionById", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

export function fetchEventSessionLapApi(userId){
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-hot-cold-pits-by-userid/${userId}`,{},{
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(function (response) {
        localStorage.setItem("eventSessionLapByUserId", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}