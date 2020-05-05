const {
    MongoClient
} = require('mongodb')
const uri = "mongodb+srv://ClaudioRodrigues:GnLbKeQp5bEIKnN0@cluster0-qqotr.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var ObjectId = require('mongodb').ObjectID

module.exports = {
    list: async function (collection, page, limit, project, project2) {
        async function listListing(client) {
            const cursor = await client.db("test").collection(collection).find({}).project({

                }).limit(limit * 1)
                .skip((page - 1) * limit)

            const results = await cursor.toArray();
            module.exports.results = results

        };

        await client.connect()
        await listListing(client)

    },
    search: async function (collection, search) {
        async function searchListing(client) {

            //   await client.db("test").collection(collection).createIndex({
            //       "restaurant.location.city": "text",
            //       "restaurant.cuisines": "text",
            //       "restaurant.highlights": "text",
            //       "restaurant.name": "text",

            //   }, function (err, result) {
            //       console.log(result); 
            //   });

            const cursor = await client.db("test").collection(collection).find({
                '$text': {
                    '$search': search
                }
            }).project({})

            const results = await cursor.toArray();
            module.exports.results = results

        };

        await client.connect()
        await searchListing(client)
    },
    sort: async function (collection, field, page, limit) {
        async function listListing(client) {

            const cursor = await client.db("test").collection(collection).find({}).sort({
                    [field]: -1
                }).project({}).limit(limit * 1)
                .skip((page - 1) * limit);

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
            }).project({});

            const results = await cursor.toArray();

            module.exports.results = results
        };

        await client.connect()
        await readListing(client)
    },
    update: async function (collection, id, review, author) {
        async function readListing(client) {

            const cursor = await client.db("test").collection(collection).findOneAndUpdate({
                '_id': ObjectId(id)
            }, {
                $push: {
                    'restaurant.all_reviews.reviews': {
                        'review': {
                            'author': author,
                            'critic': review
                        }
                    }
                }
            })

            // const results = await cursor.toArray();

            // module.exports.results = results
        };

        await client.connect()
        await readListing(client)
    }
};