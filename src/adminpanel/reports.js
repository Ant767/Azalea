import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import {
  ActionForm,
  MessageForm,
} from '../form_func';

export const PLAYER_REPORTS = function() {
    return new ConfiguratorSub("§cPlayer reports\n§8Manage player reports", "azalea_icons/5")
        .setCallback((player)=>{
            let actionForm = new ActionForm();
            actionForm.body("Select a case");
            actionForm.title("Player reports");
            let reportsDb = new Database("Reports");
            let reports = reportsDb.get("Reports", []);
            let i = 0;
            if(!reports.length) {
                actionForm.button("§4No reports found, exit", null, ()=>{})
            }
            for(const report of reports) {
                i++;
                actionForm.button(`Case #${i}\n§8${report.player}, ${report.reason}`, null, (player, i)=>{
                    let messageForm = new MessageForm();
                    messageForm.title(`Case #${i}`);
                    messageForm.body(`Player reported: ${report.player}\nReason: ${report.reason}`);
                    messageForm.button1("Ok", (player)=>{
                        reports.splice(i, 1);
                        reportsDb.set("Reports", reports);
                    });
                    messageForm.button2("Delete", (player, i2)=>{})
                    messageForm.show(player,false,(player,response2)=>{})
                });
            }
            actionForm.show(player, false, (player, response)=>{});
        })
}