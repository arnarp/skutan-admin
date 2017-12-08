import * as React from 'react'

interface TableProps {}
interface TableState {}
export class Table extends React.PureComponent<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props)
  }
  render() {
    return (
      <div className="TableContainer">
        <table className="Table">{this.props.children}</table>
      </div>
    )
  }
}
