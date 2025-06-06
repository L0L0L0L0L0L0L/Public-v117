/*
	名字:	皇后之路
	地圖:	小橋樑
	描述:	130030006
*/

function enter(pi) {
	if (pi.getPlayer().getJob() == 1000) {
	if (pi.getPlayer().hasSummon() == false) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.summonHelper(true));
		}
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.summonMessage(11));
		}
		return true;
}