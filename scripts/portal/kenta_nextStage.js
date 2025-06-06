/*
	名字:	隱藏地圖
	地圖:	危險之海1
	描述:	923040100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 923040100 && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("All monsters in the field must be eliminated before you can move to the next stage."));
		return false;
		}
	if (pi.getPlayer().getMap().getId() == 923040200 && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Please eliminate monsters and get me 20 Air Bubbles before you can move to the next stage."));
		return false;
		}
		pi.warpMap(pi.getPlayer().getMap().getId() + 100, 0);
		return true;
}