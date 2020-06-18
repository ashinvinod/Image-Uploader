import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import ValidatedSignupForm from './SignUp'
import ValidatedSignuptooForm from './SignUptoo'
import ValidatedLoginForm from './LogIn'
import Dashboard from './Dashboard'
import history from './history'


function App () {
  // const [response, setResponse] = useState('')
  // const [post, setPost] = useState('')
  // const [responseToPost, setResponseToPost] = useState('')
    return (
        <div>
          <Router history={history}>
            <Switch>
                <Route exact path={"/"} component={ValidatedSignupForm} />
                <Route path={"/login"} component={ValidatedLoginForm} />
                <Route path={"/signuptoo"} component={ValidatedSignuptooForm} />
                <Route path={"/dashboard"} component={Dashboard} />
            </Switch>
          </Router>
        </div>
    )
}


export default App;
