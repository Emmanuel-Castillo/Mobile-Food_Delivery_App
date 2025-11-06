import {View, Text, Button, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {logOut} from "@/lib/appwrite";
import {useAuthStore} from "@/store/auth.store";
import CustomHeader from "@/components/CustomHeader";
import {images} from "@/constants";
import ProfileField from "@/components/ProfileField";
import CustomButton from "@/components/CustomButton";

const Profile = () => {
    const {resetAuthenticatedUser, user} = useAuthStore()
    const handleLogOutPress = () => {
        logOut()
        resetAuthenticatedUser()
    }

    try {
        return user && (
            <SafeAreaView style={{padding: 32, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6}}>
                <CustomHeader title={"Profile"}/>

                <View>
                    <Image source={{uri: user.avatar}} className={"profile-avatar"}/>
                    <View className={"profile-edit"}>
                        <Image source={images.pencil} className={"size-6"}/>
                    </View>
                </View>
                <View className={"bg-white rounded-2xl px-3.5 pt-5 w-full"}>
                    <ProfileField label={"Full Name"} value={user.name} icon={images.user}/>
                    <ProfileField label={"Email"} value={user.email} icon={images.envelope}/>
                    <ProfileField label={"Phone number"} value={"+1 (346) 561-9732"} icon={images.phone}/>
                    <ProfileField label={"Address 1 - (Home)"} value={"Alvin, TX"} icon={images.location}/>
                    <ProfileField label={"Address 2 - (Work)"} value={"Alvin, TX"} icon={images.location}/>
                </View>

                <View className={"flex-col gap-2 w-full"}>
                    <CustomButton title={"Edit Profile"} style={"bg-primary/50 border border-primary"} textColor={"primary"}
                                  onPress={() => {
                                  }}/>
                    <CustomButton title={"Logout"} style={"bg-red-100/50 border border-red-500"} textColor={"red-500"}
                                  onPress={handleLogOutPress}
                                  leftIcon={<Image source={images.logout} className={"h-full w-6 mr-1"}
                                                   resizeMode={"contain"}/>}/>
                </View>

            </SafeAreaView>
        )
    } catch (e) {
        console.error("Layout crash: ", e)
        return null
    }

}
export default Profile
