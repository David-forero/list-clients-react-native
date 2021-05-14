import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import {TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import firebase from '../database/firebase';

const NuevoCliente = ({navigation}) => {
    const [cliente, setCliente] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        empresa: ""
    })  
    const [alerta, setAlerta] = useState(false);

    //almacenar
    const guardarCliente = async () =>{
        if (cliente.nombre === '' || cliente.telefono === '' || cliente.correo === '' || cliente.empresa === '') {
            return setAlerta(true);
        }

        try {
            // if (Platform.OS === 'ios') {
            //      //IOS
            //     await axios.post('http://localhost:3000/clientes', cliente);
            // }else{
            //        //Android
            //     await axios.post('http://10.0.2.2:3000/clientes', cliente)
            // }
            await firebase.db.collection('clientes').add({
                nombre: cliente.nombre,
                correo: cliente.correo,
                telefono: cliente.telefono,
                empresa: cliente.empresa
            })
           
        } catch (error) {
            console.error();
        }

        navigation.navigate('Inicio');
        setCliente({})
    }

    const handleChangeText = (name, value) =>{
        setCliente({ ...cliente, [name]: value})
    }

    return (
        <View style={globalStyles.contenedor} >
            <Headline style={globalStyles.titulo} >Nuevo Cliente</Headline>

            <TextInput
                style={styles.input}
                label="Nombre"
                placeholder="Escriba el nombre"
                onChangeText={(value) => handleChangeText('nombre', value)}
                
            />
            <TextInput
                style={styles.input}
                label="Teléfono"
                placeholder="042342342"
                onChangeText={(value) => handleChangeText('telefono', value)}
            
            />
            <TextInput
                style={styles.input}
                label="Correo"
                placeholder="example@gmail.com"
                onChangeText={(value) => handleChangeText('correo', value)}
             
            />
            <TextInput
                style={styles.input}
                label="Empresa"
                placeholder="Escriba de la Empresa"
                onChangeText={(value) => handleChangeText('empresa', value)}
              
            />

            <Button
                icon="pencil-circle"
                mode="contained"
                onPress={() => guardarCliente()}
            >
                Guardar Cliente
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

export default NuevoCliente

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})
