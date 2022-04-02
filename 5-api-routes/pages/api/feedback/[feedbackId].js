import { buildFeedbackPath, extractFeedback } from '.';

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  const selected = data.find((feedback) => feedback.id === feedbackId);
  console.log(selected);
  res.status(200).json({ feedback: selected });
}

export default handler;
