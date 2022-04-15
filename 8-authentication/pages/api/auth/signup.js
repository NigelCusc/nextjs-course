import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  let client;
  try {
    if (req.method === 'POST') {
      const data = req.body;
      console.log(data);
      const { email, password } = data;

      if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
      ) {
        res.status(422).json({
          message:
            'Invalid input - password should also be at 7 characters long.',
        });
        return;
      }
      client = await connectToDatabase();
      const db = client.db('nextjsAuth');

      const existingUser = await db
        .collection('users')
        .findOne({ email: email });
      if (existingUser) {
        res.status(422).json({ message: 'User already exists!' });
        client.close();
        return;
      }
      const hashedPassword = await hashPassword(password);

      const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword,
      });
      client.close();

      return res.status(201).json({ message: 'Created user!' });
    } else {
      return;
    }
  } catch (error) {
    client.close();
    console.log(error);
    res.status(422).json({
      message: 'Something went wrong!',
    });
    return;
  }
}

export default handler;
