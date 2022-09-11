import axios from "axios";

export function fetchChecklistApi(userId){
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-checklists/${userId}`,{},{
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(function (response) {
        // localStorage.setItem("checklistById", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

export function fetchSelectedChecklistApi(checkId){
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_STAGING_URL}/get-checklist/${checkId}`,{},{
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(function (response) {
        // localStorage.setItem("checklistById", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

export function addChecklistApi(checklistData){
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/add-checklist`,{
        "user_id": checklistData.userid,
        "checkList":[{"checkListName": checklistData.checkName,
        "checkListUniqueId": checklistData.checkUniqueId}]
      },{
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(function (response) {
        // localStorage.setItem("checklistById", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}

export function selectedChecklistAddApi(checklistData){
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/add-checklist-details`,{
        "user_id": checklistData.userid,
        "checkDetailList":checklistData.checkItem
      },{
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(function (response) {
        // localStorage.setItem("checklistById", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  )
}