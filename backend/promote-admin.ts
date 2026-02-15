import { supabase } from './src/lib/supabase';

async function promoteToAdmin() {
  const wallet = '0x27F58775546F631B98E01A48367dB6472211e2e5';
  console.log(`Promoting wallet ${wallet} to admin...`);
  
  const { data, error } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('wallet_address', wallet)
    .select();

  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Success! New profile state:', data);
  }
}

promoteToAdmin();
