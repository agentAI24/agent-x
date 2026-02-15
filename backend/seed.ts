import { supabase } from './src/lib/supabase';

async function seed() {
  console.log('Creating system user...');
  const { data: userData, error: uError } = await supabase.auth.admin.createUser({
    email: 'admin@agent-x.io',
    password: 'password123',
    email_confirm: true
  });

  if (uError) {
    console.error('User creation error:', uError.message);
    // If user exists, we might need to fetch it
    if (!uError.message.includes('already exists')) return;
  }

  const userId = userData?.user?.id || (await supabase.from('profiles').select('id').eq('username', 'admin@agent-x.io').single()).data?.id;
  
  if (!userId) {
     // fallback if user existed but we couldn't get ID easily without another query
     const { data } = await supabase.from('profiles').select('id').limit(1).single();
     if (!data) return;
  }

  console.log('Seeding initial skills...');
  const { data: catData } = await supabase.from('categories').select('id').eq('slug', 'nlp').single();
  
  const { error: sError } = await supabase.from('skills').insert([
    {
      author_id: userId,
      title: 'GPT-4 Code Architect',
      description: 'Advanced prompt engineering for building complex backend systems with Node.js and TypeScript.',
      price: 150,
      category_id: catData?.id,
      status: 'approved',
      tags: ['coding', 'gpt-4', 'architecture']
    },
    {
      author_id: userId,
      title: 'Sentiment Bot X',
      description: 'NLP module for analyzing crypto twitter sentiment in real-time.',
      price: 45,
      category_id: catData?.id,
      status: 'approved',
      tags: ['nlp', 'crypto', 'twitter']
    }
  ]);

  if (sError) {
    console.error('❌ Error seeding skills:', sError.message);
  } else {
    console.log('✅ Base successfully seeded!');
  }
}

seed();
