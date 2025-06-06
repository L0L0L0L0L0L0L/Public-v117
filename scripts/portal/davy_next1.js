/*
	名字:	隱藏地圖
	地圖:	突破船首!
	描述:	925100100
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("stage1") == null) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The Portal is currently sealed."));
		return false;
		}
		pi.warpMap(925100400, 0); //打倒海賊!
		return true;
}