import React from "react";
import About from "./About";
import Home from "./Home";
import { Route, Switch } from "wouter";
function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/about" component={About} />

      <Route>404: No such page!</Route>
    </Switch>
  );
}

export default App;
