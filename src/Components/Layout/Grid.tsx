import * as React from 'react'
import './Grid.css'
import * as classNames from 'classnames'

interface GridProps {
  children: React.ReactNode
  gap?: 'Medium'
  numberOfColums?: number
}

export const Grid = (props: GridProps) => (
  <div
    style={{
      gridTemplateColumns: props.numberOfColums
        ? `repeat(${props.numberOfColums}, 1fr)`
        : undefined,
    }}
    className={classNames('Grid', `Gap-${props.gap}`)}
  >
    {props.children}
  </div>
)
