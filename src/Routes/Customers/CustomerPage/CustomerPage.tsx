import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Customer } from '../../../model'
import { LoadingSpinner } from '../../../Components/LoadingSpinner/LoadingSpinner'
import { Row } from '../../../Components/Layout/Row'
import { Col } from '../../../Components/Layout/Col'
import { CardContent, Card } from '../../../Components/Layout/Card'
import { IconButton } from '../../../Components/Buttons/IconButton'
import { AddIcon } from '../../../Components/Icons/AddIcon'
import { SendEmployeeInvitationModal } from './SendEmployeeInvitationModal'
import { getFirestore } from '../../../firebase'

interface CustomerPageProps extends RouteComponentProps<{ id: string }> {}
interface CustomerPageState {
  customer: Customer | undefined | null
}
export class CustomerPage extends React.PureComponent<
  CustomerPageProps,
  CustomerPageState
> {
  unsubscribe?: () => void
  constructor(props: CustomerPageProps) {
    super(props)
    this.state = {
      customer: undefined,
    }
  }
  componentDidMount() {
    getFirestore().then(firestore => {
      this.unsubscribe = firestore
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
        })
    })
  }
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
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
        <Row spacing="Medium" justifyContent="Start" growChildren={true}>
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
                />
              </Row>
            </header>
          </CardContent>
        </Card>
      </Col>
    )
  }
}
