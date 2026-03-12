#!/bin/bash

cd /Users/jano/.openclaw/workspace/janoenergy-website/my-app/public/images/projects

# 重新下载所有项目图片
echo "重新下载项目图片..."

# 风电
curl -L -o wind.jpg "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80"
curl -L -o wind-2.jpg "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80"

# 光伏
curl -L -o solar.jpg "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
curl -L -o solar-2.jpg "https://images.unsplash.com/photo-1545208942-e0c45d2d0070?w=800&q=80"

# 储能
curl -L -o storage.jpg "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80"
curl -L -o storage-2.jpg "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80"

echo "完成！"
ls -la
