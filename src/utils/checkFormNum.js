// 检测表单个数
export function validateNum(rule, value, callback,min,max,text) {
  var len = 0;

  if (value != null && value != "") {
    for (var i = 0; i < value.length; i++) {
      var c = value.charCodeAt(i);
      //单字节加1
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
    }
    if ((len < min && len > 0) || len > max) {
      //重点重点，下面就是填写提示的文字
      callback(new Error(text));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
