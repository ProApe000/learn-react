// REACT_APP_SUPABASE_URL=https://sjudymtzivhtzbxyfuwh.supabase.co
// REACT_APP_SUPABASE_PUBLISHABLE_KEY=sb_publishable_p8wUIM90LrQHSgf2saHV6g_KpFmJvPV

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sjudymtzivhtzbxyfuwh.supabase.co';
const supabaseKey = 'sb_publishable_p8wUIM90LrQHSgf2saHV6g_KpFmJvPV';

export const supabase = createClient(supabaseUrl, supabaseKey);
