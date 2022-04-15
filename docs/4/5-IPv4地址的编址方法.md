![image-20220412170648654](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220412170648654.png)

#### 分类编址的 IPv4 地址

![image-20220412172617389](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220412172617389.png)

##### A 类地址

- 最小网络号为`0 0000000`，但保留不指派

- 故 A 类网络的第一个可指派的网络号为`0 0000001`

- 再将 24 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`1.0.0.0`

---

- 最大网络号为`0 1111111`，但被用于本地软件环回测试，不能指派

  - 最小的本地软件环回测试地址，点分十进制表示为：`127.0.0.1`

  - 最大的本地软件环回测试地址，点分十进制表示为：`127.255.255.254`

![image-20220415220516313](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415220516313.png)

---

- 因此：A 类网络最后一个可指派的网络号为`0 1111110`

- 再将 24 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`126.0.0.0`

---

![image-20220415213703210](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415213703210.png)

##### B 类地址

- 最小网络号为`10 000000 00000000`（也是第一个可指派的网络号），点分十进制为：`128.0`

- 再将 16 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`128.0.0.0`

![image-20220415214536205](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415214536205.png)

---

- 最大网络号为`10 111111 11111111`（也是最后一个可指派的网络号），点分十进制为：`191.255`

- 再将 16 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`191.255.0.0`

---

![image-20220415214424835](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415214424835.png)

##### C 类地址

- 最小网络号为`110 00000 00000000 00000000`（也是第一个可指派的网络号），点分十进制为：`192.0.0`

- 再将 8 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`192.0.0.0`

![image-20220415215233703](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415215233703.png)

---

- 最大网络号为`110 11111 11111111 11111111`（也是最后一个可指派的网络号），点分十进制为：`223.255.255`

- 再将 8 bit 的主机号全部取`0`，就得到了该网络的网络地址，点分十进制表示为：`223.255.255.0`

---

![image-20220415215315089](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415215315089.png)

#### 习题

![image-20220415215910683](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415215910683.png)

![image-20220415220708472](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415220708472.png)

![image-20220415221334275](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415221334275.png)

#### 一般不使用的特殊 IP 地址

![image-20220415220750506](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220415220750506.png)
