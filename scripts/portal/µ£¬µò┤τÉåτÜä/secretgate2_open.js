/*
	名字:	威廉的古堡
	地圖:	水路之迷宮
	描述:	990000630
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("secretgate2").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(990000631), pi.getMap(990000631).getPortal(1)); //迷宮之盡頭
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(6, "This door is closed."));
		return false;
}