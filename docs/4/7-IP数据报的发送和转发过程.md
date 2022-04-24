#### 直接交付 vs 间接交付

![image-20220424112631076](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424112631076.png)

#### IP数据报的发送和转发流程

![image-20220424112002580](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424112002580.png)

##### 举例

![image-20220424112411448](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424112411448.png)

![image-20220424112840385](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424112840385.png)

假设主机 C 要给主机 F 发送 IP 数据报，那主机 C 肯定知道主机 F 的 IP 地址

主机 C 的 IP 地址和主机 C 的子网掩码想与，就能得到主机 C 所在网络的网络地址

将主机 F 的 IP 地址和主机 C 的子网掩码想与，得到目的网络地址

显然：目的网络地址 ≠ 主机 C 所在网络的网络地址

因此主机 C 就知道了主机 F 与自己不在同一网络（C 与 F 之间的通信属于间接交付～）

因此主机 C 需要将 IP 数据报传输给路由器，由路由器将 IP 数据报转发给主机 F

![image-20220424114004983](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424114004983.png)

> 那么，主机 C 又是如何知道应该把 IP 数据报交给哪个路由器进行转发呢 ？

实际上，用户为了让本网络中的主机能和其他网络中的主机进行通信

就必须给其指定本网络中的一个路由器，由该路由器帮忙进行转发

所指定的路由器，也被称为**默认网关**

对于本例，可以将路由器接口 0 的 IP 地址指定给该接口所直连的网络中的各个主机作为默认网关

同理，可以将路由器接口 1 的 IP 地址指定给该接口所直连的网络中的各个主机作为默认网关

![image-20220424114625261](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424114625261.png)

这样，当本网络中的主机要和其他网络中的主机进行通信时，就会将 IP 数据报传输给默认网关，由默认网关帮主机将 IP 数据报转发出去

假设本例中的主机 A 要给主机 D 发送 IP 数据报（这属于间接交付）

主机 A 会将 IP 数据报传输给自己的默认网关，也就是下图所示的路由器

![image-20220424114954047](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424114954047.png)

> 当路由器收到 IP 数据报后，又是如何转发的呢 ？

- 路由器会首先检查 IP 数据报的首部是否出错

  - 若出错，则丢弃该 IP 数据报并通知源主机

  - 若没有出错，则进行转发，路由器会根据 IP 数据报首部中的目的地址，在自己的路由表中查找匹配的路由条目

    - 若找到匹配的路由条目，则转发给其所指示的下一跳

    - 若没找到，则丢弃该 IP 数据报并通知源主机

*为简单起见，我们假设本例中的 IP 数据报的首部没有出错*

路由器取出 IP 数据报首部中各地址字段的值

![image-20220424154018025](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424154018025.png)

接下来，路由器就要对该 IP 数据报进行查表转发了

在我们给路由器的接口配置 IP 地址和子网掩码时，路由器就知道了自己的该接口与哪个网络是直连的
