import {View, Text, Button, Alert} from 'react-native'
import React from 'react'
import {Link, router} from 'expo-router'
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [form, setForm] = React.useState({ name: '', email: '', password: ''});

    const submit = async () => {
        if (!form.email || !form.password || !form.name) {
            Alert.alert("Error", "Please enter valid email address and password.")
            return;
        }

        setIsSubmitting(true);

        try {
            // Call Appwrite Sign Up function

            Alert.alert("Success", "User signed up successfully");
            router.replace("/")
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <View className={"gap-10 bg-white rounded-lg p-5 mt-5"}>
            <CustomInput
                placeholder={"Enter your full name"}
                value={form.name}
                onChangeText={(text) => {
                    setForm({...form, name: text});
                }}
                label={'Full name'}
                keyboardType={"email-address"}
            />
            <CustomInput
                placeholder={"Enter your email"}
                value={form.email}
                onChangeText={(text) => {
                    setForm({...form, email: text});
                }}
                label={'Email'}
                keyboardType={"email-address"}
            />
            <CustomInput
                placeholder={"Enter your password"}
                value={form.password}
                onChangeText={(text) => {
                    setForm({...form, password: text});
                }}
                label={'Password'}
                secureTextEntry={true}
            />
            <CustomButton
                title={"Sign Up"}
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className={"flex justify-center mt-5 flex-row gap-2"}>
                <Text className={"base-regular text-gray-100"}>
                    Already have an account?
                </Text>
                <Link href={"/sign-in"} className={"base-bold text-primary"}>
                    Sign In
                </Link>
            </View>
        </View>
    )
}
export default SignUp
