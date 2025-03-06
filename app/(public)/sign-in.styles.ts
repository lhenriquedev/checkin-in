import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  formContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  inputContainer: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginLeft: 4,
    marginTop: -12,
    fontFamily: 'Inter-Medium',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    backgroundColor: 'black',
  },
  buttonDisabled: {
    backgroundColor: '#4B5563',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 16,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  googleButtonText: {
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  signupText: {
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  signupLink: {
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
})

export default styles
