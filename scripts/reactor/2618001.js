/*
	名字:	隱藏地圖
	地圖:	特殊實驗室
	描述:	926100200
*/

function act() {
	rm.getMap(rm.getPlayer().getMap().getId() + 2).getReactorById(2618004).forceHitReactor(1);
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "The automatic door has been opened."));
}