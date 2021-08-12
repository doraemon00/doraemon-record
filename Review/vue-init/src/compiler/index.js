const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 匹配标签名的  aa-xxx
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //  aa:aa-xxx
const startTagOpen = new RegExp(`^<${qnameCapture}`); //  此正则可以匹配到标签名 匹配到结果的第一个(索引第一个) [1]
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>  [1]
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

// [1]属性的key   [3] || [4] ||[5] 属性的值  a=1  a='1'  a=""
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的  />    >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{   xxx  }}

function parserHTML(html) {
  // 不停的截取模板 直到把模板全部解析完毕

  // 截取方法
  function advance(len) {
    html = html.substring(len);
  }

  // 解析开始标签
  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);
      let end;
      let attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        //1要有属性 2不能为开始的结束标签
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }
      if (end) {
        advance(end[0].length);
      }
      return match;
    }
    return false;
  }

  while (html) {
    //解析标签和文本
    let index = html.indexOf("<");
    //标签
    if (index == 0) {
      //解析开始标签 并把属性也解析出来
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        //开始标签
        start(startTagMatch.tagName,startTagMatch.attrs);
        continue;
      }

      
      if (html.match(endTag)) {
        //结束标签
        continue;
      }
      break;
    }

    //文本
  }
}

export function compileToFunction(template) {
  console.log(template);
  //1 将模板变成ast语法树
  let ast = parserHTML(template);
}
