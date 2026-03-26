#!/bin/bash
# 下载项目所需图片到本地
# 使用国内可访问的图片源（Pexels/Pixabay CDN）

BASE_DIR="/Users/jano/.openclaw/workspace/my-app/public/images"

# 创建目录
mkdir -p "$BASE_DIR/projects"
mkdir -p "$BASE_DIR/business"
mkdir -p "$BASE_DIR/team"
mkdir -p "$BASE_DIR/news"
mkdir -p "$BASE_DIR/certificates"
mkdir -p "$BASE_DIR/about"
mkdir -p "$BASE_DIR/hero"

echo "========================================"
echo "开始下载图片（使用国内可访问源）..."
echo "========================================"

# ============================================
# 项目图片 - 风电/光伏/储能
# 使用 Pexels 的 CDN 直链（国内访问快）
# ============================================
echo ""
echo "📸 下载项目图片..."

# 风电项目
curl -sL "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/wind-farm.jpg" && echo "✅ wind-farm.jpg" || echo "❌ wind-farm.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/157039/pexels-photo-157039.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/wind-turbine.jpg" && echo "✅ wind-turbine.jpg" || echo "❌ wind-turbine.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/532192/pexels-photo-532192.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/wind-offshore.jpg" && echo "✅ wind-offshore.jpg" || echo "❌ wind-offshore.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/wind-installation.jpg" && echo "✅ wind-installation.jpg" || echo "❌ wind-installation.jpg 下载失败"

# 光伏项目
curl -sL "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/solar-farm.jpg" && echo "✅ solar-farm.jpg" || echo "❌ solar-farm.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/9875448/pexels-photo-9875448.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/solar-rooftop.jpg" && echo "✅ solar-rooftop.jpg" || echo "❌ solar-rooftop.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/1599819/pexels-photo-1599819.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/solar-desert.jpg" && echo "✅ solar-desert.jpg" || echo "❌ solar-desert.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/solar-closeup.jpg" && echo "✅ solar-closeup.jpg" || echo "❌ solar-closeup.jpg 下载失败"

# 储能项目
curl -sL "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/storage-facility.jpg" && echo "✅ storage-facility.jpg" || echo "❌ storage-facility.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/storage-battery.jpg" && echo "✅ storage-battery.jpg" || echo "❌ storage-battery.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/17489156/pexels-photo-17489156.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/storage-substation.jpg" && echo "✅ storage-substation.jpg" || echo "❌ storage-substation.jpg 下载失败"

# 额外项目图片
curl -sL "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/projects/wind-farm-2.jpg" && echo "✅ wind-farm-2.jpg" || echo "❌ wind-farm-2.jpg 下载失败"

# ============================================
# 业务板块图片
# ============================================
echo ""
echo "📸 下载业务板块图片..."

curl -sL "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/business/development.jpg" && echo "✅ development.jpg" || echo "❌ development.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/business/investment.jpg" && echo "✅ investment.jpg" || echo "❌ investment.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/business/epc.jpg" && echo "✅ epc.jpg" || echo "❌ epc.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/business/operation.jpg" && echo "✅ operation.jpg" || echo "❌ operation.jpg 下载失败"

# ============================================
# 团队图片
# ============================================
echo ""
echo "📸 下载团队图片..."

curl -sL "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" \
  -o "$BASE_DIR/team/member-1.jpg" && echo "✅ member-1.jpg" || echo "❌ member-1.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400" \
  -o "$BASE_DIR/team/member-2.jpg" && echo "✅ member-2.jpg" || echo "❌ member-2.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400" \
  -o "$BASE_DIR/team/member-3.jpg" && echo "✅ member-3.jpg" || echo "❌ member-3.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=400" \
  -o "$BASE_DIR/team/member-4.jpg" && echo "✅ member-4.jpg" || echo "❌ member-4.jpg 下载失败"

# ============================================
# 新闻图片
# ============================================
echo ""
echo "📸 下载新闻图片..."

curl -sL "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" \
  -o "$BASE_DIR/news/news-1.jpg" && echo "✅ news-1.jpg" || echo "❌ news-1.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600" \
  -o "$BASE_DIR/news/news-2.jpg" && echo "✅ news-2.jpg" || echo "❌ news-2.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=600" \
  -o "$BASE_DIR/news/news-3.jpg" && echo "✅ news-3.jpg" || echo "❌ news-3.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600" \
  -o "$BASE_DIR/news/news-4.jpg" && echo "✅ news-4.jpg" || echo "❌ news-4.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600" \
  -o "$BASE_DIR/news/news-5.jpg" && echo "✅ news-5.jpg" || echo "❌ news-5.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600" \
  -o "$BASE_DIR/news/news-6.jpg" && echo "✅ news-6.jpg" || echo "❌ news-6.jpg 下载失败"

# ============================================
# 证书图片（使用占位图）
# ============================================
echo ""
echo "📸 下载证书图片..."

curl -sL "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" \
  -o "$BASE_DIR/certificates/cert-1.jpg" && echo "✅ cert-1.jpg" || echo "❌ cert-1.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400" \
  -o "$BASE_DIR/certificates/cert-2.jpg" && echo "✅ cert-2.jpg" || echo "❌ cert-2.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=400" \
  -o "$BASE_DIR/certificates/cert-3.jpg" && echo "✅ cert-3.jpg" || echo "❌ cert-3.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400" \
  -o "$BASE_DIR/certificates/cert-4.jpg" && echo "✅ cert-4.jpg" || echo "❌ cert-4.jpg 下载失败"

# ============================================
# 关于我们页面图片
# ============================================
echo ""
echo "📸 下载关于我们图片..."

curl -sL "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/about/company.jpg" && echo "✅ company.jpg" || echo "❌ company.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800" \
  -o "$BASE_DIR/about/team.jpg" && echo "✅ team.jpg" || echo "❌ team.jpg 下载失败"

# ============================================
# 首页轮播图
# ============================================
echo ""
echo "📸 下载首页轮播图..."

curl -sL "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1200" \
  -o "$BASE_DIR/hero/hero-1.jpg" && echo "✅ hero-1.jpg" || echo "❌ hero-1.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1200" \
  -o "$BASE_DIR/hero/hero-2.jpg" && echo "✅ hero-2.jpg" || echo "❌ hero-2.jpg 下载失败"

curl -sL "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200" \
  -o "$BASE_DIR/hero/hero-3.jpg" && echo "✅ hero-3.jpg" || echo "❌ hero-3.jpg 下载失败"

echo ""
echo "========================================"
echo "下载完成！"
echo "========================================"
echo ""
echo "📁 下载的图片列表："
find "$BASE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | sort | while read f; do
  size=$(du -h "$f" | cut -f1)
  echo "  $size  $(basename "$f")"
done

echo ""
echo "总计: $(find "$BASE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | wc -l) 张图片"
