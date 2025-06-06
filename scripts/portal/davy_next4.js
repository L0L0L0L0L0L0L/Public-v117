/*
	名字:	隱藏地圖
	地圖:	打倒海賊!
	描述:	925100400
*/

function enter(pi) {
	for (var i = 1; i < 5; i ++)
	if (pi.getPlayer().getMap().getReactorByName("sMob" + i).getState() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The portal is currently sealed shut."));
		return false;
		}
		pi.warpMap(925100500, 0); //海賊王的最後
		return true;
}