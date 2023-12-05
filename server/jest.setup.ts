jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue({}),
  // ...mock other methods if necessary
}));
