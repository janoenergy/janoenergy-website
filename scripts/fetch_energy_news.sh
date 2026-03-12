#!/bin/bash
# 新能源政策与电价信息抓取脚本
# 天津、广东、四川

set -e

WORK_DIR="$HOME/.openclaw/workspace"
DATA_DIR="$WORK_DIR/data/news"
DATE=$(date +%Y-%m-%d)

echo "[$(date)] 开始抓取新能源政策与电价信息..."

# 创建数据目录
mkdir -p "$DATA_DIR"

# 输出文件
OUTPUT_FILE="$DATA_DIR/news_$DATE.json"

# 初始化 JSON 结构
cat > "$OUTPUT_FILE" << 'JSON_EOF'
{
  "date": "DATE_PLACEHOLDER",
  "sources": [
    {
      "region": "天津",
      "source": "天津市发展和改革委员会",
      "url": "https://fzgg.tj.gov.cn/",
      "items": []
    },
    {
      "region": "广东",
      "source": "广东省发展和改革委员会",
      "url": "https://drc.gd.gov.cn/",
      "items": []
    },
    {
      "region": "四川",
      "source": "四川省发展和改革委员会",
      "url": "https://fgw.sc.gov.cn/",
      "items": []
    },
    {
      "region": "全国",
      "source": "国家能源局",
      "url": "https://www.nea.gov.cn/",
      "items": []
    },
    {
      "region": "电力交易",
      "source": "北京电力交易中心",
      "url": "https://www.bjptc.com/",
      "items": []
    },
    {
      "region": "电力交易",
      "source": "广州电力交易中心",
      "url": "https://www.gzptc.com/",
      "items": []
    }
  ]
}
JSON_EOF

# 替换日期
sed -i '' "s/DATE_PLACEHOLDER/$DATE/g" "$OUTPUT_FILE"

# 尝试抓取天津发改委
echo "[$(date)] 抓取天津发改委..."
curl -s -L --max-time 10 "https://fzgg.tj.gov.cn/zwgk/zcwj/zcjd/" -H "User-Agent: Mozilla/5.0" 2>/dev/null | grep -iE "(新能源|光伏|风电|电价|电力|市场化)" | head -5 > /tmp/tj_news.txt || true

# 尝试抓取广东发改委
echo "[$(date)] 抓取广东发改委..."
curl -s -L --max-time 10 "https://drc.gd.gov.cn/zwgk/zcwj/zcjd/" -H "User-Agent: Mozilla/5.0" 2>/dev/null | grep -iE "(新能源|光伏|风电|电价|电力|市场化)" | head -5 > /tmp/gd_news.txt || true

# 尝试抓取四川发改委
echo "[$(date)] 抓取四川发改委..."
curl -s -L --max-time 10 "https://fgw.sc.gov.cn/scfgw/zwgk/zcwj/zcjd/" -H "User-Agent: Mozilla/5.0" 2>/dev/null | grep -iE "(新能源|光伏|风电|电价|电力|市场化)" | head -5 > /tmp/sc_news.txt || true

# 尝试抓取国家能源局
echo "[$(date)] 抓取国家能源局..."
curl -s -L --max-time 10 "https://www.nea.gov.cn/zwgk/zcwj/zcjd/" -H "User-Agent: Mozilla/5.0" 2>/dev/null | grep -iE "(新能源|光伏|风电|电价|电力|市场化)" | head -5 > /tmp/nea_news.txt || true

echo "[$(date)] 抓取完成，结果保存至: $OUTPUT_FILE"

# 显示统计
echo "=== 抓取统计 ==="
echo "天津: $(wc -l < /tmp/tj_news.txt 2>/dev/null || echo 0) 条"
echo "广东: $(wc -l < /tmp/gd_news.txt 2>/dev/null || echo 0) 条"
echo "四川: $(wc -l < /tmp/sc_news.txt 2>/dev/null || echo 0) 条"
echo "国家: $(wc -l < /tmp/nea_news.txt 2>/dev/null || echo 0) 条"
