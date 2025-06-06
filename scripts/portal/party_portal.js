/*
	名字:	隱密之地
	地圖:	第一次同行&amp;lt;1號關隘&gt;
	描述:	910340100
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("stage" + (pi.getPlayer().getMap().getId() / 100 % 10)) != null) {
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(0));
		}
		return false;
}