import * as React from 'react'
import './NewCustomerModal.css'

interface NewCustomerModalProps {}
interface NewCustomerModalState {
  name: string
}
export class NewCustomerModal extends React.PureComponent<
  NewCustomerModalProps,
  NewCustomerModalState
> {
  constructor(props: NewCustomerModalProps) {
    super(props)
    this.state = {
      name: '',
    }
  }
  render() {
    return (
      <div className="NewCustomerModal">
        <h2>Stofna nýjan viðskiptavin</h2>
        <form>
          <label>
            Nafn
            <input
              type="text"
              value={this.state.name}
              onChange={event => {
                const name = event.target.value
                this.setState(() => ({ name }))
              }}
            />
          </label>
        </form>
      </div>
    )
  }
}
