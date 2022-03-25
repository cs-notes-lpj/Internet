- 如图所示，多台主机连接在一根总线上，各主机随机发送帧

- 当两台或多台主机同时发送帧时，信号就会产生碰撞

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220321192016272.png" alt="image-20220321192016272" style="zoom:50%;" />

- 或者当某台主机正在使用总线发送帧，突然另一台主机也要发送帧，这也会产生碰撞

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220321192042494.png" alt="image-20220321192042494" style="zoom:50%;" />

> 显然，如何协调总线上各主机的工作，以尽量避免碰撞的产生，是一个必须解决的重要问题
>
> 早期的共享式以太网，采用载波监听多址接入/碰撞检测，也就是 CSMA/CD 协议来解决该问题
> 
> （`C`arrier `S`ense `M`ultiple `A`ccess / `C`ollision `D`etection）

---

#### 多址接入 MA

- 多址接入的意思是：

	- 多个主机（也可称为「站」或「站点」）连接在一条总线上，竞争使用总线

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220321200425843.png" alt="image-20220321200425843" style="zoom:40%;" />

#### 载波监听 CS

- 载波监听的意思是：

	- 每一个站在发送帧之前要先检测一下总线上是否有其他站点在发送帧（可以比喻为“先听后说”）

	- 若检测到总线空闲 96 比特时间，则发送帧

	- 若检测到总线忙，则继续检测，待到总线转为空闲 96 比特时间再发送帧

- 96 比特时间：

	- 指的是发送 96 比特所耗费的时间，也称为「帧间最小间隔」
	
	- 其作用是：

		- 使接收方可以检测出一个帧的结束

		- 也使得所有其他站点都能有机会平等竞争信道并发送帧

#### 碰撞检测 CD

- 碰撞检测的意思是：

	- 每一个正在发送帧的站，都在一边发送帧，一边检测碰撞（可以比喻为“边说边听”）

	- 一旦发现总线上出现碰撞，则立即停止发送，退避一段随机时间后，再次重新发送（可以比喻为“一旦冲突，立即闭嘴；等待时机，再次开讲”）

---

#### 举个例子

- 假设主机 C 要发送帧，它会首先进行载波监听，检测到总线空闲 96 比特时间后，发送帧

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220321202710465.png" alt="image-20220321202710465" style="zoom:40%;" />

- 假设在主机 C 使用总线发送帧的过程中，主机 B 也要发送帧，则主机 B 也会先进行载波监听，却发现总线忙，于是主机 B 持续检测总线

- 一旦主机 B 发现总线空闲 96 比特时间，就会立即发送帧，且一边发送一边进行碰撞检测，只要没检测到碰撞，则可以继续发送帧的剩余部分

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220321202811023.png" alt="image-20220321202811023" style="zoom:40%;" />

- 假设在主机 B 发送帧的过程中，主机 C 也要发送帧，则主机 C 也会先进行载波监听

- （但在 96 比特时间中，主机 B 广播的信号还没到达主机 C，主机 C 就会误以为总线空闲，于是到了 96 比特时间主机 C 就会发送帧）

- 这必然会导致碰撞

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220321202911868.png" alt="image-20220321202911868" style="zoom:40%;" />

- 在产生碰撞的时刻，主机 B 和主机 C 都在一边发送帧一边进行碰撞检测，但暂时都没检测到碰撞

- 碰撞信号沿总线传播，在本例中，主机 C 会比主机 B 更早检测到碰撞并停止发送

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220321203025123.png" alt="image-20220321203025123" style="zoom:40%;" />

- 主机 C 退避一段随机时间后，重新再发送之前所发送的帧

- 当主机 B 检测到碰撞后，也会立即停止发送，退避一段随机时间后，重新再发送之前所发送的帧

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220321203258102.png" alt="image-20220321203258102" style="zoom:40%;" />

- 以太网还采取了一种叫做「强化碰撞」的措施

	- 指的是当发送帧的站点一旦检测到碰撞，除了立即停止发送之外，还要再发送 32 比特或 48 比特的人为干扰信号（Jamming Signal）

	- 以便有足够多的碰撞信号，使所有站点都能检测到碰撞

#### 争用期（碰撞窗口）

![image-20220322072125144](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322072125144.png)

- 如图所示，纵坐标为时间，主机 A 和主机 D 处于总线型以太网的两端，以太网端到端的单程传播时延记为 τ

- 假设在时刻 0 主机 A 要发送帧，当检测到总线空闲 96 比特时间后，发送帧

- 在时刻 τ-δ 主机 D 也要发送帧，当检测到总线空闲 96 比特时间后，发送帧

> 注意：主机 D 检测到总线空闲，但实际上总线并不空闲，只是主机 D 检测不出来

- 这必然会导致碰撞

- 发生碰撞的时刻为 τ-δ/2

- 之后，碰撞信号会陆续传播到主机 D 和主机 A

- 主机 D 检测到碰撞的时刻为 τ，而主机 A 检测到碰撞的时刻为 2τ-δ

- 可见，主机最多经过 2τ，也就是 δ->0 就可检测到本次发送是否遭受了碰撞

> 因此，以太网的端到端往返传播时延 2τ 就称为争用期（碰撞窗口）

- 发送帧的主机经过争用期这段时间还没有检测到碰撞，才能肯定这次发送不会产生碰撞

- 每一个主机在自己发送帧之后的一小段时间内，存在遭遇碰撞的可能性，这一小段时间是不确定的，它取决于另一个发送帧的主机到本主机的距离，但不会超过总线的端到端往返传播时延（即：一个争用期时间）

> 显然，在以太网中主机越多，端到端往返传播时延越大，发生碰撞的概率就越大
>
> 因此：共享式以太网不能连接太多主机，使用的总线也不能太长
>
> 带宽为 10 Mbps 的以太网将争用期定为 512 比特发送时间，即：51.2 μs（微秒），因此其总线长度不能超过 5120 m
>
> 但考虑到其他因素（eg：信号衰减），以太网规定总线长度不能超过 2500 m

#### 最小帧长

- 假设主机 A 正在给主机 D 发送一个很短的帧，一边发送一边检测碰撞

- 主机 A 很快就将该帧发送完毕了，之后就不再对该帧进行碰撞检测

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322093220654.png" alt="image-20220322093220654" style="zoom:40%;" />

- 在该帧的传输过程中，主机 C 也要发送帧，主机 C 检测到总线空闲 96 比特时间后，发送帧，尽管总线实际上并不空闲

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322093419209.png" alt="image-20220322093419209" style="zoom:40%;" />

- 这必然会导致碰撞

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322093507022.png" alt="image-20220322093507022" style="zoom:40%;" />

- 主机 D 最终会收到主机 A 发送的、遭遇碰撞的帧（即：有差错的帧），主机 D 会将该帧丢弃

- 但对于主机 A 而言，（由于它之前就将该帧发送完毕，不再对该帧进行碰撞检测了，因此），它并不知道自己已经发送完毕的该帧，在总线上传输的过程中遭遇了碰撞，因此不会重发该帧

> 所以，使用 CSMA/CD 协议的以太网的帧长不能太短 ！
>
> 以太网规定最小帧长为 64 字节，即 512 比特，而发送 512 个比特的时间即为争用期（碰撞窗口）

- 如果要发送的数据非常少，那么就必须加入一些填充字节，使帧长不小于 64 字节

- 以太网的最小帧长确保了主机可在帧发送完之前，就检测到该帧在发送过程中是否遭遇了碰撞

- 如果在争用期，也就是共发送 64 字节所耗费的时间内没有检测到碰撞，那么后续发送的数据就一定不会发生碰撞

- 如果在争用期内检测到碰撞，就立即中止发送，这时已经发送出去的数据一定小于 64 字节

> 因此，凡长度小于 64 字节的帧都是由于碰撞而异常中止的无效帧

- 既然以太网规定了最小帧长，那么是否还规定了最大帧长呢 ？

#### 最大帧长

- 假设主机 A 正在给主机 D 发送一个很长的帧，这会使主机 A 长时间占用总线，于是总线上的其他主机迟迟拿不到总线的使用权

- 另外，由于帧很长，还可能导致主机 D 的接收缓冲区无法装下该帧而产生溢出

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322095119974.png" alt="image-20220322095119974" style="zoom:40%;" />

> 因此，以太网的帧长应该有上限 ！

- 下图是以太网版本 2 的 MAC 帧格式

	- 其数据载荷的最大长度为 1500 字节，加上首部和尾部的 18 字节，因此帧的最大长度为 1518 字节

	- 其数据载荷的最小长度为 46 字节，加上首部和尾部的 18 字节，恰好满足帧的最小长度 64 字节

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322095654132.png" alt="image-20220322095654132" style="zoom:50%;" />

- 下图是插入 VLAN 标记字段后的 802.1Q 帧

	- 其数据载荷的最大长度为 1500 字节，加上首部和尾部的 22 字节，因此帧的最大长度为 1522 字节

	- 其数据载荷的最小长度为 42 字节，加上首部和尾部的 22 字节，恰好满足帧的最小长度为 64 字节

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322095903933.png" alt="image-20220322095903933" style="zoom:50%;" />

#### 退避时间的计算方法（截断二进制指数退避算法）

![image-20220322100353985](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322100353985.png)

- 注：k 是从「重传次数」和数值「10」这二者中取小者

- 举例如下

![image-20220322100641910](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322100641910.png)

> 从该例可以看出
>
> 若连续发生多次碰撞，就表明可能有较多的主机在竞争信道
>
> 但使用上述退避算法，可使重传需要推迟的平均时间随重传次数而增大（这被称为动态退避），因而减小了碰撞发生的概率，有利于整个系统的稳定
>
> 当重传多达 16 次仍不能成功时，表明同时打算发送帧的主机太多，以至于连续发生碰撞，则丢弃该帧，并向高层报告

#### 信道利用率（使用 CSMA/CD 协议的共享式以太网）

- 如图所示，横坐标为时间

- 总线上的某个主机可能在发生多次碰撞，进行多次退避后，成功发送了一个帧，帧的发送时延记为 T_0

- 在最极端的情况下，源主机在总线的一端，而目的主机在总线的另一端

- 因此，还要经过一个单程端到端的传播时延 τ，总线才能完全进入空闲状态

- 因此，发送一帧所需的平均时间为多个争用期 2τ，加上一个帧的发送时间 T_0，再加上一个单程端到端的传播时延 τ

![image-20220322101740842](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322101740842.png)

- 考虑以下这种理想情况：

	- 各个主机发送帧都不会产生碰撞

	- 总线一旦空闲就有某个主机立即发送帧

	- 则发送一帧所占用总线的时间为 T_0 + τ，而帧本身的发送时间为 T_0

	- 所以，信道极限利用率的表达式为：

	<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322111136473.png" alt="image-20220322111136473" style="zoom:70%;" />

	- 为了提高信道利用率，参数 a 的值应尽量小

	- 则 τ 的值应尽量小；T_0 的值应当尽量大

> 这意味着以太网端到端的距离应受到限制，不应太长；而以太网的帧应尽量长（chang）一些

#### 帧发送流程（CSMA/CD 协议）

![image-20220322111558612](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322111558612.png)

#### 帧接收流程（CSMA/CD 协议）

> 快递来了去取快递，一看是破的扭头就走，不破就看看收件人是不是自己，是自己就打开看看坏了没，确认无误签收

- 若接收到的帧的长度小于最短帧长，则认为该帧遭到了碰撞，则丢弃该帧

- 若接收到的帧的目的 MAC 地址与接收方的 MAC 地址相同或是广播地址，则继续进行后续判断，否则丢弃该帧

- 若使用循环冗余校验 CRC 检查出帧在传输过程中出现了误码，则丢弃该帧

- 只有正确通过上述三个检查，主机才能接受所收到的帧

![image-20220322112126297](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322112126297.png)

#### 注意

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322120025663.png" alt="image-20220322120025663" style="zoom:70%;" />

#### 习题

![image-20220322112938056](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322112938056.png)

![image-20220322115642362](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322115642362.png)

![image-20220322115830459](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322115830459.png)

![image-20220322115933165](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322115933165.png)

![image-20220322115904661](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/old-from-gitee-2022-03-25/by-picgo/image-20220322115904661.png)
