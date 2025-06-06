/*
	名字:	騎士團要塞
	地圖:	簡陋的庭園
	描述:	271040110
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You must defeat all the Cygnus Knights in order to leave."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(271040100), pi.getMap(271040100).getPortal(0)); //西格諾斯殿堂
		return true;
}