# 多线程编程
https://zhuanlan.zhihu.com/p/194198073

## 1、简介
线程：线程是操作系统能够进行CPU调度的最小单位。
多线程并发：即多个线程同时执行,一般而言，多线程并发就是把一个任务拆分为多个子任务，然后交由不同线程处理不同子任务,使得这多个子任务同时执行。
C++多线程并发：将任务的不同功能交由多个函数分别实现，创建多个线程，每个线程执行一个函数，一个任务就这样同时分由不同线程执行了。
不要过多纠结多线程与多进程、并发与并行这些概念。

## 2、参数传递
实例化std::thread类对象时，至少需要传递函数名作为参数。如果函数为有参函数,如"void proc2(int a,int b)",那么实例化std::thread类对象时，则需要传递更多参数，参数顺序依次为函数名、该函数的第一个参数、该函数的第二个参数，···，如"std::thread th2(proc2,a,b);"。

## 3、线程的开始时间
只要创建了线程对象（前提是，实例化std::thread对象时传递了“函数名/可调用对象”作为参数），线程就开始执行。

注意不是join或者detach。

## 4、画重点
当线程启动后，一定要在和线程相关联的std::thread对象销毁前，对线程运用join()或者detach()方法。

如果没有join()或者detach()方法，在一般情况下，如果主线程结束，就代表整个进程结束，如果这时有子线程还未结束就会出现运行错误。
当设置子线程为分离线程(detach)，主线程结束，子线程也自动结束。因此可能子线程没有完成任务。

## 5、获取线程id
```
std::thread 线程(函数, 函数参数1, 函数参数2, 函数参数3, ...)
主进程获取线程id：线程.get_id()
线程获取自身线程id：std::this_thread::get_id()
```

## 6、原子类型atomic<>
原子性（atomicity）指事务的不可分割性，一个事务的所有操作要么不间断地全部被执行，要么一个也没有执行。

可以这样理解： 在以前，定义了一个共享的变量(int i=0)，多个线程会用到这个变量，那么每次操作这个变量时，都需要lock加锁，操作完毕unlock解锁，以保证线程之间不会冲突；但是这样每次加锁解锁、加锁解锁就显得很麻烦，那怎么办呢？ 现在，实例化了一个类对象(std::atomic<int> I=0)来代替以前的那个变量（这里的对象I你就把它看作一个变量，看作对象反而难以理解了），每次操作这个对象时，就不用lock与unlock，这个对象自身就具有原子性（相当于加锁解锁操作不用你写代码实现，能自动加锁解锁了），以保证线程之间不会冲突。

提到std::atomic<>，你脑海里就想到一点就可以了：std::atomic<>用来定义一个自动加锁解锁的共享变量（“定义”“变量”用词在这里是不准确的，但是更加贴切它的实际功能），供多个线程访问而不发生冲突。

//原子类型的简单使用
std::atomic<bool> b(true);
b=false;
std::atomic<>对象提供了常见的原子操作（通过调用成员函数实现对数据的原子操作）： store是原子写操作，load是原子读操作。exchange是于两个数值进行交换的原子操作。

## 7、产生死锁的四个必要条件（面试考点）：
- 互斥（资源同一时刻只能被一个进程使用）
- 请求并保持（进程在请资源时，不释放自己已经占有的资源）
- 不剥夺（进程已经获得的资源，在进程使用完前，不能强制剥夺）
- 循环等待（进程间形成环状的资源循环等待关系）

## 8、读写锁、互斥量mutex和lock_guard区别
互斥量是为了解决数据共享过程中可能存在的访问冲突的问题。
互斥量mutex就是互斥锁，加锁的资源支持互斥访问。

shared_mutex读写锁把对共享资源的访问者划分成读者和写者，多个读线程能同时读取共享资源，但只有一个写线程能同时读取共享资源
shared_mutex通过lock_shared，unlock_shared进行读者的锁定与解锁；通过lock，unlock进行写者的锁定与解锁。

## 9、unique_lock和lock_guard区别
unique_lock:
std::unique_lock类似于lock_guard,只是std::unique_lock用法更加丰富，同时支持std::lock_guard()的原有功能。 使用std::lock_guard后不能手动lock()与手动unlock();使用std::unique_lock后可以手动lock()与手动unlock(); std::unique_lock的第二个参数，除了可以是adopt_lock,还可以是try_to_lock与defer_lock;

try_to_lock: 尝试去锁定，得保证锁处于unlock的状态,然后尝试现在能不能获得锁；尝试用mutx的lock()去锁定这个mutex，但如果没有锁定成功，会立即返回，不会阻塞在那里，并继续往下执行；

defer_lock: 始化了一个没有加锁的mutex;

## 10、std::unique_lock所有权的转移
注意，这里的转移指的是std::unique_lock对象间的转移；std::mutex对象的所有权不需要手动转移给std::unique_lock , std::unique_lock对象实例化后会直接接管std::mutex。
```
mutex m;
{  
    unique_lock<mutex> g2(m,defer_lock);
    unique_lock<mutex> g3(move(g2));//所有权转移，此时由g3来管理互斥量m
    g3.lock();
    g3.unlock();
    g3.lock();
}
```

## 11、condition_variable条件变量
需要#include<condition_variable>，该头文件中包含了条件变量相关的类，其中包括std::condition_variable类

如何使用？std::condition_variable类搭配std::mutex类来使用，std::condition_variable对象(std::condition_variable cond;)的作用不是用来管理互斥量的，它的作用是用来同步线程，它的用法相当于编程中常见的flag标志（A、B两个人约定flag=true为行动号角，默认flag为false,A不断的检查flag的值,只要B将flag修改为true，A就开始行动）。

类比到std::condition_variable，A、B两个人约定notify_one为行动号角，A就等着（调用wait(),阻塞）,只要B一调用notify_one，A就开始行动（不再阻塞）。

std::condition_variable的具体使用代码实例可以参见文章中“生产者与消费者问题”章节。

wait(locker) :

wait函数需要传入一个std::mutex（一般会传入std::unique_lock对象）,即上述的locker。wait函数会自动调用 locker.unlock() 释放锁（因为需要释放锁，所以要传入mutex）并阻塞当前线程，本线程释放锁使得其他的线程得以继续竞争锁。一旦当前线程获得notify(通常是另外某个线程调用 notify_* 唤醒了当前线程)，wait() 函数此时再自动调用 locker.lock()上锁。

cond.notify_one(): 随机唤醒一个等待的线程

cond.notify_all(): 唤醒所有等待的线程

## 12、异步线程
std::async是一个函数模板，用来启动一个异步任务，它返回一个std::future类模板对象，future对象起到了占位的作用（记住这点就可以了），占位是什么意思？就是说该变量现在无值，但将来会有值（好比你挤公交瞧见空了个座位，刚准备坐下去就被旁边的小伙给拦住了：“这个座位有人了”，你反驳道：”这不是空着吗？“，小伙：”等会人就来了“）,刚实例化的future是没有储存值的，但在调用std::future对象的get()成员函数时，主线程会被阻塞直到异步线程执行结束，并把返回结果传递给std::future，即通过FutureObject.get()获取函数返回值。

## 13、线程池
虽然创建与销毁线程消耗的时间 远小于 线程执行的时间，但是对于需要频繁创建大量线程的任务，创建与销毁线程 所占用的时间与CPU资源也会有很大占比。

为了减少创建与销毁线程所带来的时间消耗与资源消耗，因此采用线程池的策略：
程序启动后，预先创建一定数量的线程放入空闲队列中，这些线程都是处于阻塞状态，基本不消耗CPU，只占用较小的内存空间。
接收到任务后，任务被挂在任务队列，线程池选择一个空闲线程来执行此任务。
任务执行完毕后，不销毁线程，线程继续保持在池中等待下一次的任务。

https://www.cnblogs.com/lzpong/p/6397997.html


```
作者：「已注销」
链接：https://www.zhihu.com/question/27908489/answer/355105668
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

#include <mutex>
#include <condition_variable>
#include <functional>
#include <queue>
#include <thread>

class fixed_thread_pool {
 public:
  explicit fixed_thread_pool(size_t thread_count)
      : data_(std::make_shared<data>()) {
    for (size_t i = 0; i < thread_count; ++i) {
      std::thread([data = data_] {
        std::unique_lock<std::mutex> lk(data->mtx_);
        for (;;) {
          if (!data->tasks_.empty()) {
            auto current = std::move(data->tasks_.front());
            data->tasks_.pop();
            lk.unlock();
            current();
            lk.lock();
          } else if (data->is_shutdown_) {
            break;
          } else {
            data->cond_.wait(lk);
          }
        }
      }).detach();
    }
  }

  fixed_thread_pool() = default;
  fixed_thread_pool(fixed_thread_pool&&) = default;

  ~fixed_thread_pool() {
    if ((bool) data_) {
      {
        std::lock_guard<std::mutex> lk(data_->mtx_);
        data_->is_shutdown_ = true;
      }
      data_->cond_.notify_all();
    }
  }

  template <class F>
  void execute(F&& task) {
    {
      std::lock_guard<std::mutex> lk(data_->mtx_);
      data_->tasks_.emplace(std::forward<F>(task));
    }
    data_->cond_.notify_one();
  }

 private:
  struct data {
    std::mutex mtx_;
    std::condition_variable cond_;
    bool is_shutdown_ = false;
    std::queue<std::function<void()>> tasks_;
  };
  std::shared_ptr<data> data_;
};
```

## 14、线程函数为引用时
当传入的参数为引用时，实参必须用ref()函数处理后传递给形参，否则编译不通过，此时不存在“拷贝”行为。




























https://blog.csdn.net/Mountainest/article/details/51621956
https://www.pianshen.com/article/1761134436/
https://www.cnblogs.com/TestSu/p/12700785.html
https://www.jianshu.com/p/96158afbb91d
https://blog.csdn.net/qq_33183649/article/details/105514024