import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('❌ Ошибка подключения:', error.message);
  } else {
    console.log('✅ Связь с Supabase установлена! Категории в базе:', data.length);
  }
}

testConnection();
