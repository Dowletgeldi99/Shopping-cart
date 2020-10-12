<template>
    <div id = "app">
        <ShopData />
        <Cart />
    </div>
</template>

<script>
    import ShopData from '../components/shopData';
    import Cart from '../components/cart';
    export default {
        components: {
            ShopData,
            Cart
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang = 'scss'>
    * {
        box-sizing: border-box;
        margin: 0; 
        padding: 0;
    }

    html,
    body {
        height: 100%;
        font-family: sans-serif;
    }
</style>