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
      // Iniciar o processo de login com o Google
      const signInAttempt = await signIn.create({
        strategy: 'oauth_google',
        redirectUrl:
          Platform.OS === 'web' ? window.location.origin : 'your-app-scheme://',
      })

      // Corrigir a verificação de status para evitar erro de tipagem
      if (signInAttempt?.status === 'needs_redirect') {
        // Implementação específica para abrir o URL de autenticação
        console.log('Redirecionando para autenticação Google...')
      }
    } catch (err) {
      console.error('Erro ao fazer login com Google:', err)
    }
  }, [isLoaded])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-8">
          <View className="mb-10 items-center">
            <Image
              source={Logo}
              className="w-32 h-32 mb-6"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-black mb-2">
              Bem-vindo
            </Text>
            <Text className="text-gray-600 text-center">
              Faça login para continuar
            </Text>
          </View>

          <View className="flex flex-col gap-4">
            <View className="rounded-lg px-4 py-4 border border-gray-200">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="text-black"
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
              <Text className="text-red-500 text-sm ml-1">
                {errors.email.message}
              </Text>
            )}

            <View className="rounded-lg px-4 py-4 border border-gray-200">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="text-black"
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
              <Text className="text-red-500 text-sm ml-1">
                {errors.password.message}
              </Text>
            )}

            <TouchableOpacity
              className={`rounded-lg py-4 ${isLoading ? 'bg-gray-600' : 'bg-black'}`}
              onPress={handleSubmit(onSignInPress)}
              disabled={isLoading}
            >
              <Text className="text-white font-semibold text-center">
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500">ou</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <TouchableOpacity
              className="flex-row justify-center items-center bg-white border border-gray-300 rounded-lg py-4"
              onPress={onGoogleSignInPress}
            >
              <Image
                source={GoogleLogo}
                style={{ width: 24, height: 24 }}
                className="mr-2"
              />
              <Text className="text-black font-semibold">
                Continuar com Google
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-10">
            <Text className="text-gray-600">Não tem uma conta? </Text>
            <Link href="/sign-up">
              <Text className="text-black font-semibold">Cadastre-se</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
