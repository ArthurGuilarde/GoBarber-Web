import React, { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Container, AnimationContainer, Content, Background } from './styles'

import logo from '../../assets/logo.svg'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import Button from '../../components/button'
import Input from '../../components/input'
import getValidationErros from '../../utils/getValidationErros'

import { useAuth } from '../../hooks/authContext'
import { useToast } from '../../hooks/toastContext'

interface singInPropsForm {
  email: string
  password: string
}

export default function SignIn() {
  const formRef = useRef<FormHandles>(null)

  const { user, singIn } = useAuth()
  console.log(user)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: singInPropsForm) => {
      formRef.current?.setErrors({})

      try {
        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email(),
          password: Yup.string().required('Senha obrigatória')
        })

        await schema.validate(data, { abortEarly: false })

        await singIn({
          email: data.email,
          password: data.password
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const err = getValidationErros(error)
          formRef.current?.setErrors(err)
          return
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro no login!'
        })
      }
    },
    [singIn, addToast]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Missing Logo!" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Logon!</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="  Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot">Esqueci minha senha</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}
