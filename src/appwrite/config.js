import conf from "../conf/conf.js";
import { Databases, Client, ID, Storage, Query } from "appwrite";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Database related methods

  async createPost({ title, content, featuredImage, slug, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Note: Any unique-ID would work
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
    return null; // if code-execution flow gets out of the try-catch block, then return null
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
    return null;
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true; // indicates successful deletion
    } catch (error) {
      throw error;
    }
    return false; // something went wrong
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
    return null;
  }

  /*
    NOTE: We are giving an array of queries (in the syntax Appwrite defines) as argument in "queries" with a default value (s.t. all active posts are listed by default). Just in case if the client wants some other queries to be executed, it must be added in the "queries" argument in Appwrite-defined-syntax.
  */
  async getAllPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries // Documents that satisfy all these queries will be listed
      );
    } catch (error) {
      throw error;
    }
    return null;
  }

  // File-upload related methods

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBuckedId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBuckedId, fileId);
      return true;
    } catch (error) {
      throw error;
    }
    return false;
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBuckedId, fileId);
  }
}

const service = new Service();
export default service;
