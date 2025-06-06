/*
	名字:	水泥路
	地圖:	埃德爾斯坦公園2
	描述:	310020100
*/

var map = 931050100; //艾德斯塔公園噴水台附近1
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23210)).getStatus() == 1) {
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getMap(map + i).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(1));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23210)).getStatus() > 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23211)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(931050110), pi.getMap(931050110).getPortal(1)); //艾德斯塔公園噴水台附近2
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23213)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(931050110), pi.getMap(931050110).getPortal(1)); //艾德斯塔公園噴水台附近2
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "It seems like there's nobody at the Empty Lot."));
		return false;
}