import React from 'react';
import { View, Text } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

// MY IMPORTS
import styles from './style';

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){
    const route = useRoute<OrderRouteProps>();

    return(
        <View>
            <Text>Order Aberta</Text>

            <Text>
                {route.params.order_id}
            </Text>
        </View>
    )
}