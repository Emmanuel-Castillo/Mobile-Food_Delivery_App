import {Account, Avatars, Client, TablesDB, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.manny.food_delivery_app",
    databaseId: "69077276000e126afbd0",
    bucketId: "6908df1a003693edb62b",
    userTableId: "user",
    categoriesTableId: "categories",
    menuTableId: "menu",
    customizationsTableId: "customizations",
    menuCustomizationsTableId: "menu_customizations",
}

export const client = new Client();

client.setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new TablesDB(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create({
            name: name,
            email: email,
            password: password,
            userId: ID.unique()
        });
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitialsURL(name);

        await signIn({email, password});

        return await databases.createRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.userTableId,
            rowId: ID.unique(),
            data: {
                accountId: newAccount.$id,
                email: newAccount.email,
                name: newAccount.name,
                avatar: avatarUrl
            }
        })
    } catch (e) {
        throw new Error(e as string)
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession({email, password});
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error;

        const currentUser = await databases.listRows(
            {
                databaseId: appwriteConfig.databaseId,
                tableId: appwriteConfig.userTableId,
                queries: [Query.equal("accountId", currentAccount.$id)]

            }
        )

        if (!currentUser) throw Error;

        return currentUser.rows[0];
    } catch (e) {
        console.log(e)
        throw new Error(e as string)
    }
}

export const getMenu = async ({category, query}: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if (category) {
            queries.push(Query.equal("categories", category));
        }
        if (query) {
            queries.push(Query.search("name", query));
        }
        const menus = await databases.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.menuTableId,
            queries: queries
        })

        return menus.rows
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCatgories = async() => {
    try {
        const categories = await databases.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.categoriesTableId,
        })

        return categories.rows
    } catch (e) {
        throw  new Error(e as string)
    }
}