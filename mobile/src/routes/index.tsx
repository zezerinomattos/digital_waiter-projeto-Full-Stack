import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

// MY IMPORTS
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { AuthContext } from '../../src/contexts/AuthContext';

function Routes(){
    const { isAuthenticated, loadingAuth } = useContext(AuthContext);

    if(loadingAuth){
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