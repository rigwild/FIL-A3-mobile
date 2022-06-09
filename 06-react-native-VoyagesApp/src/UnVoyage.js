import React, {useLayoutEffect, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity
} from 'react-native'
import {MessageCentre} from './MessageCentre'
import { couleurs } from './Theme'

export const UnVoyage = ({navigation}) => {
    // Exemple de récupération de paramètre
    // const { listeClients } = props.navigation.state.params
    // TODO mettre à jour le titre avec le titre du voyage
    useLayoutEffect(() => {
        navigation.setOptions({
            title:'TITRE',
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: '400'
            }
        });
    }, [navigation]);

    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')

    const ajouterLieu = () => {
        if (nom === '' || description === '') return
        const { voyage } = navigation.state.params
        const lieu = {
            nom,
            description
        }
        // TODO propager l'action pour ajouter un nouveau dans les données (App.js)
        setNom('')
        setDescription('')
    }

    // TODO récupérer le voyage courant depuis `props.navigation.state.params`
    const voyage = {}

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={[!voyage.lieux.length && { flex: 1 }]}>
                <View style={[styles.locationsContainer, !voyage.lieux.length && { flex: 1,
                    justifyContent: 'center' }]}>
                    { !voyage.lieux.length && <MessageCentre message='Pas de lieu pour ce voyage !'/> }

                    {
                        voyage.lieux.map((location, index) => (
                            <View key={index} style={styles.lieuConteneur}>
                                <Text style={styles.lieuNom}>{location.nom}</Text>
                                <Text style={styles.lieuDescription}>{location.description}</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <TextInput
                onChangeText={val => setNom(val)}
                placeholder='Entrez un lieu'
                value={nom}
                style={styles.saisie}
                placeholderTextColor='white'
            />
            <TextInput
                onChangeText={val => setDescription(val)}
                placeholder='Ajouter une description du lieu'
                value={description}
                style={[styles.saisie, styles.saisie2]}
                placeholderTextColor='white'
            />
            <View style={styles.conteneurBouton}>
                <TouchableOpacity onPress={() => ajouterLieu()}>
                    <View style={styles.bouton}>
                        <Text style={styles.texteBouton}>Ajouter un lieu</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1
    },
    locationsContainer: {
        paddingBottom: 104
    },
    saisie: {
        height: 50,
        backgroundColor: couleurs.primaire,
        color: 'white',
        paddingHorizontal: 8,
        position: 'absolute',
        width: '100%',
        bottom: 104,
        left: 0
    },
    saisie2: {
        bottom: 52
    },
    conteneurBouton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    },
    bouton: {
        height: 50,
        backgroundColor: couleurs.primaire,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texteBouton: {
        color: 'white'
    },
    lieuConteneur: {
        padding: 10,
        borderBottomColor: couleurs.primaire,
        borderBottomWidth: 2
    },
    lieuNom: {
        fontSize: 20
    },
    lieuDescription: {
        color: 'rgba(0, 0, 0, .5)'
    }
})

