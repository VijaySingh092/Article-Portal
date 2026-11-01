// import { Client, Storage, ID } from "appwrite";

// export const client = new Client()
//     .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//     .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// export const storage = new Storage(client);

// export const promise = storage.createFile({
//     bucketId: import.meta.env.VITE_APPWRITE_ENDPOINT,
//     fileId: ID.unique(),
//     file: document.getElementById('uploader').files[0]
// });

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

import {Client, Storage } from 'appwrite'

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    url: import.meta.env.VITE_APPWRITE_URL
}

export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export const storage = new Storage(client)