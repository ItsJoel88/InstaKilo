import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./assets/styles/global.scss"

function About() {
  return <h1>About</h1>
}

function HomePage() {
  const CLIENT_ID = import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID
  let [windows,setWindows] = React.useState<Window | null>(null)
  // &redirect_uri=${'http://localhost:8080'}
  function githubLogin() {
    setWindows(window.open(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`,'_self'))
    // const response = await fetch(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${'http://localhost:8080'}`,{method:'GET'})
    // console.log(response.json())
  }
  console.log(windows)
  return <button onClick={e => githubLogin()}>Login W/Github</button>
}

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

ReactDOM.render(<App />,document.getElementById('root'))