<template>
 <header fixed="true" fixed-app="false">
    	<a class="btn btn-switch"></a>
		<h2>极装吉住12f1d11321</h2>
    	<a class="btn btn-more"></a>
</header>
</template>
<script>
    export default {
        props: ['index']
    }
</script>

<style lang="less">
@import  "../../css/common/var.less"; 
body > #app > header,.simulation-header{z-index:99;position:fixed;top:0;left:0;width:100%;line-height:0;
    text-align:center;background-color:#fff;height:40*@screen;overflow:hidden;
    box-shadow: 0 0px 3px 0 rgba(0,0,0,.2);
    -webkit-box-shadow: 0 0px 3px 0 rgba(0,0,0,.2);
    -moz-box-shadow: 0 0px 3px 0 rgba(0,0,0,.2);
    -o-box-shadow: 0 0px 3px 0 rgba(0,0,0,.2);
	> h2{font-size: 16*@screen;line-height: 100%;height:1em;padding:0.75em 0;text-align:center;color:#404040;}
	> .btn{width:40*@screen;height:40*@screen;cursor: pointer;position:absolute;
    line-height:0%;display: inline-block;z-index:2;top:0;background-repeat:no-repeat;background-position:center center;
    background-size:50% 50%;}
    > .btn-back{
        left:0;
        background-image:url(../../images/common/icon-left.png);
        background-size:(27/48)*50% 50%;
        &:hover{background-color:#FBFBFB;}
    }  
    > .btn-user{
        left:0;
        background-image:url(../../images/common/icon-user.png);
        background-size:50% 50%;
        &:hover{background-color:#FBFBFB;}
    }   
    > .btn-message{
        right:0;
        background-image:url(../../images/common/icon-message.png);
        background-size:50% 50%;
        &:hover{background-color:#FBFBFB;}
    }   
    #tab{width:3.52rem;margin:0 auto;
        li{height:1.173rem;line-height:1.173rem;font-size:0.46rem;color:#64D2E9;font-family: STHeiTi, "microsoft YaHei",sans-serif;float:left;
            img{width:0.48rem;height:0.56rem;margin-top:0.16rem;}
            i{display:block;margin-top:2px;}
            &:nth-child(2){margin-left:1.333rem;}
            &.current{color:#64D2E9;font-weight:bolder;}
        }
    }
    > .btn-switch{
        left:0;#transition(3);
        background-image:url(../../images/common/icon-switch.png);
        background-size:50% 50%;
        &:hover{background-color:#FBFBFB;}
        &.open{transform:rotate(90deg);-webkit-transform:rotate(90deg);}
    } 
    > .btn-more{
        right:0;
        background-image:url(../../images/common/icon-more.png);
        background-size:50% 50%;
        &:hover{background-color:#FBFBFB;}
    } 
    > .btn-close{
        left:0;
        background-image:url(../../images/common/icon-close.png);
        background-size:60% 60%;
    }     
}
</style>
