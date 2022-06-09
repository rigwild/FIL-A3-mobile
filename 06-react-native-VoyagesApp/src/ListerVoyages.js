
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native'

import {MessageCentre} from './MessageCentre'
import {UnVoyage} from "./UnVoyage";


import { couleurs } from './Theme'
import {useEffect, useLayoutEffect} from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export const ListerVoyages = ({ navigation, voyages }) =>  {

    useEffect(() => {
        console.log(voyages)
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Voyages',
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: '400'
            }
        });
    }, [navigation]);

    // TODO implémenter la navigation vers la page de détail d'un voyage

    const Stack = createStackNavigator();

    function MyStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="ListerVoyages"
                    component={this}

                />
                <Stack.Screen
                    name="UnVoyage"
                    component={UnVoyage}
                />
            </Stack.Navigator>
        );
    }

    /**
     * Je n'ai pas eu le temps de finir d'implémenter la navigation par stack
     <NavigationContainer>
     <MyStack />
     </NavigationContainer>
     */

    return (

        <ScrollView contentContainerStyle={[!voyages.length && {flex: 1}]}>

            <View style={[!voyages.length && {justifyContent: 'center', flex: 1}]}>
                {
                    !voyages.length && <MessageCentre message='Pas encore de voyage !'/>
                }
                {
                    voyages.map((voyage, index) => (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.navigate('UnVoyage')}
                        >
                            <View style={styles.conteneurVoyage}>
                                <Text style={styles.ville}>{voyage.ville}</Text>
                                <Text style={styles.pays}>{voyage.pays}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    conteneurVoyage: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: couleurs.primaire
    },
    ville: {
        fontSize: 20,
    },
    pays: {
        color: 'rgba(0, 0, 0, .5)'
    },
})
