![image-20220327162714740](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327162714740.png)

#### 广播风暴

- 假设网络中的某台主机要给另一个主机发送 1 个数据帧

- 但在自己的 ARP 高速缓存表中，无法查到目的主机的 MAC 地址

- 于是，首先要发送 ARP 广播请求来获取目的主机的 MAC 地址，该 ARP 广播请求会传遍整个网络，网络中的其他所有主机都能收到该广播

- 这种情况就是所谓的广播风暴

<img src="https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327163122734.png" alt="image-20220327163122734" style="zoom:50%;" />

> 广播风暴会浪费网络资源和网络中各主机的 CPU 资源
> 
> 因此：除非实际的应用需求必须得使用广播，否则网络中的主机应尽量不使用广播 ！
> 
> 但实际情况是，网络中会频繁出现广播信息 ！

![image-20220327163352058](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327163352058.png)

> 那么：如何才能将一个较大的广播域分割成一个个较小的广播域呢 ？

1. 使用路由器可以隔离广播域（路由器工作在网络层 ！）

- 由于路由器默认情况下并不转发广播数据包，因此路由器很自然地就可以隔离广播域

- 下图是由 2 台以太网交换机互连而成的交换式以太网，网络中的各主机属于同一个广播域

![image-20220327163837731](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327163837731.png)

- 使用路由器，就可以将该广播域分割成 2 个较小的广播域

![image-20220327163948316](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327163948316.png)

> 但是，路由器的成本较高，局域网内部全部使用路由器来隔离广播域是不现实的 ！
> 
> 因此，虚拟局域网技术 VLAN（`V`irtual `L`ocal `A`rea `N`etwork） 应运而生～
> 
>  VLAN 是一种将局域网内的设备划分成与物理位置无关的逻辑组的技术

- 如下图，1、2、3 楼分别有 1 个局域网

![image-20220327164940587](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327164940587.png)

- 可将它们通过另外一个交换机互连形成一个更大的局域网，那么原来每一个局域网都会成为现在这个局域网的一个网段

![image-20220327165027686](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327165027686.png)

- 网络中的各主机属于同一个广播域，某个主机发送的广播数据包，其他所有主机都能收到

![image-20220327165202549](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327165202549.png)

- 根据应用需求，我们可将该局域网划分成 2 个 VLAN，此后，VLAN_1 中广播的数据包不会传送至 VLAN_2，VLAN_2 中广播的数据包也不会传送至 VLAN_1

![image-20220327165319549](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220327165319549.png)

> 即：同一个 VLAN 内部可以广播通信，而不同 VLAN 之间不能广播通信
