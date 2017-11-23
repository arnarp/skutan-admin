import * as React from 'react'
import { User } from 'firebase/app'
import { BrowserRouter, Route } from 'react-router-dom'
import { firebaseAuth } from '../firebase'
import { Users } from '../Users'
import { Home } from '../Home'
import { LoginPage } from './LoginPage'
import { LoadingPage } from './LoadingPage'
import { AppBar } from './AppBar'
import './App.css'

interface Claims {
  isAdmin: string | undefined
}

function b64DecodeUnicode(str: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function(c: string) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )
}

export class App extends React.Component<
  {},
  { user: User | undefined; loading: boolean; claims: Claims | undefined }
> {
  removeAuthStateChangeListener: () => void
  constructor(props: {}) {
    super(props)
    this.state = { user: undefined, loading: true, claims: undefined }
  }
  componentDidMount() {
    this.removeAuthStateChangeListener = firebaseAuth().onAuthStateChanged(
      user => {
        if (user) {
          console.log(user)
          user.getIdToken().then(idToken => {
            const claims = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]))
            this.setState(() => ({ claims }))
          })
          this.setState(() => ({ user, loading: false }))
        } else {
          this.setState(() => ({ user: undefined, loading: false }))
        }
      },
    )
  }
  componentWillUnmount() {
    this.removeAuthStateChangeListener()
  }
  render() {
    console.log('App render', this.state)
    if (this.state.loading) {
      return <LoadingPage />
    } else if (this.state.user === undefined) {
      return <LoginPage />
    } else if (this.state.claims === undefined) {
      return <LoadingPage />
    }
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar user={this.state.user} />
          <main className="AppMain">
            {!this.state.claims.isAdmin && (
              <p>Þetta vefsvæði er aðeins fyrir notendur með admin réttindi.</p>
            )}
            {this.state.claims.isAdmin && (
              <div>
                <Route exact={true} path="/" component={Home} />
                <Route path="/users" component={Users} />
              </div>
            )}
          </main>
        </div>
      </BrowserRouter>
    )
  }
}
