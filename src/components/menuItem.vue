<template>
    <li>
        <a :href="item.url">
            <img :src="item.icon" :alt="item.name" />
            <p>{{item.name}}</p>
        </a>
    </li>
</template>
<script>
    export default {
        name: "menuListItem",
        props: {
            item: {
                required: true,
                type: Object
            }
        }
    }
</script>
<style scoped>
    

</style>