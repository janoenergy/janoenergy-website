#!/bin/bash

# 创建图片目录
mkdir -p public/images/projects
mkdir -p public/images/about
mkdir -p public/images/business

echo "正在下载图片..."

# 首页 Hero 背景 - 风力发电机
curl -L "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&q=80" -o public/images/hero.jpg

# 风电项目
curl -L "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80" -o public/images/projects/wind.jpg

# 光伏项目
curl -L "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80" -o public/images/projects/solar.jpg

# 储能项目
curl -L "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80" -o public/images/projects/storage.jpg

# 关于我们 - 公司/团队
curl -L "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" -o public/images/about/company.jpg

# 业务板块图片
curl -L "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80" -o public/images/business/development.jpg
curl -L "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" -o public/images/business/investment.jpg
curl -L "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" -o public/images/business/epc.jpg
curl -L "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" -o public/images/business/operation.jpg

echo "图片下载完成！"
echo ""
echo "下载的图片列表："
ls -lh public/images/
ls -lh public/images/projects/
ls -lh public/images/about/
ls -lh public/images/business/
