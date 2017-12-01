import * as React from 'react'
import * as classNames from 'classnames'
import './icons.css'

interface AddIconProps {
  color?: 'Default' | 'White' | 'Primary' | 'Secondary'
  size?: 'Small' | 'Medium' | 'Large' | 'XLarge'
  className?: string
}

export const AddIcon = (props: AddIconProps) => (
  <svg
    shapeRendering="crispEdges"
    className={classNames(
      'Svg',
      `Fill-${props.color}`,
      `Size-${props.size}`,
      props.className,
    )}
    viewBox="0 0 24 24"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)
