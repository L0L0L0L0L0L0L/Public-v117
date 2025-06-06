/*
	名字:	怪醫
	地圖:	秘密廣場
	描述:	310010000
*/

var map = 931000500;
var num = 10;

function start() {
	if (Math.floor(cm.getPlayer().getJob() / 100) != 33) {
		cm.sendOk("Grrrr...(You can't enter. Only Wild Hunters may enter.)");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23015)).getStatus() < 1) {
		cm.sendNext("What is it? Don't bother me.");
		cm.dispose();
		return;
		}
		cm.sendSimple("Do you want to go to the land of my brothers? \r\n\r\n#L0#Move to #m931000500##l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < num; i++)
	if (cm.getMap(map + i).getCharacters().size() < 1) {
		cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(1));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Come back later."));
		}
		cm.dispose();
}