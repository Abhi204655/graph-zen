import React from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "../components";
const Dashboard = React.lazy(() => import("../Screens/Dashboard"));
const EmbedScreen = React.lazy(() => import("../Screens/EmbedScreen"));

const RoutesWrapper = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/embed"
          element={<p>Please pass a embed link in the url</p>}
        />
        <Route path="/embed/:embedId" element={<EmbedScreen />} />
      </Routes>
    </React.Suspense>
  );
};

export default RoutesWrapper;
