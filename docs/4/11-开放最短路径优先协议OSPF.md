- 开放最短路径优先协议（`O`pen`S`hortest`P`ath`F`irst）诞生于 1989 年，其目标是克服 RIP 的缺点

  - “开放” 是指该协议**公开发表**，不受任何厂家控制

  - “最短路径优先” 是指该协议**使用了 Dijkstra 提出的最短路径算法**（使用该算法计算路由能确保**不会产生路由环路**）

- OSPF **基于链路状态**，而不像 RIP 那样基于距离向量

  - 链路状态是指：（本路由器都和哪些路由器相邻 & 相应链路的“代价”）

    - “代价” 指（距离、费用、时延、带宽、...），由网络管理人员决定

- OSPF 不限制网络规模，更新效率高，收敛速度快

#### 举例

##### “代价” 的计算方式

在思科路由器中，“代价” 的计算方式为：100Mbps / 链路带宽

计算结果小于 1 则仍记为 1；大于 1 且有小数则舍去小数

![image-20220426170152128](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426170152128.png)

##### “邻居关系”

每个路由器都会建立一张邻居表

相邻路由器之间通过交互**问候分组 Hello**来建立和维护邻居关系

![image-20220426170655139](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426170655139.png)

##### “问候分组”

- 问候分组被封装在 IP 数据报中，发往多播地址 224.0.0.5

  - IP 数据报首部中 协议号字段的值为 89 => 表示 IP 数据报的数据载荷为 OSPF 分组

    ![image-20220426170921637](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426170921637.png)

- 问候分组的发送周期为 10 秒

- 若 40 秒还未收到来自邻居路由器的 Hello 分组，则认为该邻居路由器不可达

##### “邻居表”

- 下图是路由器 R1 的邻居表（为简单起见，邻居 ID 简记为 RX，实践中应填写具体的路由器 ID）

  - 假设邻居 R2 的死亡倒计时还剩 36 秒，若在死亡倒计时到达 0 之前收到了来自 R2 的问候分组，则重新启动针对该邻居条目的 40 秒死亡倒计时

  - 否则，当死亡倒计时为 0 时，就会判定该邻居路由器不可达

![image-20220426172310536](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426172310536.png)

##### 链路状态通告

![image-20220426175245585](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426175245585.png)

- 链路状态通告 LSA 被封装在链路状态更新分组 LSU 中，进行洪泛转发

- 即：收到链路状态更新分组 LSU 的路由器，会将该分组从自己的其它所有接口转发出去

- 这样一来，自治系统中的每个路由器所发送的链路状态更新分组，都会被传递给系统中的其它所有路由器

##### 链路状态数据库

使用 OSPF 的每个路由器都有一个链路状态数据库 LSDB，用于存储链路状态通告 LSA

> 各路由器会洪泛发送封装有自己 LSA 的 LSU 分组，最终各路由器的 LSDB 将达到一致（eg：下图是路由器 R2 的链路状态数据库，其中记录有系统中各路由器的链路状态通告）

![image-20220428152059489](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428152059489.png)

使用 OSPF 的各路由器，基于链路状态数据库，进行最短路径优先计算，就可构建出各自到达其它各路由器的最短路径（即：构建出各自的路由表）

---

eg：下图网络拓扑，假设各链路旁的数字表示代价，通过各路由器洪泛发送封装有自己链路状态通告的链路状态更新分组，各路由器最终会得出相同的链路状态数据库，由链路状态数据库可以得出带权有向图，对该图进行基于 Dijkstra 的最短路径优先算法，就可以得出以各路由器为根的最短路径

![image-20220428152627556](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428152627556.png)

*Dijkstra 算法的相关知识请自行查阅相关资料，本书不作介绍*

#### OSPF 的 5 种分组类型

![image-20220428161556483](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428161556483.png)

联想记忆法：来了新邻居，首先要问候（**问候分组**），然后简要介绍自己家（**数据库描述分组**），你可以向邻居详细地打听信息（**链路状态请求分组**），你也需要把你家的好吃的分享给你的所有邻居（**链路状态更新分组**），邻居收到后肯定会回复你（**链路状态确认分组**）

#### OSPF 协议的基本工作过程

相邻路由器之间周期性地发送问候分组，以便建立和维护邻居关系

![image-20220428162508676](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428162508676.png)

建立邻居关系后，给邻居路由器发送数据库描述分组，也就是将自己的链路状态数据库中的所有链路状态项目的摘要信息发送给邻居路由器

![image-20220428162818070](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428162818070.png)

eg：R1 收到 R2 的数据库描述分组后，发现自己缺少其中的某些链路状态项目，于是就会向 R2 发送链路状态请求分组

R2 收到后，就会将 R1 所缺少的链路状态项目的详细信息，封装在链路状态更新分组中发送给 R1

![image-20220428163056340](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428163056340.png)

R1 收到后，就会将这些所缺少的链路状态项目的详细信息，添加到自己的链路状态数据库中，并给 R2 发送链路状态确认分组

![image-20220428163124182](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428163124182.png)

> 注意：R2 也可以向 R1 请求自己所缺少的链路状态项目的详细信息

最终，R1 和 R2 的链路状态数据库将达到一致，也就是链路状态数据库同步

![image-20220428163306400](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428163306400.png)

每 30 分钟或链路状态发生变化时，路由器都会发送链路状态更新分组，收到该分组的其他路由器将洪泛转发该分组，并给该路由器发回链路状态确认分组，这被称为新情况下的链路状态数据库同步

![image-20220428163524802](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428163524802.png)

#### 在多点接入网络中，OSPF 路由器邻居关系的建立

当 OSPF 路由器在多点接入网络中建立邻居关系时，如果不采用其它机制，将会产生大量的多播分组

例如：下图 5 台路由器连接在同一个多点接入网络中，它们周期性地发送问候分组以建立和维护邻居关系

![image-20220428163840874](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428163840874.png)

这些路由器中的任意两个路由器都互为邻居关系，如下图

![image-20220428164033818](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428164033818.png)

n 是路由器的数量

如此，每个路由器要向其它 n-1 个路由器发送问候分组和链路状态更新分组

为了减少所发送分组的数量，OSPF 采用**选举（指定路由器 & 备用的指定路由器）**

指定路由器（`D`esignated`R`outer）

备用的指定路由器（`B`ackup`D`esignated`R`outer）

![image-20220428164439576](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428164439576.png)

**所有的非DR/BDR只与DR/BDR建立邻居关系**，如下图所示

![image-20220428164547542](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428164547542.png)

因此，邻居关系数量减少到了

![image-20220428164635131](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428164635131.png)

非DR/BDR之间无法直接交换信息，只能通过DR/BDR进行信息交换

若DR出现问题，则由BDR顶替DR

实现DR和BDR的选举并不复杂，无非就是各路由器之间交换一些选举参数（eg：接口IP地址、路由器ID、路由器优先级、...）

根据选举规则选举出DR和BDR，这与交换机生成树协议选举根交换机类似，因此不再赘述

#### “区域” 的概念

![image-20220428165147715](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428165147715.png)

- 划分区域的好处：

  - 把利用洪泛法交换链路状态信息的范围局限于每一个区域，而不是整个自治系统，这样就减少了整个网络上的通信量

假设下图是一个规模很大的网络，我们将其划分为一个自治系统

![image-20220428165258816](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428165258816.png)

在该自治系统内，所有路由器都使用 OSPF 协议

OSPF 将该自治系统再划分为 4 个更小的区域（每个区域的规模不应太大，一般包含的路由器在 200 个以内）

- 每个区域都有一个 32 比特的标识符，可以用点分十进制表示

  - 主干区域用于连通其他区域，其标识符必须为 0，可表示为 0.0.0.0

  - 其它区域的标识符不能为 0 且必须互不相同

![image-20220428165431662](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428165431662.png)

#### “区域内路由器” & “区域边界路由器” & “主干路由器” & “自治系统边界路由器”

如果路由器的所有接口都在同一个区域内，则该路由器称为**区域内路由器（`I`nternal`R`outer）**

为了本区域可以和自治系统内的其他区域连通，每个区域都会有一个**区域边界路由器（`A`rea`B`order`R`outer）**，它的一个接口用于连接自身所在区域，另一个接口用于连接主干区域

![image-20220428170202762](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428170202762.png)

主干区域内的路由器称为**主干路由器（`B`ack`b`one`R`outer）**

> 也可以把区域边界路由器看作是主干路由器

![image-20220428170523163](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428170523163.png)

在主干区域内还要有一个路由器，专门和本自治系统外的其它自治系统交换路由信息，称为**自治系统边界路由器（`AS` `B`order`R`outer）**

![image-20220428170740322](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428170740322.png)

在本例中，区域边界路由器 R3，向主干区域发送自己所在区域 1 的链路状态通告，向自己所在区域发送区域 0、2、3 的链路状态通告

区域边界路由器 R4，向主干区域发送自己所在区域 2 的链路状态通告，向自己所在区域发送区域 0、1、3 的链路状态通告

区域边界路由器 R7，向主干区域发送自己所在区域 3 的链路状态通告，向自己所在区域发送区域 0、1、2 的链路状态通告

![image-20220428171018403](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428171018403.png)

采用分层次划分区域的方法，虽然使交换信息的种类变多了，也使 OSPF 的协议更加复杂了，但是这样做却能使每一个区域内部交换路由信息的通信量大大减少，因而使 OSPF 协议能够用于规模很大的自治系统中
