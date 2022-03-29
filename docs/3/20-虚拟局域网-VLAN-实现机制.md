- 虚拟局域网 VLAN 技术是在以太网交换机上实现的，需要交换机实现以下 2 大功能

  1. 以太网交换机负责处理带有 VLAN 标记的帧（eg：IEEE 802.1Q 帧）

	- 当以太网交换机收到普通帧时，会给其插入 4 字节的 VLAN 标记，使之转变为 802.1Q 帧，这被称为“打标签”

	- 当以太网交换机转发 802.1Q 帧时，**可能会**删除其 4 字节的 VLAN 标记，使之转变为普通帧，这被称为“去标签”

  2. 以太网交换机的各端口需要支持不同的端口类型（不同端口类型的端口对帧的处理方式有所不同）

#### IEEE 802.1Q 帧

> 也被称为 Dot One Q 帧，它对以太网的 MAC 帧格式做了扩展（插入了 4 字节的 VLAN 标记）

![image-20220329091632351](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329091632351.png)

![image-20220329092037174](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220329092037174.png)

