import { supabase } from './lib/supabase';

export async function syncWalletWithProfile(address: string) {
  try {
    // 1. Проверяем, есть ли уже активная сессия в Supabase
    const { data: { session } } = await supabase.auth.getSession();
    let userId = session?.user?.id;

    // 2. Если сессии нет, создаем анонимный вход (чтобы был ID в базе)
    if (!session) {
      console.log('No Supabase session. Signing in anonymously...');
      const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
      if (authError) throw authError;
      userId = authData.user?.id;
    }

    if (userId) {
      // 3. Проверяем, привязан ли уже этот кошелек к какому-то профилю
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('wallet_address', address)
        .single();

      if (existingProfile && existingProfile.id !== userId) {
        console.log('This wallet is already linked to another profile:', existingProfile.id);
        // Тут в будущем можно сделать логику "переезда" на старый профиль
        return;
      }

      // 4. Обновляем текущий профиль адресом кошелька
      console.log('Syncing wallet', address, 'with profile', userId);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          wallet_address: address,
          username: `agent_${address.slice(2, 8)}`
          // role оставляем какой есть, или 'user' по дефолту
        })
        .eq('id', userId);
      
      if (updateError) throw updateError;
      console.log('✅ Wallet linked to Supabase profile successfully!');
    }
  } catch (err) {
    console.error('🛠 Auth Sync Error:', err);
  }
}
