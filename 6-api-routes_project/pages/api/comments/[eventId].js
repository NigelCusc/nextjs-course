import {
  insertDocument,
  connectDatabase,
  find,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connection to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    // Add server side validation
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      client.close();
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    }
  }

  if (req.method === 'GET') {
    const filter = { eventId };
    try {
      const comments = await find(client, 'comments', filter, { _id: -1 });
      client.close();
      res.status(200).json({ comments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Fetching data failed!' });
    }
  }
}

export default handler;
