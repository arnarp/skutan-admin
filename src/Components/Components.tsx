import * as React from 'react'
import { Button } from './Buttons/Button'
import { Row } from './Layout/Row'
import { AddIcon } from './Icons/AddIcon'
import { TextInput } from './Inputs/TextInput'
import { Grid } from './Layout/Grid'
import { RequiredTextInputValidator } from './Inputs/TextInputValidators'
import { IconButton } from './Buttons/IconButton'
import { DeleteIcon } from './Icons/DeleteIcon'
import { HamburgerMenuIcon } from './Icons/HamburgerMenuIcon'
import { CloseIcon } from './Icons/CloseIcon'
import { RadioGroup } from './Inputs/RadioGroup'
import { EmployeeRole } from '../model'
import { Table } from './Table'
import { Thead } from './Table/Thead'

const EmployeeRoleRadioGroup = RadioGroup as {
  new (): RadioGroup<EmployeeRole>
}

export class Components extends React.PureComponent<
  {},
  {
    textInput1: string
    textInput2: string
    radio1: EmployeeRole
  }
> {
  constructor(props: {}) {
    super(props)
    this.state = {
      textInput1: '',
      textInput2: '',
      radio1: EmployeeRole.Employee,
    }
  }
  render() {
    return (
      <div>
        <h1>Íhlutir</h1>
        <h2>Buttons</h2>
        <h3>Button, Style: Raised (default)</h3>
        <Grid gap="Medium" numberOfColums={2}>
          <Button color="Default" onClick={() => ({})}>
            Default
          </Button>
          <Button color="Default" disabled onClick={() => ({})}>
            Default disabled
          </Button>
          <Button color="Primary" onClick={() => ({})}>
            Primary
          </Button>
          <Button color="Primary" disabled onClick={() => ({})}>
            Primary disabled
          </Button>
          <Button color="Secondary" onClick={() => ({})}>
            Secondary
          </Button>
          <Button color="Secondary" disabled onClick={() => ({})}>
            Secondary disabled
          </Button>
        </Grid>
        <h3>Button, Style: Action</h3>
        <Row spacing="Medium" wrap>
          <Button style="Action" color="Default" onClick={() => ({})}>
            <AddIcon color="White" size="Large" />
          </Button>
          <Button style="Action" color="Primary" onClick={() => ({})}>
            <AddIcon color="White" size="Large" />
          </Button>
          <Button style="Action" color="Secondary" onClick={() => ({})}>
            <AddIcon color="White" size="Large" />
          </Button>
        </Row>
        <h3>Button, Style: Flat</h3>
        <Grid gap="Medium" numberOfColums={4}>
          <Button color="Default" style="Flat">
            Default
          </Button>
          <Button color="Default" style="Flat" disabled>
            Disbled
          </Button>
          <Button color="Primary" style="Flat">
            Primary
          </Button>
          <Button color="Primary" style="Flat" disabled>
            Disbled
          </Button>
          <Button color="Secondary" style="Flat">
            Secondary
          </Button>
          <Button color="Secondary" style="Flat" disabled>
            Disbled
          </Button>
        </Grid>
        <h3>IconButton</h3>
        <Row spacing="Medium">
          <IconButton
            Icon={AddIcon}
            onClick={() => ({})}
            color="Primary"
            label="Bæta við"
          />
          <IconButton
            Icon={AddIcon}
            onClick={() => ({})}
            color="Primary"
            label="Bæta við"
            disabled={true}
          />
          <IconButton
            Icon={HamburgerMenuIcon}
            onClick={() => ({})}
            color="Default"
            label="Menu"
          />
          <IconButton
            disabled={true}
            Icon={HamburgerMenuIcon}
            onClick={() => ({})}
            color="Default"
            label="Bæta við"
          />
          <IconButton
            Icon={DeleteIcon}
            onClick={() => ({})}
            color="Error"
            label="Eyða"
          />
          <IconButton
            Icon={DeleteIcon}
            onClick={() => ({})}
            color="Error"
            label="Eyða"
            disabled={true}
          />
        </Row>
        <h2>Icons</h2>
        <Grid gap="Medium" numberOfColums={8}>
          <AddIcon color="Primary" size="Small" />
          <AddIcon color="Primary" size="Medium" />
          <AddIcon color="Primary" size="Large" />
          <AddIcon color="Primary" size="XLarge" />
          <DeleteIcon color="Error" size="Small" />
          <DeleteIcon color="Error" size="Medium" />
          <DeleteIcon color="Error" size="Large" />
          <DeleteIcon color="Error" size="XLarge" />
          <HamburgerMenuIcon color="Default" size="Small" />
          <HamburgerMenuIcon color="Default" size="Medium" />
          <HamburgerMenuIcon color="Default" size="Large" />
          <HamburgerMenuIcon color="Default" size="XLarge" />
          <CloseIcon color="Secondary" size="Small" />
          <CloseIcon color="Secondary" size="Medium" />
          <CloseIcon color="Secondary" size="Large" />
          <CloseIcon color="Secondary" size="XLarge" />
        </Grid>
        <h2>Inputs</h2>
        <h3>TextInput</h3>
        <Row spacing="Medium">
          <TextInput
            label="Aðeins bókstafir"
            value={this.state.textInput1}
            onChange={textInput1 => {
              this.setState({ textInput1 })
            }}
            validators={[
              value => {
                if (/.*\d.*/.test(value)) {
                  return 'Tölustafir ekki leyfðir'
                }
                return null
              },
              value =>
                value.length > 5 ? 'Má ekki vera lengra en 5 stafir' : null,
            ]}
          />
          <TextInput
            label="Ekki tómt"
            value={this.state.textInput2}
            onChange={textInput2 => {
              this.setState({ textInput2 })
            }}
            validators={[RequiredTextInputValidator]}
          />
        </Row>
        <h3>RadioGroup</h3>
        <EmployeeRoleRadioGroup
          legend="Hlutverk"
          options={[
            { value: EmployeeRole.Employee, label: 'Starfsmaður' },
            { value: EmployeeRole.Manager, label: 'Umsjónarmaður' },
          ]}
          value={this.state.radio1}
          onChange={value => this.setState(() => ({ radio1: value }))}
        />
        <h2>Table</h2>
        <Table>
          <Thead>
            <tr>
              <th>Dálkur 1</th>
              <th>D2</th>
              <th>D3</th>
              <th>D4</th>
            </tr>
          </Thead>
          <tbody>
            <tr>
              <td>Data1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 4</td>
            </tr>
            <tr>
              <td>Data1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 4</td>
            </tr>
            <tr>
              <td>Data1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 4</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
