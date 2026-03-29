import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const recognizedBrands = [
  'Caterpillar', 'Komatsu', 'SANY', 'Volvo', 'SDLG',
  'Shantui', 'JCB', 'CASE', 'Maersk', 'DHL', 'XCMG', 'LIEBHERR'
];

async function updateDB() {
  const brands = await prisma.brandLogo.findMany();
  let updatedCount = 0;

  for (const b of brands) {
    const rawName = b.name.toLowerCase().trim();
    // find match
    const match = recognizedBrands.find(rb => rawName.includes(rb.toLowerCase()));
    
    if (match) {
      const filenameBase = match.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const logoUrl = `/brands/${filenameBase}-logo.svg`;
      
      await prisma.brandLogo.update({
        where: { id: b.id },
        data: { logoUrl }
      });
      console.log(`Updated ${b.name} -> ${logoUrl}`);
      updatedCount++;
    }
  }

  console.log(`Successfully updated ${updatedCount} brands.`);
  process.exit(0);
}

updateDB().catch(console.error);
