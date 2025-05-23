/**
 * RTL 语言自动转换 Loader
 * 功能：根据语言设置自动转换 CSS 属性为 RTL 布局（从右到左）
 */
const postcss = require("postcss");

// 默认配置
const defaultOptions = {
  // 是否启用 RTL 转换
  enableRTL: true,
  // RTL 语言列表
  languages: ["he", "ar", "fa"],
  // 排除的文件路径
  exclude: /node_modules/,
  // 需要翻转的 CSS 属性
  flipProperties: [
    "margin-left",
    "margin-right",
    "padding-left",
    "padding-right",
    "left",
    "right",
    "text-align",
    "float",
    "border-left",
    "border-right",
    "border-radius-topleft",
    "border-radius-topright",
    "border-radius-bottomleft",
    "border-radius-bottomright",
  ],
  // 需要翻转的值
  flipValues: {
    left: "right",
    right: "left",
    ltr: "rtl",
    rtl: "ltr",
    "text-align: left": "text-align: right",
    "text-align: right": "text-align: left",
    "float: left": "float: right",
    "float: right": "float: left",
  },
};

module.exports = function (source) {
  // 使用 this.async() 方法将加载器转换为异步模式
  const callback = this.async();

  // 将默认配置和用户传入的配置合并
  const options = { ...defaultOptions, ...this.getOptions() };

  // 根据 exclude 正则表达式排除不需要处理的文件
  if (options.exclude && this.resourcePath.match(options.exclude)) {
    return callback(null, source);
  }

  //! 使用 postcss 遍历所有的 CSS 规则和声明，进行以下操作:
  // 1. 选择器处理：为选择器添加 [dir="rtl"] 属性
  // 2. 属性翻转：调用 flipProperty 函数翻转需要翻转的 CSS 属性。
  // 3. 值翻转：根据 flipValues 映射翻转特定的值。
  // 4. 特殊处理：对 text-align 和 float 属性进行特殊处理。

  postcss([
    (root) => {
      // 遍历所有规则
      root.walkRules((rule) => {
        // 处理选择器，添加 RTL 类
        rule.selector = rule.selector.replace(/(\.|\#)([^\s\:\.]+)/g, (match, prefix, className) => {
          return `${prefix}${className}[dir="rtl"]`;
        });

        // 遍历所有声明
        rule.walkDecls((decl) => {
          // decl.prop 是属性名
          // decl.value 是属性值

          // 翻转属性名
          if (options.flipProperties.includes(decl.prop.toLowerCase())) {
            const flippedProp = flipProperty(decl.prop);
            decl.prop = flippedProp;
          }

          // 翻转属性值
          decl.value = decl.value.replace(/\b(left|right|ltr|rtl|float)\b/g, (match) => {
            return options.flipValues[match] || match;
          });

          // 特殊处理 text-align 和 float
          if (decl.prop === "text-align" || decl.prop === "float") {
            if (decl.value === "left") {
              decl.value = "right";
            } else if (decl.value === "right") {
              decl.value = "left";
            }
          }
        });
      });
    },
  ])
    .process(source, { from: this.resourcePath })
    .then((result) => {
      callback(null, result.css);
    })
    .catch((error) => {
      callback(error);
    });
};

// 翻转属性名
function flipProperty(prop) {
  const map = {
    "margin-left": "margin-right",
    "margin-right": "margin-left",
    "padding-left": "padding-right",
    "padding-right": "padding-left",
    left: "right",
    right: "left",
    "text-align": "text-align",
    float: "float",
    "border-left": "border-right",
    "border-right": "border-left",
    "border-radius-topleft": "border-radius-topright",
    "border-radius-topright": "border-radius-topleft",
    "border-radius-bottomleft": "border-radius-bottomright",
    "border-radius-bottomright": "border-radius-bottomleft",
  };

  return map[prop.toLowerCase()] || prop;
}
