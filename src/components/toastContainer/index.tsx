import React from 'react'
import { useTransition } from 'react-spring'

import { Container } from './styles'

import Toast from './toast/indext'

import { toastProps } from '../../hooks/toastContext'

interface ToastContainerProps {
  toasts: toastProps[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const toastsWithTransition = useTransition(toasts, (toast) => toast.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' }
  })

  return (
    <Container>
      {toastsWithTransition.map(({ item, key, props }) => (
        <Toast key={key} style={props} toast={item} />
      ))}
    </Container>
  )
}

export default ToastContainer
