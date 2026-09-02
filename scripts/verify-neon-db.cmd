@echo off
cd /d "c:\Users\PC\Desktop\ugc-goat"
set DATABASE_URL=postgresql://neondb_owner:npg_C6o1ImRjyAfL@ep-damp-mud-a5w18nwh-pooler.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require
set DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_C6o1ImRjyAfL@ep-damp-mud-a5w18nwh.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require
npx prisma migrate dev --name init --skip-seed
npx tsx prisma/seed.ts
"C:\Program Files\nodejs\node.exe" -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); (async () => { const counts = { campaigns: await prisma.campaign.count(), creators: await prisma.creator.count(), submissions: await prisma.submission.count(), payouts: await prisma.payout.count() }; console.log(JSON.stringify(counts)); await prisma.$disconnect(); })().catch(err => { console.error(err); process.exit(1); });"
