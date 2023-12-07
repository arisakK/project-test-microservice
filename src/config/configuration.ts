export default (): Record<string, any> => ({
  tcpHost: process.env.TCP_HOST,
  tcpPost: process.env.TCP_POST,
  rmqUrl: process.env.RMQ_URL,
  post: process.env.POST,
  QUEUE: process.env.QUEUE,
});
