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

##### 3、时间超过（有两种情况）

**情况一：**

![image-20220429113332640](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113332640.png)

eg：某个生存时间等于 2 的 IP 数据报传输到了路由器 R1

![image-20220429113533100](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113533100.png)

R1 将其生存时间减 1 后结果是 1，表明该数据报的生存时间还没结束，于是 R1 将其转发出去

![image-20220429113643751](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113643751.png)

当该数据报传输到路由器 R2 后，R2 将其生存时间减 1 后结果是 0，表明该数据报的生存时间结束了，于是 R2 丢弃该数据报，并向发送该数据报的源主机 H1 发送 ICMP 差错报告报文，其类型为时间超过

![image-20220429113900867](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429113900867.png)

**情况二：**

![image-20220429114024831](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429114024831.png)

##### 4、参数问题

![image-20220429114215789](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429114215789.png)

eg：下图画出了 H1 发送给 H2 的 IP 数据报，假设该数据报在传输过程中收到了干扰，其首部出现了误码

![image-20220429114548301](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429114548301.png)

当该数据报传输到路由器 R1 后，R1 检测出该数据报的首部出错，于是丢弃该数据报，并向发送该数据报的源主机 H1 发送 ICMP 差错报告报文，其类型为参数问题

![image-20220429114709243](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429114709243.png)

##### 5、改变路由（重定向）

路由器把改变路由报文发送给主机，让主机知道下次应将数据报发送给另外的路由器，这样可以通过更好的路由～

eg：下图，假设我们给主机 H1 指定的默认网关是路由器 R1，则 H1 要发往网络 N2 的 IP 数据报都会传输给 R1，由其帮忙转发

![image-20220429155235750](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429155235750.png)

当 R1 发现 H1 发往 N2 的数据报的最佳路由不应当经过 R1 而是应当经过 R4 时，就会用改变路由报文把这个情况告诉主机

![image-20220429155453066](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429155453066.png)

于是，H1 就会在自己的路由表中添加一个项目：到达 N2 应经过路由器 R4，而非默认网关 R1

之后，H1 要发往 N2 的 IP 数据报就都会传输给 R4，由其帮忙转发

![image-20220429155709508](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429155709508.png)

#### 以下情况不应发送 ICMP 差错报告报文

![image-20220429160049424](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429160049424.png)

#### 常用的 ICMP 询问报文有以下 2 种

##### 1、回送请求报文及其回答报文

![image-20220429160505731](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429160505731.png)

##### 2、时间戳请求报文及其回答报文

![image-20220429160535693](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429160535693.png)

#### 利用 ICMP 协议的两个典型应用

##### 1、分组网间探测 PING（`P`acket`I`nter`N`et`G`roper）

![image-20220429162231823](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429162231823.png)

##### 2、跟踪路由 traceroute

![image-20220429162639255](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429162639255.png)

![image-20220429162618126](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429162618126.png)

#### 举例说明 tracert 命令的实现原理

在下图中，假设主机 H1 想知道到达主机 H2 需要经过哪些路由器

H1 就会给 H2 发送 ICMP 回送请求报文（该报文被封装在 IP 数据报中，IP 数据报首部中生存时间字段 TTL 的值被设置为 1）

![image-20220429162945529](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429162945529.png)

该 IP 数据报到达 R1 后，其生存时间减 1 结果为 0，于是 R1 丢弃该数据报，并向发送该数据报的源主机 H1 发送 ICMP 差错报告报文，其类型为时间超过

这样，H1 就知道了到达 H2 的路径中的第一个路由器

![image-20220429163252538](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429163252538.png)

H1 继续发送下一个封装有 ICMP 回送请求报文的 IP 数据报，其首部中生存字段 TTL 的值被设置为 2，经过 R1 的转发后，该数据报的生存时间减为 1，该 IP 数据报到达 R2 后，其生存时间减 1 结果为 0，于是 R2 丢弃该数据报，并向发送该数据报的源主机 H1 发送 ICMP 差错报告报文，其类型为时间超过，这样，H1 就知道了到达 H2 的路径中的第二个路由器

![image-20220429163635638](https://aliyun-oss-lpj.oss-cn-qingdao.aliyuncs.com/images/by-picgo/image-20220429163635638.png)

H1 继续发送下一个封装有 ICMP 回送请求报文的 IP 数据报，其首部中生存字段 TTL 的值被设置为 3，经过 R1 和 R2 的转发后，该数据报到达主机 H2，H2 解析该数据报，发现其内部封装的是 ICMP 回送请求报文，于是就向 H1 发送封装有 ICMP 回送请求报文的 IP 数据报，这样，H1 就知道已经跟踪到路径中的最后一站，也就是目的主机 H2



