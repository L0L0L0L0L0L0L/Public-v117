/*
	名字:	黑色翅膀佔領地
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function enter(pi) {
	cal = java.util.Calendar.getInstance();
	hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23940)).getStatus() == 1 && hour > 17 && hour < 19) {
	if (pi.getMap(931010030).getCharacters().size() < 1) {
		pi.getMap(931010030).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931010030), pi.getMap(931010030).getPortal(1)); //可疑的美髮店
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310000000));
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Question Fabio about what he's been doing!"));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The Hair Salon seems to be full of customers. Try coming back later."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(310000003), pi.getMap(310000003).getPortal(1)); //埃德爾斯坦美髮店
		return true;
}