import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

// MY IMPORTS
import styles from './style';

import { api } from '../../service/api';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

export type ProductProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string;
}


type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [product, setProduct] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1');

    const [itens, setItens] = useState<ItemProps[] | []>([])

    useEffect(() => {

        loadingCategory();
        
    }, []);

    useEffect(() =>{

        async function loadProduct(){
            await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })
            .then((response) => {
                setProduct(response.data);
                setProductSelected(response.data[0]);
            })
        }

        loadProduct();

    }, [categorySelected])

    // FUNÇÃO DE DELETAR UMA ORDER ABERTA
    async function handleCloseOrder(){
        try {           
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })
            navigation.goBack();

        } catch (error) {
            console.log('ops: ' + error);
        }
    }

    // FUNÇÃO DE LISTAGEM DE CATEGORIA
    async function loadingCategory(){
        await api.get('/category').then(response =>{
            
            setCategory(response.data);
            setCategorySelected(response.data[0]);
        })
        .catch(err =>{
            console.log('Erro:' + err);
        });
    }

    // FUNÇÃO PARA PASSAR CATEGORIA SELECIONADO
    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item);
    }

    // FUNÇÃO PARA PASSAR PRODUTO SELECIONADO
    function handleChangeProduct(item: ProductProps){
        setProductSelected(item);
    }

    // FUNÇÃO PARA ADICIONAR ITEM SELECIONADO
    function handleAdd(){
        alert('clicou');
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' size={25} color={'#FF3F4B'}/>
                </TouchableOpacity>
            </View>

           {
                category.length !== 0 && (
                    <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                        <Text style={{ color: '#FFF' }}>{categorySelected?.name}</Text>
                    </TouchableOpacity>
                )
           }

            {
                product.length !== 0 && (
                    <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                        <Text style={{ color: '#FFF' }}>{productSelected?.name}</Text>
                    </TouchableOpacity>
                )
            }

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade:</Text>
                <TextInput style={[styles.input, {width: '60%', textAlign: 'center'}]}
                    placeholderTextColor={'#F0F0F0'} keyboardType='numeric'
                    value={amount} onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, {opacity: itens.length === 0 ? 0.3 : 1}]}
                    disabled={itens.length === 0}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

            </View>

            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={itens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item}/>}
            />

            <Modal transparent={true} visible={modalCategoryVisible} animationType='fade'>
                <ModalPicker 
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options= {category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal transparent={true} visible={modalProductVisible} animationType='fade'>
                <ModalPicker 
                    handleCloseModal={() => setModalProductVisible(false)}
                    options= {product}
                    selectedItem={handleChangeProduct}
                />
            </Modal>
            
        </View>
    )
}