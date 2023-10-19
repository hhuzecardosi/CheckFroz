import postgres from "postgres";

const sql = postgres(Bun.env.POSTGRES_URL);

export default sql;