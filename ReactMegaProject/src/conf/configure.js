const configureUrl = {
    appwriteUrl: String(import.meta.env.VITE_REACT_APPWRITE_URL),
    appwriteDatabaseUrl: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionUrl: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBuketUrl: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteProjectsUrl: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
};

export default configureUrl;