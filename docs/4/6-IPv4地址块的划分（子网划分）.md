- 假设你需要给互联网中的几个不同网络中的主机和路由器接口分配 IPv4 地址

- 然后你申请到了一个比较大的 IPv4 地址块

- 显然：

  - 你需要对这个较大的 IPv4 地址块进行划分，划分成几个较小的地址块

  - 然后你就可以将这些较小的地址块分配给不同的网络，进而主机和路由器接口就能领到   IPv4 地址了

- 那么你该如何对这个较大的 IPv4 地址块进行划分呢 ？

#### 方法 1：使用「定长的子网掩码（`F`ixed `L`ength `S`ubnet `M`ask）」

<!-- > 即：使用同一个子网掩码来划分子网 -->

![image-20220417170107404](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170107404.png)

- 简言之：如何对 C 类网 218.75.230.0 进行划分，才能满足给这 5 个子网分配 IP 地址的应用需求 ？

![image-20220417170613594](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170613594.png)

![image-20220417170932034](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170932034.png)

- 以此类推，便可得子网划分的全部细节如下

![image-20220417171024060](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417171024060.png)

- 现在，我们就可以从子网 1～8 中任选 5 个分配给网络 N1～N5，就像下图这样

![image-20220417171250668](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417171250668.png)

> 不难看出：若采用定长的子网掩码进行子网划分，会导致
>
> 1. 只能划分出 2^n 个子网（其中 n 是从主机号部分借用的用来作为子网号的比特数量）
>
> 2. 分配给每个子网的 IP 地址的数量都相同，容易造成 IP 地址的浪费

#### 方法 2：采用「变长的子网掩码（`V`ariable `L`ength `S`ubnet `M`ask）」进行划分

<!-- > 即：使用不同的子网掩码来划分子网 -->

- 分配给每个子网的 IP 地址数量可以不同，这尽可能地减少了对 IP 地址的浪费





