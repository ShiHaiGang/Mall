# Vue - Mall

Eslint 按需关闭校验
1. 关闭段落校验
```
  /* eslint-disable */
  some code
  /* eslint-enable */
```
2. 关闭当前行校验
```
  some code // eslint-disable-line
```
3. 关闭下一行校验
```
  // eslint-disable-next-line
  some code
```

```js
<script>
    window.onload = function () {
      // 性能监控
      var timing = window.performance.timing;
      //重定向耗时
      var redirectTime = timing.redirectEnd - timing.redirectStart;
      console.log('重定向耗时',redirectTime);
      //卸载上一个页面耗时
      var unloadTime = timing.unloadEventEnd - timing.unloadEventStart;
      console.log('卸载上一个页面耗时',unloadTime);
      //DNS查询耗时
      var domainTime = timing.domainLookUpEnd - timing.domainLookUpStart;
      console.log('DNS查询耗时',domainTime);
      //TCP连接耗时
      var tcpConnectTime = timing.connectEnd - timing.connectStart;
      console.log('TCP连接耗时',tcpConnectTime);
      //DOM开始加载前所花费时间
      var beforeDomLoadTime = timing.responseEnd - timing.navigationStart;
      console.log('DOM开始加载前所花费时间',beforeDomLoadTime);
      //请求耗时
      var responseTime = timing.responseEnd - timing.requestStart;
      console.log('请求耗时',responseTime);
      //DOM完成加载耗时
      var domLoadTime = timing.domCompelect - timing.domLoading;
      console.log('DOM完成加载耗时',domLoadTime);
      //DOM结构完成解析耗时
      var domComplieTime = timing.domInteractive - timing.domLoading ;
      console.log('DOM结构完成解析耗时',domComplieTime);
      // 白屏时间
      var white = timing.domloadng - timing.fetchStart;
      console.log('白屏时间',white);
      // DOM Ready时间
      var domready = timing.domContentLoadedEventEnd - timing.fetchStart;
      console.log('DOM Ready时间',domready);
      //脚本加载时间
      var contentLoadTime = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
      console.log('脚本加载时间',contentLoadTime);
      //onload事件时间
      var loadTime = timing.loadEventEnd - timing.loadEventStart;
      console.log('onload事件时间',loadTime);
      //页面完全加载耗时
      var fullTime = redirectTime + unloadTime + domainTime + tcpConnectTime + responseTime+
              domLoadTime + domComplieTime ;

      // 百度统计
      var _hmt = _hmt || [];
      setTimeout(function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?8d8d2f308d6e6dffaf586bd024670861";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      }, 50);
    }
  </script>
```

Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
