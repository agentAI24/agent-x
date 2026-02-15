import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSkills() {
  const { data, error } = await supabase.from('skills').select('*');
  if (error) {
    console.error('❌ Error checking skills:', error.message);
  } else {
    console.log('Skills in DB:', data.length);
  }
}

checkSkills();
