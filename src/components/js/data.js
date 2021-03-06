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
            name: "潜水艇", 
            key: 7,
            build: 20,
            premise: 30
        },
        {
            name: "烟花祭",
            key: 8,
            build: 22,
            premise: 30
        },
        {
            name: "方舟",
            key: 9,
            build: 30,
            premise: 50
        }
    ]

}
export const ArtifactList = [
    {
        name: "璃璃子",
        patrol: 1,
        build: 12,
        develop: 5,
        sex: 1 //1为女，0为男,未定为null，比如镜音、机器人等
    },
    {
        name: "尤梨",
        patrol: 3,
        build: 8,
        develop: 6,
        sex: 1 
    },
    {
        name: "柯路诺",
        patrol: 8,
        build: 3,
        develop: 6,
        sex: 0 
    },
    {
        name: "菲尼克",
        patrol: 5,
        build: 1,
        develop: 12,
        sex: 0
    },
    {
        name: "零",
        patrol: 11,
        build: 1,
        develop: 5,
        sex: 1
    },
    {
        name: "拉比",
        patrol: 4,
        build: 7,
        develop: 6,
        sex: 0
    },
    { 
        name: "初音未来",
        patrol: 12,
        build: 1,
        develop: 5,
        sex: 1 
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
    },
    {
        name: "丽",
        patrol: 4,
        build: 3,
        develop: 10,
        sex: 1
    },
    {
        name: "泰丝拉",
        patrol: 4,
        build: 3,
        develop: 10,
        sex: 1
    },
    {
        name: "羽弥",
        patrol: 6,
        build: 9,
        develop: 1,
        sex: 1
    },
    {
        name: "乌鹭",
        patrol: 4,
        build: 7,
        develop: 4,
        sex: 0
    },
    {
        name: "幽桐",
        patrol: 2,
        build: 6,
        develop: 9,
        sex: 0
    },
    {
        name: "虎彻",
        patrol: 3,
        build: 7,
        develop: 5,
        sex: 0
    },
    {
        name: "夏狩",
        patrol: 2,
        build: 7,
        develop: 6,
        sex: 0
    },
    {
        name: "妮维",
        patrol: 7,
        build: 4,
        develop: 4,
        sex: 1
    },
    {
        name: "阿岚",
        patrol: 5,
        build: 3,
        develop: 8,
        sex: 0
    },
    {
        name: "雯梓",
        patrol: 3,
        build: 5,
        develop: 7,
        sex: 1
    },
    {
        name: "钟函谷",
        patrol: 5,
        build: 12,
        develop: 1,
        sex: 0
    },
    {
        name: "璐璐",
        patrol: 5,
        build: 7,
        develop: 5,
        sex: 1
    },
    {
        name: "巫殷",
        patrol: 7,
        build: 4,
        develop: 4,
        sex: 1
    },
    {
        name: "巴裘拉",
        patrol: 7,
        build: 4,
        develop: 4,
        sex: 0
    },
    {
        name: "奥露西娅",
        patrol: 10,
        build: 4,
        develop: 3,
        sex: 1
    },
    {
        name: "穆娅",
        patrol: 2,
        build: 5,
        develop: 9,
        sex: 1
    },
    {
        name: "西比尔",
        patrol: 2,
        build: 10,
        develop: 4,
        sex: 1
    },
    {
        name: "伽梨耶",
        patrol: 4,
        build: 4,
        develop: 7,
        sex: 1
    },
    {
        name: "赛斯",
        patrol: 7,
        build: 4,
        develop: 4,
        sex: 0
    },
    {
        name: "芙罗拉",
        patrol: 2,
        build: 10,
        develop: 5,
        sex: 1
    },
    {
        name: "达尔维拉",
        patrol: 10,
        build: 2,
        develop: 5,
        sex: 0
    },
    {
        name: "莱奥斯",
        patrol: 9,
        build: 3,
        develop: 4,
        sex: null
    },
    {
        name: "艾露比",
        patrol: 6,
        build: 6,
        develop: 4,
        sex: 1
    },
    {
        name: "达格",
        patrol: 9,
        build: 3,
        develop: 4,
        sex: 0
    },
    {
        name: "爱缪莎",
        patrol: 1,
        build: 5,
        develop: 12,
        sex: 1
    },
    {
        name: "晏华",
        patrol: 1,
        build: 8,
        develop: 8,
        sex: 0
    },
    {
        name: "瞬",
        patrol: 9,
        build: 3,
        develop: 4,
        sex: 1
    },
    {
        name: "米菈",
        patrol: 9,
        build: 4,
        develop: 3,
        sex: 1
    },
    {
        name: "千藻诗歌",
        patrol: 3,
        build: 4,
        develop: 9,
        sex: 1
    },
    {
        name: "赛哈姆",
        patrol: 5,
        build: 3,
        develop: 9,
        sex: 1
    },
    {
        name: "李若胤",
        patrol: 5,
        build: 6,
        develop: 5,
        sex: 0
    },
    {
        name: "罗纳克",
        patrol: 2,
        build: 10,
        develop: 5,
        sex: 0
    }
]

export const Information = {
    daily:[//日常的随机情报        
        {
            name: "流感肆虐",
            need: 45,
            key: 1
        },
        {
            name: "不稳定黑门",
            need: 15,
            key: 2
        },
        {
            name: "魔兽的报复",
            need: 30,
            key: 3
        },
        {
            name: "交通故障",
            need: 10,
            key: 4
        },
        {
            name: "神秘影(绿)装",
            need: 20,
            key: 5
        },
        {
            name: "幻力屏障增强",
            need: 45,
            key: 6
        },
        {
            name: "流言蜚语",
            need: 35,
            key: 7
        }
    ],
    hero:[//希罗夺取黑核情报
        {
            name: "希罗夺取港湾区",
            city: "港湾区",
            need: 60
        },
        {
            name: "希罗夺取旧城区",
            city: "旧城区",
            need: 60
        },
        {
            name: "希罗夺取海湾侧城",
            city: "海湾侧城",
            need: 60
        }
    ],
    assassination:[//突袭情报
        {
            name: "突袭港湾区",
            city: "港湾区",
            need: 70
        },
        {
            name: "突袭旧城区",
            city: "旧城区",
            need: 60
        },
        {
            name: "突袭海湾侧城",
            city: "海湾侧城",
            need: 45
        }
    ]
}