import * as React from 'react'
import './AppBar.css'
import { User } from 'firebase/app'
import { firebaseAuth } from '../../firebase'
import { Link } from 'react-router-dom'

interface AppBarProps {
  user: User
}

export const AppBar = (props: AppBarProps) => (
  <div role="banner" className="AppBar BlueBackground">
    <nav className="AppBarNav">
      <Link to="/">Heim</Link>
      <Link to="/users">Notendur</Link>
    </nav>
    <button
      onClick={() => {
        firebaseAuth().signOut()
      }}
      className="UserBtn"
    >
      {props.user.photoURL && (
        <img className="UserImg" src={props.user.photoURL} />
      )}
    </button>
  </div>
)
