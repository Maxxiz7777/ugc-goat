const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const counts = {
    campaigns: await prisma.campaign.count(),
    creators: await prisma.creator.count(),
    submissions: await prisma.submission.count(),
    payouts: await prisma.payout.count(),
  };

  console.log(JSON.stringify(counts));
}

main()
  .catch((error) => {
    console.error('DB check failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
