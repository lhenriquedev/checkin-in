# React Native Mobile App with Expo Router and Modern Stack

A modern and feature-rich mobile application template built with React Native, leveraging the latest technologies for a robust development experience and excellent user interface.

## 🚀 Features

- **Modern Navigation**: File-based routing system with Expo Router v4
- **Authentication**: Secure authentication and user management with Clerk
- **Styling**:
  - TailwindCSS with NativeWind v4 for utility-first styling
  - Modern and responsive design
- **Type Safety**: Full TypeScript support for better development experience
- **UI Components**:
  - Bottom tabs navigation
  - Toast notifications with Sonner Native
  - Safe area handling
  - Expo Vector Icons
- **Development Experience**:
  - Hot reloading
  - Development client support
  - Expo's OTA updates
  - Built-in debugging tools

## 📱 Tech Stack

### Core

- [Expo](https://expo.dev/) (v52)
- [React Native](https://reactnative.dev/) (v0.76)
- [Expo Router](https://docs.expo.dev/routing/introduction/) (v4)
- [TypeScript](https://www.typescriptlang.org/)

### UI & Styling

- [NativeWind](https://www.nativewind.dev/) (v4)
- [TailwindCSS](https://tailwindcss.com/)
- [React Native Bottom Tabs](https://github.com/callstackincubator/react-native-bottom-tabs)
- [Sonner Native](https://github.com/sonner-native) - Toast notifications
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/)

### Authentication & Security

- [Clerk](https://clerk.com/)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Expo Crypto](https://docs.expo.dev/versions/latest/sdk/crypto/)

### Navigation & Gestures

- [@react-navigation/native](https://reactnavigation.org/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## 🛠️ Getting Started

1. Clone this repository

```bash
git clone <your-repository-url>
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Add your Clerk credentials and other required environment variables to the `.env` file.

4. Start the development server

```bash
npm start
# or
yarn start
```

## 📁 Project Structure

```
├── app/
│   ├── (auth)/        # Protected routes
│   ├── (public)/      # Public routes
│   └── _layout.tsx    # Root layout
├── components/        # Reusable components
├── constants/        # App constants and configuration
├── hooks/           # Custom React hooks
├── styles/          # Global styles and theme
├── utils/           # Utility functions
└── assets/          # Static assets (images, fonts)
```

## 🔐 Authentication Flow

The application uses Clerk for authentication with two main route groups:

- `(public)`: Routes accessible without authentication (sign-in, sign-up)
- `(auth)`: Protected routes that require user authentication

## 🎯 Key Features

- **File-based Routing**: Intuitive navigation with Expo Router
- **Authentication**: Complete auth flow with Clerk
- **Bottom Navigation**: Smooth tab navigation
- **Modern Styling**: TailwindCSS with NativeWind
- **Toast Notifications**: User feedback with Sonner Native
- **Type Safety**: Full TypeScript implementation
- **Environment Configuration**: Easy environment variable management
- **Organized Structure**: Clear and scalable project architecture

## 📱 Platform Support

- iOS
- Android
- Web (experimental)

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📫 Support

For support, email <your-email> or join our Slack channel.
