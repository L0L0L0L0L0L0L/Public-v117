/*
	名字:	隱藏地圖
	地圖:	前往海盜船之路
	描述:	925100000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You must defeat all the monsters in this premise in order to move on to the next stage."));
		return false;
		}
		for (var i = 1; i < 8; i ++)
	if (pi.getPlayer().getMap().getReactorByName("" + i).getState() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You need to open all the chests to move to the next location."));
		return false;
		}
		pi.warpMap(925100100, 0); //突破船首!
		return true;
}