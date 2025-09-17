import nextJest from 'next/jest.js';
const createJestConfig = nextJest({ dir: './' });

const custom = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // If you use "@/..." imports from /src
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }
};

export default createJestConfig(custom);