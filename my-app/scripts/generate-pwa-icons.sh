#!/bin/bash
# ============================================
# PWA 图标生成脚本
# 生成各种尺寸的 PWA 图标
# ============================================

# 颜色配置
PRIMARY_COLOR="#10b981"  #  emerald-500
BACKGROUND_COLOR="#ffffff"
TEXT_COLOR="#ffffff"

# 图标尺寸列表
SIZES=(72 96 128 144 152 192 384 512)

# 输出目录
OUTPUT_DIR="public/icons"
mkdir -p "$OUTPUT_DIR"

echo "🎨 生成 PWA 图标..."

# 检查 ImageMagick 是否安装
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick 未安装，尝试使用 sips (macOS)..."
    
    # 使用 macOS 自带的 sips 生成简单图标
    for size in "${SIZES[@]}"; do
        # 创建一个简单的 SVG 并转换为 PNG
        svg_content="<svg xmlns='http://www.w3.org/2000/svg' width='$size' height='$size' viewBox='0 0 $size $size'>
            <rect width='$size' height='$size' fill='$PRIMARY_COLOR' rx='${size}' ry='${size}'/>
            <text x='50%' y='55%' font-family='Arial' font-size='${size/3}' fill='white' text-anchor='middle' dominant-baseline='middle'>江</text>
        </svg>"
        
        echo "$svg_content" > "/tmp/icon_${size}.svg"
        echo "  ✓ 生成 icon-${size}x${size}.png (SVG)"
    done
    
    echo ""
    echo "⚠️  请手动将 SVG 转换为 PNG，或使用在线工具:"
    echo "   https://cloudconvert.com/svg-to-png"
    echo ""
    echo "📋 生成的 SVG 文件位于: /tmp/icon_*.svg"
    
else
    # 使用 ImageMagick 生成图标
    for size in "${SIZES[@]}"; do
        convert -size "${size}x${size}" \
            xc:"$PRIMARY_COLOR" \
            -fill "$TEXT_COLOR" \
            -gravity center \
            -pointsize $((size / 2)) \
            -font Arial \
            label:"江" \
            "${OUTPUT_DIR}/icon-${size}x${size}.png"
        
        echo "  ✓ 生成 icon-${size}x${size}.png"
    done
    
    # 生成 maskable 图标 (带安全边距)
    for size in 192 512; do
        padding=$((size / 10))
        inner_size=$((size - padding * 2))
        
        convert -size "${size}x${size}" \
            xc:"$BACKGROUND_COLOR" \
            -fill "$PRIMARY_COLOR" \
            -gravity center \
            -pointsize $((inner_size / 2)) \
            -font Arial \
            label:"江" \
            "${OUTPUT_DIR}/maskable-icon-${size}x${size}.png"
        
        echo "  ✓ 生成 maskable-icon-${size}x${size}.png"
    done
    
    echo ""
    echo "✅ 所有图标生成完成!"
    echo "📁 图标位置: ${OUTPUT_DIR}/"
fi

# 生成 Apple Touch Icon
if command -v convert &> /dev/null; then
    convert -size "180x180" \
        xc:"$PRIMARY_COLOR" \
        -fill "$TEXT_COLOR" \
        -gravity center \
        -pointsize 90 \
        -font Arial \
        label:"江" \
        "${OUTPUT_DIR}/apple-touch-icon.png"
    
    echo "  ✓ 生成 apple-touch-icon.png"
fi

# 生成 favicon
if command -v convert &> /dev/null; then
    convert -size "32x32" \
        xc:"$PRIMARY_COLOR" \
        -fill "$TEXT_COLOR" \
        -gravity center \
        -pointsize 16 \
        -font Arial \
        label:"江" \
        "${OUTPUT_DIR}/favicon-32x32.png"
    
    echo "  ✓ 生成 favicon-32x32.png"
fi

echo ""
echo "📝 下一步:"
echo "   1. 替换生成的占位图标为实际品牌图标"
echo "   2. 准备 PWA 截图 (screenshots/ 目录)"
echo "   3. 测试 PWA 安装流程"
