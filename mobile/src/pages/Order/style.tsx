import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#0D0D0D',
        paddingVertical: '5%',
        paddingHorizontal: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        marginTop: 24,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14
    },
    input:{
        backgroundColor: '#383737',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20
    },
    qtdContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qtdText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        height: 40,
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#121126',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        width: '75%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default styles;