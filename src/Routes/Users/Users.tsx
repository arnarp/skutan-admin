import * as React from 'react'
import * as firebase from 'firebase/app'
import { AdminIcon } from './AdminIcon'
import './Users.css'
import { EditUserModal } from './EditUserModal'

export interface UserRecord {
  uId: string
  displayName: string
  email: string
  photoURL: string
  claims: UserClaims
}
export interface UserClaims {
  isAdmin?: boolean
}
interface UserPageProps {}
interface UserPageState {
  users: UserRecord[]
}

export class Users extends React.Component<UserPageProps, UserPageState> {
  unsubscribeOnUsersSnapshot: () => void
  constructor(props: UserPageProps) {
    super(props)
    this.state = { users: [] }
  }
  componentDidMount() {
    this.unsubscribeOnUsersSnapshot = firebase
      .firestore()
      .collection('users')
      .orderBy('displayName')
      .onSnapshot(snapshot => {
        this.setState(() => ({
          users: snapshot.docs.map(d => {
            const obj = d.data()
            const uId = d.id
            return { ...obj, uId }
          }),
        }))
      })
  }
  componentWillUnmount() {
    this.unsubscribeOnUsersSnapshot()
  }
  render() {
    return (
      <div>
        <h1>Notendur</h1>
        <table className='UsersTable'>
          <thead>
            <tr>
              <th className='NameTh'>Nafn</th>
              <th className='EmailTh'>Email</th>
              <th className='RoleTh' />
              <th className='BtnTh' />
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(u => (
              <tr key={u.uId}>
                <td>{u.displayName}</td>
                <td>{u.email}</td>
                <td>{u.claims.isAdmin && <AdminIcon />}</td>
                <td>
                  <EditUserModal user={u} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
