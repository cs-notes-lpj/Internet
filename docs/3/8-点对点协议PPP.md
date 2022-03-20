> 点对点协议PPP（`P`oint-to-`P`oint `P`rotocol）是目前使用最广泛的点对点数据链路层协议

- 思考：

	- 普通用户是如何接入到因特网的呢 ？

	- 通常都是要通过连接到某个因特网服务提供者（ISP），例如（中国电信、中国移动、中国联通）这 3 大运营商，才能接入因特网

	- 这些 ISP 已经从因特网管理机构申请到了一批 IP 地址，用户的计算机只有获取到 ISP 所分配的合法 IP 地址后，才能成为因特网上的主机

- 用户计算机与 ISP 进行通信时，所使用的数据链路层协议通常就是 PPP 协议

- 注意：

	- 1999 年公布了在以太网上运行的 PPP 协议（PPP over Ethernet，简称 PPPoE）

	- 使得 ISP 可以通过「数字用户线路 DSL（Digital Subscriber Line）、电路调制解调器、以太网」等宽带接入技术，以「以太网接口」的形式为用户提供接入服务

![image-20220320105738130](https://gitee.com/pj-l/imgs-1/raw/master/image-20220320105738130.png)

- 另外，点对点协议 PPP 也被广泛应用于广域网路由器之间的专用线路

![image-20220320105859530](https://gitee.com/pj-l/imgs-1/raw/master/image-20220320105859530.png)

- PPP 协议是因特网工程任务组 IETF 在 1992 年制定的

- 经过 1993 年和 1994 年的修订，现在的 PPP 协议已经成为因特网的正式标准（RFC 1661，RFC 1662）

> https://datatracker.ietf.org => Search 「PPP」 => find & read（RFC 1661，RFC 1662）

---

#### 正篇开始

![image-20220320111558033](https://gitee.com/pj-l/imgs-1/raw/master/image-20220320111558033.png)

- 从网络体系结构的角度看，PPP 是数据链路层的协议，它将上层交付下来的协议数据单元封装成 PPP 帧

- PPP 协议能在多种类型的点对点链路上运行（eg：面向字节的异步链路，面向比特的同步链路）

![image-20220320112515585](https://gitee.com/pj-l/imgs-1/raw/master/image-20220320112515585.png)

#### PPP 协议的「帧格式」

![image-20220320112750276](https://gitee.com/pj-l/imgs-1/raw/master/image-20220320112750276.png)

- 帧首部和帧尾部中的「标志 `F`lag」字段是 PPP 帧的定界符，取值为十六进制的 7E，即 0x7E

- 地址和控制字段目前实际上并没有携带 PPP 帧的信息

  - 帧首部中的「地址 `A`ddress」字段是个预留字段，目前（2022）没啥用，取值为十六进制的 FF，即 0xFF

  - 帧首部中的「控制 `C`ontrol」字段是个预留字段，目前（2022）没啥用，取值为十六进制的 03，即 0x03

- 帧首部中的「协议 `P`rotocol」字段指明了帧的数据部分应送交哪个协议处理

	- 当取值为十六进制的 0021，即 0x0021 时，PPP 帧的数据部分就是 IP 数据报

	<img src="https://gitee.com/pj-l/imgs-1/raw/master/image-20220320113933311.png" alt="image-20220320113933311" style="zoom:50%;" />

	- 当取值为十六进制的 8021，即 0x8021 时，PPP 帧的数据部分就是网络控制协议 NCP 的分组

	<img src="https://gitee.com/pj-l/imgs-1/raw/master/image-20220320114011833.png" alt="image-20220320114011833" style="zoom:50%;" />

	- 当取值为十六进制的 C021，即 0xC021 时，PPP 帧的数据部分就是链路控制协议 LCP 的分组

	<img src="https://gitee.com/pj-l/imgs-1/raw/master/image-20220320114045824.png" alt="image-20220320114045824" style="zoom:50%;" />

- 帧尾部中的帧检验序列 FCS（`F`rame `C`heck `S`equence）字段，其值是使用循环冗余校验CRC计算出的校验位，用于检查 PPP 帧是否存在误码

