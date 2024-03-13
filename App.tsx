import Animated, { useSharedValue, withTiming, useAnimatedStyle,Easing,} from "react-native-reanimated";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackComponent from './src/routes/stack';

export default function App() {
  return (
    <StackComponent />
   );
}

