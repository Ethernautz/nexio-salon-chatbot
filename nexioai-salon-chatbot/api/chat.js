export default async function handler(req, res) {
  const { userMessage } = req.body;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are NexioAI, a friendly and professional assistant for a hair salon. Answer questions about services, hours, location, and collect appointment info including name, date, time, and service type.' },
        { role: 'user', content: userMessage }
      ]
    }),
  });

  const data = await openaiRes.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
