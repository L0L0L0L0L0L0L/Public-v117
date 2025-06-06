/*
	名字:	石巨人寺院
	地圖:	第1階段 : 石巨人寺院1
	描述:	952000000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Please eliminate all monsters in the field first."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(0));
		return true;
}