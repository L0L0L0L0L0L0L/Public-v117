/*
	名字:	時間之路
	地圖:	三扇門
	描述:	270000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20755)).getCustomData() == "Complete") {
		pi.getPlayer().changeMap(pi.getMap(272030000), pi.getMap(272030000).getPortal(1)); //次元的縫隙
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20755)).getStatus() > 0) {
	if (pi.getMap(927010000).getCharacters().size() < 1) {
		pi.getMap(927010000).resetFully();
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You are being sucked into another dimension."));
		pi.getPlayer().changeMap(pi.getMap(927010000), pi.getMap(927010000).getPortal(0)); //時間神殿迴廊
		pi.getPlayer().startMapTimeLimitTask(420, pi.getMap(270000000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20752)).getStatus() == 1) {
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20752)).setCustomData("find");
		pi.getPlayer().updateQuest(pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20752)), true);
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You found the Secret Passage that leads to Arkarium in the Dimensional Schism."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You feel a strange energy here."));
		return false;
}