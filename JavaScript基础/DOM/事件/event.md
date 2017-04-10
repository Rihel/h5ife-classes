# 1. js事件编程

> - 事件处理对象
> - 常用对象
> - 绑定事件方式
> - 事件冒泡
> - 默认行为
> - 事件对象示例

## 1.1. 常用事件
> onLoad ：页面加载完毕后 一般用于body元素   
> onUnload ：页面关闭后 一般用于body元素   
> onBlur ：失去焦点   
> onFocus ：获得焦点   
> onClick ：点击   
> onMouseOver ：当鼠标经过时   
> onMouseOut ：当鼠标离开时   
> onMouseDown ：当鼠标按下时   
> onMouseUp ：当鼠标抬起时   
> onMouseMove ：当鼠标移动时   
> onChange ：当内容改变时   
> onSelect ：当内容被选中时   
> onkeypress ：当键盘点击时   
> onkeydown ：当键盘按下时   
> onkeyup ：当键盘抬起时   
> 触发顺序：onkeydown、onkeypress、onkeyup   
> Onkeypress事件无法捕获功能键  
> onSubmit ：当表单提交时   
> onReset ：当表单重置时   

## 1.2. 绑定事件方式
> **1 ）行内绑定**  
> 语法：**_<元素事件="事件处理程序">_**
 ```
    <script>
        function display(){
        alert('hello');
        alert('hello');
        alert('hello');
            //.................
        }
    </script>
    <input type='button' value='点击' onclick="display()">
 ```
> **2 )动态绑定**   
> 结构+样式+行为分离的页面  
> 语法：**_对象.事件=事件处理程序_**

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="box"></div>
        <script>
            document.getElementByid('box').onclick=function(){
                // code here;
                alert('heiheihei');
            }
        </script>
    </body>
    </html>   
```

> **3 )事件监听**   
> 我们能不能为一个dom对象的同一个事件指定多个事件处理程序   
> 通过下面的代码，我们发现 **一个对象的同一个事件指定多个事件处理程序，那么，后面指定的程序会覆盖前面的**

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="div1"></div>
    <script>
        function fn1(){
            alert('first');
        }
        function fn2(){
            alert('second');
        }
        window.onload=function(){
            document.getElementByid('div1').onclick=fn1;
            document.getElementByid('div1').onclick=fn2;
        }
    </script>
</body>
</html>
```
如果我们想为一个对象的某个事件指定多个事件处理，可以考虑使用事件监听。   
**事件监听语法：**
<table>
    <tbody>
        <tr>
            <td rowspan="2">
                attachEvent(type,callback)            
            </td>
             <td>type</td>
             <td>事件名 如：onclick、onsubmit、onchange等</td>
        </tr>
        <tr>
            <td>callback</td>
            <td>事件处理程序</td>
        </tr>
         <tr>
            <td rowspan="3">
                addEventListener(type,callback,capture)           
            </td>
             <td>type</td>
             <td>事件名 ，没有“on”前缀 如：click、submit、change</td>
        </tr>
        <tr>
            <td>callback</td>
            <td>事件处理程序</td>
        </tr>
         <tr>
            <td>capture</td>
            <td>事件模型 （可选参数）    
            （冒泡模型、捕捉模型） true：捕捉模型
false：冒泡模型 （默认值）</td>
        </tr>
    </tbody>
</table>

```
// ie
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
     <script>
        function fn1(){
            alert('first');
        }
        function fn2(){
            alert('second');
        }
        window.onload=function(){
            document.getElementById('div1').attachEvent('onclick',fn1);
            document.getElementById('div1').attachEvent('onclick',fn2);
        };
    </script>
    <div id='div1'>test</div>
</body>
</html>
```
```
// w3c 标准浏览器
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
      <script>
        function fn1(){
            alert('first');
        }
        function fn2(){
            alert('second');
        }
        window.onload=function(){
            document.getElementById('div1').addEventListener('click',fn1);
            document.getElementById('div1').addEventListener('click',fn2);
        };
    </script>
    <div id='div1'>test</div>
</body>
</html>
```
总结：  
IE和W3C事件监听的不同：  
监听方法不同：IEattachEvent 、W3C addEventListener  
监听参数不同：IE 没有模型参数、W3C 有模型参数  
触发顺序：IE 8及以下的浏览器触发时是先绑定、后触发  
W3C浏览器是先绑定、先触发  
事件名称不同：IE 事件需要”on”前缀，W3C不需要’on’前缀  

解决事件监听的兼容性问题：

```
<script>
    function addEvent(obj,type,callback){
            if(window.attachEvent){
                obj.attachEvent('on'+type,callback);
            }else{
                obj.addEventListener(type,callback);
            }
    }
</script>
```
## 1.3. 事件模型
>   
> 事件模型分为两种：   
> **1）冒泡模型:事件冒泡是指事件响应时会上水冒一样上升至最顶级元素**   
> **2）捕捉模型:按照添加顺序**
>
冒泡模型代码示例：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        #div1{
            width:400px;
            height:400px;
            background:red;
        }
        #div2{
            width:300px;
            height:300px;
            background:green;
        }
        #div3{
            width:200px;
            height:200px;
            background:blue;
        }
    </style>
</head>
<body>
    <script>
        window.onload=function(){
            document.getElementById('div1').onclick=function(){
                alert('div1');
            };
            document.getElementById('div2').onclick=function(event){
                alert('div2');
                stopBubble(event);
            };
            document.getElementById('div3').onclick=function(){
                alert('div3');
            };
        };
    </script>
    <div id='div1'>
        <div id='div2'>
            <div id='div3'>
            </div>
        </div>
    </div>
</body>
</html>
```

>大多数情况下，程序需要对事件冒泡进行取消   
>如何取消事件冒泡：   
>IE：   
>```
>window.event.cancelBubble=true;
>```   
>
>W3C：
>```
>function(event){
>       event.stopPropagation();
>}
>```
>解决兼容性问题：
>```
>function stopBubble(ent){
>   if(window.event){
>       window.event.cancelBubble=true;
>   }else{
>       ent.stopPropagation();
>   }
>}
>```

## 默认行为
<blockquote>
有些html元素，有自己的行为，如，提交按钮、超链接 <br>   
有些时候，我们需要对默认行为进行取消，如表单按钮点击时，用户资料添写不完整 <br>
我们这时需要将按钮的默认行为取消。
</blockquote>   

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        window.onload=function(){
                $('submit').onclick=function(event){
                if($('username').value==''){
                    prevent(event);
                }
            }
        };
 </script>
  <form method='post' action='demo16.php'>
    <input type='text' id='username'><br>
    <input type='submit' value='Ìá½»' id='submit'>
  </form>
</body>
</html>
```
<blockquote>
  <strong>解决兼容性问题</strong>
</blockquote>

```
<script>
    function prevent(ent){
        if(window.event){
            window.event.returnValue=false;
        }else{
            ent.preventDefault();
        }
    }
</script>
```

## 事件对象
<blockquote>
    <strong>1）什么是事件对象</strong>
    <p>事件对象就是事件发生时系统自动产生的对象，这个对象包含了这个事件发生时所有的信息</p>
    <p>如：鼠标移动，那么，鼠标所在的横、纵坐标就保存到了这个事件对象中</p>
    <strong>2）如何获得事件对象</strong>
        <p>IE9及以上版本、W3C：<br>
    function(event){<br>
    IE8及以下：<br>
    window.event<br></p>
   <strong>3）键盘事件小例子：</strong>
</blockquote>


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
    window.onload=function(){
        $('test').onkeyup=function(event){
            var code;
            if(window.event){
                code=window.event.keyCode;
            }else{
                code=event.keyCode;
            }
            switch(code){
                case 37:
                    //alert('left');
                    $('content').style.left=(parseInt($('content').style.left)-10)+'px';
                    break;
                case 38:
                    //alert('up');
                    $('content').style.top=(parseInt($('content').style.top)-10)+'px';
                    break;
                case 39:
                    //alert('right');
                    $('content').style.left=(parseInt($('content').style.left)+10)+'px';
                    break;
                case 40:
                    //alert('down');
                    $('content').style.top=(parseInt($('content').style.top)+10)+'px';
                    break;
            }
        };
    };
 </script>
  <input type='text' id='test'>
  <div id='content' style='width:100px;height:100px;background:red;position:absolute;left:10px;top:10px'>test</div>
</body>
</html>
```




