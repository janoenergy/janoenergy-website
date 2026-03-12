#!/bin/bash

# 下载专业占位图片

mkdir -p public/images/team
mkdir -p public/images/certificates

echo "下载团队占位头像..."

# 商务风格头像占位图
curl -L -o public/images/team/ceo.jpg "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
curl -L -o public/images/team/cto.jpg "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
curl -L -o public/images/team/coo.jpg "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
curl -L -o public/images/team/cfo.jpg "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"

echo "下载证书占位图..."

# 证书/资质占位图
curl -L -o public/images/certificates/iso9001.jpg "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80"
curl -L -o public/images/certificates/iso14001.jpg "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
curl -L -o public/images/certificates/iso45001.jpg "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80"
curl -L -o public/images/certificates/epc.jpg "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80"

echo "完成！"
ls -la public/images/team/
ls -la public/images/certificates/
