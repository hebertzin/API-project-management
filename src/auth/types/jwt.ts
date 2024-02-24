export const header = {
  alg: 'HS256',
  typ: 'JWT',
};

export type Payload = {
  email: string;
  password: string;
};
