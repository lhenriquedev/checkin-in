import { useRouter } from 'expo-router'
import * as React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

import { useAuth } from '@/contexts/AuthContext'

export default function SignUpScreen() {
  const router = useRouter()
  const { signUp, isLoading } = useAuth()

  const [name, setName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!emailAddress || !password || !name) {
      setError('Todos os campos são obrigatórios')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    try {
      const success = await signUp(emailAddress, password, name)

      if (success) {
        // Cadastro bem-sucedido, o redirecionamento será tratado pelo AuthContext
        console.log('Cadastro realizado com sucesso!')
      } else {
        setError('Falha ao criar conta. Tente novamente.')
      }
    } catch (err) {
      console.error('Erro ao cadastrar:', err)
      setError('Ocorreu um erro durante o cadastro')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        value={name}
        placeholder="Nome completo"
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(email) => setEmailAddress(email)}
      />

      <TextInput
        style={styles.input}
        value={password}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Button
        title={isLoading ? 'Criando conta...' : 'Criar Conta'}
        onPress={onSignUpPress}
        disabled={isLoading}
      />

      <Button
        title="Já tem uma conta? Faça login"
        onPress={() => router.replace('/(public)/sign-in')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
})
