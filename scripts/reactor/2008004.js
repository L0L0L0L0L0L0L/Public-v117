/*
	名字:	隱密之地
	地圖:	雅典娜禁地&amp;lt;中央塔&gt;
	描述:	920010100
*/

function act() {
	rm.getPlayer().getMap().getReactorByName("minerva").forceHitReactor(rm.getPlayer().getMap().getReactorByName("minerva").getState() + 1);
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "One of the pieces has been placed."));
}


//4001048		女神像的第四個碎片