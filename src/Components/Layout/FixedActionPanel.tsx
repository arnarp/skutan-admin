import * as React from 'react'
import './FixedActionPanel.css'
import { Row } from './Row'

interface FixedActionPanelProps {
  children: React.ReactNode
}

export const FixedActionPanel = (props: FixedActionPanelProps) => (
  <div className="FixedActionPanel">
    <Row spacing="Medium" justifyContent="End">
      {props.children}
    </Row>
  </div>
)
