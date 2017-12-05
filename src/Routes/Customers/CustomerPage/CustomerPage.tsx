import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as firebase from 'firebase/app'
import { Customer } from '../../../model'
import { LoadingSpinner } from '../../../Components/LoadingSpinner/LoadingSpinner'

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
    this.unsubscribe = firebase
      .firestore()
      .collection('customers')
      .doc(this.props.match.params.id)
      .onSnapshot(doc => {
        console.log(doc)
        if (doc.exists) {
          const customer = doc.data()
          customer.id = doc.id
          this.setState(() => ({ customer }))
        } else {
          this.setState(() => ({ customer: null }))
        }
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
          <p>Viðskiptavinur fanst ekki</p>
        </div>
      )
    }
    return (
      <div>
        <h1>{this.state.customer.name}</h1>
      </div>
    )
  }
}
