import * as React from 'react'
import * as firebase from 'firebase/app'
import { ref } from '../firebase'

interface UserRecord {
  uId: string
  displayName: string
  email: string
  photoURL: string
}
interface UserPageProps {}
interface UserPageState {
  users: UserRecord[]
}

export class Users extends React.Component<UserPageProps, UserPageState> {
  constructor(props: UserPageProps) {
    super(props)
    this.state = { users: [] }
  }
  componentDidMount() {
    console.log(ref)
    const usersRef = firebase.database().ref('/users')
    usersRef.on('value', data => {
      if (data === null) {
        return
      }
      const users: UserRecord[] = []
      const items = data.val()
      console.log('usersRef.on(value', items)
      // tslint:disable-next-line:forin
      for (let item in items) {
        users.push({ ...items[item], uId: item })
      }
      this.setState(() => ({ users: users }))
    })
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Notendur</h1>
        <table>
          {this.state.users.map(u => (
            <tr key={u.uId}>
              <td>{u.displayName}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}
