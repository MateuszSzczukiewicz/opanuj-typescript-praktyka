import { Pool } from 'pg';
import { Identifiable } from './models';

export class Repository<T extends Identifiable> {
  private pool: Pool;
  private tableName: string;

  constructor(pool: Pool, tableName: string) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async getById(id: number): Promise<T> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const values = [id];
    const res = await this.pool.query<T>(query, values);
    return res.rows[0] as T;
  }

  async getAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const res = await this.pool.query<T>(query);
    return res.rows;
  }

  async insert(item: T): Promise<T> {
    const columns = Object.keys(item).filter((key) => key !== 'id');
    const values = columns.map((_, i) => `$${i + 1}`);
    const placeholders = columns.map((col) => (item as any)[col]);

    // Np. INSERT INTO users (id, name, email) VALUES $1, $2, $3
    const query = `
      INSERT INTO ${this.tableName} (${columns.join(', ')})
      VALUES (${values.join(', ')})
      RETURNING *
    `;

    const res = await this.pool.query<T>(query, placeholders);
    return res.rows[0];
  }
}
