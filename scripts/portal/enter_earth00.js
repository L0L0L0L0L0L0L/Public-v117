/*
	名字:	鯨魚號
	地圖:	航海室
	描述:	120000101
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4031890)) {
		pi.getPlayer().changeMap(pi.getMap(221000300), pi.getMap(221000300).getPortal(2)); //司令室
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You need a 'Warp Card' to use the warp machine."));
		return false;
}