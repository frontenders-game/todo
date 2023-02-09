const config = {
    serverPort: process.env.PORT || 5000,
    mongoHost: process.env.MONGODB_URI || '127.0.0.1',
    mongoPort: process.env.DB_NAME || '27017',
    mongoDbName: process.env.DB_NAME || 'todo'
};

export default config