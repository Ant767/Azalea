import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import { ActionForm } from '../form_func';
import moment from '../moment';

export const REVIEWS = function() {
    return new ConfiguratorSub("§6Reviews\n§8See reviews", "azalea_icons/10")
        .setCallback((player)=>{
            let actionForm = new ActionForm();
            let text = [];
            let reviews = new Database("Reviews");
            let reviewList = reviews.get("Reviews", []);
            for(const review of reviewList) {
                text.push(`§dFrom §e${review.sentBy} §7§o(${moment(review.sentAt).fromNow()})`);
                text.push(`§a${review.rating}/10`)
                text.push(`§f${review.moreInfo}`)
                text.push(``)
            }
            actionForm.button("Ok", null, ()=>{})
            actionForm.body(text.join('\n§r'));
            actionForm.show(player, false, ()=>{})
        })
}