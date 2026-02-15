import { supabase } from './src/lib/supabase';

async function checkNewProfiles() {
  console.log('Checking for recent profiles...');
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('Last 5 profiles in DB:');
    data.forEach(p => {
      console.log(`- User: ${p.username}, Wallet: ${p.wallet_address || 'None'}, Role: ${p.role}`);
    });
  }
}

checkNewProfiles();
