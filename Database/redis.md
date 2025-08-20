# redis

https://www.runoob.com/redis/redis-tutorial.html
https://zhuanlan.zhihu.com/p/663851226

## 1、简介
REmote DIctionary Server(Redis) 是一个由 Salvatore Sanfilippo 写的 key-value 存储系统，是跨平台的非关系型数据库。

Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于内存、分布式、可选持久性的键值对(Key-Value)存储数据库，并提供多种语言的 API。

Redis 通常被称为数据结构服务器，因为值（value）可以是字符串(String)、哈希(Hash)、列表(list)、集合(sets)和有序集合(sorted sets)等类型。

Redis（Remote Dictionary Server）是一个开源的内存数据库，遵守 BSD 协议，它提供了一个高性能的键值（key-value）存储系统，常用于缓存、消息队列、会话存储等应用场景。

## 2、Redis 安装
下载地址：https://github.com/redis-windows/redis-windows/releases

这四个 Redis 版本的主要区别在于 编译环境 和 是否包含 Windows 服务：

Cygwin 版本（cygwin）基于 Cygwin 编译，Cygwin 提供了 Linux-like 的运行环境。with-Service 版本支持 作为 Windows 服务运行，方便在后台长期运行。

MSYS2 版本（msys2）基于 MSYS2 编译，MSYS2 是一个轻量级的 POSIX 兼容环境，依赖较少，with-Service 版本支持 Windows 服务模式。

该如何选择？
一般用途（简单开发、测试）：选择 MSYS2 版本，因为 MSYS2 依赖较少，更轻量级。
需要长期后台运行（Windows 服务）：选择 with-Service 版本。
如果有 Cygwin 相关需求：选择 Cygwin 版本。

## 3、测试使用
如果想方便的话，可以把 redis 的路径加到系统的环境变量里，这样就省得再输路径了，后面的那个 redis.conf 可以省略，如果省略，会启用默认的。
```
redis-server.exe redis.conf

$ redis-cli -h host -p port -a password
C:\Users\hj159>redis-cli -h 127.0.0.1 -p 6379
127.0.0.1:6379>
127.0.0.1:6379> set name hejian
OK
127.0.0.1:6379> get name
"hejian"
127.0.0.1:6379>
```

关闭服务后，执行 PING 命令，该命令用于检测 redis 服务是否启动：
```
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> ping
Error: Software caused connection abort

C:\Users\hj159>
```

## 4、Redis 配置
使用 \* 号获取所有配置项：redis 127.0.0.1:6379> CONFIG GET *
```
redis 127.0.0.1:6379> CONFIG SET loglevel "notice"
OK
redis 127.0.0.1:6379> CONFIG GET loglevel

1) "loglevel"
2) "notice"
```

Redis 总共支持四个级别：debug、verbose、notice、warning，默认为 notice
Windows 不支持守护线程的配置为 no

## 5、数据类型
注意：一个键最大能存储 512MB。
每个哈希最多可以存储 2^32 - 1 个键值对。
列表最多可以存储 2^32 - 1 个元素。
集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。
集合中最大的成员数为 2^32 - 1(4294967295, 每个集合可存储40多亿个成员)。

Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
zset的成员是唯一的,但分数(score)却可以重复。

DEL runoob 用于删除前面测试用过的 key
Redis HMSET, HGET 命令，HMSET 设置了两个 field=>value 对, HGET 获取对应 field 对应的 value。

## 6、Redis 键(key)
DEL 是一个命令， runoobkey 是一个键。 如果键被删除成功，命令执行后输出 (integer) 1，否则将输出 (integer) 0。
```
127.0.0.1:6379> get name
"hejian"
127.0.0.1:6379> dump name
"\x00\x06hejian\x0c\x00\x8ca:`Cn\x1d\xc0"
127.0.0.1:6379> exists name
(integer) 1
127.0.0.1:6379> exists op
(integer) 0
```

## 7、哈希
```
127.0.0.1:6379>  HMSET runoobkey name "redis tutorial" description "redis basic commands for caching" likes 20 visitors 23000
OK
127.0.0.1:6379>  HGETALL runoobkey
1) "name"
2) "redis tutorial"
3) "description"
4) "redis basic commands for caching"
5) "likes"
6) "20"
7) "visitors"
8) "23000"
```

## 8、事务
它先以 MULTI 开始一个事务， 然后将多个命令入队到事务中， 最后由 EXEC 命令触发事务， 一并执行事务中的所有命令。

单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的。

事务可以理解为一个打包的批量执行脚本，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

## 9、Redis 脚本
Redis 脚本使用 Lua 解释器来执行脚本。 Redis 2.6 版本通过内嵌支持 Lua 环境。执行脚本的常用命令为 EVAL。

## 10、Redis Stream
Redis Stream 主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅 (pub/sub) 来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。

简单来说发布订阅 (pub/sub) 可以分发消息，但无法记录历史消息。

而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。

## 11、Redis 数据备份与恢复
Redis SAVE 命令用于创建当前数据库的备份。

如果需要恢复数据，只需将备份文件 (dump.rdb) 移动到 redis 安装目录并启动服务即可。获取 redis 目录可以使用 CONFIG 命令：
```
config get dir
```

创建 redis 备份文件也可以使用命令 BGSAVE，该命令在后台执行。

## 12、Redis 安全
我们可以通过 redis 的配置文件设置密码参数，这样客户端连接到 redis 服务就需要密码验证，这样可以让你的 redis 服务更安全。
```
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) ""
127.0.0.1:6379> config set requirepass "hj"
OK
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "hj"
127.0.0.1:6379> SET mykey "Test value"
OK
127.0.0.1:6379> quit

C:\Users\hj159>redis-cli -h 127.0.0.1 -p 6379
127.0.0.1:6379> set myKey "Test"
(error) NOAUTH Authentication required.
127.0.0.1:6379> auth "hj"
OK
127.0.0.1:6379> set myKey "Test"
OK
127.0.0.1:6379> get myKey
"Test"
```

## 13、
C语言的字符串是char[]实现的，而Redis使用SDS（simple dynamic string） 封装，sds源码如下：
```
struct sdshdr
{
    unsigned int len; // 标记buf的长度
    unsigned int free; //标记buf中未使用的元素个数
    char buf[]; // 存放元素的坑
};
```

## 14、Redis的虚拟内存机制是啥呢？
虚拟内存机制就是暂时把不经常访问的数据(冷数据)从内存交换到磁盘中，从而腾出宝贵的内存空间用于其它需要访问的数据(热数据)。通过VM功能可以实现冷热数据分离，使热数据仍在内存中、冷数据保存到磁盘。这样就可以避免因为内存不足而造成访问速度下降的问题。

## 15、缓存穿透
指查询一个一定不存在的数据，由于缓存是不命中时需要从数据库查询，查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到数据库去查询，进而给数据库带来压力。

通俗点说，读请求访问时，缓存和数据库都没有某个值，这样就会导致每次对这个值的查询请求都会穿透到数据库，这就是缓存穿透。
缓存穿透一般都是这几种情况产生的：

业务不合理的设计，比如大多数用户都没开守护，但是你的每个请求都去缓存，查询某个userid查询有没有守护。
业务/运维/开发失误的操作，比如缓存和数据库的数据都被误删除了。
黑客非法请求攻击，比如黑客故意捏造大量非法请求，以读取不存在的业务数据。
如何避免缓存穿透呢？ 一般有三种方法。

1.如果是非法请求，我们在API入口，对参数进行校验，过滤非法值。
2.如果查询数据库为空，我们可以给缓存设置个空值，或者默认值。但是如有有写请求进来的话，需要更新缓存哈，以保证缓存一致性，同时，最后给缓存设置适当的过期时间。（业务上比较常用，简单有效）
3.使用布隆过滤器快速判断数据是否存在。即一个查询请求过来时，先通过布隆过滤器判断值是否存在，存在才继续往下查。
布隆过滤器原理：它由初始值为0的位图数组和N个哈希函数组成。一个对一个key进行N个hash算法获取N个值，在比特数组中将这N个值散列后设定为1，然后查的时候如果特定的这几个位置都为1，那么布隆过滤器判断该key存在。

## 16、缓存击穿
指热点key在某个时间点过期的时候，而恰好在这个时间点对这个Key有大量的并发请求过来，从而大量的请求打到db。

缓存击穿看着有点像，其实它两区别是，缓存雪奔是指数据库压力过大甚至down机，缓存击穿只是大量并发请求到了DB数据库层面。可以认为击穿是缓存雪奔的一个子集吧。有些文章认为它俩区别，是区别在于击穿针对某一热点key缓存，雪奔则是很多key。

解决方案就有两种：

1.使用互斥锁方案。缓存失效时，不是立即去加载db数据，而是先使用某些带成功返回的原子操作命令，如(Redis的setnx）去操作，成功的时候，再去加载db数据库数据和设置缓存。否则就去重试获取缓存。
2. “永不过期”，是指没有设置过期时间，但是热点数据快要过期时，异步线程去更新和设置过期时间。
5. 什么是热Key问题，如何解决热key问题
什么是热Key呢？在Redis中，我们把访问频率高的key，称为热点key。

如果某一热点key的请求到服务器主机时，由于请求量特别大，可能会导致主机资源不足，甚至宕机，从而影响正常的服务。

而热点Key是怎么产生的呢？主要原因有两个：

用户消费的数据远大于生产的数据，如秒杀、热点新闻等读多写少的场景。
请求分片集中，超过单Redi服务器的性能，比如固定名称key，Hash落入同一台服务器，瞬间访问量极大，超过机器瓶颈，产生热点Key问题。
那么在日常开发中，如何识别到热点key呢？

凭经验判断哪些是热Key；
客户端统计上报；
服务代理层上报
如何解决热key问题？

Redis集群扩容：增加分片副本，均衡读流量；
将热key分散到不同的服务器中；
使用二级缓存，即JVM本地缓存,减少Redis的读请求。

## 17、Redis 过期策略和内存淘汰策略
### 17.1 Redis的过期策略

我们在set key的时候，可以给它设置一个过期时间，比如expire key 60。指定这key60s后过期，60s后，redis是如何处理的嘛？我们先来介绍几种过期策略：

定时过期

每个设置过期时间的key都需要创建一个定时器，到过期时间就会立即对key进行清除。该策略可以立即清除过期的数据，对内存很友好；但是会占用大量的CPU资源去处理过期的数据，从而影响缓存的响应时间和吞吐量。
惰性过期

只有当访问一个key时，才会判断该key是否已过期，过期则清除。该策略可以最大化地节省CPU资源，却对内存非常不友好。极端情况可能出现大量的过期key没有再次被访问，从而不会被清除，占用大量内存。
定期过期

每隔一定的时间，会扫描一定数量的数据库的expires字典中一定数量的key，并清除其中已过期的key。该策略是前两者的一个折中方案。通过调整定时扫描的时间间隔和每次扫描的限定耗时，可以在不同情况下使得CPU和内存资源达到最优的平衡效果。
expires字典会保存所有设置了过期时间的key的过期时间数据，其中，key是指向键空间中的某个键的指针，value是该键的毫秒精度的UNIX时间戳表示的过期时间。键空间是指该Redis集群中保存的所有键。
Redis中同时使用了惰性过期和定期过期两种过期策略。

假设Redis当前存放30万个key，并且都设置了过期时间，如果你每隔100ms就去检查这全部的key，CPU负载会特别高，最后可能会挂掉。
因此，redis采取的是定期过期，每隔100ms就随机抽取一定数量的key来检查和删除的。
但是呢，最后可能会有很多已经过期的key没被删除。这时候，redis采用惰性删除。在你获取某个key的时候，redis会检查一下，这个key如果设置了过期时间并且已经过期了，此时就会删除。
但是呀，如果定期删除漏掉了很多过期的key，然后也没走惰性删除。就会有很多过期key积在内存内存，直接会导致内存爆的。或者有些时候，业务量大起来了，redis的key被大量使用，内存直接不够了，运维小哥哥也忘记加大内存了。难道redis直接这样挂掉？不会的！Redis用8种内存淘汰策略保护自己~

### 17.2 Redis 内存淘汰策略
volatile-lru：当内存不足以容纳新写入数据时，从设置了过期时间的key中使用LRU（最近最少使用）算法进行淘汰；
allkeys-lru：当内存不足以容纳新写入数据时，从所有key中使用LRU（最近最少使用）算法进行淘汰。
volatile-lfu：4.0版本新增，当内存不足以容纳新写入数据时，在过期的key中，使用LFU算法进行删除key。
allkeys-lfu：4.0版本新增，当内存不足以容纳新写入数据时，从所有key中使用LFU算法进行淘汰；
volatile-random：当内存不足以容纳新写入数据时，从设置了过期时间的key中，随机淘汰数据；。
allkeys-random：当内存不足以容纳新写入数据时，从所有key中随机淘汰数据。
volatile-ttl：当内存不足以容纳新写入数据时，在设置了过期时间的key中，根据过期时间进行淘汰，越早过期的优先被淘汰；
noeviction：默认策略，当内存不足以容纳新写入数据时，新写入操作会报错。

## 18、说说Redis的常用应用场景
- 缓存
- 排行榜
- 计数器应用
- 共享Session
- 分布式锁
- 社交网络
- 消息队列
- 位操作





