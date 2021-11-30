<template>
  <h1> Board admins </h1>
</template>

<script>
import {boardService }from '../../service/board.service.js'
export default {
created(){

    boardService.getById('b101').then(res=>{
// console.log(res);
    })
}
}
</script>

<style>

</style>