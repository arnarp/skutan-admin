import * as React from 'react'
import * as classNames from 'classnames'
import './Row.css'
import { ReactNode } from 'react'

interface RowProps {
  children: ReactNode
  spacing?: 'Medium'
  justifyContent?: 'Start' | 'End'
  wrap?: boolean
}

export const Row = (props: RowProps) => (
  <div
    className={classNames(
      'Row',
      props.spacing ? `Spacing-${props.spacing}` : '',
      {
        JustifyContentStart: props.justifyContent === 'Start',
        JustifyContentEnd: props.justifyContent === 'End',
        Wrap: props.wrap,
      },
    )}
  >
    {props.children}
  </div>
)
