<template>
    <section class="cmp-background">
        <div class="menu-header background-header">
            <h3
                class="back-menu pointer material-icons-outlined back"
                @click="back"
            >
                arrow_back_ios
            </h3>
            <h2 class="menu-header-txt">Change background</h2>
            <h3
                @click="closeMenu"
                class="close-menu material-icons-outlined pointer"
            >
                close
            </h3>
        </div>
        <hr />

        <div class="scroll-container">
            <div class="bcg-main container-scroll-main" v-if="!showCmp">
                <div class="choice-bcg-up">
                    <div>
                        <div
                            class="photos pointer"
                            :style="getImg"
                            @click="changeCmp('choicePhotos')"
                        ></div>
                        <div class="background-menu">
                            <h2>Photos</h2>
                        </div>
                    </div>
                    <div>
                        <div
                            class="colors pointer"
                            @click="changeCmp('choiceColors')"
                        ></div>
                        <div class="background-menu">
                            <h2>Colors</h2>
                        </div>
                    </div>
                </div>
                <hr />
                <h2 class="custom">Custom</h2>
                <div class="list-custom">
                    <ul>
                        <li class="card-photo">
                            <div class="img-upload">
                                <label class="clickable" v-if="!isLoading">
                                    <div class="plus"></div>
                                    <input
                                        type="file"
                                        id="uploadImg"
                                        @change="onUploadImg"
                                        hidden
                                    />
                                </label>
                                <img
                                    v-else
                                    :src="require('@/assets/loader.gif')"
                                    alt=""
                                />
                            </div>
                        </li>
                        <li
                            v-for="(img, idx) in board.styleCustom"
                            :key="idx"
                            :style="img"
                            class="card-photo"
                            @click="changeBcg({img,color:{color:'#fff'}})"
                        ></li>
                    </ul>
                </div>
            </div>
            <!-- <transition name="slide-fade" v-else> -->
            <component
                @click="back"
                :is="getComponent"
                @changeBcg="changeBcg"
                :colors="colors"
            ></component>
            <!-- </transition> -->
        </div>
    </section>
</template>

<script>
import choicePhotos from '../menu/choice-photos.vue';
import choiceColors from '../menu/choice-colors.vue';
import { uploadImg } from '../../service/img.service.js';
import { socketService } from '../../service/socket.service.js';

export default {
    props: {
        board: {
            type: Object,
        },
    },
    data() {
        return {
            showCmp: null,
            colors: {},
            imgs: {},
            isLoading: false,
        };
    },
    created() {
        this.loadImgAndColors();
        // socketService.on('update', this.logog)
        // socketService.emit('update', 'popo')
    },
    methods: {
        logog(imgs){
            console.log(imgs ,'new socket');

        },
        async onUploadImg(ev) {
            const copyBoard = JSON.parse(JSON.stringify(this.board));
            this.isLoading = true;
            let res = await uploadImg(ev);
            copyBoard.styleCustom.push({ backgroundImage: `url(${res.url})` });
            this.$store.dispatch({ type: 'updateBoard', board: copyBoard });
            this.isLoading = false;
        },
        loadImgAndColors() {
            this.colors = this.$store.getters.getColors;
            this.imgs = this.$store.getters.getImgs;
        },
        changeCmp(cmp) {
            this.showCmp = cmp;
        },
        // newBcg ,
        changeBcg({img ,color}) {
            const copyBoard = JSON.parse(JSON.stringify(this.board));
            copyBoard.style = img;
            copyBoard.color = color;
            this.$store.dispatch({ type: 'updateBoard', board: copyBoard });

            // this.$emit('changeBcg');
        },
        closeMenu() {
            this.$emit('closeMenu');
        },
        back() {
            if (this.showCmp) this.showCmp = null;
            else this.$emit('changeCmp', null);
        },
    },
    computed: {
        getComponent() {
            return this.showCmp;
        },

        getImg() {
            if (JSON.stringify(this.board.style).includes('backgroundImage'))
                return this.board.style;
            else
                return {
                    backgroundImage:
                        'url(https://res.cloudinary.com/trelix-casep21/image/upload/v1638548106/yu-chin-tsai-piTEABtlR1Q-unsplash_etyuas.jpg)',
                };
        },
    },
    components: {
        choicePhotos,
        choiceColors,
    },
};
</script>

<style></style>
