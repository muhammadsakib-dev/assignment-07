
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

const client = new MongoClient(
  requiredEnv("BETTER_AUTH_MONGO_URI")
);

const db = client.db("Assignment-07");

export const auth = betterAuth({
  baseURL: requiredEnv("BETTER_AUTH_URL"),

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: requiredEnv("BETTER_AUTH_GOOGLE_CLIENT_ID"),
      clientSecret: requiredEnv("BETTER_AUTH_GOOGLE_CLIENT_SECRET"),
    },

    github: {
      clientId: requiredEnv("BETTER_AUTH_GITHUB_CLIENT_ID"),
      clientSecret: requiredEnv("BETTER_AUTH_GITHUB_CLIENT_SECRET"),
    },
  },

  
account: {
  accountLinking: {
    enabled: true,
    disableImplicitLinking: true,
  },
},

});
