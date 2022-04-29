![image-20220428172743951](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220428172743951.png)

#### ICMP 差错报告报文有 5 种

##### 1、终点不可达

![image-20220429111611853](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429111611853.png)

eg：假设下图主机 H1 要向主机 H2 发送 IP 数据报

![image-20220429111729667](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429111729667.png)

H1 会将 IP 数据报发送给路由器 R1，由 R1 帮其转发

若 R1 的路由表中没有（网络 N3 的路由记录 || 默认路由 || 主机 H2 的特定主机路由），则 R1 就不知道该如何转发该数据报，只能将其丢弃，并向发送该数据报的源主机 H1 发送 ICMP 差错报告报文，其类型为终点不可达

![image-20220429112158371](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429112158371.png)

##### 2、源点抑制

![image-20220429112905967](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429112905967.png)

eg：假设下图主机 H1 要向主机 H2 发送 IP 数据报

当该数据报传输到路由器 R2 时，由于 R2 拥塞（即：R2 比较繁忙），R2 根据自己的丢包策略丢弃了该数据报，并向发送该数据报的源主机 H1 发送 ICMP 差错报告报文，其类型为源点抑制

![image-20220429113124678](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113124678.png)

##### 3、时间超过

![image-20220429113332640](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113332640.png)

eg：某个生存时间等于 2 的 IP 数据报传输到了路由器 R1

![image-20220429113533100](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113533100.png)

R1 将其生存时间减 1 后结果是 1，表明该数据报的生存时间还没结束，于是 R1 将其转发出去

![image-20220429113643751](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113643751.png)

当该数据报传输到路由器 R2 后，R2 将其生存时间减 1 后结果是 0，表明该数据报的生存时间结束了，于是 R2 丢弃该数据报，并向发送该数据报的源主机 H1 发送 ICMP 差错报告报文，其类型为时间超过

![image-20220429113900867](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113900867.png)

##### 4、参数问题


##### 5、改变路由（重定向）

