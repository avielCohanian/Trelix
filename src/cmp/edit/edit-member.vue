<template>
    <section class="edit-member">
        <input
            class="search"
            type="text"
            placeholder="Search members"
            v-model="filterMember"
        />
        <h3 class="member-title">Board members</h3>
        <ul>
            <li
                v-for="member in membersToShow"
                :key="member._id"
                @click="updateMember(member)"
            >
                <div class="curr-user">
                    <avatar
                        v-if="member.imgUrl"
                        :src="member.imgUrl"
                        :size="32"
                        class="avatar"
                    ></avatar>
                    <avatar
                        v-else
                        :username="member.fullname"
                        class="avatar"
                    ></avatar>

                    <span class="user">
                        <span>{{ member.fullname }}</span>
                        <span>({{ member.username }})</span>
                    </span>
                </div>

                <span
                    class="check el-icon-check"
                    v-if="cardMembers(member._id)"
                ></span>
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
            let memberToShow = this.$store.getters.boardMembers;
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
        cardMembers(memberId) {
            let currMembers = this.card.members;
            return currMembers.some((member) => member._id === memberId);
        },
        updateMember(member) {
            this.$emit('updateMember', member);

            // TODO
        },
    },
    components: {
        avatar,
    },
};
</script>

<style></style>
