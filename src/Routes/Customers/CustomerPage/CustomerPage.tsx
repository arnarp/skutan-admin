import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Customer, CustomerInvitation, UserRecord } from '../../../model'
import { LoadingSpinner } from '../../../Components/LoadingSpinner/LoadingSpinner'
import { Row } from '../../../Components/Layout/Row'
import { Col } from '../../../Components/Layout/Col'
import { CardContent, Card } from '../../../Components/Layout/Card'
import { IconButton } from '../../../Components/Buttons/IconButton'
import { AddIcon } from '../../../Components/Icons/AddIcon'
import { SendEmployeeInvitationModal } from './SendEmployeeInvitationModal'
import { getFirestore } from '../../../firebase'
import { Table } from '../../../Components/Table/Table'
import { onWindowResize } from '../../../Utils/windowResize'

interface CustomerPageProps extends RouteComponentProps<{ id: string }> {}
interface CustomerPageState {
  customer?: Customer | null
  employees?: UserRecord[]
  invitations?: CustomerInvitation[]
  windowWidth: number
}
export class CustomerPage extends React.PureComponent<
  CustomerPageProps,
  CustomerPageState
> {
  unsubscribes: Array<() => void>
  constructor(props: CustomerPageProps) {
    super(props)
    this.state = {
      windowWidth: 0,
    }
    this.unsubscribes = []
  }
  componentDidMount() {
    getFirestore().then(firestore => {
      this.unsubscribes.push(
        firestore
          .collection('customers')
          .doc(this.props.match.params.id)
          .onSnapshot(doc => {
            if (doc.exists) {
              const customer = doc.data()
              customer.id = doc.id
              this.setState(() => ({ customer }))
            } else {
              this.setState(() => ({ customer: null }))
            }
          }),
      )
      this.unsubscribes.push(
        firestore
          .collection('customerInvites')
          .where('customerId', '==', this.props.match.params.id)
          .where('expires', '>', new Date())
          .onSnapshot(snapshot => {
            this.setState(() => ({
              invitations: snapshot.docs.map(d => ({ ...d.data(), id: d.id })),
            }))
          }),
      )
      this.unsubscribes.push(
        firestore
          .collection('users')
          .where('customerId', '==', this.props.match.params.id)
          .onSnapshot(snapshot => {
            this.setState(() => ({
              employees: snapshot.docs.map(d => ({ ...d.data(), uid: d.id })),
            }))
          }),
      )
      this.unsubscribes.push(
        onWindowResize((height, width) => {
          this.setState(() => ({ windowWidth: width }))
        }),
      )
    })
  }
  componentWillUnmount() {
    this.unsubscribes.forEach(u => u())
  }
  render() {
    if (this.state.customer === undefined) {
      return <LoadingSpinner />
    }
    if (this.state.customer === null) {
      return (
        <div>
          <p>Viðskiptavinur fannst ekki</p>
        </div>
      )
    }

    return (
      <Col spacing="Medium">
        <h1>{this.state.customer.name}</h1>
        <Row
          spacing="Medium"
          justifyContent="Start"
          growChildren={true}
          breakPoint="610"
        >
          <Card>
            <CardContent>
              <Col spacing="Medium">
                <h2>Upplýsingar</h2>
                <dl>
                  <Row justifyContent="SpaceBetween">
                    <dt>Kennitala</dt>
                    <dd>{this.state.customer.kennitala}</dd>
                  </Row>
                  <Row justifyContent="SpaceBetween">
                    <dt>Navision Id</dt>
                    <dd>{this.state.customer.navisionId}</dd>
                  </Row>
                </dl>
              </Col>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Col spacing="Medium">
                <h2>Deildir</h2>
                <ul>
                  {this.state.customer.divisions.map(d => (
                    <li key={d.navisionId}>{d.name}</li>
                  ))}
                </ul>
              </Col>
            </CardContent>
          </Card>
        </Row>
        <Card>
          <CardContent>
            <header>
              <Row justifyContent="SpaceBetween">
                <h2>Starfsmenn</h2>
                <SendEmployeeInvitationModal
                  button={
                    <IconButton
                      Icon={AddIcon}
                      color="Primary"
                      label="Bæta við starfsmanni"
                    />
                  }
                  customerId={this.state.customer.id}
                  customerName={this.state.customer.name}
                />
              </Row>
            </header>
            <h3>Send virk boð</h3>
          </CardContent>
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Hlutverk</th>
                <th>Gildir til</th>
              </tr>
            </thead>
            <tbody>
              {this.state.invitations &&
                this.state.invitations.map(i => (
                  <tr key={i.id}>
                    <td>{i.email}</td>
                    <td>{i.role}</td>
                    <td>{i.expires.toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <CardContent>
            <h3>Skráðir starfsmenn</h3>
          </CardContent>
          <Table>
            <thead>
              <tr>
                <th>Nafn</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees &&
                this.state.employees.map(e => (
                  <tr key={e.uid}>
                    <td>{e.displayName}</td>
                    <td>{e.email}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card>
      </Col>
    )
  }
}
