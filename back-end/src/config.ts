export const cors_config = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

export const payunit_config = {
  baseURL: process.env.PAYUNIT_API_URL || 'https://gateway.payunit.net/api',
  apiUsername: process.env.PAYUNIT_API_USERNAME,
  apiPassword: process.env.PAYUNIT_API_PASSSWORD,
  apiKey: process.env.PAYUNIT_API_KEY,
  mode: process.env.PAYUNIT_MODE || 'test', // or 'live'
};
