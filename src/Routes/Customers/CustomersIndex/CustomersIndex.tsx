import * as React from 'react'
import { FixedActionPanel } from '../../../Components/Layout/FixedActionPanel'
import { Button } from '../../../Components/Buttons/Button'
import { AddIcon } from '../../../Components/Icons/AddIcon'
import { NewCustomerModal } from './NewCustomerModal'

interface CustomersIndexProps {}
interface CustomersIndexState {}
export class CustomersIndex extends React.PureComponent<
  CustomersIndexProps,
  CustomersIndexState
> {
  constructor(props: CustomersIndexProps) {
    super(props)
    this.onNewClick = this.onNewClick.bind(this)
  }
  onNewClick() {}
  render() {
    return (
      <div>
        <h1>Viðskiptavinir</h1>
        <NewCustomerModal />
        <FixedActionPanel>
          <Button color="Primary" style="Action" onClick={this.onNewClick}>
            <AddIcon color="White" size="Large" />
          </Button>
        </FixedActionPanel>
      </div>
    )
  }
}
