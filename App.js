import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NativeRouter } from 'react-router-native';
import ApplicationRouter from './src/router/ApplicationRouter';
import UserPage from './src/template/UserPage';

export default class App extends React.Component {

  render(){
    return (
      <View>
        <ApplicationRouter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})