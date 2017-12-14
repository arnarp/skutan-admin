import * as React from 'react'
import './UsersIndexPage.css'
import { EditUserModal } from './EditUserModal'
import { getFirestore } from '../../firebase'
import { Card } from '../../Components/Layout/Card'
import { Table } from '../../Components/Table/Table'
import { UserRecord, UserClaims } from '../../model'

interface UsersIndexPageProps {}
interface UsersIndexPageState {
  users: UserRecord[]
  userClaims: { [uid: string]: UserClaims }
}

export class UsersIndexPage extends React.Component<
  UsersIndexPageProps,
  UsersIndexPageState
> {
  unsubscribes: Array<() => void>
  constructor(props: UsersIndexPageProps) {
    super(props)
    this.state = { users: [], userClaims: {} }
  }
  componentDidMount() {
    getFirestore().then(firestore => {
      this.unsubscribes.push(
        firestore
          .collection('users')
          .orderBy('displayName')
          .onSnapshot(snapshot => {
            this.setState(() => ({
              users: snapshot.docs.map(d => {
                const obj = d.data()
                const uid = d.id
                return { ...obj, uid }
              }),
            }))
          }),
        firestore.collection('userClaims').onSnapshot(snapshot => {
          this.setState(() => ({
            userClaims: snapshot.docs.reduce((acc, d) => {
              acc[d.id] = { ...d.data() }
              return acc
            }, {}),
          }))
        }),
      )
    })
  }
  componentWillUnmount() {
    this.unsubscribes.forEach(u => u())
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
                <th className="BtnTh" />
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(u => (
                <tr key={u.uid}>
                  <td>{u.displayName}</td>
                  <td>{u.email}</td>
                  <td>
                    <EditUserModal
                      userClaims={
                        this.state.userClaims[u.uid]
                          ? this.state.userClaims[u.uid]
                          : {}
                      }
                      user={u}
                    />
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
