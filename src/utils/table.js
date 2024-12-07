import { databaseConnection } from "../database/databaseConnection.js";

export async function createTable() {
  const db = await databaseConnection();
  try {
    await db`
        CREATE TABLE IF NOT EXISTS pessoas (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, 
        nome VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, senha VARCHAR(64) NOT NULL)
        `;

    await db`
        CREATE TABLE IF NOT EXISTS posts (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, 
        titulo VARCHAR(50) NOT NULL, texto VARCHAR(50) NOT NULL, data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, pessoa_id UUID, FOREIGN KEY (pessoa_id) REFERENCES Pessoas(id))
        `;

    await db`
        CREATE TABLE IF NOT EXISTS replies (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, 
        texto VARCHAR(50) NOT NULL, data TIMESTAMP DEFAULT CURRENT_TIMESTAMP, post_id UUID, FOREIGN KEY (post_id) REFERENCES Posts(id))
        `;

    await db`
        CREATE TABLE IF NOT EXISTS empresas (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, 
            nome VARCHAR(50), foto VARCHAR(200), pessoa_id UUID, FOREIGN KEY (pessoa_id) REFERENCES Pessoas(id))
        `;

    await db`
        CREATE TABLE IF NOT EXISTS avaliacoes (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, stars INT, description TEXT, pessoa_id UUID,
            empresa_id UUID, FOREIGN KEY (empresa_id) REFERENCES Empresas(id), FOREIGN KEY (pessoa_id) REFERENCES Pessoas(id))
        `;

    await db` CREATE TABLE IF NOT EXISTS solicitacoes ( id uuid NOT NULL DEFAULT gen_random_uuid(),
        nome character varying(50) COLLATE pg_catalog."default",
        foto character varying(200) COLLATE pg_catalog."default",
        pessoa_id uuid,
        CONSTRAINT solicitacoes_pkey PRIMARY KEY (id)
    )
        `;
  } finally {
    await db.end();
  }
}
