假设你申请到了一个地址空间较大的 IPv4 地址块

你需要将其划分成几个地址空间较小的地址块，以分配给几个不同的网络（满足这些网络对 IP 地址的需求）

你应该采用什么方式进行划分呢 ？

#### 法一：使用定长的子网掩码（`F`ixed `L`ength `S`ubnet `M`ask）

![image-20220417170107404](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170107404.png)

![image-20220417170613594](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170613594.png)

![image-20220417170932034](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417170932034.png)

以此类推，便可得子网划分的全部细节如下

![image-20220417171024060](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417171024060.png)

现在，我们就可以从子网 1～8 中任选 5 个分配给网络 N1～N5，就像下图这样

![image-20220417171250668](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220417171250668.png)

> 显然：
>
> 使用定长的子网掩码，从主机号借用 n 位来充当子网号，只能将较大的 IP 地址块均分成 2^n 份
>
> 这不够灵活，容易造成 IP 地址的浪费

#### 法二：使用变长的子网掩码（`V`ariable `L`ength `S`ubnet `M`ask）

> 即：使用多个不同的子网掩码来对这个较大的 IP 地址块进行更合理的划分（分配给每个子网的 IP 地址数量可以不同）
>
> 这尽可能地减少了对 IP 地址的浪费
