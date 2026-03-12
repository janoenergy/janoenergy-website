#!/usr/bin/env python3
import psycopg2
from datetime import datetime

DB_URL = "postgresql://postgres:DXTDPGtJnhsJOqvuvgpdvVwaioDOaNqU@trolley.proxy.rlwy.net:43925/railway"

projects = [
    {
        "title": "内蒙古乌兰察布80MW风电项目",
        "title_en": "Ulanqab 80MW Wind Power Project",
        "category": "wind",
        "location": "内蒙古自治区乌兰察布市",
        "location_en": "Ulanqab City, Inner Mongolia",
        "capacity": "80MW",
        "description": "项目总投资约5.2亿元，安装32台2.5MW风力发电机组，年发电量约1.6亿千瓦时。项目于2022年6月并网发电，目前已稳定运行超过2年。",
        "description_en": "Total investment of about 520 million yuan, 32 sets of 2.5MW wind turbines, annual power generation of about 160 million kWh. Grid-connected in June 2022, stable operation for over 2 years.",
        "status": "operation",
        "start_date": "2021-09-01",
        "end_date": "2022-06-30"
    },
    {
        "title": "山东德州30MW分布式光伏项目",
        "title_en": "Dezhou 30MW Distributed Solar Project",
        "category": "solar",
        "location": "山东省德州市",
        "location_en": "Dezhou City, Shandong",
        "capacity": "30MW",
        "description": "项目总投资约1.2亿元，利用工商业屋顶建设分布式光伏电站，年发电量约3500万千瓦时。项目采用自发自用、余电上网模式，为企业降低用电成本。",
        "description_en": "Total investment of about 120 million yuan, utilizing commercial and industrial rooftops for distributed solar power, annual generation of about 35 million kWh. Self-consumption with surplus power fed to grid.",
        "status": "operation",
        "start_date": "2023-03-01",
        "end_date": "2023-12-31"
    },
    {
        "title": "江苏盐城100MWh储能电站项目",
        "title_en": "Yancheng 100MWh Energy Storage Project",
        "category": "storage",
        "location": "江苏省盐城市",
        "location_en": "Yancheng City, Jiangsu",
        "capacity": "100MWh",
        "description": "项目总投资约4.0亿元，建设100MWh电化学储能电站，配套50MW/100MWh磷酸铁锂电池系统。项目参与电网调峰调频，提供辅助服务。",
        "description_en": "Total investment of about 400 million yuan, constructing 100MWh electrochemical energy storage station with 50MW/100MWh lithium iron phosphate battery system. Provides grid peak shaving and frequency regulation services.",
        "status": "construction",
        "start_date": "2024-06-01",
        "end_date": None
    },
    {
        "title": "河北张家口200MW光伏基地项目",
        "title_en": "Zhangjiakou 200MW Solar Base Project",
        "category": "solar",
        "location": "河北省张家口市",
        "location_en": "Zhangjiakou City, Hebei",
        "capacity": "200MW",
        "description": "项目总投资约7.5亿元，建设大型地面光伏电站，配套储能设施。项目充分利用张家口地区丰富的太阳能资源，年发电量约2.4亿千瓦时。",
        "description_en": "Total investment of about 750 million yuan, large-scale ground-mounted solar power plant with energy storage facilities. Utilizes abundant solar resources in Zhangjiakou, annual generation of about 240 million kWh.",
        "status": "planning",
        "start_date": None,
        "end_date": None
    },
    {
        "title": "湖南郴州45MW风电项目",
        "title_en": "Chenzhou 45MW Wind Power Project",
        "category": "wind",
        "location": "湖南省郴州市",
        "location_en": "Chenzhou City, Hunan",
        "capacity": "45MW",
        "description": "项目总投资约3.0亿元，安装18台2.5MW风力发电机组，年发电量约9000万千瓦时。项目采用低风速风机技术，充分利用当地风资源。",
        "description_en": "Total investment of about 300 million yuan, 18 sets of 2.5MW wind turbines, annual generation of about 90 million kWh. Utilizes low wind speed turbine technology.",
        "status": "operation",
        "start_date": "2022-01-01",
        "end_date": "2022-12-31"
    },
    {
        "title": "浙江宁波50MW光储一体化项目",
        "title_en": "Ningbo 50MW Solar-Storage Integration Project",
        "category": "storage",
        "location": "浙江省宁波市",
        "location_en": "Ningbo City, Zhejiang",
        "capacity": "50MW+25MWh",
        "description": "项目总投资约2.8亿元，建设50MW光伏电站配套25MWh储能系统。项目实现光储协同运行，提高新能源消纳能力，参与电力市场交易。",
        "description_en": "Total investment of about 280 million yuan, 50MW solar plant with 25MWh energy storage system. Achieves solar-storage coordinated operation, improving renewable energy consumption.",
        "status": "construction",
        "start_date": "2024-01-01",
        "end_date": None
    },
    {
        "title": "云南大理150MW光伏项目",
        "title_en": "Dali 150MW Solar Project",
        "category": "solar",
        "location": "云南省大理州",
        "location_en": "Dali Prefecture, Yunnan",
        "capacity": "150MW",
        "description": "项目总投资约5.8亿元，建设山地光伏电站，充分利用云南高原太阳能资源。项目年发电量约1.9亿千瓦时，助力西南地区清洁能源发展。",
        "description_en": "Total investment of about 580 million yuan, mountain solar power plant utilizing highland solar resources. Annual generation of about 190 million kWh, supporting clean energy development in southwest China.",
        "status": "planning",
        "start_date": None,
        "end_date": None
    },
    {
        "title": "山西大同70MW风电项目",
        "title_en": "Datong 70MW Wind Power Project",
        "category": "wind",
        "location": "山西省大同市",
        "location_en": "Datong City, Shanxi",
        "capacity": "70MW",
        "description": "项目总投资约4.6亿元，安装28台2.5MW风力发电机组，年发电量约1.4亿千瓦时。项目充分利用山西北部优质风资源，助力能源转型。",
        "description_en": "Total investment of about 460 million yuan, 28 sets of 2.5MW wind turbines, annual generation of about 140 million kWh. Utilizes high-quality wind resources in northern Shanxi.",
        "status": "operation",
        "start_date": "2021-06-01",
        "end_date": "2022-03-31"
    },
    {
        "title": "甘肃酒泉200MWh储能项目",
        "title_en": "Jiuquan 200MWh Energy Storage Project",
        "category": "storage",
        "location": "甘肃省酒泉市",
        "location_en": "Jiuquan City, Gansu",
        "capacity": "200MWh",
        "description": "项目总投资约8.0亿元，建设200MWh大型储能电站，配套新能源基地。项目提供电网侧储能服务，参与调峰调频和备用容量市场。",
        "description_en": "Total investment of about 800 million yuan, 200MWh large-scale energy storage station supporting renewable energy base. Provides grid-side storage services for peak shaving and frequency regulation.",
        "status": "planning",
        "start_date": None,
        "end_date": None
    }
]

def insert_projects():
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    
    now = datetime.now()
    
    for p in projects:
        cur.execute("""
            INSERT INTO projects (
                title, title_en, category, location, location_en,
                capacity, description, description_en, status,
                start_date, end_date, image_url, created_at, updated_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            p["title"], p["title_en"], p["category"], p["location"], p["location_en"],
            p["capacity"], p["description"], p["description_en"], p["status"],
            p["start_date"], p["end_date"], None, now, now
        ))
        print(f"✓ Added: {p['title']}")
    
    conn.commit()
    
    # 验证
    cur.execute("SELECT COUNT(*) FROM projects")
    count = cur.fetchone()[0]
    print(f"\n✅ Total projects: {count}")
    
    cur.close()
    conn.close()

if __name__ == "__main__":
    insert_projects()
