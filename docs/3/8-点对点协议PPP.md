> 点对点协议PPP（`P`oint-to-`P`oint `P`rotocol）是目前使用最广泛的点对点数据链路层协议

- 思考：

	- 普通用户是如何接入到因特网的呢 ？

	- 通常都是要通过连接到某个因特网服务提供者（ISP），例如（中国电信、中国移动、中国联通）这 3 大运营商，才能接入因特网

	- 这些 ISP 已经从因特网管理机构申请到了一批 IP 地址，用户的计算机只有获取到 ISP 所分配的合法 IP 地址后，才能成为因特网上的主机

- 用户计算机与 ISP 进行通信时，所使用的数据链路层协议通常就是 PPP 协议

- 注意：

	- 1999 年公布了在以太网上运行的 PPP 协议（PPP over Ethernet，简称 PPPoE）

	- 使得 ISP 可以通过「数字用户线路 DSL（Digital Subscriber Line）、电路调制解调器、以太网」等宽带接入技术，以「以太网接口」的形式为用户提供接入服务

![image-20220320105738130](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320105738130.png)

- 另外，点对点协议 PPP 也被广泛应用于广域网路由器之间的专用线路

![image-20220320105859530](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320105859530.png)

- PPP 协议是因特网工程任务组 IETF 在 1992 年制定的

- 经过 1993 年和 1994 年的修订，现在的 PPP 协议已经成为因特网的正式标准（RFC 1661，RFC 1662）

> https://datatracker.ietf.org => Search 「PPP」 => find & read（RFC 1661，RFC 1662）

---

#### 正篇开始

![image-20220320111558033](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320111558033.png)

- 从网络体系结构的角度看，PPP 是数据链路层的协议，它将上层交付下来的协议数据单元封装成 PPP 帧

- PPP 协议能在多种类型的点对点链路上运行（eg：面向字节的异步链路，面向比特的同步链路）

![image-20220320112515585](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320112515585.png)

#### PPP 协议的「帧格式」

![image-20220320112750276](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320112750276.png)

- 帧首部和帧尾部中的「标志 `F`lag」字段是 PPP 帧的定界符，取值为十六进制的 7E，即 0x7E

- 地址和控制字段目前实际上并没有携带 PPP 帧的信息

  - 帧首部中的「地址 `A`ddress」字段是个预留字段，目前（2022）没啥用，取值为十六进制的 FF，即 0xFF

  - 帧首部中的「控制 `C`ontrol」字段是个预留字段，目前（2022）没啥用，取值为十六进制的 03，即 0x03

- 帧首部中的「协议 `P`rotocol」字段指明了帧的数据部分应送交哪个协议处理

	- 当取值为十六进制的 0021，即 0x0021 时，PPP 帧的数据部分就是 IP 数据报

	<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320113933311.png" alt="image-20220320113933311" style="zoom:50%;" />

	- 当取值为十六进制的 8021，即 0x8021 时，PPP 帧的数据部分就是网络控制协议 NCP 的分组

	<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320114011833.png" alt="image-20220320114011833" style="zoom:50%;" />

	- 当取值为十六进制的 C021，即 0xC021 时，PPP 帧的数据部分就是链路控制协议 LCP 的分组

	<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320114045824.png" alt="image-20220320114045824" style="zoom:50%;" />

- 帧尾部中的帧检验序列 FCS（`F`rame `C`heck `S`equence）字段，其值是使用循环冗余校验CRC计算出的校验位，用于检查 PPP 帧是否存在误码

#### PPP 协议对「透明传输」问题的处理

- 当 PPP 帧的数据部分出现帧首和帧尾中的标志字段时，如果不采取措施，则会造成接收方对 PPP 帧是否结束的误判

- 这是因为（标志字段 `F`lag 是 PPP 帧的定界符，取值为十六进制的 7E，即 0x7E，即 01111110）

![image-20220320115511266](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320115511266.png)

> PPP 协议实现透明传输的方法取决于所使用的链路类型

1. 对于面向字节的异步链路，则采用「字节填充法」，也就是（插入转义字符）

2. 对于面向比特的同步链路，则采用「比特填充法」，也就是（插入比特 0）

![image-20220320121433452](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320121433452.png)

#### 字节填充法

> 以字节 7E 作为 PPP 帧的定界符，以字节为单位来讨论问题

- 发送方对 PPP 帧数据部分的处理：

	- 将出现的每一个 7E 字节（PPP 帧的定界符）转变成 2 字节序列（7D, 5E）

	- 这相当于在 7E 字节前插入了转义字节 7D，并将 7E 字节减去十六进制的 20（友情提示：这个念 er ling，而不是 er shi）

	- 将出现的每一个 7D 字节（转义字符）转变成 2 字节序列（7D, 5D）

	- 在出现的每一个 ASCII 码控制字符（数值小于 0x20 的字符）前插入一个 7D 字节，同时将该字符的编码加上十六进制的 20（er ling）

	<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320132850917.png" alt="image-20220320132850917" style="zoom:50%;" />

- 接收方：

	- 只要进行「反变换」即可恢复出原来的 PPP 帧的数据部分

#### 比特填充法

> 以 01111110 作为 PPP 帧的定界符，以比特为单位来讨论问题

- 假设 PPP 帧的数据部分包含了两个帧定界符

- 发送方对 PPP 帧数据部分的处理：

	- 对帧的数据部分进行扫描（一般由硬件实现），只要发现 5 个连续的比特 1，就立刻填充 1 个比特 0

	![image-20220320134123162](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320134123162.png)
	
- 接收方对 PPP 帧数据部分的处理：

	- 对帧的数据部分进行扫描（一般由硬件实现），只要发现 5 个连续的比特 1，就把其后的 1 个比特 0 删除

#### PPP 协议进行差错检测的方法

- PPP 帧的尾部包含 1 个 2 字节的帧检验序列 FCS 字段

- 使用循环冗余校验 CRC 来计算该字段的取值，采用的生成多项式如下所示

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320134621530.png" alt="image-20220320134621530" style="zoom:50%;" />

- RFC 1662 的附录部分给出了 FCS 的计算方法的 C 语言实现，为了减少对 CPU 的占用，采用「查表法」来实现

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320134921463.png" alt="image-20220320134921463" style="zoom:50%;" />

- FCS 的计算范围如图所示

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320134709863.png" alt="image-20220320134709863" style="zoom:50%;" />

- 接收方每收到一个 PPP 帧，就进行 CRC 检验，若检验正确，就手下这个帧，反之就丢弃这个帧

- 使用 PPP 的数据链路层向上层提供**不可靠**传输服务

#### 以拨号接入为例，介绍 PPP 协议的工作状态

![image-20220320140219761](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220320140219761.png)

- PPP 链路的开始和结束状态都是「静止」状态，这时并不存在物理层的链接

- 当检测到调制解调器的载波信号，并建立物理层链接后

- PPP 就进入链路的 “建立” 状态

- 这时链路控制协议 LCP 开始协商一些配置选项

- 若协商成功，则进入 “鉴别” 状态

- 若协商失败，则退回到 “静止” 状态

- 所协商的配置选项包括

	0. 鉴别协议，包括（无需鉴别、口令鉴别协议 PAP、挑战握手鉴别协议 CHAP）

	1. 最大帧长

- 若通信双方无需鉴别或鉴别身份成功，则进入 “网络” 状态

- 若鉴别失败，则进入 “终止” 状态

- 进入网络状态后，进行「NCP配置”」

- 配置完成后，就进入 “打开” 状态

- PPP 链路的两端，通过相互交换网络层特定的 NCP 分组来进行 NCP 配置

- 如果在 PPP 链路上运行的是 IP 协议，则使用 IP 控制协议 IPCP 来对 PPP 链路的每一端配置 IP 模块（eg：分配 IP 地址）

- 只要链路处于打开状态，就可以进行数据通信

- 当出现故障或链路的一端发出终止请求时，就进入 “终止” 状态

- 当载波停止后，就回到 “静止” 状态
