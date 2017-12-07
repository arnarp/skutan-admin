import * as React from 'react'
import { Modal, ModalControl } from '../../../Components/Modal/Modal'
import { Col } from '../../../Components/Layout/Col'
import { TextInput } from '../../../Components/Inputs/TextInput'
import { EmailTextInputValidator } from '../../../Components/Inputs/TextInputValidators'
import { Row } from '../../../Components/Layout/Row'
import { Button } from '../../../Components/Buttons/Button'
import { isEmail } from '../../../Utils/stringValidators'
import { FormEvent } from 'react'

interface SendEmployeeInvitationModalProps {
  button: JSX.Element
  customerId: string
}
interface SendEmployeeInvitationModalState {
  emailAddress: string
  role: 'manager' | 'employee'
  hasClickedSubmit: boolean
}
const initialState: SendEmployeeInvitationModalState = {
  emailAddress: '',
  role: 'employee',
  hasClickedSubmit: false,
}
const isValidState = (state: SendEmployeeInvitationModalState) =>
  isEmail(state.emailAddress)

export class SendEmployeeInvitationModal extends React.PureComponent<
  SendEmployeeInvitationModalProps,
  SendEmployeeInvitationModalState
> {
  modal: ModalControl | null
  constructor(props: SendEmployeeInvitationModalProps) {
    super(props)
    this.state = initialState
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(event: FormEvent<{}>) {
    event.preventDefault()
    this.setState(() => ({ hasClickedSubmit: true }))
  }
  render() {
    return (
      <Modal
        title="Senda starfsmanni boð"
        button={this.props.button}
        provideControl={ref => (this.modal = ref)}
      >
        <div className="SendEmployeeInvitationModal">
          <form noValidate onSubmit={this.onSubmit}>
            <Col spacing="Medium">
              <TextInput
                label="Email"
                value={this.state.emailAddress}
                onChange={emailAddress =>
                  this.setState(() => ({ emailAddress }))
                }
                validators={[EmailTextInputValidator]}
                hasClickedSubmit={this.state.hasClickedSubmit}
                type="email"
              />
              <Row spacing="Medium" justifyContent="End">
                <Button
                  color="Default"
                  onClick={() => {
                    this.setState(() => initialState)
                    if (this.modal) {
                      this.modal.closeModal()
                    }
                  }}
                >
                  Hætta við
                </Button>
                <Button
                  color="Primary"
                  lookLikeDisabled={!isValidState(this.state)}
                  type="submit"
                >
                  Vista
                </Button>
              </Row>
            </Col>
          </form>
        </div>
      </Modal>
    )
  }
}
