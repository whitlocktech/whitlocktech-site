const dotenv = require('dotenv')
dotenv.config('../.env')

const {
    VITE_APP_ENDPOINT,
    VITE_APP_PROJECT,
    VITE_APP_COLLECTION_ID,
    VITE_APP_DATABASE_ID,
    VITE_APP_SECRET_KEY
} = process.env

module.exports = {
    endpoint : VITE_APP_ENDPOINT,
    project: VITE_APP_PROJECT,
    collectionId: VITE_APP_COLLECTION_ID,
    databaseId: VITE_APP_DATABASE_ID,
    secreteKey: VITE_APP_SECRET_KEY
}