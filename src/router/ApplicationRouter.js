
import React from "react";
import { View } from "react-native";
import { NativeRouter as Router, Route, Routes } from "react-router-native";
import TesterPage from "../template/TesterPage";
import UserPage from "../template/UserPage";

export default class ApplicationRouter extends React.Component {
    render(){
      return (
        <Router>
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="covid-test" element={<TesterPage />} />
          </Routes>
        </Router>
      )
    }
}