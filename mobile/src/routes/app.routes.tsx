import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

// MY IMPORTS
import DashBoard from '../pages/DashBoard';

const Stack = createNativeStackNavigator();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='DashBoard' component={DashBoard}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;