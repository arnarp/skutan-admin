import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'
import * as uuid from 'uuid'
import 'inert-polyfill'
import './Modal.css'

interface ModalProps {
  button: JSX.Element
  title: string
}

interface ModalState {
  open: boolean
}

export class Modal extends React.PureComponent<ModalProps, ModalState> {
  focusWhenOpened: HTMLButtonElement
  closeButton: HTMLButtonElement | null
  headingId: string
  portalContainer: HTMLElement | null
  constructor(props: ModalProps) {
    super(props)
    this.state = {
      open: false,
    }
    this.headingId = uuid()
    this.portalContainer = document.getElementById('modal-container')
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleOpen() {
    this.setState(
      () => ({ open: true }),
      () => {
        this.focusWhenOpened = document.activeElement as HTMLButtonElement
        setTimeout(() => {
          if (this.closeButton) {
            this.closeButton.focus()
          }
          // tslint:disable-next-line:no-any
          const root = document.getElementById('root') as any
          root.inert = true
        }, 30)
      },
    )
  }
  handleClose() {
    this.setState(() => ({ open: false }))
    this.focusWhenOpened.focus()
    // tslint:disable-next-line:no-any
    const root = document.getElementById('root') as any
    root.inert = false
  }
  render() {
    return (
      <div>
        {React.cloneElement(this.props.button, {
          onClick: this.handleOpen,
        })}
        {this.portalContainer !== null &&
          ReactDOM.createPortal(
            <Transition in={this.state.open} timeout={{ enter: 0, exit: 500 }}>
              {(state: 'entering' | 'entered' | 'exiting' | 'exited') => (
                <div className={`ModalContainer ${state}`}>
                  <div
                    className={`Backdrop ${state}`}
                    onClick={this.handleClose}
                  />
                  <div
                    className={`Modal ${state}`}
                    onKeyDown={event => {
                      if (event.key === 'Escape') {
                        this.handleClose()
                      }
                    }}
                  >
                    <header>
                      <h2 id={this.headingId}>{this.props.title}</h2>
                      <button
                        ref={ref => {
                          this.closeButton = ref
                        }}
                        onClick={this.handleClose}
                      >
                        Loka
                      </button>
                    </header>
                    <div className="ModalContent">{this.props.children}</div>
                  </div>
                </div>
              )}
            </Transition>,
            this.portalContainer,
          )}
      </div>
    )
  }
}
