<template>
    <div>
        <block_nav></block_nav>
        <block_recomment_brand></block_recomment_brand>
        <block_drink id="Drink"></block_drink>
        <block_dessert id="Dessert"></block_dessert>
        <block_food id="Foriegn Foods"></block_food>
        <block_brunch id="Brunch"></block_brunch>
        <block_hotpot id="Hot Pot"></block_hotpot>
        <block_bbq id="BBQ"></block_bbq>
        <block_vn_food id="Vietnamese Foods"></block_vn_food>
        <block_search></block_search>
        <block_footer></block_footer>
    </div>
</template>

<script>
import block_search from '../Units/Block_Search';
import block_nav from '../Units/BlockNavJoining';
import block_footer from '../Units/Block_Footer';
import block_recomment_brand from '../Units/Block_Recomment_Brand';
import block_drink from '../Units/Block_Drink';
import block_dessert from '../Units/Block_Dessert';
import block_bbq from '../Units/Block_BBQ';
import block_brunch from '../Units/Block_Brunch';
import block_hotpot from '../Units/Block_HotPot'
import block_vn_food from '../Units/Block_Vn_food';
import block_food from '../Units/Block_Foods';

export default {
    components : {
        block_search, block_nav, block_footer, block_recomment_brand, 
        block_drink, block_dessert, block_food, block_bbq, block_hotpot,
        block_brunch, block_vn_food
    }    
}
</script>