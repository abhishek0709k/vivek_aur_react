import { Client, ID, Storage } from "appwrite";
import configureUrl from "../conf/configure";

class appwriteStorage {
    client = new Client()
    storage;
    constructor(){
        this.client
        .setEndpoint(configureUrl.appwriteUrl)
        .setProject(configureUrl.appwriteProjectsUrl)
        this.storage = new Storage(this.client)
    }
    async uploadFile(file){
        try {
            return await this.storage.createFile(configureUrl.appwriteBuketUrl, ID.unique(), file);
        } catch (error) {
            console.log("Error in uploadFile", error)
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(configureUrl.appwriteBuketUrl, fileId)
        } catch (error) {
            console.log("Error in deleteFile", error)
            return false;
        }
    }
    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(configureUrl.appwriteBuketUrl, fileId)
        } catch (error) {
            console.log("Error in get File Preview : ", error)
        }
    }
}

const Appwrite_config = new appwriteStorage();

export default Appwrite_config