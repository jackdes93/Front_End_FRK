<template>
    <div>
        <block_nav></block_nav>
       
        <Block_Banner_Bottom></Block_Banner_Bottom>
        <block_footer></block_footer>
    </div>
</template>

<script>
import block_nav from '../Units/BlockNav';
import block_footer from '../Units/Block_Footer';
import Block_Banner_Bottom from '../Units/Block_Banner_Bottom.vue';

export default {
    components : {
        block_nav, block_footer, Block_Banner_Bottom
    }    
}
</script>