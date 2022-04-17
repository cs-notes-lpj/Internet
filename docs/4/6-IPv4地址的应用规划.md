#### 需求

- 需要对一个较大的 IPv4 地址块进行划分，划分成几个较小的地址块

  - 这些较小的地址块可以被分配给互联网中的不同网络，进而就可以给各网络中的主机和路由器接口分配 IPv4 地址

- 该如何划分呢 ？

#### 方法 1：采用「定长的子网掩码（`F`ixed `L`ength `S`ubnet `M`ask）」进行划分

> 即：使用同一个子网掩码来划分子网

- 这会导致分配给每个子网的 IP 地址数量都相同，这容易造成 IP 地址的浪费

#### 方法 2：采用「变长的子网掩码（`V`ariable `L`ength `S`ubnet `M`ask）」进行划分

> 即：使用不同的子网掩码来划分子网

- 分配给每个子网的 IP 地址数量可以不同，这尽可能地减少了对 IP 地址的浪费

---

#### 举例

![image-20220417170107404](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170107404.png)

- 注意：上图已经标好了各网络所需 IP 地址的数量

  - 一个网络需要一个网络地址和一个广播地址

  - 每一台主机都需要一个 IP 地址，路由器的每个接口也都需要一个 IP 地址

- 如此，我们就可将本例的应用需求概括为：

  - 将 C 类网 218.75.230.0 划分成 5 个子网，分配给每个子网的 IP 地址数量必须满足各个子网的需求

![image-20220417170613594](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170613594.png)

**即：子网掩码 255.255.255.224**

![image-20220417170932034](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170932034.png)

**以此类推，可得到划分子网的全部细节如下**

![image-20220417171024060](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417171024060.png)

**现在，我们就可以从子网 1～8 中任选 5 个分配给网络 N1～N5，就像下图这样**

![image-20220417171250668](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417171250668.png)

> 不难看出：采用定长的子网掩码进行子网划分，只能划分出 2^n 个子网（其中 n 是从主机号部分借用的用来作为子网号的比特数量）


