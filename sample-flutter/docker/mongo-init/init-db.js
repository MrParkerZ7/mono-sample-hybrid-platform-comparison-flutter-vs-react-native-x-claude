// MongoDB initialization script for Flutter project
// Creates collections and indexes

db = db.getSiblingDB('flutter_db');

// Create users collection with indexes
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

print('Flutter DB: Created users collection with indexes');

// Create any additional collections needed
db.createCollection('profiles');
db.profiles.createIndex({ userId: 1 }, { unique: true });

print('Flutter DB: Created profiles collection with indexes');

print('MongoDB initialization for Flutter project completed!');
