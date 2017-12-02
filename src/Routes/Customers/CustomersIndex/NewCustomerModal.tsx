import * as React from 'react'
import * as uuid from 'uuid'
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

interface NewCustomerModalProps {}
interface NewCustomerModalState {
  name: string
  kennitala: string
  navisionId: string
  divisions: ReadonlyArray<{
    tempId: string
    navisionId: string
    name: string
    address: string
  }>
}
export class NewCustomerModal extends React.PureComponent<
  NewCustomerModalProps,
  NewCustomerModalState
> {
  constructor(props: NewCustomerModalProps) {
    super(props)
    this.state = {
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
    }
  }
  render() {
    return (
      <div className="NewCustomerModal">
        <h2>Stofna nýjan viðskiptavin</h2>
        <form>
          <Col spacing="Medium">
            <TextInput
              label="Nafn"
              value={this.state.name}
              onChange={name => this.setState(() => ({ name }))}
              validators={[RequiredTextInputValidator]}
            />
            <TextInput
              label="Kennitala"
              value={this.state.kennitala}
              onChange={kennitala => this.setState(() => ({ kennitala }))}
              validators={[
                RequiredTextInputValidator,
                KennitalaTextInputValidator,
              ]}
            />
            <TextInput
              label="Navision Id"
              value={this.state.navisionId}
              onChange={navisionId => this.setState(() => ({ navisionId }))}
              validators={[
                RequiredTextInputValidator,
                OnlyDigitsTextInputValidator,
              ]}
            />
          </Col>
          <h3>Deildir</h3>
          <ol>
            {this.state.divisions.map((d, i) => (
              <li key={d.tempId}>
                <Row>
                  <Col spacing="Medium" className="DivisionsInputListItemForm">
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
        </form>
      </div>
    )
  }
}
