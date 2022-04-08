- 虚拟局域网 VLAN 技术在**以太网交换机**上实现

- 需要以太网交换机实现以下功能

	1. “打标签”：即：当以太网交换机收到普通帧时，给其添加 4 字节的 VLAN 标记，使之转变为 IEEE 802.1Q 帧

	2. “去标签”：即：当以太网交换机转发 IEEE 802.1Q 帧时，可能会将 VLAN 标记删除，使之变回普通帧

	3. 以太网交换机需要支持多种端口类型（端口类型不同 => 对帧的处理方式不同）

#### IEEE 802.1Q 帧

- 以太网 MAC 帧 + 4 字节的 VLAN 标记 => IEEE 802.1Q 帧（也称 Dot One Q 帧）

![image-20220329091632351](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329091632351.png)

- VLAN 标记的**最后 12 比特**被称为 VID（即：VLAN 标识符），它唯一地标识着该帧属于哪一个 VLAN

	- 显然，VID 的取值范围是 [0～2^12-1]，即 [0～4095]

	- 而由于 0 和 4095 都不使用，因此 **VID 的实际有效取值范围是 [1～4094]**

> 由于 VLAN 标记的其它内容对于我们理解 VLAN 的实现机制没啥帮助，因此这里不作介绍

---

- 用户未配置 VLAN 时，对于思科交换机，所有端口都默认属于 VLAN-1，这被称为「交换机端口的缺省 VLAN ID」

- 交换机端口的缺省 VLAN ID 有一堆别名

	- Native VLAN（思科交换机的说法）

	- 本征VLAN（思科交换机的说法）

	- 端口 VLAN ID（华为交换机的说法）

	- Port VLAN ID（华为交换机的说法）

	- PVID（华为交换机的说法）

> 注意：交换机的每个端口都有且仅有 1 个缺省 VLAN ID

---


#### 以太网交换机的 3 种端口

> 端口类型不同 => 对帧的处理方式不同

1. Access

2. Trunk

3. Hybrid（思科交换机「无」Hybrid 端口）

#### 1、Access 端口

> Access 端口只能属于 1 个 VLAN，一般用于连接用户计算机
>
> 因此：Access 端口的 PVID 值 === 端口所属 VLAN 的 ID 值，默认为 1

- 如下图：

	- 主机 A、B、C、D 分别连接在交换机的 1 个端口上

	- 交换机首次上电时（各端口默认类型为 Access，我们这里用大写字母 A 来表示 && 各端口默认属于 VLAN1，即 PVID = 1）

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329100140434.png" alt="image-20220329100140434" style="zoom:50%;" />

##### Access 端口的接收处理方法

- Access 端口一般只接受“未打标签”的普通以太网 MAC 帧，然后根据接收帧的端口的 PVID 给帧“打标签”，举例如下

- 假设主机 A 发送了 1 个广播帧

	- 该帧从交换机的端口 1 进入交换机

	- 由于端口 1 的类型是 Access，所以它会对接收到的“未打标签”的普通以太网 MAC 帧“打标签”，即：插入 4 字节的 VLAN 标记字段

	- 由于端口 1 的 PVID 值为 1，因此所插入的 4 字节的 VLAN 标记字段中的 VID 值为 1

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329102906036.png" alt="image-20220329102906036" style="zoom:50%;" />

##### Access 端口的发送处理方法

- 若帧中的 VID 与端口的 PVID 相等，则“去标签”后转发该帧，否则不转发

- 对于上例，由于广播帧中 VID 的取值与端口 2、3、4 的 PVID 的取值相等，都为 1

- 所以，广播帧会被先“去标签”后从这 3 个端口转发

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329103427182.png" alt="image-20220329103427182" style="zoom:50%;" />

##### 如果我们的应用需求是：将主机 A 和 B 划归到 VLAN2，将主机 C 和 D 划归到 VLAN3

- 如此，VLAN2 中的广播帧不会传送到 VLAN3，VLAN3 中的广播帧也不会传送到 VLAN2

- 为实现这种应用，可在交换机上创建 VLAN2 和 VLAN3，然后

	- 将交换机的端口 1 和 2 划归到 VLAN2，因此端口 1 和 2 的 PVID 值为 2

	- 将交换机的端口 3 和 4 划归到 VLAN3，因此端口 3 和 4 的 PVID 值为 3

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329103836400.png" alt="image-20220329103836400" style="zoom:50%;" />

- 假设主机 A 发送广播帧

	- 该帧从交换机的端口 1 进入交换机

	- 由于端口 1 的类型是 Access，所以它会对接收到的“未打标签”的普通以太网 MAC 帧“打标签”，即：插入 4 字节的 VLAN 标记字段

	- 由于端口 1 的 PVID 值为 2，因此所插入的 4 字节的 VLAN 标记字段中的 VID 值为 2
	
- 由于广播帧中 VID 的取值与端口 2 的 PVID 的取值相等，都为 2

- 所以，广播帧会被先“去标签”后从端口 2 转发

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329104140514.png" alt="image-20220329104140514" style="zoom:50%;" />

#### 2、Trunk 端口

> Trunk 端口可以属于多个 VLAN，也就是说 Trunk 端口可以接收和发送多个 VLAN 的帧
> 
> Truank 端口一般用于（交换机之间 || 交换机与路由器之间）的互连

- Trunk 端口的默认 PVID 值为 1，但用户可自行设置 Trunk 端口的 PVID 值

---

- 如下图，两台交换机互连形成了一个交换式以太网

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329111307782.png" alt="image-20220329111307782" style="zoom:50%;" />

- 假设我们的应用需求是：将主机 A、B、E、F 划归到 VLAN1，将主机 C、D、G、H 划归到 VLAN2

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329111406482.png" alt="image-20220329111406482" style="zoom:50%;" />

- 由于交换机首次上电时

	- 各端口类型默认为 Access

	- 各端口默认属于 VLAN1，相应的 PVID 值为 1

- 因此

	- 我们需要对交换机进行合理地配置，才能满足应用需求，步骤如下

	1. 分别在两台交换机上创建 VLAN2，并将它们的端口 3 和 4 划归到 VLAN2，其相应的 PVID 值为 2

	2. 两台交换机的端口 1 和 2 保持默认配置即可，也就是属于 VLAN1，其相应的 PVID 值为 1

	> 注意：需要将这两台交换机之间互连的端口 5 的类型更改为 Trunk，而 PVID 值保持默认的 1 即可

##### Trunk 端口的发送处理方法

- **假设主机 A 发送广播帧**

	- 该帧从交换机的端口 1 进入交换机

	- 由于端口 1 的类型是 Access，所以它会对接收到的“未打标签”的普通以太网 MAC 帧“打标签”，即：插入 4 字节的 VLAN 标记字段

	- 由于端口 1 的 PVID 值为 1，因此所插入的 4 字节的 VLAN 标记字段中的 VID 值为 1
	
- 由于广播帧中 VID 的取值与端口 2 的 PVID 的取值相等，都为 1，且端口 2 的类型为 Access

- 所以，广播帧会被先“去标签”后从端口 2 转发

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329112841264.png" alt="image-20220329112841264" style="zoom:50%;" />

- 其次，由于该广播帧的 VID 值与端口 5 的 PVID 值相等，都为 1，且端口 5 的类型为 Trunk

- 所以，广播帧会被先“去标签”后从端口 5 转发

- 显然：该广播帧会从交换机 2 的端口 5 进入交换机 2

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329113006966.png" alt="image-20220329113006966" style="zoom:50%;" />

##### Trunk 端口的接收处理方法

- 接收“未打标签”的帧，并根据接收帧的端口的 PVID 的值给帧“打标签”

	- 即：插入 4 字节 VLAN 标记字段，字段中的 VID 取值与端口的 PVID 取值相等

- 对于上例，交换机 2 会对接收到的“未打标签”的普通以太网 MAC 帧“打标签”

	- 即：插入 4 字节的 VLAN 标记字段，如下图所示

	- 由于端口 5 的 PVID 值为 1，因此 VLAN 标记字段中的 VID 的值也为 1

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329113534301.png" alt="image-20220329113534301" style="zoom:50%;" />

- 由于该广播帧中的 VID 的取值与端口 1 和 2 的 PVID 的取值相等，且端口 1 和 2 的类型为 Access

- 因此：广播帧会被先“去标签”后从端口 1 和 2 转发

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329113850769.png" alt="image-20220329113850769" style="zoom:50%;" />

- **假设主机 C 发送广播帧**

- 该帧从交换机 1 的端口 3 进入交换机

- 由于端口 3 的类型是 Access，它会对接收到的“未打标签”的普通以太网 MAC 帧“打标签”，也就是插入 4 字节的 VLAN 标记字段

- 由于端口 3 的 PVID 值为 2，因此，所插入的 4 字节 VLAN 标记字段中的 VID 的值也为 2，如下图所示

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329114647597.png" alt="image-20220329114647597" style="zoom:50%;" />

- 由于该广播帧中的 VID 的取值与端口 4 的 PVID 的取值都为 2，且端口 4 的类型为 Access

- 因此广播帧会被先“去标签”后从端口 4 转发

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329114916748.png" alt="image-20220329114916748" style="zoom:50%;" />

- 该广播帧中的 VID 的取值与端口 5 的 PVID 的取值不相等

- 但由于：Trunk 端口对 VID 不等于 PVID 的帧是直接转发的

- 因此：交换机 1 会从端口 5 对帧直接转发，而不去标签

- 显然，该 802.1Q 广播帧会从交换机 2 的 端口 5 进入交换机 2

- Trunk 端口接收已打标签的 802.1Q 帧，该广播帧中的 VID 的取值与端口 3 和 4 的 PVID 的取值相等，都为 2，且端口 3 和 4 的类型都为 Access

- 因此广播帧会被先“去标签”后从端口 3 和 4 转发

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329115416029.png" alt="image-20220329115416029" style="zoom:50%;" />

> 不难看出：
> 
> 在由多个交换机互连而成的交换式以太网中划分 VLAN 时，连接主机的交换机端口应设置为 Access 类型，交换机之间互连的端口应设置为 Trunk 类型

#### 习题

![image-20220329115618801](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329115618801.png)

![image-20220329120204797](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329120204797.png)

#### 华为交换机私有的 Hybrid 端口类型


#### 小结

![image-20220329120806847](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329120806847.png)



