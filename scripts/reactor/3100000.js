/*
	名字:	雷本礦山
	地圖:	發電廠保安隊
	描述:	310050100
*/

function act() {
	rm.getPlayer().changeMap(rm.getMap(931020000), rm.getMap(931020000).getPortal(1));
	rm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The Crime Prevention System is activated. You are deported to the Intruder Search Party."));
}