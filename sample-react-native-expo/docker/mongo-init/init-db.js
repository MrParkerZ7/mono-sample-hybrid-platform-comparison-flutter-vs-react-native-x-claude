// MongoDB initialization script for React Native project
// Creates collections and indexes

db = db.getSiblingDB('react_native_db');

// Create users collection with indexes
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

print('React Native DB: Created users collection with indexes');

// Create any additional collections needed
db.createCollection('profiles');
db.profiles.createIndex({ userId: 1 }, { unique: true });

print('React Native DB: Created profiles collection with indexes');

print('MongoDB initialization for React Native project completed!');
