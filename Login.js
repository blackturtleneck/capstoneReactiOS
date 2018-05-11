// import React, { Component } from "react";
// import { Text, View } from "react-native";
// const FBSDK = require("react-native-fbsdk");
// const { LoginButton, AccessToken } = FBSDK;

// class Login extends Component {
//   render() {
//     return (
//       <View>
//         <LoginButton
//           publishPermissions={["publish_actions"]}
//           onLoginFinished={(error, result) => {
//             if (error) {
//               alert("login has error: " + result.error);
//             } else if (result.isCancelled) {
//               alert("login is cancelled.");
//             } else {
//               AccessToken.getCurrentAccessToken().then(data => {
//                 alert(data.accessToken.toString());
//               });
//             }
//           }}
//           onLogoutFinished={() => alert("logout.")}
//         />
//       </View>
//     );
//   }

// export default Login;

import React, { Component } from "react";
import { auth, provider, db } from "./FirestoreConfig.js";
import { View, Button } from "react-native";
// // const FBSDK = require("react-native-fbsdk");
// // const { LoginButton } = FBSDK;

class Login extends Component {
  async login() {
    console.log("click");
    const result = await auth.signInWithPopup(provider);
    this.setState({ user: result.user });
    // Add a new document in collection "users"
    // if(!db.collection("users").doc(result.user.email).get()) {
    console.log("result.user", result.user);
    db
      .collection("users")
      .doc(result.user.email)
      .set({
        name: result.user.displayName,
        uid: result.user.uid,
        fName: result.additionalUserInfo.profile.first_name,
        lName: result.additionalUserInfo.profile.last_name,
        gender: result.additionalUserInfo.profile.gender,
        age: result.additionalUserInfo.profile.age_range.min,
        linkFB: result.additionalUserInfo.profile.link,
        timeZone: result.additionalUserInfo.profile.timezone,
        photoURL: result.user.photoURL,
        icons: { first: "abc", sec: "def" }
      })
      .then(function() {
        // eslint-disable-line no-console
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        // eslint-disable-line no-console
        console.error("Error writing document: ", error);
      });
  }

  render() {
    return (
      <Button
        title={"Login with Facebook"}
        className="facebook"
        onPress={this.login.bind(this)}
      />
    );
  }
}

export default Login;
