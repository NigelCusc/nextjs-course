import { connectDatabase, insertDocument } from '../../lib/db-util';

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connection to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    // Store in database
    const newMessage = {
      email,
      name,
      message,
    };

    try {
      const result = await insertDocument(client, 'contact', newMessage);
      newMessage._id = result.insertedId;
      client.close();
      res
        .status(201)
        .json({ message: 'Successfully Submitted!.', contact: newMessage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Submit failed!' });
    }
  }
}

export default handler;
