- 下图是一个以太网，由交换机和主机互连而成（为简单起见，只画出了每个交换机上连接的 1 台主机）

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328211156322.png" alt="image-20220328211156322" style="zoom:40%;" />

- 如果交换机 A 与 B 之间的链路出现了故障

- 则交换机 B 上连接的所有主机都无法与交换机 A 和交换机 C 上连接的所有主机通信

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328213835483.png" alt="image-20220328213835483" style="zoom:40%;" />

- 如果交换机 A 与交换机 B 和 C 之间的链路都出现了故障

- 则原来的以太网就变成了 3 个独立的较小的以太网，它们之间无法通信

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328214018323.png" alt="image-20220328214018323" style="zoom:40%;" />

> 那么怎样才能提高以太网的可靠性呢 ？

#### 方法一：增加冗余链路

- 例如：对于上例，可以在交换机 B 和 C 之间添加一条冗余链路，如下图所示

- 如此一来，即使交换机 A 和 B 之间的链路出现了故障，整个网络也还是连通的

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328214352436.png" alt="image-20220328214352436" style="zoom:40%;" />

#### 冗余链路方案的负面效应

**冗余链路 => 形成网络环路 => 导致广播风暴 ！=> 交换机的帧交换表震荡 ！**

- 假设主机 H1 发送了 1 个广播帧

- 交换机 B 收到该帧后，会将其从自己的其它所有接口转发出去

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328214850476.png" alt="image-20220328214850476" style="zoom:40%;" />

- 交换机 A 收到交换机 B 转发送来的帧后，也会将其从自己的其它所有接口转发出去

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328215033986.png" alt="image-20220328215033986" style="zoom:40%;" />

- 交换机 C 收到交换机 B 转发送来的帧后，也会将其从自己的其它所有接口转发出去

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328215134343.png" alt="image-20220328215134343" style="zoom:40%;" />

- 交换机 C 收到交换机 A 转发送来的帧后，也会将其从自己的其它所有接口转发出去

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328215231517.png" alt="image-20220328215231517" style="zoom:40%;" />

- 交换机 A 收到交换机 C 转发送来的帧后，也会将其从自己的其它所有接口转发出去

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328215328945.png" alt="image-20220328215328945" style="zoom:40%;" />

- 交换机 B 收到交换机 C 转发送来的帧后，也会将其从自己的其它所有接口转发出去

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328215434174.png" alt="image-20220328215434174" style="zoom:40%;" />

- 交换机 B 收到交换机 A 转发送来的帧后，也会将其从自己的其它所有接口转发出去

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328215521902.png" alt="image-20220328215521902" style="zoom:40%;" />

> 显然：该广播帧会在各交换机之间反复转发，分别按顺时针和逆时针的方向同时兜圈，这就是所谓的广播风暴 ！

- 广播风暴

	- 会大量消耗网络资源，且使得网络无法正常转发其它数据帧 ！

	- 会使主机反复收到广播帧，大量消耗主机资源 ！

	- 会使交换机的帧交换表震荡

		- 下图画出了交换机 B 的帧交换表，以及其各接口的接口号，为简单起见，用各主机的名称表示其 MAC 地址

		- 当交换机 B 收到主机 H1 发送的广播帧后，首先进行「登记」，即：将帧的源 MAC 地址 H1 和帧进入交换机 B 的接口号 1 登记到帧交换表中，这条记录是正确的

		- 当该广播帧被从交换机 C 转发回交换机 B 后，又会进行「登记」，即：将帧的源 MAC 地址 H1 和帧进入交换机 B 的接口号 2 登记到帧交换表中，这条记录是错误的

		- 当该广播帧被从交换机 A 转发回交换机 B 后，又会进行「登记」，即：将帧的源 MAC 地址 H1 和帧进入交换机 B 的接口号 3 登记到帧交换表中，这条记录是错误的
		
		<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328221011503.png" alt="image-20220328221011503" style="zoom:50%;" />
		
		- 当该广播帧又被从交换机 C 转发回交换机 B 后，又会进行「登记」，即：将帧的源 MAC 地址 H1 和帧进入交换机 B 的接口号 2 登记到帧交换表中，这条记录是错误的
		
		<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328221211473.png" alt="image-20220328221211473" style="zoom:50%;" />
		
> 不难看出：有关 MAC 地址 H1 的记录，会在这两个错误记录之间反复震荡 ！这就叫交换机的帧交换表震荡 ！

> 为了在增加冗余链路提高网络的可靠性的同时，避免网络环路带来的各种问题 => 以太网交换机采用了生成树协议（`S`panning `T`ree `P`rotocol）！
> 
> 如此一来，无论交换机之间采用怎样的物理连接方式，使用生成树协议的交换机都能自动计算并构建出一个逻辑上无环路的网络，其逻辑拓扑结构是树型的 ！

- 如下图，为了提高可靠性，5 台交换机之间进行了冗余连接（冗余链路不止一条，网络环路也不止一个）

- 为简单起见，各交换机上连接的主机没有画出

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328222513572.png" alt="image-20220328222513572" style="zoom:33%;" />

- 用绿色的小圆圈表示交换机接口为正常状态

- 用橙色的小方块表示交换机接口为阻塞状态

- 用红色的叉表示出现了故障

---

- 如果各交换机的各接口都处于正常状态，则会存在多个网络环路

- 实际上，各交换机之间（按照生成树协议中规定的生成树算法）交互一些参数后，就可以判断出应该阻塞哪些接口，如下图所示

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328222815359.png" alt="image-20220328222815359" style="zoom:50%;" />

- 如此一来，就形成了一个逻辑上无环路的网络，如下图

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328223021975.png" alt="image-20220328223021975" style="zoom:50%;" />

- 当然，这个逻辑上无环路的网络一定要确保整个网络是连通的

![image-20220328223300475](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328223300475.png)
