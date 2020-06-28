import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...rest }: ButtonProps) {
  return <Container {...rest}>{children}</Container>
}
