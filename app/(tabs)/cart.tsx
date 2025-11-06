import {View, Text, FlatList, Image} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader";
import cn from "clsx";
import CustomButton from "@/components/CustomButton";
import {PaymentInfoStripeProps} from "@/type";
import CartItem from "@/components/CartItem";
import {images} from "@/constants";

const PaymentInfoStripe = ({label, value, labelStyle, valueStyle,}: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);
const Cart = () => {
    const {items, getTotalItems, getTotalPrice} = useCartStore()

    const totalItems = getTotalItems()
    const totalPrice = getTotalPrice()
    try {
        return (
            <SafeAreaView style={{backgroundColor: "white", height: "100%"}}>
                <FlatList
                    data={items}
                    renderItem={({item}) => <CartItem item={item}/>}
                    keyExtractor={(item) => item.id}
                    contentContainerClassName={"pb-28 px-5 pt-5"}
                    contentContainerStyle={{flexGrow: 1}}
                    ListHeaderComponent={() => <CustomHeader title={"Your Cart"}/>}
                    ListEmptyComponent={() => <View className={"flex-1 items-center justify-center"}>
                        <View
                            className={"p-4 w-3/4 flex gap-4 items-center justify-end bg-primary/50 border border-primary rounded-3xl"}>
                            <Image source={images.bag}  resizeMode={"contain"}/>
                            <Text className={"text-white"}>Your cart is empty.</Text>
                        </View>
                    </View>}
                    ListFooterComponent={() => totalItems > 0 && (
                        <View className={"gap-5"}>
                            <View className={"mt-6 border border-gray p-5 rounded-2xl"}>
                                <Text className={"h3-bold text-dark-100 mb-5"}>
                                    Payment Summary
                                </Text>
                                <PaymentInfoStripe label={`Total Items (${totalItems})`}
                                                   value={`$${totalPrice.toFixed(2)}`}/>
                                <PaymentInfoStripe label={`Delivery Fee`}
                                                   value={`$5.00`}/>
                                <PaymentInfoStripe label={`Discount`}
                                                   value={`-1.50`}
                                                   valueStyle="!text-success"/>
                                <View className={"border-t border-gray-300 my-2"}/>
                                <PaymentInfoStripe label={`Total`}
                                                   value={`$${(totalPrice + 5 - 1.50).toFixed(2)}`}
                                                   labelStyle="base-bold !text-dark-100"
                                                   valueStyle={"base-bold !text-dark-100 !text-right"}/>
                            </View>
                            <CustomButton title={"Order Now"}/>
                        </View>
                    )}
                />
            </SafeAreaView>
        )
    } catch (e) {
        console.error("Layout crash: ", e)
        return null
    }

}
export default Cart
