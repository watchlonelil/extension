import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    const response = await fetch(req.body.url, {
      headers: req.body.headers,
    });
    const body = await response.text();

    res.send({
      status: response.status,
      statusText: response.statusText,
      requestHeaders: req.body.headers,
      responseHeaders: Object.fromEntries(response.headers.entries()),
      body,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

export default handler;