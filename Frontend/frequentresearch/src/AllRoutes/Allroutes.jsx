import React from "react";
import { Route, Routes } from "react-router-dom";


import DataView from "../components/data";
import RegisterUserPage from "../Page/RegisterUserPage";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <RegisterUserPage/>} />
        <Route path="/alluser" element={<DataView/>} />
      </Routes>
    </>
  );
}