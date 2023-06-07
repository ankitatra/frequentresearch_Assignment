import React from "react";
import { Route, Routes } from "react-router-dom";

import DealerSignup from "../components/Dealerpage";
import DataView from "../components/data";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <DealerSignup/>} />
        <Route path="/alluser" element={<DataView/>} />
      </Routes>
    </>
  );
}
