/*
	名字:	生命之穴
	地圖:	試煉之穴Ⅰ
	描述:	240060000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("tremble1").getState() < 1) {
		pi.getPlayer().getMap().getReactorByName("tremble1").forceHitReactor(1);
		pi.forceStartReactor(pi.getPlayer().getMap().getId(), 2408003);
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "A gigantic creature is approaching from the deep cave."));
		}
		return false;
}