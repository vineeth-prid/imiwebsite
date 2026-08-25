// Usage: npm run admin:hash -- "your-password"
// Prints a paste-ready .env line. The `$` characters are backslash-escaped
// because Next.js expands `$NAME` references when it loads .env files.
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password || password.length < 10) {
  console.error('Usage: npm run admin:hash -- "your-password"  (minimum 10 characters)');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log(`ADMIN_PASSWORD_HASH="${hash.split("$").join("\\$")}"`);
