import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const supabase = await createClient();

  // Use .ilike() for a case-insensitive "contains" search
  // The '%' are wildcards, so it finds any county containing the query text
  const { data, error } = await supabase
    .from('users_doctors')
    .select() // You can specify columns here, e.g., .select('id, name, county')
    .ilike('county', `%${query}%`);

  if (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}