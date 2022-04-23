![image-20220412170648654](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220412170648654.png)

#### 一、分类编址的 IPv4 地址

![image-20220412172617389](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220412172617389.png)

##### A 类地址

- 最小网络号为`0 0000000`，但保留不指派

- 故 A 类网络的第一个可指派的网络号为`0 0000001`

- 再将 24 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`1.0.0.0`

---

- 最大网络号为`0 1111111`，但被用于本地软件环回测试，不能指派

  - 最小的本地软件环回测试地址，点分十进制表示为：`127.0.0.1`

  - 最大的本地软件环回测试地址，点分十进制表示为：`127.255.255.254`

![image-20220415220516313](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415220516313.png)

- 因此：A 类网络最后一个可指派的网络号为`0 1111110`

- 再将 24 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`126.0.0.0`

---

![image-20220415213703210](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415213703210.png)

##### B 类地址

- 最小网络号为`10 000000 00000000`（也是第一个可指派的网络号），点分十进制为：`128.0`

- 再将 16 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`128.0.0.0`

![image-20220415214536205](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415214536205.png)

---

- 最大网络号为`10 111111 11111111`（也是最后一个可指派的网络号），点分十进制为：`191.255`

- 再将 16 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`191.255.0.0`

---

![image-20220415214424835](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415214424835.png)

##### C 类地址

- 最小网络号为`110 00000 00000000 00000000`（也是第一个可指派的网络号），点分十进制为：`192.0.0`

- 再将 8 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`192.0.0.0`

![image-20220415215233703](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415215233703.png)

---

- 最大网络号为`110 11111 11111111 11111111`（也是最后一个可指派的网络号），点分十进制为：`223.255.255`

- 再将 8 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`223.255.255.0`

---

![image-20220415215315089](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415215315089.png)

##### 习题

![image-20220415215910683](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415215910683.png)

![image-20220415220708472](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415220708472.png)

![image-20220415220750506](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415220750506.png)

![image-20220415221334275](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415221334275.png)

##### 举例说明分类编址的 IPv4 地址的局限性

- 假设某单位有一个大型的局域网需要连接到因特网

  ![image-20220416101238590](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416101238590.png)

- 如果申请一个 C 类网络地址，则其可分配的 IP 地址数量只有 2^8 - 2 = 254 个

- 254 个太少了，不够用

- 因此申请了一个 B 类网络地址，可分配的 IP 地址数量达到了 2^16 - 2 = 65534 个

- 给每台计算机和路由器的各接口都分配一个 IP 地址后，还有大量 IP 地址剩余

- 这些剩余的 IP 地址只能由该局域网使用，其它网络不能使用

- 随着该单位计算机网络的建设和发展（又新增了一些计算机 & 需要将原来的网络划分成 3 个独立的网络）

  ![image-20220416102209785](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416102209785.png)

- 假设子网 1 仍然使用原先申请到的 B 类网络地址，那么就需要为子网 2 和 子网 3 各申请一个网络地址

- 这就会导致一些问题：

  1. 申请新的网络地址不仅需要付费，也需要等待较长时间

  2. 当申请到了新的网络地址，路由器中的路由表就需要增加对这两个新的网络的路由记录

  3. 显然，原有网络中剩余的大量 IP 地址会被浪费

##### 处理这种局限性的思路

- 如果能从 IP 地址的主机号部分借用一些位，充当子网号，用于区分不同的子网，就可以继续使用原有网络中剩余的大量 IP 地址，而无需申请新的网络地址了（就像下图这样）

![image-20220416102820442](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416102820442.png)

![image-20220416102951111](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416102951111.png)

#### 二、划分子网的 IPv4 地址

##### 子网掩码

![image-20220416103615081](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416103615081.png)

![image-20220416104223103](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416104223103.png)

![image-20220416104657043](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416104657043.png)

##### 默认的子网掩码

![image-20220416105501210](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416105501210.png)

> 其实划分子网的 IPv4 地址只不过是分类编址的 IPv4 地址的“升级版”

##### 随着因特网的发展

- 分类编址方式逐渐显现出了其局限性，比如：

  - 虽然世界上有数量庞大的 C 类网，但由于 C 类网的地址空间实在太小了，导致人们一般都不申请 C 类网

  - 所以：`C 类网并没有得到充分使用 ！`

  - 而 IP 地址一直在被加速消耗

  - 所以整个 IPv4 地址空间面临全部耗尽的威胁 ！！！

##### 解决方案

- 因特网工程任务组 IETF 以成立了 IPv6 工作组，研究**新版本 IP ==> IPv6**

- 同时，**无分类编址的 IPv4 地址**被提出，以应对当时 IPv4 地址紧张的问题

  - 1993 年，IETF 发布了（无分类域间路由选择 `C`lassless `I`nter-`D`omain `R`outing）的 RFC 文档（RFC 1517～1520），CIDR 消除了传统的 A、B、C 类地址，以及划分子网的概念，可以更加有效地分配 IPv4 的地址空间，在 IPv6 应用之前允许因特网的规模继续增长

#### 三、无分类编址的 IPv4 地址

![image-20220416114129410](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416114129410.png)

![image-20220416114944809](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416114944809.png)

![image-20220416131212086](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416131212086.png)

##### 路由聚合（构造超网）

- 如下图，路由器 R1 与 5 个网络以及路由器 R2 直接相连

- 路由器 R1 和 R2 互为相邻路由器，它们会周期性地将自己所知道的路由信息通告给对方

  ![image-20220416115649344](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416115649344.png)

- 可是：R1 将怎样的路由信息通告给 R2 呢 ？

- 如果 R1 将自己直连的这 5 个网络的路由记录都通告给 R2，则 R2 的路由表会增加 5 条路由记录

  ![image-20220416120024588](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416120024588.png)

- **为了减少路由记录对路由表的占用**，能否将这 5 条路由记录聚合成 1 条呢 ？（Of course ！构造超网 ！）

  ![image-20220416120546016](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416120546016.png)

  ![image-20220416121037999](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416121037999.png)

  ![image-20220416131346897](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220416131346897.png)
