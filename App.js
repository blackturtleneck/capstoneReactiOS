import React from "react";
import { Text, View } from "react-native";
import { TabNavigator } from "react-navigation";
import { auth, provider, db } from "./FirestoreConfig.js";

import Login from "./Login.js";
import MessagesScreen from "./MessageScreen";
import DateScreen from "./DateScreen";
import SettingsScreen from "./SettingsScreen";

// HOME SCREEN
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      user: null
    };
    console.log("state", this.state);
  }

  componentDidMount() {
    let component = this;

    // check whether user is logged in
    auth
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({
            authenticated: true,
            user: {
              displayName: user.displayName,
              email: user.email
            }
          });
          db
            .collection("users")
            .doc(this.state.user.email)
            .onSnapshot(function(doc) {
              console.log("this.state", component.state);

              console.log("doc", doc.data());
              if (!doc.data().onBoarding) {
                component.setState({
                  onBoarding: false
                });
              } else {
                component.setState({
                  onBoarding: true
                });
              }
            });
        } else {
          this.setState({
            authenticated: true,
            user: null
          });
        }
      })
      .bind(this);
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Text>Home!</Text>
        <Login /> */}
        {this.state.authenticated ? (
          this.state.user ? (
            <MessagesScreen />
          ) : (
            // <div className="login">
            <Login />
            // </div>
          )
        ) : (
          // if login hasn't mounted
          <View />
        )}
      </View>
    );
  }
}

export default TabNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: SettingsScreen },
  Messages: { screen: MessagesScreen },
  DateGenerator: { screen: DateScreen },
  Settings: { screen: SettingsScreen }
});
