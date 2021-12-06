'use strict';
const alfy = require('alfy');
(function(){
    // https://github.com/PeterDaveHello/ColorEchoForShell  灵感来自于这个库
    // 参考了这篇文章的介绍 https://www.cnblogs.com/276815076/archive/2011/05/11/2043367.html
    // 前景色：30黑 31红 32绿 33黄 34蓝 35紫 36青 37白
   // 背景色：40黑 41红 42绿 43黄 44青 45蓝 46青 47白
    const query = alfy.input; 
    const styles = ["常规","加粗","斜体","粗斜体","下划线","删除线"];
    const stylesCode = ['','1;','3;','1;3;','4;','9;']; 
    const colors = ["黑色","红色","绿色","黄色","蓝色","紫色","青色","白色"];
    var data = [];
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const colorValue = 30 + i;
        for (let j = 0; j < styles.length; j++) {
            const title = color + '-' + styles[j];
            const styleValue = stylesCode[j];
            const cmd = `echo -e "\\033[${styleValue}${colorValue}m${query}\\033[m"`;
            data.push({title,cmd});
        }
    }

    //背景色+前景色
    for (let bgIndex = 0; bgIndex < colors.length; bgIndex++) {
        const bgColor = colors[bgIndex].slice(0,1);
        for (let fgIndex = 0; fgIndex < colors.length; fgIndex++) {
            const fgColor = colors[fgIndex].slice(0,1);
            if (bgIndex !== fgIndex) {
                for (let index = 0; index < styles.length; index++) {
                    const styleValue = stylesCode[index];
                    const title = bgColor +'底' + fgColor + '字' + '-' + styles[index];
                    const bgValue = 40 + bgIndex;
                    const fgValue = 30 + fgIndex;
                    const cmd = `echo -e "\\033[${styleValue}${bgValue};${fgValue}m${query}"`;
                    data.push({title,cmd});    
                }
            }
        }
    }
    data.sort((a,b) => a.title.localeCompare(b.title,"zh-CN"));
     // 一共384个样式不是很好找 
    // 需要取舍 亮色和暗色结合才是最优的 后续再优化吧
    const result = data.map(function(item){
        return {
        title : item.title,
        subtitle: item.cmd,
        arg: item.cmd
        }
    });
    alfy.output(result);  
})();
