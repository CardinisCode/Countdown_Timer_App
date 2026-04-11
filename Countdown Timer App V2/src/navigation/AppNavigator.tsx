import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateTimerScreen } from '../screens/CreateTimerScreen';
import { TimerDetailScreen } from '../screens/TimerDetailScreen';
import { AddSegmentScreen } from '../screens/AddSegmentScreen';
import { RunningScreen } from '../screens/RunningScreen';
import { SegmentDoneScreen } from '../screens/SegmentDoneScreen';

export type RootStackParamList = {
  Home: undefined;
  CreateTimer: undefined;
  TimerDetail: { timerId: string };
  AddSegment: { timerId: string };
  Running: { timerId: string };
  SegmentDone: { timerId: string; segmentId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Timers' }} />
        <Stack.Screen name="CreateTimer" component={CreateTimerScreen} options={{ title: 'New Timer' }} />
        <Stack.Screen name="TimerDetail" component={TimerDetailScreen} options={{ title: 'Timer Detail' }} />
        <Stack.Screen name="AddSegment" component={AddSegmentScreen} options={{ title: 'Add Segment' }} />
        <Stack.Screen name="Running" component={RunningScreen} options={{ title: 'Running', headerBackVisible: false }} />
        <Stack.Screen name="SegmentDone" component={SegmentDoneScreen} options={{ title: 'Segment Done', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
