import axios from "axios";

export function createCrewApi(data) {
  var formData = new FormData();
  formData.append("name", data.name);
  formData.append("user_id", data.user_id);
  formData.append("nick_name", data.nick_name);
  formData.append("new_member_level", data.new_member_level)
  formData.append("top_member_level", data.top_member_level)
  formData.append("crew_location", data.crew_location)
  formData.append("show_in_search", data.show_in_search)
  formData.append("photo", data.photo[0]);
  return new Promise((resolve) =>
    // setTimeout(() => resolve({ data: amount }), 500)
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/create-crew`, formData)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  );
}

export function fetchCrewApi(id){
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-crew-list-by-id/${id}`,{},{})
      .then(function (response) {
        localStorage.setItem("crew", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

export function crewSearchApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/crew-search`,{
        search_text: data.key,
        user_id: data.user_id
      },{
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

export function userSearchApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/get-all-user`,{
        search_text: data
      },{
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

export function fetchCrewSelectedApi(id){
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-crew-list-by-id/${id}`,{},{})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

export function fetchCrewById(id){
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-crew-list-by-user-id/${id}`,{},{})
      .then(function (response) {
        localStorage.setItem("crew", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}