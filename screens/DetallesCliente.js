import React, {useEffect, useState} from 'react'
import { StyleSheet, View } from 'react-native';
import firebase from '../database/firebase';
import globalStyles from '../styles/global';
import {TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import { ActivityIndicator, Alert } from 'react-native';

const DetallesCliente = ({route, navigation}) => {
    const [cliente, setCliente] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        empresa: ""
    });
    const [loading, setLoading] = useState(true)

    const getClientsById = async id => {
        const dbRef = firebase.db.collection('clientes').doc(id);
        const doc = await dbRef.get();
        const cliente = doc.data();
        // console.log(cliente);
        setCliente({
            ...cliente,
            id: doc.id
        });
        setLoading(false);
    }

    useEffect(() => {
        getClientsById(route.params.clientId);
    }, []);

    const [alerta, setAlerta] = useState(false);

   if (loading) {
       return (
           <View style={styles.bigLoading}>
               <ActivityIndicator size="large" color="#9e9e9e" />
           </View>
       )
   }

   const deleteClient = async () => {
       const dbRef = firebase.db.collection('clientes').doc(route.params.clientId);
       await dbRef.delete();
       navigation.navigate('Inicio');
   }

   const confirmAlert = () => {
        Alert.alert('Eliminar el cliente', '¿Estás seguro?', [
            {text: 'Si', onPress: () => deleteClient()},
            {text: 'No', onPress: () => console.log('Canelado')}
        ]);
        
   }

   const updateClient = async () =>{
    const dbRef = firebase.db.collection('clientes').doc(cliente.id)
    await dbRef.set({
        nombre: cliente.nombre,
        correo: cliente.correo,
        telefono: cliente.telefono,
        empresa: cliente.empresa
    })
    navigation.navigate('Inicio');
    setCliente({})
   }

    const handleChangeText = (name, value) =>{
        setCliente({ ...cliente, [name]: value})
    }

    return (
        <View style={globalStyles.contenedor} >
        <Headline style={globalStyles.titulo} >Actualizar Datos</Headline>

        <TextInput
            style={styles.input}
            label="Nombre"
            value={cliente.nombre}
            placeholder="Escriba el nombre"
            onChangeText={(value) => handleChangeText('nombre', value)}
            
        />
        <TextInput
            style={styles.input}
            label="Teléfono"
            placeholder="042342342"
            onChangeText={(value) => handleChangeText('telefono', value)}
            value={cliente.telefono}
        />
        <TextInput
            style={styles.input}
            label="Correo"
            placeholder="example@gmail.com"
            onChangeText={(value) => handleChangeText('correo', value)}
            value={cliente.correo}
        />
        <TextInput
            style={styles.input}
            label="Empresa"
            placeholder="Escriba de la Empresa"
            onChangeText={(value) => handleChangeText('empresa', value)}
            value={cliente.empresa}
        />

        <Button
            mode="contained"
            color="#19ac52"
            style={styles.btn}
            onPress={() => updateClient()}
        >
            Actualizar Cliente
        </Button>

        <Button
            mode="contained"
            color="#e37399"
            style={styles.btn}
            onPress={() => confirmAlert()}
        >
            Eliminar
        </Button>

        <Portal>
            <Dialog
                visible={alerta}
                onDismiss={() => setAlerta(false)}
            >
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Todos los campos son obligatorios</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={() => setAlerta(false)}
                    >Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </View>
    )
}

export default DetallesCliente

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    },
    btn: {
        marginBottom: 10,
        paddingHorizontal: 4,
        paddingVertical: 8
    },
    bigLoading:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
})
