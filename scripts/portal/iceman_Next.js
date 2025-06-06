/*
	名字:	冰雪平原
	地圖:	冰雪平原後路
	描述:	932000100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getMonsterById(9300438) == null) {
		pi.warpMap(pi.getPlayer().getMap().getId() + 100, 0);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You cannot go to the next map because Iceman has not arrived. Iceman must arrive before you can be transported."));
		return false;
}