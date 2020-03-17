<template>
    <div>
        <block_nav></block_nav>
        <block_banner></block_banner>
        <block_top_brand></block_top_brand>
        <block_search ></block_search>
        <block_brand></block_brand>
        <Block_Banner_Bottom></Block_Banner_Bottom>
        <block_footer></block_footer>
    </div>
</template>

<script>
import block_banner from '../Units/BlockBanner';
import block_top_brand from '../Units/BlockTopBrandHome';
import block_search from '../Units/Block_Search';
import block_brand from '../Units/Block_Brand';
import block_nav from '../Units/BlockNav';
import block_footer from '../Units/Block_Footer';
import Block_Banner_Bottom from '../Units/Block_Banner_Bottom.vue';

export default {
    components : {
        block_banner, block_top_brand, block_search, block_brand, block_nav, block_footer, Block_Banner_Bottom
    }    
}
</script>