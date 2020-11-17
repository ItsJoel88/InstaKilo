import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import "./assets/styles/global.scss"

function Login() {
  const CLIENT_ID = import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID
  // let [windows,setWindows] = React.useState<Window | null>(null)
  function githubLogin() {
    window.open(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`,'_self')
  }
  return <button onClick={e => githubLogin()}>Login W/Github</button>
}

function HomePage() {
  return <h1>HomePage</h1>
}

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute exact path="/" Component={HomePage} />
        </Switch>
      </Router>
    </>
  )
}

ReactDOM.render(<App />,document.getElementById('root'))