<template>
    <section class="edit-member">
        <el-input
            placeholder="Search members"
            v-model="filterMember"
        ></el-input>
        <h3 class="member-title">Board members</h3>
        <ul>
            <li
                v-for="member in membersToShow"
                :key="member._id"
                @click="updateMember(member)"
            >
                <img
                    v-if="member.imgUrl"
                    :src="member.imgUrl"
                    class="member-img"
                />
                <avatar
                    v-else
                    :username="member.fullname"
                    class="avatar"
                ></avatar>
                <p>{{ member.fullname }}</p>
                <p>({{ member.username }})</p>
            </li>
        </ul>
    </section>
</template>

<script>
import avatar from 'vue-avatar';
export default {
    name: 'editMember',
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            filterMember: '',
        };
    },
    computed: {
        membersToShow() {
            let memberToShow = this.card.members;
            if (this.filterMember) {
                console.log(memberToShow);
                const regex = new RegExp(this.filterMember, 'i');
                memberToShow = this.card.members.filter((member) =>
                    regex.test(member.fullname)
                );
            }
            return memberToShow;
        },
    },
    methods: {
        updateMember(member) {
            console.log('TODO updateMember');
            // TODO
        },
    },
    components: {
        avatar,
    },
};
</script>

<style></style>
