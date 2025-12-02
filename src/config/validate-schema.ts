import Joi from 'joi';

export const validateSchema = () =>
  Joi.object({
    NODE_ENV: Joi.string().valid('local', 'dev', 'prod').default('local'),
    PORT: Joi.number().default(26000),
    MONGODB_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('7d'),
    JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('30d'),
    ALLOWED_CORS_ORIGIN: Joi.string().optional(),
    // Google OAuth (선택사항)
    GOOGLE_CLIENT_ID: Joi.string().optional(),
    GOOGLE_CLIENT_SECRET: Joi.string().optional(),
    GOOGLE_IOS_CLIENT_ID: Joi.string().optional(),
    GOOGLE_CALLBACK_URL: Joi.string().optional(),
    // Apple Sign In (선택사항)
    APPLE_CLIENT_ID: Joi.string().optional(),
  });
