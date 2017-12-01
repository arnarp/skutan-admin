import * as React from 'react'
import * as cn from 'classnames'
import './Button.css'

type ButtonStyle = 'Raised' | 'Action'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  color: 'Default' | 'Primary' | 'Secondary'
  style?: ButtonStyle
}
interface ButtonState {}
export class Button extends React.PureComponent<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props)
  }
  render() {
    const style: ButtonStyle = this.props.style || 'Raised'
    return (
      <button
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        className={cn('Button', this.props.color, `Style-${style}`)}
      >
        {this.props.children}
      </button>
    )
  }
}
