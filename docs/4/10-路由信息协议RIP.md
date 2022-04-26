![image-20220425203332849](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220425203332849.png)

- 注意：有些厂商的路由器并没有按照 RIP 标准文档的规定来实现 RIP（但这并不影响 RIP 的正常运行）

- eg：思科路由器中的 RIP 将路由器到直连网络的距离定义为 0

![image-20220425203634865](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220425203634865.png)

![image-20220425203734759](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220425203734759.png)

#### RIP 的 3 个要点

![image-20220425203908875](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220425203908875.png)

#### RIP 的基本工作过程

![image-20220425211222035](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220425211222035.png)

![image-20220425211447180](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220425211447180.png)

![image-20220425211619197](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220425211619197.png)

#### RIP 的路由条目的更新规则

下图路由器 C 和 D 互为相邻路由器，它们之间周期性地交换并更新路由信息

路由器 C 的路由表中到达各目的网络的下一跳都记为了“?”，可理解为路由器 D 并不需要关心路由器 C 的这些内容

![image-20220426102520644](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426102520644.png)

假设路由器 C 的 RIP 更新报文的发送周期到了，则路由器 C 会将自己的路由表中的路由信息封装到 RIP 更新报文中发送给路由器 D

可以简单地理解为：路由器 C 将自己的路由表发送给了路由器 D

![image-20220426102652304](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426102652304.png)

路由器 D 收到后对其进行**改造**

![image-20220426102831916](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426102831916.png)

路由器 D 现在可以根据改造好的路由表，来**更新**自己先前的路由表了

![image-20220426103209543](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426103209543.png)

...

![image-20220426103438469](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426103438469.png)

#### 习题

![image-20220426103712773](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426103712773.png)

#### RIP 存在「坏消息传播得慢」的问题

如下图，假设 R1 到达其直连网络 N1 的链路出现了故障

当 R1 检测出该故障后，就会将到达 N1 的路由条目中的距离修改为 16，表示 N1 不可达

待到 RIP 更新周期，发送该路由信息给 R2

而此时 R2 的路由表中关于 N1 的路由条目，仍然是先前通过 RIP 协议获取到的（即：到达 N1 的距离为 2，下一跳通过 R1 转发）

![image-20220426105135584](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426105135584.png)

*假设 R2 的 RIP 更新周期先到时，则 R2 的路由信息会更早到达 R1，R1 的路由信息会之后到达 R2*

![image-20220426105634985](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426105634985.png)

![image-20220426105816183](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426105816183.png)

![image-20220426105859879](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426105859879.png)

![image-20220426110052323](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426110052323.png)

> 注意：使用上述措施后，也无法避免路由环路问题，这是距离向量算法的本质决定的 ！

#### 习题

![image-20220426110602947](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426110602947.png)

#### 解析

![image-20220426110634981](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426110634981.png)

![image-20220426110800529](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426110800529.png)

![image-20220426110929875](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426110929875.png)

![image-20220426111030046](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220426111030046.png)

#### 小结

本节只介绍了 RIP 最基本的工作原理，并不涉及 RIP 的全部细节（eg：RIP 相关报文的封装格式、RIP 中涉及的一些定时时长、...）

目前，基于 IPv4 的 RIP 有两个版本（1 & 2），还有基于 IPv6 的 RIPng
