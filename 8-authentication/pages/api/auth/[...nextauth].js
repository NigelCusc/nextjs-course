import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log(email);
        console.log(password);
        const client = await connectToDatabase();
        const usersCollection = client.db('nextjsAuth').collection('users');
        const user = await usersCollection.findOne({ email });
        console.log(user);

        if (!user) {
          throw new Error('Email or Password is incorrect!');
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error('Email or Password is incorrect!');
        }

        return { email: user.email };

        client.close();
      },
    }),
  ],
});
