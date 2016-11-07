<template>
<footer>
	<ul>
		<li class="i-1 {{page==1?'active':''}}"><a href="index.html"><i></i></a></li>
		<li class="i-2 {{page==2?'active':''}}"><a href="reservation.html"><i></i></a></li>
		<li class="i-3 {{page==3?'active':''}}"><a href="http://m.jzjz.com/"><i></i></a></li>
		<li class="i-4 {{page==4?'active':''}}"><a href="construction.html"><i></i></a></li>
		<li class="i-5 {{page==5?'active':''}}"><a href="arcticle.html"><i></i></a></li>
	</ul>
</footer>
</template>
<script>
    export default {
        props: ['page']
    }
</script>

<style lang="less">
@import  "../../css/common/var.less";  
body > #app > footer,.simulation-footer{z-index:97;position:fixed;bottom:0;left:0;width:100%;line-height:0;
    text-align:center;background-color:#fff;height:50*@screen;
    box-shadow:0 0px 3px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:0 0px 3px 0 rgba(0,0,0,.2);
    -moz-box-shadow:0 0px 3px 0 rgba(0,0,0,.2);
    -o-box-shadow:0 0px 3px 0 rgba(0,0,0,.2);
    ul{
        li{
                width: 1%;
                display: table-cell;
                text-align: center;
                vertical-align: middle;
            a{    display: block;
                i{width:50*@screen*90/114;height:50*@screen;display: block;
                        margin: 0*@screen auto 0*@screen auto;
                        background-size:80% 80%;
                        background-position: center center;
                        background-repeat: no-repeat;
                }        
            }
            &.i-1 a i{background-image: url(../../images/index/i-footer-1.png);}
            &.i-2 a i{background-image: url(../../images/index/i-footer-2.png);}
            &.i-3 a i{background-image: url(../../images/index/i-footer-3.png);}
            &.i-4 a i{background-image: url(../../images/index/i-footer-4.png);}
            &.i-5 a i{background-image: url(../../images/index/i-footer-5.png);}
            &.active.i-1{
                a{
                    i{
                        background-image: url(../../images/index/i-footer-1-on.png);
                    }
                }
            }
            &.active.i-2{
                a{
                    i{
                        background-image: url(../../images/index/i-footer-2-on.png);
                    }
                }
            }
            &.active.i-3{
                a{
                    i{
                        background-size: 68% 80%;
                        background-image: url(../../images/index/i-footer-3-on.png);
                    }
                }
            }
            &.active.i-4{
                a{
                    i{
                        background-image: url(../../images/index/i-footer-4-on.png);
                    }
                }
            }
            &.active.i-5{
                a{
                    i{
                        background-image: url(../../images/index/i-footer-5-on.png);
                    }
                }
            }
        }
    }
}
</style>
