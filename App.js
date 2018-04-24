import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';


// HOME SCREEN
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

// MESSAGES
class MessagesScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Messages!</Text>
      </View>
    );
  }
}

// DATE GENERATOR
class DateScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Date Generator!</Text>
      </View>
    );
  }
}

// SETTINGS SCREEN
class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}



export default TabNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: SettingsScreen },
  Messages: { screen: MessagesScreen },
  DateGenerator: { screen: DateScreen },
  Settings: { screen: SettingsScreen },
});