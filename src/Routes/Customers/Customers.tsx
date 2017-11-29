import * as React from 'react'

interface CustomersProps {}
interface CustomersState {}
export class Customers extends React.PureComponent<
  CustomersProps,
  CustomersState
> {
  constructor(props: CustomersProps) {
    super(props)
  }
  render() {
    return <div>Customers</div>
  }
}
