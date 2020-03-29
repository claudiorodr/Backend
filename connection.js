const {
    MongoClient
} = require('mongodb')
const uri = "mongodb+srv://ClaudioRodrigues:GnLbKeQp5bEIKnN0@cluster0-qqotr.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = {
    list: async function (collection) {
        async function listListing(client) {

            const cursor = await client.db("test").collection(collection).find({}).project({
                "restaurant.id": 1,
                "restaurant.name": 1,
            });

            const results = await cursor.toArray();
            module.exports.results = results

        };

        await client.connect()
        await listListing(client)
    },
    sort: async function (collection, field) {
        async function listListing(client) {

            const cursor = await client.db("test").collection(collection).find({}).sort({
                [field]: -1
            }).project({
                "restaurant.id": 1,
                "restaurant.name": 1,
                [field]: 1
            });

            const results = await cursor.toArray();
            module.exports.results = results
        };

        await client.connect()
        await listListing(client)
    },
    insert: async function (collection, data) {
        async function createListing() {
            const results = await client.db("test").collection(collection).insertOne(data);
            module.exports.results = results
            // console.log(`New listing created with the following id: ${result.insertedId}`);
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
            const result = await client.db("test").collection(collection).insertMany(data);

            // console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
            // console.log(result.insertedIds);
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

            const results = await client.db("test").collection(collection).findOne({
                [field]: search
            }).project({
                "restaurant.id": 1,
                "restaurant.name": 1,
            });
            module.exports.results = results
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

        async function readListing(client) {

            const cursor = await client.db("test").collection(collection).find({
                [field]: search
            }).project({
                "restaurant.id": 1,
                "restaurant.name": 1,
            });

            const results = await cursor.toArray();

            module.exports.results = results
        };

        await client.connect()
        await readListing(client)
    }
};