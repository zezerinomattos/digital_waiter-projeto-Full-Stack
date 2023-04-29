import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D0D0D'
    },
    logo: {
        marginBottom: 18,
        width: 260,
        height: 60
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#FFF',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#121126'
    },
    button:{
        width: '95%',
        height: 40,
        backgroundColor: '#088C7F',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    },
    alertaText:{
        marginBottom: 12,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF3F4B'
    }


})

export default styles;