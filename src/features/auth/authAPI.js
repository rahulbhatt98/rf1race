import axios from "axios";
// A mock function to mimic making an async request for data
export function registerApi(data) {
  var formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("c_password", data.c_password);
  return new Promise((resolve) =>
    // setTimeout(() => resolve({ data: amount }), 500)
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/register`, formData)
      .then(function (response) {
        localStorage.setItem("user1", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  );
}

export function updateApi(data) {
  var formData = new FormData();
  formData.append("user_id", data.user_id);
  formData.append("email", data.email);
  formData.append("name", data.name);
  formData.append("nick_name", data.driver_nick)
  formData.append("photo", data.photo[0]);
  return new Promise((resolve) =>
    // setTimeout(() => resolve({ data: amount }), 500)
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/update-account`, formData)
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data));
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  );
}

export function loginApi(data) {
  return new Promise((resolve, reject) =>
    // setTimeout(() => resolve({ data: amount }), 500)
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/login`, data)
      .then(function (response) {
        if (response?.data?.data?.user_id !== "") {
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          console.error(response);
        }
        resolve(response);
      })
      .catch(function (error) {
        console.error(error);
      })
  );
}

export function forgetPasswordApi(data) {
  return new Promise((resolve) =>
    // setTimeout(() => resolve({ data: amount }), 500)
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/password/email`, data)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  );
}

export function sendOtpApi(data) {
  return new Promise((resolve) =>
    // setTimeout(() => resolve({ data: amount }), 500)
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/sendotp`, data)
      .then(function (response) {
        resolve(response);
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      })
  );
}

export function changePasswordApi(data) {
  return new Promise((resolve) =>
    // setTimeout(() => resolve({ data: amount }), 500)
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/change-password`, data)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  );
}

export function socialLogin(email, socialId, socialType) {

  return new Promise((resolve) =>
    // setTimeout(() => resolve({ data: amount }), 500)
    axios
      .post(`${process.env.REACT_APP_API_STAGING_URL}/social-login`, {
        email: email,
        social_id: socialId,
        social_type: socialType
      })
      .then(function (response) {
        if (response?.data?.data?.user_id !== "") {
          localStorage.setItem("user1", JSON.stringify(response.data));
        } else {
          console.error(response);
        }
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  );
}