/*
    IN PRODUCTION-GRADE APPLICATIONS
    
    - The environment variables might not load everywhere in the project. So we simply load it once here in the config file and then use it wherever required. 
    - All the environment variables must be string. So we manually convert them to string using the String( ) method.
*/
const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBuckedId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
