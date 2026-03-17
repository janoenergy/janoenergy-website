const { Client } = require('pg');

const sql = `
-- CreateTable
CREATE TABLE IF NOT EXISTS "company_info" (
    "id" SERIAL NOT NULL,
    "intro" TEXT NOT NULL DEFAULT '',
    "intro_en" TEXT NOT NULL DEFAULT '',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "company_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "milestones" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "description" TEXT NOT NULL,
    "description_en" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "company_values" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "description" TEXT NOT NULL,
    "description_en" TEXT,
    "icon" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "company_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "team_members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "image_url" TEXT,
    "education" TEXT,
    "education_en" TEXT,
    "experience" TEXT,
    "experience_en" TEXT,
    "description" TEXT,
    "description_en" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "business_sections" (
    "id" SERIAL NOT NULL,
    "section_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "subtitle" TEXT,
    "subtitle_en" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "description_en" TEXT,
    "features" TEXT[],
    "features_en" TEXT[],
    "image_url" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "business_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "certificates" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "issuer" TEXT NOT NULL,
    "issuer_en" TEXT,
    "issue_date" TEXT NOT NULL,
    "image_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "honors" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "issuer" TEXT NOT NULL,
    "issuer_en" TEXT,
    "year" TEXT NOT NULL,
    "image_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "honors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "business_sections_section_id_key" ON "business_sections"("section_id");
`;

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres:DXTDPGtJnhsJOqvuvgpdvVwaioDOaNqU@trolley.proxy.rlwy.net:43925/railway'
  });
  
  try {
    await client.connect();
    console.log('Connected to database');
    
    await client.query(sql);
    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
