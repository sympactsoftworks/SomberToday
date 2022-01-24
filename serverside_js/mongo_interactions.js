const { MongoClient } = require('mongodb');
const { encrypt, decrypt } = require('./enc_decr');
const uri = process.env.database_url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const new_user = (data) => {
    if (data.hasOwnProperty('email') && data.hasOwnProperty('password') && data.hasOwnProperty('first_name') && data.hasOwnProperty('last_name') && data.hasOwnProperty('token') && data.hasOwnProperty('school') && data.hasOwnProperty('class')) {
        client.connect(err => {
            const collection = client.db("users").collection("users");
            collection.findOne({ email: data.email }, (err, result) => {
                if (result) {
                    client.close();
                    return {
                        success: false,
                        message: 'User with same email already exists.'
                    };
                } else {
                    encrypt(data.password).then(hash => {
                        data.password = hash;
                        collection.insertOne(data, (err, result) => {
                            if (err) {
                                client.close();
                                return {
                                    success: false,
                                    message: 'Error in creating new user.'
                                };
                            } else {
                                client.close();
                                return {
                                    success: true,
                                    message: 'New user created.'
                                };
                            }
                        });
                    });
                }
            });
        });
    } else {
        return {
            success: false,
            message: 'Invalid data.'
        };
    }
};

const check_login = (data) => {
    if (data.hasOwnProperty('email') && data.hasOwnProperty('password')) {
        client.connect(err => {
            const collection = client.db("users").collection("users");
            collection.findOne({ email: data.email }, (err, result) => {
                if (result) {
                    if (result.password === decrypt(data.password)) {
                        client.close();
                        return {
                            success: true,
                            message: 'Login successful.',
                            token: result.token
                        };
                    } else {
                        client.close();
                        return {
                            success: false,
                            message: 'Invalid password.'
                        };
                    }
                } else {
                    client.close();
                    return {
                        success: false,
                        message: 'User does not exist.'
                    };
                }
            });
        });
    } else {
        return {
            success: false,
            message: 'Invalid data.'
        };
    }
};