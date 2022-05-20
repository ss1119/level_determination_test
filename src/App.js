import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PasswordReset from "./containers/action/PasswordReset";
import Start from "./containers/start/Start";
import Question from "./containers/question/Question";
import Continue from "./containers/continue/Continue";
import End from "./containers/end/End";
import Client from "./containers/client/Client";
import Error404 from "./containers/common/Error404";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/action" component={PasswordReset} />
          <Route exact path="/client" component={Client} />
          <Route exact path="/test" component={Question} />
          <Route exact path="/continue" component={Continue} />
          <Route exact path="/end" component={End} />
          <Route exact component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
