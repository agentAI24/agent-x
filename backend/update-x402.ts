import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSchema() {
  console.log('Updating profiles and skills for x402...');
  
  // Добавляем поля для x402 в таблицу skills
  const { error: sError } = await supabase.rpc('install_missing_columns', {
    sql: `
      ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS x402_enabled boolean DEFAULT false;
      ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS api_endpoint text;
      ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS price_per_call numeric DEFAULT 0;
    `
  });

  // Если RPC не настроен, я просто напомню тебе сделать это в SQL Editor
  if (sError) {
    console.log('⚠️ Не удалось обновить базу программно (нужны права RPC).');
    console.log('Пожалуйста, выполни этот SQL в Supabase SQL Editor:');
    console.log(`
      ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS x402_enabled boolean DEFAULT false;
      ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS api_endpoint text;
      ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS price_per_call numeric DEFAULT 0;
    `);
  } else {
    console.log('✅ База обновлена под x402!');
  }
}

updateSchema();
