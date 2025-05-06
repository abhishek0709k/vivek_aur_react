import { Client, Account, ID } from "appwrite";
import configureUrl from "../conf/configure";
import APIError from "../utils/apiError";

export class auth {
    client = new Client()
    account;
    constructor(){
        this.client
        .setEndpoint(configureUrl.appwriteUrl)
        .setProject(configureUrl.appwriteProjectsUrl)

        this.account = new Account(this.client)
    }
    async createAccount({ email , password , name }){
        try {
            const userAccount =  await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
               return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    async login({ email, password }){
        try {
            const userLogin = await this.account.createEmailPasswordSession(email, password)
            if(userLogin){
                return userLogin;
            } else {
                return userLogin;
            }
        } catch (error){
            throw new Error(error)
        }
    }
    async currentUser(){
        try {
            const user = await this.account.get();
            if(user){
                return user
            } else {
                return null
            }
        } catch (error) {
            console.log("Error in current User", error)
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            new APIError(400, { data: ""}, "Error while logout")
        }
    }
}

const authService = new auth();

export default authService;