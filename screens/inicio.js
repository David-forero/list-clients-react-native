import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";
import {FAB} from 'react-native-paper';
const inicio = ({navigation}) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    firebase.db.collection("clientes").onSnapshot((querySnaphsot) => {
      const clients = [];
      querySnaphsot.docs.forEach((doc) => {
        const { nombre, correo, telefono, empresa } = doc.data();
        clients.push({ id: doc.id, nombre, correo, telefono, empresa });
      });
      setClientes(clients);
    });
  }, []);
  return (
    <>
        <ScrollView>
          {clientes.map((cliente) => {
            return (
              <ListItem key={cliente.id} bottomDivider onPress={() => navigation.navigate('DetallesCliente', {clientId: cliente.id})}>
                <ListItem.Chevron />
                <Avatar 
                    source={{uri: 'https://react.semantic-ui.com/images/avatar/large/matthew.png'}} 
                    rounded
                />
                <ListItem.Content>
                  <ListItem.Title>{cliente.nombre}</ListItem.Title>
                  <ListItem.Subtitle>
                      {cliente.correo}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </ScrollView>
        <View>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('NuevoCliente')}
            />
        </View>
    </>
  );
};

export default inicio;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20,
        backgroundColor: "#1774f2"
    }
});
