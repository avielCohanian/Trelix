<template>
    <section class="cmp-img">
        <div class="bcg-choice">
            <el-input
                placeholder="Search Background"
                v-model="search"
                @input="searchBy"
            ></el-input>
            <ul v-if="imgs.length">
                <li
                    v-for="(img, idx) in imgs"
                    :key="idx"
                    :style="img.small"
                    class="card-img pointer"
                    @click="$emit('changeBcg', {img: img.full ,color:img.color})"
                ></li>
            </ul>
        </div>
    </section>
</template>

<script>
import { utilService } from '../../service/util.service.js';
import { imgService } from '../../service/img.service.js';

export default {
    created() {
        this.searchBy();
        this.searchBy = utilService.debounce(this.searchBy, 500);
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
            if (!this.search) return;
            const imgs = await imgService.getImgs(this.search,40);
            this.imgs = imgs;
        },
    },
};
</script>
