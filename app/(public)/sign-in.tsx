import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import * as z from 'zod'

import styles from './sign-in.styles'

import GoogleLogo from '@/assets/images/google-logo.png'
import Logo from '@/assets/images/logo.png'
import { useAuth } from '@/contexts/AuthContext'

// Definir o esquema de validação com Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório' })
    .email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
})

// Tipo inferido do esquema
type LoginFormData = z.infer<typeof loginSchema>

export default function Page() {
  const router = useRouter()
  const { signIn, googleSignIn, isLoading } = useAuth()

  // Configurar React Hook Form com validação Zod
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Handle the submission of the sign-in form
  const onSignInPress = async (data: LoginFormData) => {
    try {
      const success = await signIn(data.email, data.password)

      if (success) {
        // Login bem-sucedido, o redirecionamento será tratado pelo AuthContext
        console.log('Login realizado com sucesso!')
      } else {
        // Tratar falha de login
        console.error('Falha na autenticação. Verifique suas credenciais.')
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err)
    }
  }

  const onGoogleSignInPress = async () => {
    try {
      const success = await googleSignIn()

      if (success) {
        // Login com Google bem-sucedido, o redirecionamento será tratado pelo AuthContext
        console.log('Login com Google realizado com sucesso!')
      } else {
        // Tratar falha de login com Google
        console.error('Falha na autenticação com Google.')
      }
    } catch (err) {
      console.error('Erro ao fazer login com Google:', err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    value={value}
                    placeholder="Email"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    placeholder="Senha"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={true}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit(onSignInPress)}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={onGoogleSignInPress}
              disabled={isLoading}
            >
              <Image source={GoogleLogo} style={styles.googleLogo} />
              <Text style={styles.googleButtonText}>Continuar com Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Não tem uma conta? </Text>
            <Link href="/sign-up">
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
