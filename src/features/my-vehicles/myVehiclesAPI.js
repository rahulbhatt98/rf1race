import axios from "axios";
import { emptyResponse } from "../../utils/emptyReponse";

export function searchVehicleApi(keyword) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/vehicle-serach`, {
        search_text: keyword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}


export function fetchCarMakeModel() {
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/get-car-make-offline/2`, {}, {})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

export function fetchTyreMakeModel() {
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/get-tyre-make-offline/1`, {}, {})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}


export async function addVehicleDetailApi(data) {
  console.log(data)

  console.log(data.group_info[0].group_class)
  await axios
    .post(`${process.env.REACT_APP_API_STAGING_URL}/vehicle/addvehicledetails`,
      [{
        "basic-info": {
          "circuit_mode": emptyResponse(data.circuit_mode),
          "is_favourite": 0,
          "user_id": emptyResponse(data.user_id),
          "vehicle_engine": emptyResponse(data.vehicle_engine),
          "vehicle_horse_power": emptyResponse(data.vehicle_horse_power),
          "vehicle_make": "5",
          "vehicle_make_name": emptyResponse(data.vehicle_make_name),
          "vehicle_make_year": emptyResponse(data.vehicle_make_year),
          "vehicle_model": "75",
          "vehicle_model_name": emptyResponse(data.vehicle_model_name),
          "vehicle_nickname": emptyResponse(data.nickname),
          "vehicle_photo": emptyResponse(data.vehicle_photo),
          "vehicle_torque_power": emptyResponse(data.vehicle_torque_power),
          "vehicle_transmission": emptyResponse(data.vehicle_transmission),
          "vehicle_unique_id": "9000962",
          "vehicle_weight": emptyResponse(data.vehicle_weight)
        },
        "basic-setup": {
          "camber_unit": emptyResponse(data.camber_unit),
          "caster_unit": emptyResponse(data.caster_unit),
          "ride_height_unit": emptyResponse(data.ride_height_unit) ? data.ride_height_unit : "",
          "tire_camber_front_left": emptyResponse(data.tire_camber_front_left),
          "tire_camber_front_right": emptyResponse(data.tire_camber_front_right),
          "tire_camber_rear_left": emptyResponse(data.tire_camber_rear_left),
          "tire_camber_rear_right": emptyResponse(data.tire_camber_rear_right),
          "tire_caster_front_left": emptyResponse(data.tire_caster_front_left),
          "tire_caster_front_right": emptyResponse(data.tire_caster_front_right),
          "tire_pressure_front_left": "",
          "tire_pressure_front_right": "",
          "tire_pressure_rear_left": "",
          "tire_pressure_rear_right": "",
          "tire_ride_height_front_left": emptyResponse(data.tire_ride_height_front_left),
          "tire_ride_height_front_right": emptyResponse(data.tire_ride_height_front_right),
          "tire_toe_front_left": emptyResponse(data.tire_toe_front_left),
          "tire_toe_front_right": emptyResponse(data.tire_toe_front_right),
          "tire_toe_rear_left": emptyResponse(data.tire_toe_rear_left),
          "tire_toe_rear_right": emptyResponse(data.tire_toe_rear_right),
          "toe_unit": emptyResponse(data.toe_unit),
          "tyre_make": emptyResponse(data.tyre_make),
          "tyre_model": emptyResponse(data.tyre_make),
          "user_id": emptyResponse(data.user_id),
        },
        "is_delete": 0,
        "tyre_info": {
          "brake_session_time": "0",
          "engine_session_time": "0",
          "front_tire_rim_size": emptyResponse(data.front_tire_rim_size),
          "front_tire_sidewall": emptyResponse(data.front_tire_sidewall),
          "front_tire_utqg": emptyResponse(data.front_tire_utqg),
          "front_tire_width": emptyResponse(data.front_tire_width),
          "group_info": (data.group_info[0].group_class === null) ? data.group_info : [],
          "rear_tire_rim_size": emptyResponse(data.rear_tire_rim_size),
          "rear_tire_sidewall": emptyResponse(data.rear_tire_sidewall),
          "rear_tire_utqg": emptyResponse(data.rear_tire_utqg),
          "rear_tire_width": emptyResponse(data.rear_tire_width),
          "tire_make": emptyResponse(data.tire_make),
          "tire_model": emptyResponse(data.tire_model),
          "tire_session_time": "0",
          "tyre_make_name": "TYRE MAKE",
          "tyre_model_name": "MODEL",
          "user_id": emptyResponse(data.user_id)
        },
        "user_id": emptyResponse(data.user_id)
      }], {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.error(error);
    })
}