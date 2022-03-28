![image-20220326163021682](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326163021682.png)

- 下面来举例说明 ARP 协议的工作原理

- 如下是一个共享总线型以太网（为简单起见，只画出了该网络中的 3 台主机）

![image-20220326163259022](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326163259022.png)

- 假设主机 B 要向主机 C 发送数据包

![image-20220326163403315](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326163403315.png)

> 实际上，每台主机都会有一个 ARP 高速缓存表

- 在本例中，当主机 B 要给主机 C 发送数据包时

- 会首先在自己的 ARP 高速缓存表中查找主机 C 的 IP 地址所对应的 MAC 地址，显然找不到

![image-20220326163816546](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326163816546.png)

- 因此，主机 B 首先需要发送 ARP 请求报文，以获取主机 C 的 MAC 地址

![image-20220326164055053](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326164055053.png)

> 注意：实际上的 APR 请求报文有其具体的格式，而并非上图中的比较通俗的描述

- 总线上的其它主机都收到了该广播帧

![image-20220326164610376](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326164610376.png)

- 主机 A 的网卡收到该广播帧后，将其送交上层处理

	- 上层的 ARP 进程解析 ARP 请求报文，发现所询问的 IP 地址不是自己的 IP 地址，因此不予理会

- 主机 C 的网卡收到该广播帧后，将其送交上层处理

	- 上层的 ARP 进程解析 ARP 请求报文，发现所询问的 IP 地址正是自己的 IP 地址，因此需要进行响应

![image-20220326164932611](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326164932611.png)

- 主机 C 首先将 ARP 请求报文中所携带的主机 B 的 IP 地址和 MAC 地址，记录到自己的 ARP 高速缓存表中

- 然后给主机 B 发送 ARP 响应报文，以告知自己的 MAC 地址

> 注意：主机 C 给主机 B 发送的封装有 ARP 响应报文的单播帧，**总线上的其它主机都能收到该单播帧 ！**（共享总线型以太网嘛，广播是必须的嘛）

![image-20220326165420349](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326165420349.png)

- 主机 A 的网卡收到该单播帧后，发现其目的 MAC 地址与自己的 MAC 地址不匹配，因此直接丢弃该帧

- 主机 B 的网卡收到该单播帧后，发现其目的 MAC 地址正是自己的 MAC 地址，因此将其交付上层处理

![image-20220326165757449](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326165757449.png)

- 上层的 ARP 进程解析 ARP 响应报文，将其所包含的主机 C 的 IP 地址和 MAC 地址记录到自己的 ARP 高速缓存表中

![image-20220326170242884](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326170242884.png)

> 主机 B 现在可以给主机 C 发送之前想发送（但因不知 C 的 MAC 地址导致无法封装成 MAC 帧导致无法发送）的数据包了

- ARP 高速缓存表中的每一条记录都有其「类型」，分为（动态 & 静态）共 2 种

	- 动态类型是指：记录是主机自动获取到的

		- 生命周期默认为 2 分钟，当生命周期结束时，该记录将被自动删除

		- 这样做的原因是：IP 地址与 MAC 地址的对应关系并非永久性的（eg：当主机更换新的网卡后，主机的 IP 地址并没有改变，但主机的 MAC 地址改变了）

	- 静态类型是指：记录是人为手动配置的

		- 其生命周期在不同操作系统中不同（eg：系统重启后有可能没有了，也有可能还在）

---

- 思考：在下图所示的网络拓扑中，主机 H1 是否可以使用 ARP 协议获取到主机 H2 的 MAC 地址 ？

![image-20220326171157616](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326171157616.png)

- 答案是否定的，这是因为 **ARP 协议只能在一段链路或一个网络上使用，而不能跨网络使用**，本例只能逐段链路使用 ARP 协议

![image-20220326171515126](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220326171515126.png)

---

> 注意：
> 
> 1. ARP 协议无安全验证机制，存在（ARP 欺骗或攻击）的问题
> 
> 2. 除 ARP 请求和响应报文外，ARP 还有其它类型的报文，例如用于检查 IP 地址冲突的无故 ARP（也叫免费 ARP）
