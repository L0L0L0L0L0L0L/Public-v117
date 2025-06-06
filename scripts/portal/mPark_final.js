/*
	名字:	石巨人寺院
	地圖:	第6階段 : 隱藏的石室
	描述:	952000500
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Eliminate all monsters first."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(951000000), pi.getMap(951000000).getPortal(0)); //怪物公園
		return true;
}