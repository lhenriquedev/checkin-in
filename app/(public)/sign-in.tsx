import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'
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
import { toast } from 'sonner-native'
import * as z from 'zod'

import styles from './sign-in.styles'

import GoogleLogo from '@/assets/images/google-logo.png'
import Logo from '@/assets/images/logo.png'

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
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

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
    if (!isLoaded) return

    setIsLoading(true)

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        // toast.success('Login realizado com sucesso!')
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(auth)/home')
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) {
        toast.error('Falha na autenticação. Verifique suas credenciais.')
      }
      // console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const onGoogleSignInPress = React.useCallback(async () => {
    if (!isLoaded) return

    try {
      // Iniciar o processo de login com o Google usando Clerk
      await signIn.create({
        strategy: 'oauth_google',
        redirectUrl:
          Platform.OS === 'web' ? window.location.origin : 'your-app-scheme://',
      })

      // For a complete implementation, you would need to handle the redirect
      // flow using Linking API on mobile platforms or window.location on web
      console.log('Iniciando autenticação Google...')

      // Note: The complete implementation would include handling the redirect
      // and callback from Google OAuth, but that's outside the scope of this edit
    } catch (err) {
      console.error('Erro ao fazer login com Google:', err)
    }
  }, [isLoaded])

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
