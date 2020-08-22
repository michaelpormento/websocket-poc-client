import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={pages.HomePage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
