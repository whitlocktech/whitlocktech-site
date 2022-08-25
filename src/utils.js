import { Client, Account } from "appwrite"

const client = new Client()

client
    .setEndpoint("http://appwrite.whitlocktech.com/v1")
    .setProject("630100eef1bdfc27d173")

const account = new Account(client)

account.create('unique', 'me@example.com', 'password', 'Hank Hill')
    .then(response => {
        console.log(response)
    }, error => {
        console.log(error)
})
client.subscribe('files', response => {
    if(response.events.includes('buckets.*.files.*.create')) {
        console.log(response.payload)
    }
})
