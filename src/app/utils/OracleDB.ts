import oracledb, { Connection } from 'oracledb';

oracledb.initOracleClient({ libDir: process.env.SECRET_ORACLE_PATH });

class OracleDB {
  private connection: Connection | null = null;

  constructor() {}

  // Function to establish connection to OracleDB
  async connect() {
    try {
      this.connection = await oracledb.getConnection({
        user: process.env.ORACLE_DATABASE_USER,
        password: process.env.ORACLE_DATABASE_PASS,
        connectionString: `${process.env.ORACLE_DATABASE_HOST}:${process.env.ORACLE_DATABASE_PORT}/${process.env.ORACLE_DATABASE_SCHEMA}`,
      });
    } catch (error) {
      console.log("Error:" + (error as any).body)      
      throw new Error('Oracle DB connection error')
    }
  }

  // Function to execute SQL queries
  async execute(query: string, bindParams?: any) {
    if (!this.connection) {
      await this.connect(); // Ensures connection is established before executing query
    }

    try {
      const result = await this.connection!.execute(query, bindParams)
      return result;
    } catch (error) {
      console.log("Error:" + (error as any).body)
      throw new Error('Query execution error')
    }
  }

  // Function to close the connection
  async close() {
    try {
      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }
    } catch (error) {
      console.log("Error:" + (error as any).body)
    }
  }
}

export default OracleDB;
