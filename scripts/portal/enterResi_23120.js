/*
	名字:	黑色翅膀佔領地
	地圖:	埃德爾斯坦
	描述:	310000000
*/

var map = 931000410;
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23120)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The door is locked."));
		return false;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getMap(931000410).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(1)); //修亞勒的水倉庫
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Fill the water tank with the water you've brought!"));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310000000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
}