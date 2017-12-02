import * as React from 'react'
import './Button.css'
import * as classNames from 'classnames'

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
        type="button"
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        className={classNames('Button', this.props.color, `Style-${style}`)}
      >
        {this.props.children}
      </button>
    )
  }
}
