import {View, Text, Image} from 'react-native'
import React from 'react'
import {ProfileFieldProps} from "@/type";

const ProfileField = ({label, value, icon}: ProfileFieldProps) => {
    return (
        <View className={"profile-field"}>
            <View className={"profile-field__icon"}><Image source={icon} className={"size-7"} resizeMode={"contain"}/></View>

            <View>
                <Text className={"label text-red"}>{label}</Text>
                <Text className={"label font-bold"}>{value}</Text>
            </View>
        </View>
    )
}
export default ProfileField
