#!/bin/bash
# 下载项目所需图片到本地
# 使用 curl 下载并保存到 public/images 目录

BASE_DIR="/Users/jano/.openclaw/workspace/my-app/public/images"

# 创建目录
mkdir -p "$BASE_DIR/projects"
mkdir -p "$BASE_DIR/business"
mkdir -p "$BASE_DIR/team"
mkdir -p "$BASE_DIR/news"

# 项目图片
echo "下载项目图片..."
curl -sL "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/wind-farm.jpg"
curl -sL "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/wind-turbine.jpg"
curl -sL "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/wind-offshore.jpg"
curl -sL "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/wind-installation.jpg"
curl -sL "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/solar-farm.jpg"
curl -sL "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/solar-rooftop.jpg"
curl -sL "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/solar-desert.jpg"
curl -sL "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/solar-closeup.jpg"
curl -sL "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/storage-battery.jpg"
curl -sL "https://images.unsplash.com/photo-1565514020176-dbf2277e4955?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/storage-facility.jpg"
curl -sL "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop" -o "$BASE_DIR/projects/storage-substation.jpg"

# 业务图片
echo "下载业务图片..."
curl -sL "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop" -o "$BASE_DIR/business/development.jpg"
curl -sL "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop" -o "$BASE_DIR/business/investment.jpg"
curl -sL "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&auto=format&fit=crop" -o "$BASE_DIR/business/epc.jpg"
curl -sL "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop" -o "$BASE_DIR/business/operation.jpg"

# 团队图片
echo "下载团队图片..."
curl -sL "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop" -o "$BASE_DIR/team/member-1.jpg"
curl -sL "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop" -o "$BASE_DIR/team/member-2.jpg"
curl -sL "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop" -o "$BASE_DIR/team/member-3.jpg"
curl -sL "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop" -o "$BASE_DIR/team/member-4.jpg"

echo "图片下载完成！"
echo "下载的图片列表："
find "$BASE_DIR" -type f -name "*.jpg"
