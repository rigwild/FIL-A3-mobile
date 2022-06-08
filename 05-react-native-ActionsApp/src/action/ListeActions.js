import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import {UneAction} from './UneAction'

export const ListeActions = (props) => {

    const listActions = props.actions.map((action, id) =>
        <View key={id}>
            <UneAction action={action} />
        </View>
    );

    return (
        <View>
            { listActions }
        </View>
    )
}
