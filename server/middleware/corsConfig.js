/**
 * CORS options configuration for JanSeva AI Government Portal API
 */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://janseva.gov.in',
  'https://admin.janseva.gov.in'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy restriction: ${origin} is not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
