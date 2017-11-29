import * as React from 'react'
import * as classNames from 'classnames'
import './Row.css'

interface RowProps {
  children: JSX.Element[]
  spacing?: 'md'
}

export const Row = (props: RowProps) => (
  <div
    className={classNames(
      'Row',
      props.spacing ? `Spacing-${props.spacing}` : '',
    )}
  >
    {props.children}
  </div>
)
