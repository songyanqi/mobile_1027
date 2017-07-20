<template>
    <div>
        <div id='fireWord' style='width: 100%; position: relative;'>
        	<img v-on:click='fireWordHref' class='fire_work_img' src="//pic.davdian.com/free/2016/12/27/yanhua_publish3.gif">
        	<!-- <canvas id="canvas" style='width: 100%; height: 100%;'></canvas> -->
        	<!-- <img id="gif" src="http://pic.davdian.com/free/2016/12/27/yanhua_publish2.gif"> -->
        	<span class='dayShow' v-text='dayShow'></span>
        	<span class='hourShow' v-text='hourShow'></span>
        	<span class='minuteShow' v-text='minuteShow'></span>
        	<span class='secondShow' v-text='secondShow'></span>
        </div>
    </div>
</template>
<script>
    import './fire_work.scss'
    import fire_work from './fire_work.es6';
    // import fire_work from './fire_work.es6'
    export default fire_work
</script>