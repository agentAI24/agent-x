import Fastify from 'fastify';
import skillsRoutes from './routes/skills';

const fastify = Fastify({
  logger: true
});

fastify.register(skillsRoutes);

fastify.get('/health', async (request, reply) => {
  return { status: 'ok', uptime: process.uptime() };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
