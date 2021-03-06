> MAC 地址的定位：网络内通信

#### 概览

- MAC 地址：以太网的 MAC 子层所使用的地址，属于 TCP/IP 体系结构的「数据链路层」

- IP 地址和 ARP 协议属于 TCP/IP 体系结构的「网际层」

- 若已知设备的 IP 地址，使用 ARP 协议，就可获取该设备的 MAC 地址

#### MAC 地址

- 如图所示，两台主机通过一条链路通信

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220323184739004.png" alt="image-20220323184739004" style="zoom:60%;" />

- 显然，它们不需要使用地址就能通信（因为连接在信道上的主机只有它们两个呀～）

> 即：使用点对点信道的数据链路层不需要地址

---

- 再来看使用共享信道的总线型局域网

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220323184956437.png" alt="image-20220323184956437" style="zoom:55%;" />

- 当总线上的一台主机要给另一台主机发送帧

- 那么表示帧的信号会通过总线传送到总线上的所有主机（即：信号广播）

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220323185151762.png" alt="image-20220323185151762" style="zoom:55%;" />

- 那么主机如何判断收到的帧是不是发送给自己的呢 ？

> 显然：数据链路层若使用广播信道，则必须用地址来区分各主机
>
> 即：当多个主机连接在同一个广播信道上，要想实现主机之间的通信，则每个主机都必须有一个唯一的标识，即一个数据链路层地址

- 如下图，用不同的大写字母来表示总线上各主机的地址

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220323190725565.png" alt="image-20220323190725565" style="zoom:50%;" />

- 在每个主机发送的帧中，必须携带用于标识（发送主机 & 接收主机）的地址

> 由于这类地址是用于媒体接入控制 MAC（`M`edia `A`ccess `C`ontrol）的，因此被称为 MAC 地址

---

- 如下图，主机 C 要给主机 D 发送帧

	- 则在帧首部中的「目的地址字段」，应填入主机 D 的 MAC 地址

	- 而在「源地址字段」，应填入主机 C 自己的 MAC 地址

- 如此一来，总线上其他各主机收到该帧后，就可以根据帧首部中的目的地址字段的值是否与自己的 MAC 地址匹配来选择丢弃还是接受该帧

![image-20220325103643203](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325103643203.png)

---

> MAC 地址一般被固化在网卡（网络适配器）的电可擦可编程只读存储器 EEPROM 中，因此 MAC 地址也被称为「硬件地址」
>
> MAC 地址有时也被称为物理地址（eg：在 Windows 系统中，哦这真是一个糟糕的命名），但 MAC 地址实际上是属于数据链路层 ！

![image-20220325104952486](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325104952486.png)

- 下图是一块 PCI 接口的千兆以太网卡

	- 其核心芯片采用了 REALTEK 的 8169SC，该芯片实现了以太网的物理层和数据链路层
	
	- 其 EEPROM 芯片（eg：93C46）用于存储网卡的相关信息以及 MAC 地址
	
	- 其 BootROM 插槽用于网络无盘工作站的启动，但一般并不标配启动芯片
	
	- 其网络隔离变压器能够将核心芯片与外部相隔离，提高抗干扰能力，并对核心芯片进行保护（eg：防雷击）

![image-20220325104607683](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325104607683.png)

---

- 一般情况下，用户的主机会包含 2 个网卡（网络适配器）

	1. 有线局域网适配器（有线网卡）

	2. 无线局域网适配器（无线网卡）

- 每个网络适配器都有一个全球唯一的 MAC 地址

- 而交换机和路由器往往拥有很多网络接口，所以就会拥有更多的 MAC 地址

> 所以，严格来说，MAC 地址是对网络上各接口的唯一标识，而不是对网络上各设备的唯一标识

---

#### IEEE 802 局域网的 MAC 地址格式

- 它由 48 bit 构成

- 前 3 个字节是「组织唯一标识符 OUI」

	- 生产网络设备的厂商需要向 IEEE 的注册管理机构申请 1 个或多个 OUI

- MAC 地址的标准表示方法

	- 是将每 4 个比特，写成一个 16 进制的字符，共 12 个字符

	- 然后将每 2 个字符分成 1 组，共 6 组

	- 组之间用短横线连接（也可将短横线改为冒号）

	- 当然，也可将每 4 个字符分为一组，共 3 组，组之间用点连接

![image-20220325110324966](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325110324966.png)

> 另外，我们可以在 IEEE 的官网，查看已分配的组织唯一标识符 OUI：https://standards-oui.ieee.org/oui/oui.txt
>
> 如果我们知道设备的 MAC 地址，而不知道该设备的厂商信息，就可通过设备的 MAC 地址来查询

![image-20220325111001477](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325111001477.png)

---

- MAC 地址第 1 字节的 b0 位

	- 取 0 时，表示该地址是单播地址

	- 取 1 时，表示该地址是多播地址，也称为组播地址

- MAC 地址第 1 字节的 b1 位

	- 取 0 时，表示该地址是全球管理的，也就是全球唯一的

	- 取 1 时，表示该地址是本地管理的

- 综上，一共有 4 种类型的 MAC 地址

	1. 全球管理的单播地址，是厂商生产网络设备时给设备的各网络接口固化的 MAC 地址

	2. 全球管理的多播地址，是标准网络设备所应支持的多播地址，用于特定功能（eg：交换机生成树协议所需要的多播地址）

	3. 本地管理的单播地址，由网络管理员分配，这种类型的地址会覆盖网络接口的全球管理单播地址（即：相比于全球管理的单播地址，本地管理的单播地址的优先级更高）

	4. 本地管理的多播地址，用于用户对主机的软件配置，以表明该主机属于哪些多播组

> 注意：当 MAC 地址的 48 比特全都是 1 时（即十六进制形式全 F 时），就是广播地址

![image-20220325113414164](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325113414164.png)

> 思考：我们每个人一般会拥有多少个全球管理的单播 MAC 地址呢 ？

- （台式机、笔记本电脑、平板电脑、智能手机、...）等设备上的（以太网接口、WIFI 接口、蓝牙接口）都分配有全球单播的 MAC 地址

- 每台（交换机、路由器）都拥有多个网络接口，也就拥有多个全球单播的 MAC 地址

> 那么：在我们有生之年，是否会看到 EUI-48 地址空间耗尽呢 ？

![image-20220325113919352](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325113919352.png)

#### MAC 地址的发送顺序

![image-20220325114101007](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325114101007.png)

#### 单播 MAC 地址的作用

- 下图是一个拥有 3 台主机的总线型以太网

- 各主机网卡上固化的全球单播 MAC 地址如图所示

- 假设主机 B 要给主机 C 发送单播帧

	- 主机 B 首先需要构建该单播帧，即：在帧首部中的目的地址字段，写入主机 C 的 MAC 地址，源地址字段写入自己的 MAC 地址，再加上（帧首部中的其它字段、数据载荷、帧尾部）

![image-20220325114554615](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325114554615.png)

- 主机 B 将该单播帧发送出去，主机 A 和 C 都会收到该单播帧

	- 主机 A 的网卡发现该单播帧的目的 MAC 地址与自己的 MAC 地址不匹配，于是丢弃该帧

	- 主机 C 的网卡发现该单播帧的目的 MAC 地址与自己的 MAC 地址匹配，于是接受该帧，并将该帧交给其上层处理

![image-20220325114813425](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325114813425.png)

#### 广播 MAC 地址的作用

![image-20220325114922238](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325114922238.png)

- 假设主机 B 要发送一个广播帧

	- 主机 B 首先需要构建该广播帧，即：在帧首部中的目的地址字段，写入广播地址（FF-FF-FF-FF-FF-FF），源地址字段写入自己的 MAC 地址，再加上（帧首部中的其它字段、数据载荷、帧尾部）

- 主机 B 将该广播帧发送出去，主机 A 和 C 都会收到该广播帧

	- 发现该帧首部中的目的地址字段的内容是广播地址，就知道该帧是广播帧，于是接受该帧，并将该帧交给上层处理

![image-20220325115302879](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325115302879.png)

#### 如何快速判断 MAC 地址是否是多播地址

![image-20220325115722445](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325115722445.png)

#### 多播 MAC 地址的作用

![image-20220325115404016](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325115404016.png)

- 假设主机 A 要向多播地址 07-E0-12-F6-2A-D8 发送多播帧

- 将该多播地址的左起第 1 个字节写成 8 个比特，可以看到最低比特位是 1，这就表明该地址是多播地址

![image-20220325115926707](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325115926707.png)

- 假设主机 B、C、D 支持 MAC 多播，各用户给自己的主机配置的多播组列表如下

	- 可以看到，主机 B 和 C 都属于 2 个多播组，主机 D 不属于任何多播组

![image-20220325120147883](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325120147883.png)

- 主机 A 首先需要构建该多播帧，即：在帧首部中的目的地址字段，写入多播地址，源地址字段写入自己的 MAC 地址，再加上（帧首部中的其它字段、数据载荷、帧尾部）

- 主机 A 将该多播帧发送出去，主机 B、C、D 都会收到该多播帧

	- 主机 B 和 C 都发现该多播帧的目的 MAC 地址在自己的多播组列表中，因此主机 B 和 C 都会接受该帧，并送交上层处理

	- 而主机 D 发现该多播帧的目的 MAC 地址不在自己的多播组列表中，因此主机 D 会丢弃该多播帧

![image-20220325120521725](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325120521725.png)

> 注意：下图

![image-20220325120723828](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325120723828.png)

#### 随机 MAC 地址

- 据斯诺登爆料，美国国家安全局有一套系统，通过监视电子设备的 MAC 地址，来跟踪城市中每个人的行动

- 因此，苹果率先在 iOS 系列设备扫描网络时采用随机 MAC 地址技术

- 随后，Windows10、安卓6.0、以及内核版本为 3.18 的 Linux，也都开始提供随机 MAC 地址的功能

- 目前，大多数移动设备都已经采用了随机 MAC 地址技术

- [笔者实践记录](https://liupj.top/2022/03/26/knowledge/internet/mac-randomize/)

![image-20220325121105526](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220325121105526.png)
