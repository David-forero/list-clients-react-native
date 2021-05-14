import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Inicio from './screens/inicio';
import NuevoCliente from './screens/NuevoCliente';
import DetallesCliente from './screens/DetallesCliente';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Barra from './components/ui/Barra';

const Stack = createStackNavigator();

//Definiendo el tema
const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#1774f2',
    accent: '#0655bf'
  }
}

export default function App() {
  return (
   <PaperProvider>
     <NavigationContainer>
       <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle:{
            backgroundColor: theme.colors.primary
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTitleAlign: 'center'
        }}
       >
         <Stack.Screen 
          name="Inicio"
          component={Inicio}
          options={({navigation, route}) => ({
            headerLeft: (props) => <Barra {...props} navigation={navigation} route={route} />
          })}
         />
  
        <Stack.Screen 
          name="NuevoCliente"
          component={NuevoCliente}
          options={{
            title: 'Nuevo Cliente'
          }}
         />
  
         <Stack.Screen 
          name="DetallesCliente"
          component={DetallesCliente}
          options={{
            title: 'Detalles Cliente'
          }}
         />
       </Stack.Navigator>
     </NavigationContainer>
   </PaperProvider>
  );
}
