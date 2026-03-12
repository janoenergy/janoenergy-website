const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: 'postgresql://postgres:DXTDPGtJnhsJOqvuvgpdvVwaioDOaNqU@trolley.proxy.rlwy.net:43925/railway',
  ssl: {
    rejectUnauthorized: false
  }
});

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function createAdmin() {
  const client = await pool.connect();
  try {
    const username = 'admin';
    const password = 'jano2024';
    const passwordHash = hashPassword(password);

    // 检查用户是否已存在
    const checkResult = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (checkResult.rows.length > 0) {
      console.log('⚠️ 管理员账号已存在，更新密码...');
      await client.query(
        'UPDATE users SET password_hash = $1 WHERE username = $2',
        [passwordHash, username]
      );
      console.log('✅ 密码已更新');
    } else {
      console.log('🔄 创建管理员账号...');
      await client.query(
        'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)',
        [username, passwordHash, 'admin']
      );
      console.log('✅ 管理员账号创建成功');
    }

    console.log('\n📋 管理员账号信息:');
    console.log(`  用户名: ${username}`);
    console.log(`  密码: ${password}`);
    console.log(`  角色: admin`);
    
  } catch (err) {
    console.error('❌ 错误:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

createAdmin();
