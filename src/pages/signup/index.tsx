import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, AnimationContainer, Content, Background } from './styles'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import logo from '../../assets/logo.svg'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'

import getValidationErros from '../../utils/getValidationErros'

import Button from '../../components/button'
import Input from '../../components/input'

import { useToast } from '../../hooks/toastContext'

import api from '../../service/api'

export default function SignUp() {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: object, { reset }) => {
      formRef.current?.setErrors({})
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('Email obrigatório').email(),
          password: Yup.string().min(6, 'Mínimo 6 digitos')
        })

        await schema.validate(data, { abortEarly: false })
        formRef.current?.reset()

        await api.post('/users', data)

        history.push('/')

        addToast({
          title: 'Cadastrado!',
          description: 'Você já pode fazer o Logon!',
          type: 'success'
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const err = getValidationErros(error)
          formRef.current?.setErrors(err)
          return
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro no Cadastro!'
        })
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Missing Logo!" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="  Nome" />
            <Input name="email" icon={FiMail} placeholder="  E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="  Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para o Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}
