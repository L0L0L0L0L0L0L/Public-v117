/*
	名字:	过去的神木村
	地圖:	燃烧的神木村4
	描述:	272000410
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31176)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(31187).forceStart(ms.getPlayer(), ms.getNpc(), 1);
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300487), new java.awt.Point(345, 2));
		ms.dispose();
		return;
		}
		Packages.server.quest.MapleQuest.getInstance(31187).forceStart(ms.getPlayer(), ms.getNpc(), 0);
		ms.dispose();
}