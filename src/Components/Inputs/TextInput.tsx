import * as React from 'react'
import * as uuid from 'uuid'
import './TextInput.css'
import * as classNames from 'classnames'

interface TextInputProps {
  label: string
  value: string
  onChange: (name: string) => void
  error: (value: string) => null | string
}
interface TextInputState {
  focus: boolean
  hasReceivedFocus: boolean
  hasChangedInput: boolean
}
export class TextInput extends React.PureComponent<
  TextInputProps,
  TextInputState
> {
  id: string
  constructor(props: TextInputProps) {
    super(props)
    this.id = uuid()
    this.state = {
      focus: false,
      hasReceivedFocus: false,
      hasChangedInput: false,
    }
  }
  render() {
    const errorMsg = this.props.error(this.props.value)
    const showErrorMessage: boolean | null | undefined =
      errorMsg !== null &&
      this.state.hasReceivedFocus &&
      this.state.hasChangedInput

    return (
      <div
        className={classNames('TextInput', {
          Focus: this.state.focus,
          NotEmpty: this.props.value !== '',
          Error: showErrorMessage,
        })}
      >
        <label htmlFor={this.id}>{this.props.label}</label>
        <div>
          <input
            onFocus={() =>
              this.setState(() => ({ focus: true, hasReceivedFocus: true }))
            }
            onBlur={() => this.setState(() => ({ focus: false }))}
            value={this.props.value}
            onChange={event => {
              this.setState(() => ({ hasChangedInput: true }))
              this.props.onChange(event.target.value)
            }}
          />
        </div>
        {showErrorMessage && <p className="ErrorMessage">{errorMsg}</p>}
      </div>
    )
  }
}
