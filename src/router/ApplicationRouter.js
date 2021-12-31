
import React from "react";
import { View } from "react-native";
import { NativeRouter as Router, Route, Routes } from "react-router-native";
import TesterPage from "../template/TesterPage";
import UserPage from "../template/UserPage";
import ResultPage from "../template/ResultPage";
import HomePage from "../template/HomePage";

export default class ApplicationRouter extends React.Component {
    render(){
      return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/user-info" element={<UserPage />} />
            <Route path="/covid-test" element={<TesterPage />} />
            <Route path="/covid-result" element={<ResultPage />} /> */}
          </Routes>
        </Router>
      )
    }
}