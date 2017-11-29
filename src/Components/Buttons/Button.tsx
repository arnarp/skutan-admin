import * as React from 'react'
import * as cn from 'classnames'
import './Button.css'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  color: 'Default' | 'Primary'
}
interface ButtonState {}
export class Button extends React.PureComponent<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props)
  }
  render() {
    return (
      <button
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        className={cn('Button', this.props.color)}
      >
        {this.props.children}
      </button>
    )
  }
}
