export interface Customer {
  readonly id: string
  readonly name: string
  readonly kennitala: string
  readonly navisionId: string
  divisions: ReadonlyArray<CustomerDivision>
}
export interface CustomerDivision {
  readonly navisionId: string
  readonly name: string
  readonly address: string
}

export const enum EmployeeRole {
  Manager = 'manager',
  Employee = 'employee',
}

export interface CustomerInvitation {
  id: string
  customerId: string
  email: string
  expires: Date
  role: EmployeeRole
}
