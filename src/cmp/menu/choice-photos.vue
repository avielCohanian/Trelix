<template>
    <section class="cmp-img">
        <div class="bcg-choice">
            <el-input
                placeholder="Search Background"
                v-model="search"
                @input="debounce"
            ></el-input>
            <!-- <div class="scroll-container"> -->
            <!-- <div class="container-scroll-main"> -->
            <ul v-if="imgs.length">
                <li
                    v-for="(img, idx) in imgs"
                    :key="idx"
                    :style="img.small"
                    class="card-img pointer"
                    @click="changeBgc(img.full)"
                ></li>
            </ul>
        </div>
        <!-- </div> -->
        <!-- </div> -->
    </section>
</template>

<script>
import { utilService } from '../../service/util.service.js';
import boardService from '../../service/board.service.js';
import { imgService } from '../../service/img.service.js';
export default {
    created() {
        this.searchBy();
        this.debounce = utilService.debounce(this.searchBy, 1500);
    },
    data() {
        return {
            search: 'Wallpapers',
            imgs: [],
        };
    },
    methods: {
        changeBgc(newBcg) {
            this.$emit('changeBcg', newBcg);
        },
        async searchBy() {
            const imgs = await imgService.getImgs(this.search);
            this.imgs = imgs;
        },
        debounce() {},
    },
};
</script>
<style></style>
