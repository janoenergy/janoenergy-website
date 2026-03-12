# Cloudflare 访问日志分析报告

**生成时间**: 2026-03-10 19:13:44
**分析条目数**: 10

## 总体统计

| 指标 | 数值 |
|------|------|
| 总请求数 | 10 |
| 独立 IP 数 | 5 |
| 涉及国家 | 5 |

## IP 访问排行 (Top 10)

| 排名 | IP 地址 | 访问次数 | 国家 | 城市 |
|------|---------|----------|------|------|
| 1 | `203.0.113.45` | 4 | China | Beijing, Shanghai |
| 2 | `198.51.100.22` | 3 | United States | Los Angeles |
| 3 | `192.0.2.100` | 1 | Japan | Tokyo |
| 4 | `198.51.100.50` | 1 | Singapore | Singapore |
| 5 | `192.0.2.200` | 1 | Germany | Frankfurt |

## 国家分布

| 国家 | 请求数 | 占比 |
|------|--------|------|
| China | 4 | 40.0% |
| United States | 3 | 30.0% |
| Japan | 1 | 10.0% |
| Singapore | 1 | 10.0% |
| Germany | 1 | 10.0% |

## 异常检测

✅ 未发现明显异常

## 原始数据样本 (最近 5 条)

```json
[
  {
    "datetime": "2026-03-10T10:30:00Z",
    "clientIP": "203.0.113.45",
    "clientCountryName": "China",
    "clientCityName": "Beijing",
    "clientRequestHTTPHost": "dev.janoenergy.com",
    "clientRequestPath": "/",
    "edgeResponseStatus": 200
  },
  {
    "datetime": "2026-03-10T10:35:00Z",
    "clientIP": "203.0.113.45",
    "clientCountryName": "China",
    "clientCityName": "Beijing",
    "clientRequestHTTPHost": "dev.janoenergy.com",
    "clientRequestPath": "/api/status",
    "edgeResponseStatus": 200
  },
  {
    "datetime": "2026-03-10T11:00:00Z",
    "clientIP": "198.51.100.22",
    "clientCountryName": "United States",
    "clientCityName": "Los Angeles",
    "clientRequestHTTPHost": "dev.janoenergy.com",
    "clientRequestPath": "/",
    "edgeResponseStatus": 200
  },
  {
    "datetime": "2026-03-10T11:05:00Z",
    "clientIP": "198.51.100.22",
    "clientCountryName": "United States",
    "clientCityName": "Los Angeles",
    "clientRequestHTTPHost": "dev.janoenergy.com",
    "clientRequestPath": "/dashboard",
    "edgeResponseStatus": 200
  },
  {
    "datetime": "2026-03-10T11:10:00Z",
    "clientIP": "198.51.100.22",
    "clientCountryName": "United States",
    "clientCityName": "Los Angeles",
    "clientRequestHTTPHost": "dev.janoenergy.com",
    "clientRequestPath": "/settings",
    "edgeResponseStatus": 200
  }
]
```
