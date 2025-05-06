import { Client, Databases, Query } from "appwrite";
import configureUrl from "../conf/configure";

class appwriteService {
    client = new Client();
    databases;
    constructor(){
        this.client
        .setEndpoint(configureUrl.appwriteUrl)
        .setProject(configureUrl.appwriteProjectsUrl)
        this.databases = new Databases(this.client)
    }
    async createDocument({ title, slug, status, featuredImage, content, userId }){
        try {
            const document = await this.databases.createDocument(configureUrl.appwriteDatabaseUrl, configureUrl.appwriteCollectionUrl, slug, 
                {
                    title,
                    status,
                    content,
                    featuredImage,
                    userId
                }
            )
            if(document){
                return document
            } else {
                return {};
            }
        } catch (error) {
            console.log("Error in createDocument", error)
        }
    }
    async updataPost( slug, { title, status, featuredImage, content }){
        try {
            const document = await this.databases.updateDocument(configureUrl.appwriteDatabaseUrl, configureUrl.appwriteCollectionUrl, slug, 
                {
                    title,
                    featuredImage,
                    status,
                    content
                }
            ) 
            if(document){
                return document
            } else {
                return {};
            }
        } catch (error) {
            console.log("Error in updateDocuments", error)
        }
    }
    async deletePost( slug ){
        try {
            await this.databases.updateDocument(configureUrl.appwriteDatabaseUrl, configureUrl.appwriteCollectionUrl, slug) 
            return true
        } catch (error) {
            console.log("Error in deleteDocuments", error)
            return false
        }
    }
    async getPost(slug) {
        try {
          const document = await this.databases.getDocument(
            configureUrl.appwriteDatabaseUrl,
            configureUrl.appwriteCollectionUrl,
            slug
          );
          return document || null;
        } catch (error) {
          console.error("Error in getPost:", error);
          throw error; // Re-throw to handle in component
        }
      }
    async getAllPosts(){
        try {
            const document = await this.databases.listDocuments(configureUrl.appwriteDatabaseUrl, configureUrl.appwriteCollectionUrl, 
                [
                    Query.equal("status", "active")
                ]
            )  
            if(document){
                return document
            } else {
                return {};
            }
        } catch (error) {
            console.log("Error in updateDocuments", error)
        }
    }
}

const Appwrite_Service = new appwriteService();

export default Appwrite_Service