import React from "react";
import FacebookLogin from "react-facebook-login";
import {  useDispatch } from "react-redux";
import {  socialAsync } from "./authSlice";
import { useHistory } from "react-router-dom";

export default function FacebookLoginComponent() {   
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  const responseFacebook = (response) => {

    var data={
      'email':response.email,
      'token':response.accessToken,
      'socialType':response.graphDomain
    }
    dispatch(socialAsync(data))
    history.push("/registration");
  };
  return (
    <FacebookLogin
      // appId="1088597931155576"
      appId="725902455051582"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="my-facebook-button-class"
      icon="fa-facebook"
    />
  );
}