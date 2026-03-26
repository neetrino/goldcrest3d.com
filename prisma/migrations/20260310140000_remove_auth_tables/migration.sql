-- Remove Admin auth: drop Auth.js / NextAuth tables (User, Account, Session, VerificationToken)

DROP TABLE IF EXISTS "Session";
DROP TABLE IF EXISTS "Account";
DROP TABLE IF EXISTS "User";
DROP TABLE IF EXISTS "VerificationToken";
