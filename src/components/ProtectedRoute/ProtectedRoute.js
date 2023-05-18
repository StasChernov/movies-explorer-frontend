import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  return (
    <Route>
      {() =>
        isLoggedIn ? children : <Redirect to="/signin" />
      }
    </Route>
  );
}

export default ProtectedRoute;