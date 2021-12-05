<template>
   <section class="nav-boards ">
        <div class="boards pointer selected">
            <div> <font-awesome-icon class="logo" :icon="[ 'fab', 'trello' ]" /> </div>
            <h2> Boards </h2>
        </div>
        <div class="template pointer ">
            <h3 class="template-logo logo" > </h3>
            <h2> Templates </h2>
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
  .nav-boards h3{
         margin: 0;
         margin-top: 5px;
     }
     .nav-boards h2{
         font-size: 14px;
     }
    .nav-boards{
        height: 90vh;
        width: 272px;
        min-width: 272px;
        position: sticky;
        top: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
    }
    .boards ,.template{
        display: flex;
        align-items: center;
        height: 32px;
        width: 240px;
        border-radius: 3px;
        padding: 4px 4px 4px 8px;
        /* justify-content: center; */
    }
    .boards .logo{
        width: 16px;
        height: 16px;
    }
    .selected{
        background-color: #E4F0F6;
        color: #0079BF;
    }
    .boards:hover,.template:hover{
        background-color: rgba(9, 30, 66, 0.08);
    color: #091e42;
    }
    .template-logo::before{
        content: '\e96d';
        font-size: 16px;
        margin: 0;
        padding: 0;
    }
   
   
    /* .template{
        width: ;
        display: flex;
    } */
      
        /* box-shadow: inset 0 0 0 2px #0079bf; */
        /* menu */
/* border: 0 #324462;
    height: 1px;
    padding: 0;
    width: 100%;
    background-color: #091e4221; */

</style>