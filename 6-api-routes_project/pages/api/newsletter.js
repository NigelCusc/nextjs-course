import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Connection to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter-emails', { email: userEmail });
      client.close();
      res.status(201).json({ message: 'Successfully signed up!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Inserting data failed!' });
    }
  }
}

export default handler;
