/*
	名字:	隱藏地圖
	地圖:	階段 1 - 魔鏡
	描述:	670010200
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("stage0a") == 0) {
		pi.getPlayer().changeMap(pi.getMap(670010300), pi.getMap(670010300).getPortal(1)); //階段 2 - 心弦(白天_時間)
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(6, "The portal is not opened yet."));
		return false;
}