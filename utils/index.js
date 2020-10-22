/**
 * @description 常用JS函数
 * @authors S H G
 * @date    2017-11-27 15:31:43
 * @version 1.0
 * ------------------------------------------
 */
export default {
  /**
   * 防抖
   * @param {*} fn 函数
   * @param {*} wait 延迟时间
   * @param {*} immediate 立即执行
   */
  debounce(fn, wait, immediate) {
    let timer = null

    return function() {
      const args = arguments
      const context = this

      if (immediate && !timer) {
        fn.apply(context, args)
      }

      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
  },

  /**
   * 截流
   * @param {*} fn 函数
   * @param {*} wait 延迟时间
   * @param {*} immediate 立即执行
   */
  throttle(fn, wait, immediate) {
    let timer = null
    let callNow = immediate

    return function() {
      const context = this
      const args = arguments

      if (callNow) {
        fn.apply(context, args)
        callNow = false
      }

      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(context, args)
          timer = null
        }, wait)
      }
    }
  },

  /**
   * 格式化日期
   * @param {string} format 格式
   * @param {[type]} date   日期
   * @param 年(y)、月(M)、日(d)、小时(h)、分(m)、秒(s)、毫秒(S)、星期(w)、季度(q)
   * 例：'yyyy-MM-dd' ==> 2017-11-27
   * 例：'yyyy-MM-dd hh:mm:ss:SS' ==> 2017-11-27 17:19:45:999
   * 例：'yyyy-MM-dd 星期w 第q季度' ==> 2017-11-27 星期一 第4季度
   */
  DateFormat(format, date) {
    if (!date) {
      date = new Date()
    }
    const Week = ['日', '一', '二', '三', '四', '五', '六']
    const o = {
      'y+': date.getYear(), // 年
      'M+': date.getMonth() + 1, // 月
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
      w: Week[date.getDay()] // 星期
    }
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return format
  },

  /**
   * HTML5 本地存储
   * @param {string} object 存储形式。 例：l, s
   * @param {string} method 方法
   * @param {string} key    存储名
   * @param {string} value  存储值
   * localStorage - 没有时间限制的数据存储
   * sessionStorage - 针对一个 session 的数据存储。当用户关闭浏览器窗口后，数据会被删除。
   */
  LocalStorage(method, key, value, obj) {
    if (typeof Storage !== 'undefined') {
      // 存储数据的两个对象
      const local = obj !== 'session' ? localStorage : sessionStorage
      // 常用API
      if (method === 'set') local.setItem(key, JSON.stringify(value)) // 保存数据
      if (method === 'get') return JSON.parse(local.getItem(key)) // 读取数据
      if (method === 'rem') local.removeItem(key) // 删除单个数据
      if (method === 'cle') local.clear() // 删除所有数据
      // 不常用
      if (method === 'key') return local.key(key) // 读取第i个数据的名字或称为键值(从0开始计数)
      if (method === 'len') return local.length // localStorage存储变量的个数
      if (method === 'val') return local.valueOf() // 读取存储在localStorage上的所有数据
      if (method === 'has') return local.hasOwnProperty(key) // 检查localStorage上是否保存了变量x，需要传入x
    } else {
      // 抱歉! 不支持 web 存储。
      // eslint-disable-next-line no-console
      console.log(
        '%c 抱歉! 不支持 web 存储。',
        'font-size:50px;color:red;-webkit-text-fill-color:red;-webkit-text-stroke: 1px black;'
      )
    }
  },

  /**
   * 设置cookie值
   * @param {string} name  名称
   * @param {string} value 值
   * @param {string} Hours 时间
   */
  SetCookie(name, value, Hours) {
    const date = new Date()
    const offset = 8
    const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000
    const nd = utc + offset * 60 * 60 * 1000
    const exp = new Date(nd)
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000)
    document.cookie =
      name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString()
  },

  /**
   * 获取cookie
   * @param  {string} name 名称
   * @return
   */
  GetCookie(name) {
    const arr = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    )
    if (arr != null) return unescape(arr[2])
    return null
  },

  /**
   * 清除cookie
   * @param  {string} name 名称
   * @return
   */
  ClearCookie(name) {
    // eslint-disable-next-line no-undef
    setCookie(name, '', -1)
  },

  /**
   * 格式化数字
   * @param  {[type]} number        要格式化的数字
   * @param  {[type]} decimals      保留几位小数
   * @param  {[type]} decPoint     小数点符号
   * @param  {[type]} thousandsSep 千分位符号
   * @return {[type]}               [description]
   */
  NumberFormat(number, decimals, decPoint, thousandsSep) {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    const finite = !isFinite(+number) ? 0 : +number
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
    const dec = typeof decPoint === 'undefined' ? '.' : decPoint
    let string = ''
    const toFixedFix = function(finite, prec) {
      const k = 10 ** prec
      return '' + Math.ceil(finite * k) / k
    }

    string = (prec ? toFixedFix(finite, prec) : '' + Math.round(finite)).split(
      '.'
    )
    const reg = /(-?\d+)(\d{3})/
    while (reg.test(string[0])) {
      string[0] = string[0].replace(reg, '$1' + sep + '$2')
    }

    if ((string[1] || '').length < prec) {
      string[1] = string[1] || ''
      string[1] += new Array(prec - string[1].length + 1).join('0')
    }
    return string.join(dec)
  },

  /**
   * 金额大写转换函数
   * @param  {sting||number} money 要转换的金额
   * @return {[type]}           [description]
   * 数组：数字（0~9——零~玖）；
   *       基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；
   *       大基（万:10^4,亿:10^8,兆:10^12,京:10^16,垓:10^20,杼:10^24,穰:10^28,沟:10^32,涧:10^36,正:10^40）；
   *       辅币（元以下，角/分/厘/毫/丝）
   *
   * 目前还是bug，大单位的时候不能输出准确的值。
   */
  MoneyTransform(money) {
    try {
      /* eslint-disable */
      const MaxUnits = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰", "沟", "涧", "正"), //大单位
        MinUnits = new Array("拾", "佰", "仟"), //小单位
        IntUnits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"), //整数部分用  
        DecUnits = new Array("角", "分", "厘", "毫", "丝"); //辅币

      let MaxCount = 0 // 计大单位
      let MinCount = 0 // 计小单位
      let SumCount = 0 // 零计数

      let AfterNum = '' // 当前位数字
      let BeforeNum = '' // 前一位数字
      let DecimalNum = '' // 小数当前位数字

      let IntegerString, // 存储整数部分
        DecimalString // 存储小数部分

      let OutputNegative = '' // 输出金额负数部分
      let OutputInteger = '' // 输出金额整数部分
      let OutputDecimal = '' // 输出金额小数部分

      /* 验证输入字符串 */
      money = money.toString()
      if (money.indexOf('-') == 0) OutputNegative = '欠'
      money = money.replace(/^-/g, '') // 移除负号
      if (money.match(/[^,.\d]/) != null) return '错误：金额含有无效字符！' // 判断空格
      if (
        money.match(
          /^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/
        ) == null
      )
        return '错误：金额的格式不正确！' // 判断金额格式
      money = money.replace(/(^0+)|(,)/g, '') // 金额数值转字符、移除逗号、移除前导零

      /* 分离整数与小数 */
      money = money.split('.')
      IntegerString = money[0]
      if (IntegerString.length > 41) return '错误：整数位超出最大金限度'
      DecimalString = money[1]
      // if (DecimalString.length > 5) return "错误：小数位超出最小金限度";

      /* 转换整数部分 */
      for (let i = 1; i <= IntegerString.length; i++) {
        AfterNum = IntegerString.charAt(IntegerString.length - i) // 当前位数字
        SumCount += Number(AfterNum)
        BeforeNum = 0
        if (IntegerString.length - i - 1 >= 0) {
          BeforeNum = IntegerString.charAt(IntegerString.length - i - 1) // 前一位数字
        }
        if (SumCount != 0) {
          OutputInteger = IntUnits[Number(AfterNum)].concat(OutputInteger) // 取得该数字对应的大写数字，并插入到OutputInteger字符串的前面
          if (AfterNum == '0') SumCount = 0
        }
        if (IntegerString.length - i - 1 >= 0) {
          // 在数字范围内
          if (MinCount != 3) {
            // 加小单位
            if (BeforeNum != 0)
              OutputInteger = MinUnits[MinCount].concat(OutputInteger)
            MinCount++
          } else {
            // 加大单位
            OutputInteger = MaxUnits[MaxCount].concat(OutputInteger)
            MinCount = 0
            SumCount = 0
          }
        }
        if (MinCount == 3) {
          // 小单位到千则大单位进一
          MaxCount++
        }
      }
      /* 转换小数部分 */
      if (DecimalString != undefined) {
        for (let j = 0; j <= DecimalString.length; j++) {
          DecimalNum = DecimalString.charAt(j)
          if (DecimalNum != 0) {
            OutputDecimal += IntUnits[Number(DecimalNum)] + DecUnits[j] // 加数字
          }
        }
      }
      /* 输出转换结果 */
      OutputInteger = OutputInteger == '' ? '零元' : OutputInteger + '元' // 整数为零
      OutputDecimal = DecimalString != undefined ? OutputDecimal : '整' // 小数为零
    } catch (e) {
      return '零元整' // （错误：金额为空！）
    }
    return OutputNegative + OutputInteger + OutputDecimal
  }
}
