import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { adminRoutes} from "./allRoutes";
import AuthLayout from "@/Layout/AuthLayout/AuthLayout";

// Component Loader để hiển thị trong khi các component được tải
const Loader = () => (
  <div className="load">
    <hr />
    <hr />
    <hr />
    <hr />
  </div>
);

const Index = () => {
  return (
    <React.Fragment>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" />} />
            {/* Các route cho trang admin */}
            {adminRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<AuthLayout>{route.component}</AuthLayout>}
                key={idx}
              />
            ))}
          </Routes>
        </Suspense>
    </React.Fragment>
  );
};

export default Index;
