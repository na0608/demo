/**
 * Created by join on 2016/11/23.
 */
function animate(obj,json){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag =true;
        // 遍历json 函数
        for (var attr in json){
            // 获取盒子当前的样式
            //console.log(json[attr]);
            var cereter = parseInt(getStyle(obj,attr));
				console.log(cereter);
            // 计算步长  用目标位置 - 当前盒子的位置
            var step = (json[attr] - cereter) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
//				console.log(json[attr]);
            // 判断半 透明
            if(attr == "opacity"){     // 判断用户 是否加了 opacity 属性
//					console.log(attr);
                if ("opacity" in obj.style){    // 判断浏览器是否支持 opacity
                    obj.style.opacity = json[attr];
//						console.log( json[attr]);
                }else{
						obj.style.filter = "alpha(opacity = "+ json[attr] * 100 +")";
//						console.log(json[attr] * 100);
                }
            }else{
                // 盒子的当前的样式 + 步长
                obj.style[attr] = cereter + step + "px";
            }
            // 如果盒子的当前目标位置 其中有一个属性值 不等于 json遍历中的目标位置   就不应该停止定时器
            if(cereter != json[attr]){
                flag = false;
            }
        }
        // 判断定时器条件为真停止定时器
        if (flag){
            clearInterval(obj.timer);
        }
    },10)
}

// 获取盒子当前样式的函数
function getStyle(obj,attr){
    if (obj.currentStyle){    // IE 写法
        return obj.currentStyle[attr];
    }else {     // W3C 标准浏览器写法
        return window.getComputedStyle(obj,null)[attr];
    }
}