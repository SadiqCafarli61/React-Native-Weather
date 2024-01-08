import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/Home';

const Stack = createStackNavigator();

export const  Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home"  component={Home} options={{
        headerTitle: 'Home'
      }} />
    
    </Stack.Navigator>
  );
}