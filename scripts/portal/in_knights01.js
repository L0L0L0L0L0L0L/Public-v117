/*
	名字:	騎士團要塞
	地圖:	要塞入口
	描述:	271030010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31124)).getStatus() == 1) {
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31124)).setCustomData("end");
		pi.getPlayer().updateQuest(pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31124)), true);
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "It's the Cygnus Knights' fortress. The security seems very tight."));
		return false;
}