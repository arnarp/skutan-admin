import * as React from 'react'
import { Button } from './Buttons/Button'
import { Row } from './Layout/Row'
import { AddIcon } from './Icons/AddIcon'
import { TextInput } from './Inputs/TextInput'

export class Components extends React.PureComponent<
  {},
  {
    textInput1: string
    textInput2: string
  }
> {
  constructor(props: {}) {
    super(props)
    this.state = {
      textInput1: '',
      textInput2: '',
    }
  }
  render() {
    return (
      <div>
        <h1>Íhlutir</h1>
        <h2>Buttons</h2>
        <h3>Style: Raised (default)</h3>
        <Row spacing="Medium" wrap={true}>
          <Button color="Default" onClick={() => ({})}>
            Default
          </Button>
          <Button color="Default" disabled={true} onClick={() => ({})}>
            Default disabled
          </Button>
          <Button color="Primary" onClick={() => ({})}>
            Primary
          </Button>
          <Button color="Primary" disabled={true} onClick={() => ({})}>
            Primary disabled
          </Button>
          <Button color="Secondary" onClick={() => ({})}>
            Secondary
          </Button>
          <Button color="Secondary" disabled={true} onClick={() => ({})}>
            Secondary disabled
          </Button>
        </Row>
        <h3>Style: Action</h3>
        <Row spacing="Medium" wrap={true}>
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
        <h2>Icons</h2>
        <Row spacing="Medium">
          <AddIcon color="Primary" size="Large" />
        </Row>
        <h2>Inputs</h2>
        <h3>TextInput</h3>
        <Row spacing="Medium">
          <TextInput
            label="Aðeins bókstafir"
            value={this.state.textInput1}
            onChange={textInput1 => {
              this.setState({ textInput1 })
            }}
            error={value => {
              if (/.*\d.*/.test(value)) {
                return 'Tölustafir ekki leyfðir'
              }
              return null
            }}
          />
          <TextInput
            label="Ekki tómt"
            value={this.state.textInput2}
            onChange={textInput2 => {
              this.setState({ textInput2 })
            }}
            error={value => {
              if (value === '') {
                return 'Má ekki vera tómt'
              }
              return null
            }}
          />
        </Row>
        <h2>....</h2>
      </div>
    )
  }
}
