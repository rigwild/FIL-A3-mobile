import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'
import {UneAction} from "../action/UneAction";

/**
 * Composant Menu.
 */
const Menu = () => {

    const [tabs, setTabs] = useState([
        { name:'Toutes', active: true},
        { name:'Actives', active: false},
        { name:'Terminées', active: false}
        ]
    )

    const onChangeTab = (name) => {
        let newState = []
        tabs.map(tab => {
            newState.push({
                name: tab.name,
                active: tab.name === name
            })
        })
        setTabs(newState)
    }

    const listTabs = tabs.map((tab, id) =>
        <OptionMenu key={id} name={tab.name} active={tab.active} onChangeTab={onChangeTab}/>
    );

    return (
        <View style={styles.menu}>
            { listTabs}
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu
