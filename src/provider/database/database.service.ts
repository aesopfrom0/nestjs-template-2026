import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private connection: Connection) {}

  getConnection(): Connection {
    return this.connection;
  }

  async isConnected(): Promise<boolean> {
    return this.connection.readyState === 1;
  }
}
