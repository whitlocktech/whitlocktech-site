import { Client as Appwrite, Databases, Account } from "appwrite";
import { Server } from '../utils/config'

let api = {
    sdk: null,

    provider : () => {
        if (api.sdk) {
            return api.sdk
        }
        let appwrite = new Appwrite()
        appwrite.setEndpoint(Server.endpoint).setProject(Server.setProject)
        const account = new Account(appwrite)
        const database = new Databases(appwrite, Server.database)
    }
}