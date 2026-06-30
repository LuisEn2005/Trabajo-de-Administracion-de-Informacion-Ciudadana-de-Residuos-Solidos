import { PrismaClient } from '@prisma/client';

export class DatabaseConnection {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
      });
    }
    return DatabaseConnection.instance;
  }

  static async desconectar(): Promise<void> {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.instance.$disconnect();
    }
  }
}
