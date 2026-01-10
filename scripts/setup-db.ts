#!/usr/bin/env npx tsx
/**
 * Database Setup Script
 *
 * Creates the necessary tables for the Eric Engine.
 *
 * Usage:
 *   npx tsx scripts/setup-db.ts
 *
 * Requires POSTGRES_URL environment variable to be set.
 */

import { initDatabase } from '../lib/engine/db';

async function setup() {
  console.log('Setting up database tables...\n');

  try {
    await initDatabase();
    console.log('Database setup complete.');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setup();
