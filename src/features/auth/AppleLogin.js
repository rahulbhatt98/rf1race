import * as React from "react";

import AppleLogin from "react-apple-login";

export default function AppleLoginComponent({ history }) {
  return (
    <AppleLogin
      clientId="com.react.apple.login"
      redirectURI="https://redirectUrl.com"
      designProp={
        {
           height: 34,
           width: 186,
           color: "black",
           border: false,
           type: "sign-in",
           border_radius: 16,
           scale: 1,
           locale: "en_US", 
         }
       }
    />
  );
}
