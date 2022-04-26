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

