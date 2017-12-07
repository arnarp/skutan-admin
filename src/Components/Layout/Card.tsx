import * as React from 'react'
import './Card.css'

interface CardProps {
  children: React.ReactNode
}

export const Card = (props: CardProps) => (
  <div className="Card">{props.children}</div>
)

export const CardContent = (props: CardProps) => (
  <div className="CardContent">{props.children}</div>
)
