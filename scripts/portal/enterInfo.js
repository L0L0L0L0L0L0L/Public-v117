/*
	名字:	維多利亞港
	地圖:	維多利亞港
	描述:	104000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21733)).getStatus() == 1) {
	if (pi.getMap(910400000).getCharacters().size() < 1) {
		pi.getMap(910400000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910400000), pi.getMap(910400000).getPortal(1)); //危險的資料商店
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(104000000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The door to the info shop is not opening. Something must have happened! Try again in a bit."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(104000004), pi.getMap(104000004).getPortal(1)); //特魯的情報商店
		return true;
}