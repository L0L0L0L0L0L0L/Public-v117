/*
	名字:	皇后之路
	地圖:	開始之森林2
	描述:	130030001
*/

function enter(pi) {
	if (pi.getPlayer().getJob() == 1000) {
	if (pi.getPlayer().hasSummon() == false) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.summonHelper(true));
		}
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.summonMessage(1));
		}
		return true;
}