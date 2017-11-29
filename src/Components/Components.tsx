import * as React from 'react'
import { Button } from './Buttons/Button'
import { Row } from './Layout/Row'

export const Components = () => (
  <div>
    <h1>Íhlutir</h1>
    <h2>Buttons</h2>
    <Row spacing="md">
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
    </Row>
  </div>
)
