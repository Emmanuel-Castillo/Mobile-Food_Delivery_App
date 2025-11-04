import {View, Text, Button} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {logOut} from "@/lib/appwrite";
import {useAuthStore} from "@/store/auth.store";

const Profile = () => {
    const {resetAuthenticatedUser} = useAuthStore()
    const handleLogOutPress = () => {
        logOut()
        resetAuthenticatedUser()
    }
    return (
        <SafeAreaView>
            <Button title={"Log out"} onPress={handleLogOutPress}/>
        </SafeAreaView>
    )
}
export default Profile
