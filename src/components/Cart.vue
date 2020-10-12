<template>
    <div class="cart">
        <h2 class="cart__title">Корзина</h2>

        <div class="cart__info">
            <div class="cart__info-header">
                <p class="span-color">Наименование товара и описание</p>
                <p class="span-color">Количество</p>
                <p class="span-color">Цена</p>
            </div>
            <div class="cart__info-items">
                <div class="cart__item" v-for="cartItem in CART" :key="cartItem.N">
                    <div class="cart__item-title">
                        <p>{{cartItem.G}}. {{cartItem.N}}</p>
                    </div>
                    <div class="cart__item-count">
                        <div class="count__info">
                            <input type="number" @keyup="keyUp(cartItem)" v-model="cartItem.count">
                            <span class="span-color">шт.</span>
                        </div>
                        <div v-if="cartItem.A.P <= 5" class="count__limited">
                            <p>Количество ограничено</p>
                        </div>
                    </div>
                    <div class="cart__item-price">
                        <p class="sum_price">{{cartItem.price}} руб.<span class="span-color"> / шт.</span></p>
                    </div>
                    <div class="cart__item-button">
                        <button @click="deleteFromCart(cartItem)">Удалить</button>
                    </div>
                </div>
            </div>
            <div class="cart__info-sum">
                <p>Общая стоимость: <span>{{SUM}} руб.</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        data() {
            return {
                count: 1,
                card: null,
                sum: null
            }
        },
        computed: {
            ...mapGetters([
                'CART',
                'NAMES',
                'SUM'
            ])
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_CART'
            ]),
            deleteFromCart(item) {
                this.DELETE_FROM_CART(item);
            }
        }
    }
</script>

<style lang="scss">
    .cart {
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        .span-color {
            opacity: .5;
        }
        

        &__title {
            margin-bottom: 50px;
        }

        &__info {
            display: flex;
            flex-direction: column;
            width: 100%;

            &-header {
                display: flex;
                padding: 10px;
                border-bottom: 1px solid #000;

                p:nth-child(1) {
                    width: 42%;
                }
                p:nth-child(2) {
                    width: 15%;
                }
                p:nth-child(3) {
                    width: 30%;
                }
            }

            &-items {
                display: flex;
                flex-direction: column;
                padding: 10px 0;

                .cart__item {
                    display: flex;
                    padding: 10px;

                    &-title {
                        width: 42%;
                    }

                    &-count {
                        width: 15%;
                        display: flex;
                        flex-direction: column;

                        .count__info {
                            input {
                                width: 50px;
                                padding: 5px;
                            }
                        }

                        .count__limited {
                            width: 90%;
                            border: 2px dashed orange;
                            color: orange;
                            padding: 5px;
                            margin-top: 10px;
                        }
                    }

                    &-price {
                        width: 30%;
                    }
                }
            }

            &-sum {
                text-align: right;
                margin-top: 10px;
                
                span {
                    color: #c0b40d;
                    font-weight: 600;
                }
            }
        }
    }
</style>
        