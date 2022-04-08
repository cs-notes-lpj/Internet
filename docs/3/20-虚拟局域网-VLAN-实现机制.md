- 虚拟局域网 VLAN 技术在**以太网交换机**上实现

- 需要以太网交换机实现以下功能

	1. “打标签”：即：当以太网交换机收到普通帧时，给其添加 4 字节的 VLAN 标记，使之转变为 IEEE 802.1Q 帧

	2. “去标签”：即：当以太网交换机转发 IEEE 802.1Q 帧时，可能会将 VLAN 标记删除，使之变回普通帧

	3. 以太网交换机需要支持多种端口类型（端口类型不同 => 对帧的处理方式不同）

### IEEE 802.1Q 帧

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

### 以太网交换机的 3 种端口

> 端口类型不同 => 对帧的处理方式不同

1. Access

2. Trunk

3. Hybrid（思科交换机「无」Hybrid 端口）

#### 1、Access 端口

- Access 端口一般用于连接用户计算机

- Access 端口只能属于 1 个 VLAN

- 因此：

	- Access 端口的 PVID 值 == Access 端口所属的 VLAN 的 ID 值，默认为 1

- 如下图：

	- 主机 A、B、C、D 连接在交换机的不同端口上

	- 交换机首次上电时，各端口默认为 Access 端口（下图中用 A 来表示）

![image-20220329100140434](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329100140434.png)

##### Access 端口的接收处理方法

- 通常，Access 端口只接受普通的以太网 MAC 帧

- 假设主机 A 发送了 1 个广播帧，则该帧会从端口 1 进入交换机

	- 由于端口 1 为 Access 端口 => 所以这个普通的以太网 MAC 帧会被“打标签”

	- 由于端口 1 的 PVID 值为 1 => 所以帧的 VID 为 1

![image-20220329102906036](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329102906036.png)

##### Access 端口的发送处理方法

- 若帧的 VID 与端口的 PVID 相等，则“去标签”后转发帧

![image-20220329103427182](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329103427182.png)

#### 举例（将主机 A 和 B 划归到 VLAN-2，将主机 C 和 D 划归到 VLAN-3）

![image-20220408171314928](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220408171314928.png)

- 首先在交换机上创建 VLAN-2 和 VLAN-3

- 然后

	- 将交换机的端口 1 和 2 划归到 VLAN-2（端口 1 和 2 的 PVID 也就为 2）

	- 将交换机的端口 3 和 4 划归到 VLAN-3（端口 3 和 4 的 PVID 也就为 3）

![image-20220329103836400](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329103836400.png)

- 假设主机 A 发送了 1 个广播帧，则该帧会从端口 1 进入交换机

![image-20220329104140514](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329104140514.png)

- 由于端口 1 为 Access 端口 => 所以这个普通的以太网 MAC 帧会被“打标签”

- 由于端口 1 的 PVID 值为 2 => 所以帧的 VID 为 2

- 由于该帧的 VID 和端口 2 的 PVID 值相等 => 所以该帧会被“去标签”后从端口 2 转发

- 同理

![image-20220408173317690](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220408173317690.png)

#### 2、Trunk 端口

- Trunk 端口一般用于（交换机之间 || 交换机与路由器之间）的互连

- Trunk 端口默认 PVID 值为 1

- 如下图，两台交换机互连形成了一个交换式以太网

- 假设我们希望将主机 A、B、E、F 划归到 VLAN-1，将 C、D、G、H 划归到 VLAN-2

![image-20220329111406482](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329111406482.png)

- 每一台交换机的端口 1 和 2 都保持默认配置即可（属于 VLAN-1、PVID 值为 1）

- 每一台交换机上都创建 VLAN-2，将端口 3 和 4 划归到 VLAN-2（PVID 值为 2）

> 用于交换机互连的 Trunk 端口的 PVID 值保持默认的 1 即可

##### Trunk 端口的发送处理方法

- 假设主机 A 发送广播帧，则该帧会从端口 1 进入交换机

	- 由于端口 1 为 Access 端口 => 所以这个普通的以太网 MAC 帧会被“打标签”

	- 由于端口 1 的 PVID 值为 1 => 所以帧的 VID 为 1

	- 由于该帧的 VID 和端口 2 的 PVID 值相等，且端口 2 为 Access 端口 => 所以该帧会被“去标签”后从端口 2 转发

	![image-20220329112841264](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329112841264.png)

	- 由于该帧的 VID 和端口 5 的 PVID 值相等，且端口 5 为 Trunk 端口 => 所以该帧会被“去标签”后从端口 5 转发

	- 该帧也就从端口 5 进入了交换机 2

	![image-20220329113006966](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329113006966.png)

##### Trunk 端口的接收处理方法

- 接着上例，帧从端口 5 进入了交换机 2

- 交换机 2 会对接收到的这个普通的以太网 MAC 帧“打标签”

- 由于端口 5 的 PVID 值为 1 => 所以帧的 VID 为 1

![image-20220329113534301](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329113534301.png)

- 由于该帧的 VID 和端口 1、2 的 PVID 值相等，且端口 1、2 为 Access 端口 => 所以该帧会被“去标签”后从端口 1、2 转发

![image-20220329113850769](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329113850769.png)

##### 再看个例子

- 假设主机 C 发送广播帧，则该帧会从端口 3 进入交换机

- 由于端口 3 为 Access 端口 => 所以这个普通的以太网 MAC 帧会被“打标签”

- 由于端口 3 的 PVID 值为 2 => 所以帧的 VID 为 2

![image-20220329114647597](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329114647597.png)

- 由于该帧的 VID 和端口 4 的 PVID 值相等，且端口 4 为 Access 端口 => 所以该帧会被“去标签”后从端口 4 转发

![image-20220329114916748](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329114916748.png)

- 该帧的 VID 和端口 5 的 PVID 值**不等**，Trunk 端口对这样的帧会**直接转发**

- 因此：该帧会带着标签，从端口 5 转发

- 交换机 2 的端口 5 会接收这个带有标签的 IEEE 802.1Q 帧

- 由于该帧的 VID 和端口 3、4 的 PVID 值相等，且端口 3、4 为 Access 端口 => 所以该帧会被“去标签”后从端口 3、4 转发

![image-20220329115416029](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329115416029.png)

> 不难看出：Trunk 端口可接收或发送属于不同 VLAN 的帧（Trunk 端口可属于多个 VLAN）

##### 习题

![image-20220329115618801](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329115618801.png)

![image-20220329120204797](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329120204797.png)

##### 对比图

![image-20220408230050817](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220408230050817.png)

#### 3、Hybrid 端口（华为交换机独有）

![image-20220408231240745](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220408231240745.png)
