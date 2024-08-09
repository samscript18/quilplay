export default () => ({
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT),
});
