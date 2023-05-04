import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

// MY IMPORTS
import DashBoard from '../pages/DashBoard';
import Order from '../pages/Order';
import FinishOrder from '../pages/FinishOrder';

export type StackParmList = {
    DashBoard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
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

            <Stack.Screen name='FinishOrder' component={FinishOrder}
                options={{
                    title: 'Finalizando',
                    headerStyle:{
                        backgroundColor: '#0D0D0D',
                    },
                    headerTintColor: '#FFF'
                }}
            />
        </Stack.Navigator>
    )
}

export default AppRoutes;