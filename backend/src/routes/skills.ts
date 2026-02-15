import { FastifyInstance } from 'fastify';
import { supabase } from '../lib/supabase';

export default async function (fastify: FastifyInstance) {
  // GET all skills
  fastify.get('/api/skills', async (request, reply) => {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        author:profiles(username, avatar_url),
        category:categories(name)
      `)
      .eq('status', 'approved');

    if (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: 'Database error' });
    }

    // Map DB structure to Frontend types if needed
    const skills = data.map(s => ({
      ...s,
      author: s.author?.username || 'Unknown',
      category: s.category?.name || 'Uncategorized',
      // Ensure downloads and rating have defaults if not in DB
      downloads: s.sales_count || 0,
      rating: s.rating || 4.5
    }));

    return skills;
  });

  // GET single skill
  fastify.get('/api/skills/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        author:profiles(*),
        category:categories(name),
        reviews:reviews(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      fastify.log.error(error);
      return reply.code(404).send({ error: 'Skill not found' });
    }

    const skill = {
      ...data,
      author: data.author?.username || 'Unknown',
      category: data.category?.name || 'Uncategorized',
      downloads: data.sales_count || 0,
      rating: data.rating || 4.5
    };

    return skill;
  });
}
