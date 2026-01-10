import { NextRequest } from 'next/server';
import { deleteQuery, deleteAllQueries } from '@/lib/engine/db';

// DELETE /api/admin/queries - delete one or all queries
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const all = searchParams.get('all');

    if (all === 'true') {
      const success = await deleteAllQueries();
      if (success) {
        return Response.json({ success: true, message: 'All queries deleted' });
      } else {
        return Response.json({ success: false, error: 'Failed to delete queries' }, { status: 500 });
      }
    }

    if (id) {
      const success = await deleteQuery(id);
      if (success) {
        return Response.json({ success: true, message: 'Query deleted' });
      } else {
        return Response.json({ success: false, error: 'Failed to delete query' }, { status: 500 });
      }
    }

    return Response.json({ error: 'Missing id or all parameter' }, { status: 400 });
  } catch (error) {
    console.error('[API] Delete error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
