import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: path.join(__dirname, './'), // Set root directory
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  setupFilesAfterEnv: ['./__mocks__/globalMocks.ts'],
};

export default config;
