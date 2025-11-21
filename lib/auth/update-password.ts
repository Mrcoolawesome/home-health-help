'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { GetCmsData } from '../hospice-data/get-cms-data';
import { GENERAL_DATA, PROVIDER_DATA } from '../globals';

export async function SetMarketerPassword(formData: FormData) {
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  // 1. Initialize Server Client (Reads cookies automatically)
  const supabase = await createClient();

  // 2. Check if we actually have a user (from the invite flow)
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Session expired or invalid. Please try clicking the invite link again." };
  }

  // 3. Update the password (ON THE SERVER - No Deadlocks!)
  const { error: updateError } = await supabase.auth.updateUser({ password });

  if (updateError) {
    return { error: updateError.message };
  }

  // 4. Insert the Marketer Data
  const { error: insertError } = await supabase
    .from('users_marketer')
    .insert([{ id: user.id, name: name }]);

  if (insertError) {
    return { error: "Error creating user profile: " + insertError.message };
  }

  // 5. Success - Redirect
  // We redirect here because Server Actions must redirect or return data
  redirect('/');
}

export async function SetHospicePassword(formData: FormData) {
  const name = formData.get('company_name') as string
  const password = formData.get('password') as string
  const placeId = formData.get('placeId') as string
  const phoneNum = formData.get('phoneNum') as string

  const supabase = await createClient()

  // 1. Verify Session
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Session expired. Please click the invite link again." }
  }

  // 2. Update Password (Server Side - No Deadlock)
  const { error: updateError } = await supabase.auth.updateUser({ password })

  if (updateError) {
    return { error: updateError.message }
  }

  // 3. Fetch CMS Data (Done on server now)
  // Note: Ensure GetCmsData can run server-side (uses fetch/axios, not window)
  try {
    const cmsPhoneQuery = `[SELECT ccn FROM ${GENERAL_DATA}][WHERE telephone_number = "${phoneNum}"]`;

    // Assuming GetCmsData is synchronous or you might need to await it if it returns a promise
    const cmsData = GetCmsData(cmsPhoneQuery);
    console.log("CMS Data Found:", cmsData);

    // If you need to use the 'ccn' from cmsData, extract it here.
    // For now, I am proceeding with the insert as per your original code.
  } catch (err) {
    console.error("Error fetching CMS data:", err);
    // Decide if you want to stop here or continue. I'm letting it continue.
  }

  // 4. Insert into users_hospice
  const { error: insertError } = await supabase
    .from('users_hospice')
    .insert([{
      id: user.id,
      company_name: name,
      placeId: placeId
      // Add 'ccn' here if you extracted it from cmsData
    }]);

  if (insertError) {
    return { error: "Error creating hospice profile: " + insertError.message }
  }

  // 5. Redirect
  redirect('/')
}
