const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', err => err);

connection.once('open', async() => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    const users = [
        {
            username: 'tgaytan',
            email: 'tgaytan14@utexas.edu'
        },
        {
            username: 'tgaytan14',
            email: 'tgaytan14@gmail.com'
        },
    ];

    console.info('Seeding users!');
    await User.collection.insertMany(users);
    console.table(users);
    console.info('Seeding complete!');

    const thoughts =[
        {
            thoughtText: 'This API is cool!',
            username: 'tgaytan',
        },
        {
            thoughtText: 'mongoDB is cool!',
            username: 'tgaytan14',
        }
    ];

    console.info('Seeding thoughts');
    await Thought.collection.insertMany(thoughts);
    console.table(thoughts);
    console.info('Seeding complete!');


    process.exit(0);
});