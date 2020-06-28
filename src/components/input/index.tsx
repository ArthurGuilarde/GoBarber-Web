import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  useState
} from 'react'
import { useField } from '@unform/core'
import { Container, Error } from './styles'

import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

export default function Input({ name, icon: Icon, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  const [isFocus, setIsFocus] = useState(false)
  const [isField, setIsField] = useState(false)

  const handleFocus = useCallback(() => {
    setIsFocus(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocus(false)
    setIsField(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container isErrored={!!error} isFocus={isFocus} isField={isField}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  )
}
