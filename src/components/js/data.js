export const BuildingList = {
    //科技建筑
    technology: [
        {
            name: "研究所", //加5科技，无需求
            key: 1,//标号
            build: 10, //建造力需求
            premise: 0
        },
        {
            name: "大型研究所", //加10科技，需求科技>=35
            key: 2,
            build: 14,
            premise: 35
        },
        {
            name: "区立研究中心", //科技加5，城市产出的科技建筑科技额外加1，需求4所研究所/大型研究所，区域唯一
            key: 3,
            build: 14,
            premise: 4
        },
        {
            name: "市立研究中心", //科技+15，城市产出的科技*1.5，城市唯一，需求科技>=60
            key: 4,
            build: 30,
            premise: 60
        },
        {
            name: "公共图书馆",// 每有一个神器使，科技+1，最大+30，需求科技>=30，城市唯一
            key: 5,
            build: 22,
            premise: 30
        },        
        {
            name: "地下研究所", //降低下一次建筑的科技25需求，建设后销毁，无需求
            key: 6,
            build: 22,
            premise: 0
        }
    ],
    //幻力建筑
    magic: [
        {
            name: "工程厅", //加5幻力，无需求
            key: 1,
            build: 10,
            premise: 0
        },
        {
            name: "大型工程厅", //加10幻力，需求科技>=35
            key: 2,
            build: 14,
            premise: 35
        },
        {
            name: "区立工程大厦", //幻力加5，城市产出的幻力建筑幻力额外加1，需求4所工程厅/大型工程厅，区域唯一
            key: 3,
            build: 14,
            premise: 4
        },
        {
            name: "市立工程大厦", //幻力+15，城市产出的幻力*1.5，城市唯一，需求科技>=60
            key: 4,
            build: 30,
            premise: 60
        },
        {
            name: "黑门监测站",// 每有一个神器使，幻力+1，最大+30，需求科技>=30，城市唯一
            key: 5,
            build: 22,
            premise: 30
        }
    ],
    //情报
    intelligence: [
        {
            name: "情报局", //加5情报，无需求
            key: 1,
            build: 10,
            premise: 0 
        },
        {
            name: "大型情报局", //加10情报，需求科技>=35
            key: 2,
            build: 14,
            premise: 35 
        },
        {
            name: "区立情报局", //情报加5，城市产出的情报建筑情报额外加1，需求4所情报局/大型情报局，区域唯一
            key: 3,
            build: 14,
            premise: 4 //4座城市
        },
        {
            name: "市立情报局", //情报+15，城市产出的情报*1.5，城市唯一，需求科技>=60
            key: 4,
            build: 30,
            premise: 60
        },
        {
            name: "情报中心",// 每有一个神器使，情报+1，最大+30，需求科技>=30，城市唯一
            key: 5,
            build: 22,
            premise: 30
        }
    ],
    //特殊
    special:[
        {
            name: "歌舞伎町", //男性巡查该区域，好感额外加1，需求科技>=30
            key: 1,
            build: 22,
            premise: 30
        },
        {
            name: "购物中心", //女性巡查该区域，好感额外加1，需求科技>=30
            key: 2,
            build: 22,
            premise: 30
        },
        {
            name: "地铁枢纽", //初始巡查+3，需求科技>=15，城市最多4座
            key: 3,
            build: 10,
            premise: 15
        },
        {
            name: "规划所", //初始开发+3，需求科技>=15，城市最多4座
            key: 4,
            build: 10,
            premise: 15
        },
        {
            name: "起重机", //初始建设+3，需求科技>=15，城市最多4座
            key: 5,
            build: 10,
            premise: 15
        },
        {
            name: "急救中心", //需求科技>80
            key: 6,
            build: 30,
            premise: 80
        },
        {
            name: "潜水艇", //这个忘了，先设定跟急救中心一样需求科技>30
            key: 7,
            build: 30,
            premise: 30
        },
        {
            name: "烟花祭",
            key: 8,
            build: 22,
            premise: 30
        }
    ]

}
export const ArtifactList = [{ //神器使数量为43
        name: "初音未来",
        patrol: 12,
        build: 1,
        develop: 5,
        sex: 1 //1为女，0为男,未定为null，比如镜音、机器人等
    },
    {
        name: "巡音流歌",
        patrol: 6,
        build: 5,
        develop: 6,
        sex: 1
    },
    {
        name: "镜音双子",
        patrol: 5,
        build: 6,
        develop: 6,
        sex: null
    },
    {
        name: "白",
        patrol: 4,
        build: 11,
        develop: 3,
        sex: 1
    },
    {
        name: "安",
        patrol: 7,
        build: 6,
        develop: 6,
        sex: 1
    },
    {
        name: "薇拉",
        patrol: 9,
        build: 2,
        develop: 5,
        sex: 1
    },
    {
        name: "珈儿",
        patrol: 5,
        build: 5,
        develop: 5,
        sex: 1
    },
    {
        name: "濑由衣",
        patrol: 12,
        build: 1,
        develop: 15,
        sex: 1
    },
    {
        name: "安托涅瓦",
        patrol: 1,
        build: 14,
        develop: 6,
        sex: 1
    }
]