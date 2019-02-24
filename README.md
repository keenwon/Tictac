# Tictac

[![NPM version][npm-image]][npm-url]
[![Build status][circleci-image]][circleci-url]

demo: [http://keenwon.com/demo/201406/tictac.html](http://keenwon.com/demo/201406/tictac.html)  
more: [http://keenwon.com/1262.html](http://keenwon.com/1262.html)

**目录**：

<!-- TOC -->

- [Example](#example)
- [Usage](#usage)
- [Api](#api)
    - [`init`](#init)
    - [`create`](#create)
    - [`reset`](#reset)
    - [`remove`](#remove)
    - [`execute`](#execute)
    - [`getCurrentTime`](#getcurrenttime)
    - [`regulate`](#regulate)
    - [`destroy`](#destroy)
    - [格式化对象](#格式化对象)

<!-- /TOC -->

## Example

```javascript
Tictac.init({
  currentTime: Date.parse("2015/01/01 00:00:00"), //设置当前时间
  interval: 3000, //执行callback的时间间隔
  callback: function() {
    //重复执行的回调
  }
})

Tictac.create("id1", {
  targetId: "id1", //显示计时器的容器
  expires: Date.parse("2050/01/01 00:00:00"), //目标时间
  format: {
    //格式化对象
    days: "{d}天 ",
    hours: "{hh}小时 ",
    minutes: "{mm}分 ",
    seconds: "{ss}秒"
  },
  timeout: function() {
    //计时器 timeout 回调
  }
})

//任意多个....

Tictac.create("idn", {
  targetId: "idn",
  expires: Date.parse("2015/01/01 00:00:15"),
  format: {
    minutes: "{mm}分 ",
    seconds: "{ss}秒"
  },
  timeout: function() {
    //....
  }
})
```

## Usage

两种安装方式：

1. 使用 npm 安装

```shell
npm install tictac.js --save // or yarn
```

2. 直接下载 `tictac.js` 使用

## Api

#### `init`

初始化函数，注册计时器前必须先初始化。参数：

- `currentTime`: 当前时间（时间戳），可设置服务端时间或者直接`+new Date()`
- `interval`: 执行`callback` 的时间间隔
- `callback`: 重复执行的回调函数

具体例子看上面的就好了。

#### `create`

创建一个计时器，就像上面代码里写的那样，接受两个参数。第一个参数是 ID，一般用 string 或者 int 类型都可以，第二个参数是个对象，包含以下字段：

- `targetId`: 字符串，输出“剩余时间字符串”的容器 ID
- `expires`: 时间戳，计时器的目标时间（或者说是过期时间）
- `format`: 倒计时时间的格式化对象，这个下面单独说
- `formatIgnore`: 配合 `format` 使用的，下面和 `format` 一起说讲
- `timeout`: 超时函数，到达 `expires` 指定的时间后触发

具体例子上面代码里也有。

#### `reset`

重新设置计时器，参数与`create`方法完全相同。例如：

```javascript
Tictac.reset("id5", {
  expires: 1403860277271
})
```

#### `remove`

根据 ID 删除一个计时器

```javascript
Tictac.remove("id1")
```

#### `execute`

立即执行初始化时设置的 `callback` 回调。例如你指定每 5s 执行一次 `callback`，上一次执行 `callback` 后的 3s，调用 `Tictac.execute()` 会立刻再执行回调，再过 5s 会再次执行（注意，不是 2s 了）。

#### `getCurrentTime`

返回“当前”时间的时间戳，是根据初始化时设置的时间计算的。

#### `regulate`

接受一个时间戳，用来校正当前时间，需要使用服务端时间计时的时候，可以使用此方法定期校正。关于使用服务端计时的方案，可以参考[stackoverflow](http://stackoverflow.com/questions/1638337/the-best-way-to-synchronize-client-side-javascript-clock-with-server-date)。服务端计时精度还是不太满意，尤其是服务器压力大，并发量多的时候，我在项目中使用 Tictac 的时候，只在初始化的时候取了一次服务端时间，大家有什么好的方案欢迎交流。

#### `destroy`

销毁 Tictac 已经注册的所有计时器。

#### 格式化对象

所谓的“格式化对象”，就是用来显示倒计时的时间的。例如：5 分 12 秒。格式化对象一般是下面这样：

```javascript
{
  days: '{d}天 ',
  hours: '{hh}小时 ',
  minutes: '{mm}分 ',
  seconds: '{ss}秒'
}
```

当然如果你只需要精确到天的话，可以只保留 `days`。另外，设置 `formatIgnore` 为 `true`（默认也是 true）的话，会隐藏空值，就拿上面的对象来说，如果现在离目标时间还有 n 多天，那么会完整的显示“XX 天 XX 小时 XX 分 XX 秒”，如果是同一天，就只显示“XX 小时 XX 分 XX 秒”。另外，`{hh}` 和 `{h}` 的区别就在于时数小于 10 的时候，例如 8，是显示 08 还是 8。

[npm-image]: https://img.shields.io/npm/v/tictac.js.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/tictac.js
[circleci-image]: https://img.shields.io/circleci/project/github/keenwon/Tictac.svg?maxAge=3600&logo=circleci&style=flat-square
[circleci-url]: https://circleci.com/gh/keenwon/Tictac