/*
	名字:	楓葉古城
	地圖:	城堡內室2
	描述:	800040401
*/

function enter(pi) {
	var em = pi.getEventManager("NinjaBoss");
	var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
	if (pi.getPlayer().getParty() == null) {
		em.startInstance(pi.getPlayer());
		return true;
		}
	if (pi.getPlayer().getParty().getLeader().getId() != pi.getPlayer().getId()) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Only party leaders can initiate entry."));
		return false;
		}
		em.startInstance(pi.getPlayer().getParty(), pi.getPlayer().getMap(), 200);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Another party is already inside."));
		return false;
}