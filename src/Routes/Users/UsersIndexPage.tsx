import * as React from 'react'
import { AdminIcon } from './AdminIcon'
import './UsersIndexPage.css'
import { EditUserModal } from './EditUserModal'
import { getFirestore } from '../../firebase'
import { Card } from '../../Components/Layout/Card'
import { Table } from '../../Components/Table/Table'

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
interface UsersIndexPageProps {}
interface UsersIndexPageState {
  users: UserRecord[]
}

export class UsersIndexPage extends React.Component<
  UsersIndexPageProps,
  UsersIndexPageState
> {
  unsubscribeOnUsersSnapshot: () => void
  constructor(props: UsersIndexPageProps) {
    super(props)
    this.state = { users: [] }
  }
  componentDidMount() {
    getFirestore().then(firestore => {
      this.unsubscribeOnUsersSnapshot = firestore
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
    })
  }
  componentWillUnmount() {
    this.unsubscribeOnUsersSnapshot()
  }
  render() {
    return (
      <div>
        <h1>Notendur</h1>
        <Card>
          <Table className="UsersTable">
            <thead>
              <tr>
                <th className="NameTh">Nafn</th>
                <th className="EmailTh">Email</th>
                <th className="RoleTh" />
                <th className="BtnTh" />
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
          </Table>
        </Card>
      </div>
    )
  }
}
