import {Text, View} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ListerVoyages} from "./ListerVoyages";
import {AjouterVoyage} from "./AjouterVoyage";

const Tab = createBottomTabNavigator();

export const MenuPrincipal = ({voyages, ajouterVoyage}) => (<NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="ListerV" >
                {props => <ListerVoyages {...props} voyages={voyages}/>}
            </Tab.Screen>
            <Tab.Screen name="AjouterV" >
                {props => <AjouterVoyage {...props} ajouterVoyage={ajouterVoyage}/>}
            </Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
);
