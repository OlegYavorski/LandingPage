import React from "react";
import Home from "../Home/Home"
import Roster from "../Roster/Roster"
import Schedule from "../Schedule/Schedule"
import { Switch, Route } from 'react-router-dom'

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/roster' component={Roster}/>
        <Route path='/schedule' component={Schedule}/>
      </Switch>
    </main>
  );
}
export default Main;