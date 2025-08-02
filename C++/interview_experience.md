# 面经

HC 即 Headcount 的缩写，指企业在特定时期内被批准的招聘人数配额。它是人力资源规划的核心指标，直接反映团队扩张或人员替换需求。

JD 即 Job Description 的缩写，是对具体岗位的职责、要求、汇报关系等信息的详细说明。它是招聘筛选的重要依据，也是候选人了解岗位的第一窗口。

💥裸辞 30 天拿下 3 个 offer！我悟透了找工作的潜规则…
谁说离职空窗期是减分项？这一个月我把焦虑调成静音模式，反而摸到了求职的通关密码👇
🌱先给心态松绑：
刚离职那周天天刷招聘软件到凌晨，越刷越慌！后来强制自己每天只花 2 小时看机会，剩下的时间去公园散步 / 学 Excel 新技能 / 和朋友喝下午茶。当你不再把找工作当成唯一 KPI，反而更容易保持松弛感 —— 面试时这种状态真的会加分！
📝简历要像「定制蛋糕」：
别再海投同一份简历了！我会把目标岗位的 JD 打印出来，用荧光笔标关键词（比如「跨境电商经验」「独立策划活动」），然后在简历里精准对应案例。有次面试官当场说：「你是少数把我们需求吃透的候选人」
✨面试时学会「反客为主」：
被问到「为什么离职」时，我从不吐槽前公司，而是说：「想在 XX 领域深耕，贵司的 XX 业务线特别吸引我」（提前做足公司功课！）
最后一定要问面试官：「如果我来入职，您希望我 3 个月内达成什么目标？」—— 显得你超有规划欲！
空窗期不可怕，可怕的是用内耗消耗自己。把这段时间当成蓄力期，反而会遇见更清晰的方向～ 正在求职的姐妹一起加油，offer 会来的！💪
#离职日记 #找工作攻略 #职场经验

## 1、简历
使用markdown制作：
https://github.com/mikepqr/resume.md?tab=readme-ov-file
https://blog.csdn.net/zjcjava/article/details/128799604
https://blog.csdn.net/qq_40671063/article/details/148708387
https://blog.csdn.net/little_stick_i/article/details/141433974

https://github.com/BingyanStudio/LapisCV?tab=readme-ov-file
https://blog.csdn.net/youngyangyang04/article/details/104491867
https://zhuanlan.zhihu.com/p/387272899
https://zhuanlan.zhihu.com/p/685949564

vscode软件打开markdown文件默认支持预览，但是到出pdf文件时需要安装markdown-pdf插件，但是插件依赖Chromium进行导出。
在.setting.json文件中增加"markdown-pdf.executablePath": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
参考：https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf

另外markdown生成的简历需要调整字体颜色或大小时，可以先导出html文件，然后通过F12查看其他字体参数对此进行调整。

## 2、自我介绍
https://cplusplus.com/
https://www.apiref.com/cpp-zh/index.html
https://cppreference.cn/w/

明确未来的开发方向：
- Linux驱动
- go语言开发

## 3、了解公司
麒麟家族：https://zhuanlan.zhihu.com/p/269176597
麒麟家族包括中标麒麟（NeoKylin）、银河麒麟（Kylin）、优麒麟（Ubuntu Kylin）和麒麟信安（Kylinsec）。其中中标麒麟和银河麒麟占主要地位。

统信软件技术有限公司（简称：统信软件），成立于2019年，其前身为自2004年组建的深度操作系统团队。

## 4、导师经验
- 部门简单介绍
- 一些基础的知识指导
- 人文关怀
- 相关外设问题排查指导
- Linux客户端使用libuvc库使用摄像头

libuvc 是一个开源的跨平台库，用于与 USB 视频设备（如网络摄像头、USB 摄像头、工业相机等）进行通信。它基于 libusb 开发，提供了一套简洁的 API，允许开发者直接访问 UVC（USB Video Class）设备，无需依赖特定操作系统的驱动或框架。

libuvc 通过 libusb 与 UVC 设备通信，主要流程：
- 设备枚举：扫描并识别系统中所有 UVC 设备。
- 设备打开：获取设备的访问权限。
- 配置设置：设置视频格式、分辨率、帧率等参数。
- 数据流控制：启动 / 停止视频流，并处理数据回调。
- 设备释放：关闭设备并释放资源。

## 5、离职原因
部门产品功能趋于完善，最近两年部门都是在做一些重构和终端统一方面的开发，需求减少。市场发展行情成熟，最近两年不断缩编。刚好我的合同到期，公司未给我续约。


