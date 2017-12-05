import * as React from 'react'
import * as uuid from 'uuid'
import * as firebase from 'firebase/app'
import './NewCustomerModal.css'
import { TextInput } from '../../../Components/Inputs/TextInput'
import {
  RequiredTextInputValidator,
  KennitalaTextInputValidator,
  OnlyDigitsTextInputValidator,
} from '../../../Components/Inputs/TextInputValidators'
import { Col } from '../../../Components/Layout/Col'
import { Row } from '../../../Components/Layout/Row'
import { AddIcon } from '../../../Components/Icons/AddIcon'
import { DeleteIcon } from '../../../Components/Icons/DeleteIcon'
import { IconButton } from '../../../Components/Buttons/IconButton'
import { Modal, ModalControl } from '../../../Components/Modal/Modal'
import { Button } from '../../../Components/Buttons/Button'
import { FormEvent } from 'react'
import { isKennitala, isOnlyDigits } from '../../../Utils/stringValidators'
import { Omit } from '../../../Utils/types'
import { Customer, CustomerDivision } from '../../../model'

interface NewCustomerModalProps {
  button: JSX.Element
}
interface NewCustomerModalState {
  name: string
  kennitala: string
  navisionId: string
  divisions: ReadonlyArray<{
    /** To use as key for react */
    tempId: string
    navisionId: string
    name: string
    address: string
  }>
  hasClickedSubmit: false
}
const initialState: NewCustomerModalState = {
  name: '',
  kennitala: '',
  navisionId: '',
  divisions: [
    {
      tempId: uuid(),
      navisionId: '',
      name: '',
      address: '',
    },
  ],
  hasClickedSubmit: false,
}

const isValidCustomer = (c: Omit<Customer, 'id'>) => {
  return (
    c.name !== '' &&
    isKennitala(c.kennitala) &&
    isOnlyDigits(c.navisionId) &&
    c.divisions.length >= 1 &&
    c.divisions.every(isValidCustomerDivision)
  )
}
const isValidCustomerDivision = (d: CustomerDivision) => {
  return d.name !== '' && isOnlyDigits(d.navisionId) && d.address !== ''
}

export class NewCustomerModal extends React.PureComponent<
  NewCustomerModalProps,
  NewCustomerModalState
> {
  modal: ModalControl | null
  constructor(props: NewCustomerModalProps) {
    super(props)
    this.state = initialState
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(event: FormEvent<{}>) {
    event.preventDefault()
    this.setState(() => ({ hasClickedSubmit: true }))
    if (isValidCustomer(this.state)) {
      const { name, kennitala, navisionId } = this.state
      const divisions = this.state.divisions.map(d => {
        const division = { ...d }
        delete division.tempId
        return division
      })
      if (this.modal) {
        this.modal.closeModal()
      }
      firebase
        .firestore()
        .collection('customers')
        .add({
          name,
          kennitala,
          navisionId,
          divisions,
        })
    }
  }
  render() {
    return (
      <Modal
        title="Stofna nýjan viðskiptavin"
        button={this.props.button}
        provideControl={ref => (this.modal = ref)}
      >
        <div className="NewCustomerModal">
          <form onSubmit={this.onSubmit}>
            <Col spacing="Medium">
              <TextInput
                label="Nafn"
                value={this.state.name}
                onChange={name => this.setState(() => ({ name }))}
                validators={[RequiredTextInputValidator]}
                hasClickedSubmit={this.state.hasClickedSubmit}
              />
              <TextInput
                label="Kennitala"
                value={this.state.kennitala}
                onChange={kennitala => this.setState(() => ({ kennitala }))}
                validators={[
                  RequiredTextInputValidator,
                  KennitalaTextInputValidator,
                ]}
                hasClickedSubmit={this.state.hasClickedSubmit}
              />
              <TextInput
                label="Navision Id"
                value={this.state.navisionId}
                onChange={navisionId => this.setState(() => ({ navisionId }))}
                validators={[
                  RequiredTextInputValidator,
                  OnlyDigitsTextInputValidator,
                ]}
                hasClickedSubmit={this.state.hasClickedSubmit}
              />
              <h3>Deildir</h3>
              <ol>
                {this.state.divisions.map((d, i) => (
                  <li key={d.tempId}>
                    <Row>
                      <Col
                        spacing="Medium"
                        className="DivisionsInputListItemForm"
                      >
                        <TextInput
                          label="Nafn deildar"
                          value={this.state.divisions[i].name}
                          onChange={name =>
                            this.setState(
                              (previousState: NewCustomerModalState) => {
                                const divisions = previousState.divisions.slice()
                                divisions[i] = { ...divisions[i], name }
                                return { divisions }
                              },
                            )
                          }
                          validators={[RequiredTextInputValidator]}
                          hasClickedSubmit={this.state.hasClickedSubmit}
                        />
                        <TextInput
                          label="Heimilisfang"
                          value={this.state.divisions[i].address}
                          onChange={address =>
                            this.setState(
                              (previousState: NewCustomerModalState) => {
                                const divisions = previousState.divisions.slice()
                                divisions[i] = { ...divisions[i], address }
                                return { divisions }
                              },
                            )
                          }
                          validators={[RequiredTextInputValidator]}
                          hasClickedSubmit={this.state.hasClickedSubmit}
                        />
                        <TextInput
                          label="Navision Id"
                          value={this.state.divisions[i].navisionId}
                          onChange={navisionId =>
                            this.setState(
                              (previousState: NewCustomerModalState) => {
                                const divisions = previousState.divisions.slice()
                                divisions[i] = { ...divisions[i], navisionId }
                                return { divisions }
                              },
                            )
                          }
                          validators={[
                            RequiredTextInputValidator,
                            OnlyDigitsTextInputValidator,
                          ]}
                          hasClickedSubmit={this.state.hasClickedSubmit}
                        />
                      </Col>
                      <Col
                        justifyContent="SpaceBetween"
                        className="DivisionsInputListItemButtons"
                      >
                        <IconButton
                          Icon={DeleteIcon}
                          onClick={() =>
                            this.setState(
                              (previousState: NewCustomerModalState) => {
                                const divisions = previousState.divisions.slice()
                                divisions.splice(i, 1)
                                return { divisions }
                              },
                            )
                          }
                          color="Error"
                          label="Eyða"
                          disabled={this.state.divisions.length === 1}
                        />
                        {i === this.state.divisions.length - 1 && (
                          <IconButton
                            Icon={AddIcon}
                            onClick={() =>
                              this.setState(
                                (previousState: NewCustomerModalState) => {
                                  const divisions = previousState.divisions.slice()
                                  divisions.push({
                                    tempId: uuid(),
                                    navisionId: '',
                                    name: '',
                                    address: '',
                                  })
                                  return { divisions }
                                },
                              )
                            }
                            color="Primary"
                            label="Bæta við"
                          />
                        )}
                      </Col>
                    </Row>
                  </li>
                ))}
              </ol>
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
                  lookLikeDisabled={!isValidCustomer(this.state)}
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
