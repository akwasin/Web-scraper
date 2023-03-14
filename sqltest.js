const sql = require('mssql');

const config = {
    user: 'optima',
    password: 'SuperSvart!',
    server: 'sql-optima-dev.database.windows.net',
    port: 1433,
    database: 'sqldb-optima-backoffice-dev',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

console.log("Starting...");

async function connectAndWrite() {
    try {
        const poolConnection = await sql.connect(config);
        console.log("Writing");

        const resultSet = await poolConnection.request().query(`
            UPDATE [dbo].[Educations]
            SET EducationState = 20
            WHERE Id = 24
        `);

        console.log(resultSet);

        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

async function connectAndQuery() {
    try {
        const poolConnection = await sql.connect(config);
        console.log("Reading");

        const resultSet = await poolConnection.request().query(`
            SELECT TOP (100) [Id]
            ,[PersonId]
            ,[ProductId]
            ,[EducationState]
            ,[Identifier]
            FROM [dbo].[Educations]
            WHERE PersonId = 8
        `);

        console.log(resultSet);

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndWrite();
connectAndQuery();