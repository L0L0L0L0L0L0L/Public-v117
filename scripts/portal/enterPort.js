/*
	名字:	瑞恩島
	地圖:	雪平原３
	描述:	140020200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21301)).getStatus() != 1) {
		pi.getPlayer().changeMap(pi.getMap(140020300), pi.getMap(140020300).getPortal(1)); //企鵝港口
		return true;
		}
	if (pi.getMap(914022000).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Unable to enter. Please try again later."));
		return false;
		}
		pi.getMap(914022000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(914022000), pi.getMap(914022000).getPortal(1)); //趕走盜賊烏鴉！
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(140020200));
		return true;
}