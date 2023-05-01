import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

// MY IMPORTS
import DashBoard from '../pages/DashBoard';
import Order from '../pages/Order';

export type StackParmList = {
    DashBoard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
}

const Stack = createNativeStackNavigator<StackParmList>();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='DashBoard' component={DashBoard} options={{ headerShown: false }}/>

            <Stack.Screen name='Order' component={Order} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;