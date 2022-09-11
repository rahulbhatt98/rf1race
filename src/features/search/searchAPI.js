import axios from "axios";

export function searchUsersApi(keyword) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/get-all-user`,{
        search_text: keyword
      },{
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(function (response) {
        localStorage.setItem("searchUser", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

// export function searchTrackApi(keyword) {
//   return new Promise((resolve, reject) =>
//     axios
//       .post(`${process.env.REACT_APP_API_STAGING_URL}/get-all-search-tracks`,{
//         search_text: keyword,
//         type: 0
//       },{
//         headers: {
//           'Content-Type': 'application/json'
//       }
//       })
//       .then(function (response) {
//         resolve(response);
//       })
//       .catch(function (error) {
//         console.error(error);
//       })
//   )
// }

export function searchEventApi(key) {
  let keyword = (key) ? key : 0;
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-all-event-track/${keyword}`,{},{
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

export function searchDatabaseApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/get-all-search-tracks`,{
        type: 0,
        search_text: data,
      },{
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(function (response) {
        localStorage.setItem("searchDatabase", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

export function searchUserCreatedApi(id) {
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-all-user-custom-track/get/${id}`)
      .then(function (response) {
        // localStorage.setItem("searchUserCreated", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}