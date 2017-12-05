import * as React from 'react'
import * as firebase from 'firebase/app'
import { FixedActionPanel } from '../../../Components/Layout/FixedActionPanel'
import { Button } from '../../../Components/Buttons/Button'
import { AddIcon } from '../../../Components/Icons/AddIcon'
import { NewCustomerModal } from './NewCustomerModal'
import { Customer } from '../../../model'
import { Link } from 'react-router-dom'

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
    this.unsubscribeOnCustomersSnapshot = firebase
      .firestore()
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
        <table>
          <thead>
            <tr>
              <th>Nafn</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map(c => (
              <tr key={c.id}>
                <td>
                  <Link to={`/customer/${c.id}`}>{c.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
