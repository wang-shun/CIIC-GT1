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
    li {display: block; width: 20%; float: left;}
    li:nth-child(1), li:nth-child(6), li:nth-child(11) {border-left: 1px solid #eee;}
    li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4), li:nth-child(5) {border-top: 1px solid #eee;}
    li a {text-align: center; display: block; width: 100%; height: 100%; padding: 10% 16%; border-right: 1px solid #eee; border-bottom: 1px solid #eee;}
    li a:hover {border: none; -webkit-animation: neon2 1.5s ease-in-out infinite alternate; -moz-animation: neon2 1.5s ease-in-out infinite alternate; animation: neon2 1.5s ease-in-out infinite alternate;}
    li a img {width: 76%;}
    li p {font-size: 16px; color: #747474; width: 100%; height: 50px; line-height: 50px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}

    @-webkit-keyframes neon2 {
        from {
            box-shadow: 0 0 1px #fff,
                        0 0 5px  #fff,
                        0 0 10px  #fff,
                        0 0 15px  #e4eefc,
                        0 0 20px  #e4eefc,
                        0 0 25px  #e4eefc,
                        0 0 30px #e4eefc,
                        0 0 35px #e4eefc;
        }
        to {
            box-shadow: 0 0 1px #fff,
                        0 0 5px #fff,
                        0 0 10px #fff,
                        0 0 15px #e4eefc,
                        0 0 20px #e4eefc,
                        0 0 25px #e4eefc,
                        0 0 30px #e4eefc,
                        0 0 35px #e4eefc;
        }
}
</style>