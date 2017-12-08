import * as React from 'react'
import { FixedActionPanel } from '../../../Components/Layout/FixedActionPanel'
import { Button } from '../../../Components/Buttons/Button'
import { AddIcon } from '../../../Components/Icons/AddIcon'
import { NewCustomerModal } from './NewCustomerModal'
import { Customer } from '../../../model'
import { Link } from 'react-router-dom'
import { getFirestore } from '../../../firebase'
import { Table } from '../../../Components/Table/Table'
import { Card } from '../../../Components/Layout/Card'

interface CustomersIndexPageProps {}
interface CustomersIndexPageState {
  customers: Customer[]
}
export class CustomersIndexPage extends React.PureComponent<
  CustomersIndexPageProps,
  CustomersIndexPageState
> {
  unsubscribeOnCustomersSnapshot?: () => void
  constructor(props: CustomersIndexPageProps) {
    super(props)
    this.state = {
      customers: [],
    }
  }
  componentDidMount() {
    getFirestore().then(firestore => {
      this.unsubscribeOnCustomersSnapshot = firestore
        .collection('customers')
        .orderBy('name')
        .onSnapshot(snapshot => {
          this.setState(() => ({
            customers: snapshot.docs.map(d => {
              const obj = d.data()
              const id = d.id
              return { ...obj, id }
            }),
          }))
        })
    })
  }
  componentWillUnmount() {
    if (this.unsubscribeOnCustomersSnapshot) {
      this.unsubscribeOnCustomersSnapshot()
    }
  }
  render() {
    return (
      <div>
        <h1>Viðskiptavinir</h1>
        <Card>
          <Table>
            <thead>
              <tr>
                <th>Nafn</th>
                <th>Kennitala</th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers.map(c => (
                <tr key={c.id}>
                  <td>
                    <Link to={`/customer/${c.id}`}>{c.name}</Link>
                  </td>
                  <td>{c.kennitala}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <FixedActionPanel>
          <NewCustomerModal
            button={
              <Button color="Primary" style="Action">
                <AddIcon color="White" size="Large" />
              </Button>
            }
          />
        </FixedActionPanel>
      </div>
    )
  }
}
