import * as React from 'react'
import { ModalControl, Modal } from '../../Components/Modal/Modal'
import { LoadingSpinner } from '../../Components/LoadingSpinner/index'
import { Row } from '../../Components/Layout/Row'
import { Button } from '../../Components/Buttons/Button'
import { isSame } from '../../Utils/isSame'
import { getFirestore } from '../../firebase'
import { UserRecord, UserClaims } from '../../model'

interface EditUserModalProps {
  readonly user: UserRecord
  readonly userClaims: UserClaims
}
interface EditUserModalState {
  claims: UserClaims
  saving: boolean
  // tslint:disable-next-line:no-any
  savingError: any
}
export class EditUserModal extends React.PureComponent<
  EditUserModalProps,
  EditUserModalState
> {
  modal: ModalControl | null
  constructor(props: EditUserModalProps) {
    super(props)
    this.state = {
      claims: { ...props.userClaims },
      saving: false,
      savingError: undefined,
    }
    this.onSave = this.onSave.bind(this)
  }
  onSave() {
    this.setState(() => ({
      saving: true,
    }))
    getFirestore().then(firestore => {
      firestore
        .collection('userClaims')
        .doc(this.props.user.uid)
        .update(this.state.claims)
        .then(() => {
          this.setState(() => ({ saving: false }))
          if (this.modal) {
            this.modal.closeModal()
          }
        })
        .catch(error => this.setState(() => ({ savingError: error })))
    })
  }
  render() {
    return (
      <Modal
        title="Breyta notanda"
        button={<button>Breyta</button>}
        provideControl={ref => (this.modal = ref)}
      >
        <div className="EditUserModal">
          <h3>{this.props.user.displayName}</h3>
          <div className="Content">
            {!this.state.saving &&
              !this.state.savingError && (
                <label>
                  Admin
                  <input
                    type="checkbox"
                    checked={this.state.claims.isAdmin}
                    onChange={ev => {
                      this.setState(prevState => ({
                        claims: {
                          ...prevState.claims,
                          isAdmin: !prevState.claims.isAdmin,
                        },
                      }))
                    }}
                  />
                </label>
              )}
            {this.state.saving && <LoadingSpinner />}
            {!this.state.saving &&
              this.state.savingError && <p>Villa kom upp við að vista</p>}
          </div>
          <Row spacing="Medium" justifyContent="End">
            <Button
              color="Default"
              onClick={() => {
                if (this.modal) {
                  this.modal.closeModal()
                }
              }}
            >
              Hætta við
            </Button>
            <Button
              color="Primary"
              disabled={isSame(this.props.userClaims, this.state.claims)}
              onClick={this.onSave}
            >
              Vista
            </Button>
          </Row>
        </div>
      </Modal>
    )
  }
}
