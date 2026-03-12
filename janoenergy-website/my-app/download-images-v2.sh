#!/bin/bash

# 下载项目真实图片
# 使用 Unsplash 免费商用图片

mkdir -p public/images/projects
mkdir -p public/images/news
mkdir -p public/images/business
mkdir -p public/images/about

# 项目图片
echo "下载项目图片..."

# 风电项目1 - 西龙虎峪
curl -L -o public/images/projects/wind.jpg "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80"

# 风电项目2 - 张家口
curl -L -o public/images/projects/wind-2.jpg "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80"

# 光伏项目1 - 茂名
curl -L -o public/images/projects/solar.jpg "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"

# 光伏项目2 - 青岛
curl -L -o public/images/projects/solar-2.jpg "https://images.unsplash.com/photo-1545208942-e0c45d2d0070?w=800&q=80"

# 储能项目1 - 甘孜
curl -L -o public/images/projects/storage.jpg "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80"

# 储能项目2 - 内蒙古
curl -L -o public/images/projects/storage-2.jpg "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80"

echo "下载新闻图片..."

# 新闻图片
curl -L -o public/images/news/news-1.jpg "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80"
curl -L -o public/images/news/news-2.jpg "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
curl -L -o public/images/news/news-3.jpg "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
curl -L -o public/images/news/news-4.jpg "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
curl -L -o public/images/news/news-5.jpg "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80"
curl -L -o public/images/news/news-6.jpg "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80"

echo "下载业务板块图片..."

curl -L -o public/images/business/development.jpg "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
curl -L -o public/images/business/investment.jpg "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80"
curl -L -o public/images/business/epc.jpg "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
curl -L -o public/images/business/operation.jpg "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"

echo "下载关于我们图片..."

curl -L -o public/images/about/company.jpg "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"

echo "图片下载完成！"
ls -la public/images/
