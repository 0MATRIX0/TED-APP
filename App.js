import React, { useRef, useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import Home from './screens/Home';
import Account from './screens/Account';
import Login from './screens/Login';
import Main from './screens/Main';
import SignUp from './screens/SignUp';
import Loading from './screens/Loading';
import OnboardingTwo from './screens/OnboardingTwo';
import OnboardingThree from './screens/OnboardingThree';
// Import icons
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import EmailVerification from './screens/EmailVerification';
import ForgotPassword from './screens/ForgotPassword';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
}

function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';
        } else if (route.name === 'Account') {
          iconName = focused ? 'ios-person' : 'ios-person-outline';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="Account" component={Account} />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null)
  const navigationRef = useRef();

  useEffect(() => {
    const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    return subscriber; // Don't forget to return the unsubscribe function to avoid memory leaks
  }, []);

  console.log(user)

  const [loaded] = useFonts({
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf'),
  })

  if (!loaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          user.emailVerified ?
            (<><Stack.Screen name="App" component={Home} /></>) : (<><Stack.Screen name="EmailVerification" component={EmailVerification} /></>)
        ) : (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
            <Stack.Screen name="OnboardingThree" component={OnboardingThree} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}