<template>
    <div class="data">
        <div class="data__cards">
            <div class="card" v-for="name in NAMES" :key="name.G">
                <div class="card__title">
                    <p>{{name.G}}</p>
                </div>
                <div class="card__info">
                    <div class="card__info-item" @click="addToCart(nameItem, name.G)" v-for="nameItem in name.B" :key="nameItem.N">
                        <p>{{nameItem.N}}({{nameItem.A.P}})</p>
                        <div class="item__price">
                            <span>{{nameItem.A.C}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        data() {
            return {
            
            }
        },
        computed: {
            ...mapGetters([
                'DATA',
                'NAMES',
                'CART'
            ])
        },
        mounted() {
            this.GET_DATA_FROM_API();
            this.GET_NAMES_FROM_API();
        },
        methods: {
            ...mapActions([
                'GET_DATA_FROM_API',
                'GET_NAMES_FROM_API',
                'ADD_TO_CART'
            ]),
            addToCart(nameItem, title) {
                nameItem.G = title;

                console.log(nameItem)
                this.ADD_TO_CART(nameItem);
            }  
        }
    }
</script>

<style lang="scss">
    .data {
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        &__cards {
            display: flex;
            justify-content: space-between;
            align-items: start;
            flex-wrap: wrap;
            width: 100%;

            .card {
                width: 48%;
                border: 1px solid #000;
                margin-bottom: 10px;
                font-size: 14px;

                &__title {
                    width: 100%;
                    background: #ccc;
                    padding: 5px 10px;
                }

                &__info {
                    display: flex;
                    flex-wrap: wrap;

                    &-item {
                        width: 50%;
                        border-top: 1px solid #000;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 5px;
                        cursor: pointer;
                        
                        &:nth-child(odd) {
                            border-right: 1px solid #000;
                        }

                        p {
                            width: 84%;
                        }
                    }
                }
            }
        }
    }
</style>
        