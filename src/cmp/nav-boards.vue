<template>
   <section class="nav-boards">
        <div class="boards">
            <div> <font-awesome-icon class="logo" :icon="[ 'fab', 'trello' ]" /> </div>
            <h2> Boards </h2>
        </div>
        <div class="template">
            <div> </div>
            <div>  </div>
        </div>
        <div class="home">
            <div> </div>
            <div>  </div>
        </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>
    .nav-boards{
        height: 90vh;
        width: 272px;
        min-width: 272px;
        background-color: burlywood;
        position: sticky;
        top: 0px;
    }
    .boards{
        width: 100%;
        display: flex;
        align-items: center;
        /* justify-content: center; */
    }
    .boards .logo{
        width: 16px;
        height: 16px;
    }
      
        /* box-shadow: inset 0 0 0 2px #0079bf; */
        /* menu */
        /* box-shadow: 0 12px 24px -6px #091e4240, 0 0 0 1px #091e4214; */
/* border: 0 #324462;
    height: 1px;
    padding: 0;
    width: 100%;
    background-color: #091e4221; */

</style>