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

*当我们给路由器的接口配置 IP 地址和子网掩码后，路由器就知道了自己的该接口与哪个网络是直连的*

- 例如在本例中

  - 接口 0 所直连的网络是 192.168.0.0，相应的地址掩码是 255.255.255.128，不需要下一跳路由器，因为接口 0 与该网络是直连的

  - 接口 1 所直连的网络是 192.168.0.128，相应的地址掩码是 255.255.255.128，不需要下一跳路由器，因为接口 1 与该网络是直连的

- 注意：

  - 路由表中可能还会有其他路由条目，可以是用户或网络管理员手工配置的**静态路由**，也可以是路由器使用路由协议自动获取到的**动态路由**

  - 这部分内容将在后面详细介绍～

![image-20220424180649468](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424180649468.png)

接下来，路由器根据 IP 数据报的目的地址，在自己的路由表中查找匹配的路由条目（逐条检查路由条目）

- 将目的地址与路由条目中的地址掩码想与得到目的网络地址

  - 若该目的网络地址与路由条目中的目的网络地址不同，则这条路由条目不匹配（继续检查下一条路由条目）

  - 否则路由条目匹配（按照它的下一跳指示的接口进行 IP 数据报的转发）

如此，目的主机就能收到路由器转发来的 IP 数据报啦～

![image-20220424181501214](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424181501214.png)

> 注意：此处所介绍的路由器查表转发 IP 数据报的过程，只是为了让大家理解其最基本的工作原理；在路由器的实际研发过程中，需要设计很好的数据结构以提高查找速度

#### 路由器是隔离广播域的（否则容易广播风暴啊兄弟 ！严重浪费因特网资源 ！！！）

假设主机 A 给本网络上的各设备发送了一个广播 IP 数据报

![image-20220424181754670](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424181754670.png)

假设主机 A 给另一个网络发送广播 IP 数据报

![image-20220424182058238](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424182058238.png)

#### 练习

![image-20220424182444257](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424182444257.png)

![image-20220424182621446](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424182621446.png)

![image-20220424182911598](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220424182911598.png)
