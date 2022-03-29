- 虚拟局域网 VLAN 技术是在以太网交换机上实现的，需要交换机实现以下 2 大功能

  1. 以太网交换机负责处理带有 VLAN 标记的帧（eg：IEEE 802.1Q 帧）

	- 当以太网交换机收到普通帧时，会给其插入 4 字节的 VLAN 标记，使之转变为 802.1Q 帧，这被称为“打标签”

	- 当以太网交换机转发 802.1Q 帧时，**可能会**删除其 4 字节的 VLAN 标记，使之转变为普通帧，这被称为“去标签”

  2. 以太网交换机的各端口需要支持不同的端口类型（不同端口类型的端口对帧的处理方式有所不同）

#### IEEE 802.1Q 帧

> 也被称为 Dot One Q 帧，它对以太网的 MAC 帧格式做了扩展（插入了 4 字节的 VLAN 标记）

![image-20220329091632351](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329091632351.png)

![image-20220329092037174](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329092037174.png)

#### 以太网交换机各端口的缺省 VLAN ID

- 在华为交换机上将其称为“端口 VLAN ID”，简记为“PVID”

- 在思科交换机上将其称为“Native VLAN”，也叫“本征 VLAN”

- 思科交换机所有端口的 Native VLAN 都是 VLAN1（就是说：思科交换机未配置 VLAN 时，其所有端口都默认属于 VLAN1）

> 为描述方便，我们接下来的描述都采用 PVID
> 
> 注意：交换机的每个端口有且仅有 1 个 PVID

#### 以太网交换机的端口类型

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329095148567.png" alt="image-20220329095148567" style="zoom:50%;" />

> 注意：思科交换机没有 Hybrid 端口

#### Access 端口

> Access 端口只能属于 1 个 VLAN，一般用于连接用户计算机
>
> 因此：Access 端口的 PVID 值 === 端口所属 VLAN 的 ID 值，默认为 1

- 如下图：

	- 主机 A、B、C、D 分别连接在交换机的 1 个端口上

	- 交换机首次上电时（各端口默认类型为 Access，我们这里用大写字母 A 来表示 && 各端口默认属于 VLAN1，即 PVID = 1）

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329100140434.png" alt="image-20220329100140434" style="zoom:50%;" />

#### Access 端口的接收处理方法

- Access 端口一般只接受“未打标签”的普通以太网 MAC 帧，然后根据接收帧的端口的 PVID 给帧“打标签”，举例如下

- 假设主机 A 发送了 1 个广播帧

	- 该帧从交换机的端口 1 进入交换机

	- 由于端口 1 的类型是 Access，所以它会对接收到的“未打标签”的普通以太网 MAC 帧“打标签”，即：插入 4 字节的 VLAN 标记字段

	- 由于端口 1 的 PVID 值为 1，因此所插入的 4 字节的 VLAN 标记字段中的 VID 值为 1

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329102906036.png" alt="image-20220329102906036" style="zoom:50%;" />

#### Access 端口的发送处理方法

- 若帧中的 VID 与端口的 PVID 相等，则“去标签”后转发该帧，否则不转发

- 对于上例，由于广播帧中 VID 的取值与端口 2、3、4 的 PVID 的取值相等，都为 1

- 所以，广播帧会被先“去标签”后从这 3 个端口转发

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329103427182.png" alt="image-20220329103427182" style="zoom:50%;" />

#### 如果我们的应用需求是：将主机 A 和 B 划归到 VLAN2，将主机 C 和 D 划归到 VLAN3

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

#### Trunk 端口

> Trunk 端口可以属于多个 VLAN，也就是说 Trunk 端口可以接收和发送多个 VLAN 的帧
> 
> Truank 端口一般用于（交换机之间 || 交换机与路由器之间）的互连

- Trunk 端口的默认 PVID 值为 1，但用户可自行设置 Trunk 端口的 PVID 值

---

