const {
    MongoClient
} = require('mongodb')
const uri = "mongodb+srv://ClaudioRodrigues:GnLbKeQp5bEIKnN0@cluster0-qqotr.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = {
    list: async function () {
        async function listDatabases() {
            databasesList = await client.db().admin().listDatabases();

            console.log("Databases:");
            databasesList.databases.forEach(db => console.log(` - ${db.name}`))
        };

        try {
            await client.connect()

            await listDatabases(client)

        } catch (e) {
            console.error(e)
        } finally {
            await client.close()
        }
    },
    insert: async function (collection, data) {
        async function createListing() {
            const result = await client.db("DishWay").collection(collection).insertOne(data);
            console.log(`New listing created with the following id: ${result.insertedId}`);
        };

        try {
            await client.connect()
            await createListing(client)
        } catch (e) {
            console.error(e)
        } finally {
            await client.close()
        }
    },
    insertMany: async function (collection, data) {
        async function createListing() {
            const result = await client.db("DishWay").collection(collection).insertMany(data);

            console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
            console.log(result.insertedIds);
        };

        try {
            await client.connect()

            await createListing(client)

        } catch (e) {
            console.error(e)
        } finally {
            await client.close()

        }
    },
    findOne: async function (collection, field, search) {
        
        async function readListing() {          
            
            const result = await client.db("DishWay").collection(collection).findOne({
                [field] : search
            });
            if (result) {
                console.log(`Found a listing in the collection with the '${field}' '${search}':`);
                console.log(result);
            } else {
                console.log(`No listings found with '${field}' : '${search}'`);
                console.log(result);
            }
        };

        try {
            await client.connect()
            await readListing(client)
        } catch (e) {
            console.error(e)
        } finally {
            await client.close()
        }
    },
    find: async function (collection, field, search) {
        
        async function readListing() {
            
            const result = await client.db("DishWay").collection(collection).find({
                [field] : search
            });
            if (result) {
                console.log(`Found a listing in the collection with the '${field}' '${search}':`);
                console.log(result);
            } else {
                console.log(`No listings found with '${field}' : '${search}'`);
                console.log(result);
            }
        };

        try {
            await client.connect()
            await readListing(client)
        } catch (e) {
            console.error(e)
        } finally {
            await client.close()
        }
    },
};