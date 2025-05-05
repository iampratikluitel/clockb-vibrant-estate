import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
};

// Ensure we only create one instance of PrismaClient
export const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Initialize Prisma client
const initializePrisma = async () => {
  try {
    // Test the connection
    await prisma.$connect();
    console.log('Prisma client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    throw error;
  }
};

// Call initialization
initializePrisma().catch(console.error);

// Debug log to verify Prisma client
console.log('Prisma client initialized:', {
  hasGuide: 'guide' in prisma,
  models: Object.keys(prisma),
}); 