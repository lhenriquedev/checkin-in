import { useRouter, useSegments } from 'expo-router'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

// Definindo o tipo de usuário
interface User {
  id: string
  email: string
  name: string
  // Adicione outros campos conforme necessário
}

// Definindo o tipo do contexto de autenticação
interface AuthContextType {
  user: User | null
  isLoading: boolean
  isSignedIn: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signOut: () => Promise<void>
  googleSignIn: () => Promise<boolean>
}

// Criando o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props para o provedor de autenticação
interface AuthProviderProps {
  children: ReactNode
}

// Provedor de autenticação
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const segments = useSegments()

  // Redirecionar o usuário com base no estado de autenticação
  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'
    const inPublicGroup = segments[0] === '(public)'

    if (user && !inAuthGroup) {
      // Se o usuário está autenticado mas não está na área autenticada
      router.replace('/(auth)/(tabs)/home')
    } else if (!user && !inPublicGroup) {
      // Se o usuário não está autenticado e não está na área pública
      router.replace('/(public)/sign-in')
    }
  }, [user, segments])

  // Função para fazer login
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Por enquanto, apenas simular um login bem-sucedido
      // No futuro, isso seria substituído por uma chamada real à API
      const mockUser: User = {
        id: '1',
        email,
        name: 'Usuário Teste',
      }

      // Salvar o usuário no estado
      setUser(mockUser)

      return true
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Função para registrar um novo usuário
  const signUp = async (
    email: string,
    password: string,
    name: string,
  ): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Por enquanto, apenas simular um registro bem-sucedido
      // No futuro, isso seria substituído por uma chamada real à API
      const mockUser: User = {
        id: '1',
        email,
        name,
      }

      // Salvar o usuário no estado
      setUser(mockUser)

      return true
    } catch (error) {
      console.error('Erro ao registrar:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Função para fazer logout
  const signOut = async (): Promise<void> => {
    setIsLoading(true)

    try {
      // Limpar o usuário do estado
      setUser(null)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para login com Google
  const googleSignIn = async (): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Por enquanto, apenas simular um login bem-sucedido
      // No futuro, isso seria substituído por uma integração real com o Google
      const mockUser: User = {
        id: '2',
        email: 'usuario.google@example.com',
        name: 'Usuário Google',
      }

      // Salvar o usuário no estado
      setUser(mockUser)

      return true
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Valor do contexto
  const value: AuthContextType = {
    user,
    isLoading,
    isSignedIn: !!user,
    signIn,
    signUp,
    signOut,
    googleSignIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar o contexto de autenticação
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
