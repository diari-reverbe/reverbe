import React from "react";
import { Routes, Route } from "react-router-dom";

import ScrollPage from "../pages/ScrollPage";
import OneToOnePage from "../pages/OneToOnePage";
import PostItPage from "../pages/PostItPage";
import TogglePage from "../pages/TogglePage";

function Router() {
  return (
    <Routes>
      <Route path="/style1" element={<ScrollPage />} />
      <Route path="/style2/:id?" element={<OneToOnePage />} />
      <Route path="/style3" element={<PostItPage />} />
      <Route path="/style4" element={<TogglePage />} />
      <Route path="*" element={<ScrollPage />} />
    </Routes>
  );
}

export default Router;