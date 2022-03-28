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

**形成网络环路，导致广播风暴 ！**

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

	- 会使交换机的帧交换表震荡（漂移）

		- 下图画出了交换机 B 的帧交换表，以及其各接口的接口号，为简单起见，用各主机的名称表示其 MAC 地址

		- 当交换机 B 收到主机 H1 发送的广播帧后，首先进行「登记」，即：将帧的源 MAC 地址 H1 和帧进入交换机 B 的接口号 1 登记到帧交换表中，这条记录是正确的

		- 当该广播帧被从交换机 C 转发回交换机 B 后，又会进行「登记」，即：将帧的源 MAC 地址 H1 和帧进入交换机 B 的接口号 2 登记到帧交换表中，这条记录是错误的

		- 当该广播帧被从交换机 A 转发回交换机 B 后，又会进行「登记」，即：将帧的源 MAC 地址 H1 和帧进入交换机 B 的接口号 3 登记到帧交换表中，这条记录是错误的
		
		<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328221011503.png" alt="image-20220328221011503" style="zoom:50%;" />
		
		- 当该广播帧又被从交换机 C 转发回交换机 B 后，又会进行「登记」，即：将帧的源 MAC 地址 H1 和帧进入交换机 B 的接口号 2 登记到帧交换表中，这条记录是错误的
		
		<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220328221211473.png" alt="image-20220328221211473" style="zoom:50%;" />
		
> 不难看出：有关 MAC 地址 H1 的记录，会在这两个错误记录之间反复震荡 ！

