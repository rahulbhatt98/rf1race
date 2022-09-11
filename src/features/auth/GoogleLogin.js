import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { socialAsync } from "./authSlice";
import { useHistory } from "react-router-dom";

export default function GoogleLoginComponent() {

  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = (response) => {
    let socialType = "google";
    console.log(socialType)
    var data={
      'email':response.profileObj.email,
      'token':response.tokenId,
      'socialType':socialType
    }
    dispatch(socialAsync(data))
    history.push("/registration");
  };
  return (
    <GoogleLogin
      // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      clientId="63826579796-hph6uo9sfgsdd0m1k8c23km88gkfp490.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      disabled={false}
      isSignedIn={false}
    />
  );
}