import { Connection } from 'mongoose';

export abstract class Seeder<I = any, E = any> {
  constructor(protected readonly connection: Connection) {}
  abstract seed(): Promise<E[]>;
  abstract fakeOne(): I;
  abstract create(interfaces: I[]): Promise<E[]>;
  clear() {
    this.connection.db.dropDatabase();
  }
}
