import 'react-native-gesture-handler';
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
import ContentCalendar from './screens/ContentCalendar';
import TED from './screens/TED';
import MyBrand from './screens/MyBrand';
import MyProfile from './screens/MyProfile';
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CreateBrandForm from './components/CreateBrandForm';
import BrandAnimation from './components/BrandAnimation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
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
          user.emailVerified ? (
            <>
              <Stack.Screen name="App" component={AppTabs} />
              <Stack.Screen name="Create Brand" component={CreateBrandForm} />
              <Stack.Screen name="Brand Animation" component={BrandAnimation} />
            </>
          ) : (
            <>
              <Stack.Screen name="EmailVerification" component={EmailVerification} />
            </>
          )
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

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Content Calendar') {
            iconName = focused ? 'calendar' : 'calendar';
          } else if (route.name === 'TED') {
            iconName = focused ? 'comments' : 'comments';
          } else if (route.name === 'My Brand') {
            iconName = focused ? 'cube' : 'cube';
          } else if (route.name === 'My Profile') {
            iconName = focused ? 'user' : 'user';
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#4fd216',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Content Calendar" component={ContentCalendar} />
      <Tab.Screen name="TED" component={TED} />
      <Tab.Screen name="My Brand" component={MyBrand} />
      <Tab.Screen name="My Profile" component={MyProfile} />
    </Tab.Navigator>
  );
}