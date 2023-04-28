import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// MY IMPORTS
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes(){
    const isAuthenticated = false;
    const loading = false;

    if(loading){
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor:'#F5f7fb',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size={60} color={'#F2CB05'}/>
            </View>
        )
    }

    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;